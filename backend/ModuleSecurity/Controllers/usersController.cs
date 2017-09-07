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
    builder.EntitySet<user>("users");
    builder.EntitySet<permission>("permission"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class usersController : ODataController
    {
        private securityEntities db = new securityEntities();

        // GET: odata/users
        [EnableQuery]
        public IQueryable<user> Getusers()
        {
            return db.user;
        }

        // GET: odata/users(5)
        [EnableQuery]
        public SingleResult<user> Getuser([FromODataUri] long key)
        {
            return SingleResult.Create(db.user.Where(user => user.id_user == key));
        }

        // PUT: odata/users(5)
        public async Task<IHttpActionResult> Put([FromODataUri] long key, Delta<user> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user user = await db.user.FindAsync(key);
            if (user == null)
            {
                return NotFound();
            }

            patch.Put(user);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(user);
        }

        // POST: odata/users
        public async Task<IHttpActionResult> Post(user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.user.Add(user);
            await db.SaveChangesAsync();

            return Created(user);
        }

        // PATCH: odata/users(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] long key, Delta<user> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user user = await db.user.FindAsync(key);
            if (user == null)
            {
                return NotFound();
            }

            patch.Patch(user);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(user);
        }

        // DELETE: odata/users(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] long key)
        {
            user user = await db.user.FindAsync(key);
            if (user == null)
            {
                return NotFound();
            }

            db.user.Remove(user);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/users(5)/permission
        [EnableQuery]
        public IQueryable<permission> Getpermission([FromODataUri] long key)
        {
            return db.user.Where(m => m.id_user == key).SelectMany(m => m.permission);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool userExists(long key)
        {
            return db.user.Count(e => e.id_user == key) > 0;
        }
    }
}
