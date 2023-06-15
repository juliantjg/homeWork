using backend_asp_net_core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace backend_asp_net_core.Responses
{
    public class GeneralResponse : ControllerBase
    {   
        public IActionResult SendResponse(string message, object? data)
        {
            var response = new
            {
                success = true,
                message = (message == null) ? "Success" : message,
                data = (data == null) ? null : data
            };

            return Ok(response);
        }

        public IActionResult SendError(string message, ResponseStatus status, object? data)
        {
            var response = new
            {
                success = false,
                message = (message == null) ? "Error" : message,
                data = (data == null) ? null : data
            };

            return StatusCode((int)status, response);
        }
    }
}
