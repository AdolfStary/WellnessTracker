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

        //////////////////////////////////
        // Post
        //////////////////////////////////
        
        [HttpPost("Register")]
        public ActionResult<string> RegisterUser_POST(string id, string username, string password, bool isDiabetic)
        {
            username = username.Trim();
            password = password.Trim();

            return EntryController.RegisterUser(id, username, password, isDiabetic);
        }

        // Fix
        [HttpPost("MakeEntry")]
        public ActionResult<string> MakeEntry_POST(string id, string username, string password, bool isDiabetic)
        {
            username = username.Trim();
            password = password.Trim();

            return EntryController.MakeEntry(id, username, password, isDiabetic);
        }

        //////////////////////////////////
        // Get
        //////////////////////////////////


        [HttpGet("Validate")]
        public List<string> ValidateUser_POST(string username, string password)
        {
            username = username.Trim();
            password = password.Trim();

            return EntryController.ValidateUser(username, password);
        }
    }
}
