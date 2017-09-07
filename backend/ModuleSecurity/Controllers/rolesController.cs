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
    builder.EntitySet<role>("roles");
    builder.EntitySet<permission>("permission"); 
    builder.EntitySet<role_by_action>("role_by_action"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class rolesController : ODataController
    {
        private securityEntities db = new securityEntities();

        // GET: odata/roles
        [EnableQuery]
        public IQueryable<role> Getroles()
        {
            return db.role;
        }

        // GET: odata/roles(5)
        [EnableQuery]
        public SingleResult<role> Getrole([FromODataUri] int key)
        {
            return SingleResult.Create(db.role.Where(role => role.id_role == key));
        }

        // PUT: odata/roles(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<role> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            role role = await db.role.FindAsync(key);
            if (role == null)
            {
                return NotFound();
            }

            patch.Put(role);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!roleExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(role);
        }

        // POST: odata/roles
        public async Task<IHttpActionResult> Post(role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.role.Add(role);
            await db.SaveChangesAsync();

            return Created(role);
        }

        // PATCH: odata/roles(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<role> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            role role = await db.role.FindAsync(key);
            if (role == null)
            {
                return NotFound();
            }

            patch.Patch(role);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!roleExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(role);
        }

        // DELETE: odata/roles(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            role role = await db.role.FindAsync(key);
            if (role == null)
            {
                return NotFound();
            }

            db.role.Remove(role);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/roles(5)/permission
        [EnableQuery]
        public IQueryable<permission> Getpermission([FromODataUri] int key)
        {
            return db.role.Where(m => m.id_role == key).SelectMany(m => m.permission);
        }

        // GET: odata/roles(5)/role_by_action
        [EnableQuery]
        public IQueryable<role_by_action> Getrole_by_action([FromODataUri] int key)
        {
            return db.role.Where(m => m.id_role == key).SelectMany(m => m.role_by_action);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool roleExists(int key)
        {
            return db.role.Count(e => e.id_role == key) > 0;
        }
    }
}
