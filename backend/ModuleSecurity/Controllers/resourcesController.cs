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
    builder.EntitySet<resource>("resources");
    builder.EntitySet<permission>("permission"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class resourcesController : ODataController
    {
        private securityEntities db = new securityEntities();

        // GET: odata/resources
        [EnableQuery]
        public IQueryable<resource> Getresources()
        {
            return db.resource;
        }

        // GET: odata/resources(5)
        [EnableQuery]
        public SingleResult<resource> Getresource([FromODataUri] long key)
        {
            return SingleResult.Create(db.resource.Where(resource => resource.id_resource == key));
        }

        // PUT: odata/resources(5)
        public async Task<IHttpActionResult> Put([FromODataUri] long key, Delta<resource> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            resource resource = await db.resource.FindAsync(key);
            if (resource == null)
            {
                return NotFound();
            }

            patch.Put(resource);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!resourceExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(resource);
        }

        // POST: odata/resources
        public async Task<IHttpActionResult> Post(resource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.resource.Add(resource);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (resourceExists(resource.id_resource))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(resource);
        }

        // PATCH: odata/resources(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] long key, Delta<resource> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            resource resource = await db.resource.FindAsync(key);
            if (resource == null)
            {
                return NotFound();
            }

            patch.Patch(resource);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!resourceExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(resource);
        }

        // DELETE: odata/resources(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] long key)
        {
            resource resource = await db.resource.FindAsync(key);
            if (resource == null)
            {
                return NotFound();
            }

            db.resource.Remove(resource);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/resources(5)/permission
        [EnableQuery]
        public IQueryable<permission> Getpermission([FromODataUri] long key)
        {
            return db.resource.Where(m => m.id_resource == key).SelectMany(m => m.permission);
        }

        // GET: odata/resources(5)/resource11
        [EnableQuery]
        public IQueryable<resource> Getresource11([FromODataUri] long key)
        {
            return db.resource.Where(m => m.id_resource == key).SelectMany(m => m.resource11);
        }

        // GET: odata/resources(5)/resource2
        [EnableQuery]
        public SingleResult<resource> Getresource2([FromODataUri] long key)
        {
            return SingleResult.Create(db.resource.Where(m => m.id_resource == key).Select(m => m.resource2));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool resourceExists(long key)
        {
            return db.resource.Count(e => e.id_resource == key) > 0;
        }
    }
}
