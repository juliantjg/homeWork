using System.Threading.Tasks;
using backend_asp_net_core.Enums;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_asp_net_core.Middleware
{
    public class CustomAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly GeneralResponse _generalResponse;

        public CustomAuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
            _generalResponse = new GeneralResponse();
        }

        public async Task Invoke(HttpContext context)
        {
            var endpoint = context.GetEndpoint();
            var allowAnonymous = endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null;

            // If API allows anonymous then don't check
            if (!allowAnonymous)
            {
                // Check if the user is authenticated
                if (!context.User.Identity.IsAuthenticated)
                {
                    // Return a custom unauthorized response
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";
                    string errorResponse = "{\"success\": false, \"message\": \"Unauthorized\"}";
                    await context.Response.WriteAsync(errorResponse);
                    return;
                }
                // User is authenticated, proceed to the next middleware
            }
            await _next.Invoke(context);
        }
    }

}
