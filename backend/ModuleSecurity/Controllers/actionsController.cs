using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using ModuleSecurity.Models;

namespace ModuleSecurity.Controllers
{
    /*
    Puede que la clase WebApiConfig requiera cambios adicionales para agregar una ruta para este controlador. Combine estas instrucciones en el método Register de la clase WebApiConfig según corresponda. Tenga en cuenta que las direcciones URL de OData distinguen mayúsculas de minúsculas.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using ModuleSecurity.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<action>("actions");
    builder.EntitySet<role_by_action>("role_by_action"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class actionsController : ODataController
    {
        private securityEntities db = new securityEntities();

        // GET: odata/actions
        [EnableQuery]
        public IQueryable<action> Getactions()
        {
            return db.action;
        }

        // GET: odata/actions(5)
        [EnableQuery]
        public SingleResult<action> Getaction([FromODataUri] int key)
        {
            return SingleResult.Create(db.action.Where(action => action.id_action == key));
        }

        // PUT: odata/actions(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<action> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            action action = await db.action.FindAsync(key);
            if (action == null)
            {
                return NotFound();
            }

            patch.Put(action);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!actionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(action);
        }

        // POST: odata/actions
        public async Task<IHttpActionResult> Post(action action)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.action.Add(action);
            await db.SaveChangesAsync();

            return Created(action);
        }

        // PATCH: odata/actions(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<action> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            action action = await db.action.FindAsync(key);
            if (action == null)
            {
                return NotFound();
            }

            patch.Patch(action);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!actionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(action);
        }

        // DELETE: odata/actions(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            action action = await db.action.FindAsync(key);
            if (action == null)
            {
                return NotFound();
            }

            db.action.Remove(action);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/actions(5)/role_by_action
        [EnableQuery]
        public IQueryable<role_by_action> Getrole_by_action([FromODataUri] int key)
        {
            return db.action.Where(m => m.id_action == key).SelectMany(m => m.role_by_action);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool actionExists(int key)
        {
            return db.action.Count(e => e.id_action == key) > 0;
        }
    }
}
