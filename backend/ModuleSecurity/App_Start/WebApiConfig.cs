using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using ModuleSecurity.Models;

namespace ModuleSecurity
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            config.EnableCors(cors);
            // Web API configuration and services

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<user>("users");
            builder.EntitySet<resource>("resources");
            builder.EntitySet<permission>("permissions");
            builder.EntitySet<role>("roles");
            builder.EntitySet<action>("actions");
            builder.EntitySet<role_by_action>("rolesByActions");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
        }
    }
}
