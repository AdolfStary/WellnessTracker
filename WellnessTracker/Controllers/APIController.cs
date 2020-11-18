using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WellnessTracker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class APIController : ControllerBase
    {
        [HttpPost("Register")]
        public ActionResult<string> RegisterUser_POST(string id, string username, string password, bool isDiabetic)
        {
            return EntryController.RegisterUser(id, username, password, isDiabetic);
        }
    }
}
