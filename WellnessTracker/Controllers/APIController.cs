using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WellnessTracker.Models;

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
        public ActionResult<string> RegisterUser_POST(string id, string username, string password, string isDiabetic)
        {
            if (bool.TryParse(isDiabetic.Trim(), out bool parsedIsDiabetic))
            {
                return EntryController.RegisterUser(id.Trim(), username.Trim(), password.Trim(), parsedIsDiabetic);
            }
            else return "Invalid value for diabetic option.";
        }
        
        [HttpPost("MakeEntry")]
        public ActionResult<string> MakeEntry_POST(string categoryID, string statusID, string time, string carbs, string protein, string fats, string notes, string insulin, string bg)
        {
            try
            {
                if (int.TryParse(categoryID.Trim(), out int parsedCategoryID) && int.TryParse(statusID.Trim(), out int parsedStatusID) &&
                    int.TryParse(carbs.Trim(), out int parsedCarbs) && int.TryParse(protein.Trim(), out int parsedProtein) && int.TryParse(fats.Trim(), out int parsedFats) &&
                    double.TryParse(insulin.Trim(), out double parsedInsulin) && double.TryParse(bg.Trim(), out double parsedBG) && DateTime.TryParse(time.Trim(), out DateTime parsedTime))
                {
                    return EntryController.MakeEntry(parsedCategoryID, parsedStatusID, parsedTime, parsedCarbs, parsedProtein, parsedFats, notes.Trim(), parsedInsulin, parsedBG);
                }
                else throw new Exception("Invalid values were passed.");
            }
            catch (Exception e)
            {
                return $"Error making an entry: {e.Message}";
            }
            
        }



        //////////////////////////////////
        // Get
        //////////////////////////////////

        [HttpGet("Validate")]
        public List<string> ValidateUser_GET(string username, string password)
        {
            username = username.Trim();
            password = password.Trim();

            return EntryController.ValidateUser(username, password);
        }

        [HttpGet("GetStatuses")]
        public List<Status> GetStatuses_GET()
        {
            return EntryController.GetStatuses();
        }

        [HttpGet("GetCategories")]
        public List<Category> GetCategories_GET()
        {
            return EntryController.GetCategories();
        }
    }
}
