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
        public ActionResult<string> MakeEntry_POST(string categoryID, string userID, string statusID, string time, string carbs, string protein, string fats, string notes, string insulin, string bg, string allergen1, string allergen2, string allergen3)
        {
            try
            {
                if (int.TryParse(categoryID.Trim(), out int parsedCategoryID) && int.TryParse(statusID.Trim(), out int parsedStatusID) &&
                    int.TryParse(carbs.Trim(), out int parsedCarbs) && int.TryParse(protein.Trim(), out int parsedProtein) && int.TryParse(fats.Trim(), out int parsedFats) &&
                    int.TryParse(allergen1.Trim(), out int parsedAllergen1) && int.TryParse(allergen2.Trim(), out int parsedAllergen2) && int.TryParse(allergen3.Trim(), out int parsedAllergen3) &&
                    double.TryParse(insulin.Trim(), out double parsedInsulin) && double.TryParse(bg.Trim(), out double parsedBG) && DateTime.TryParse(time.Trim(), out DateTime parsedTime))
                {
                    return EntryController.MakeEntry(parsedCategoryID, userID, parsedStatusID, parsedTime, parsedCarbs, parsedProtein, parsedFats, notes.Trim(), parsedInsulin, parsedBG, parsedAllergen1, parsedAllergen2, parsedAllergen3);
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

        [HttpGet("GetEntries")]
        public List<Entry> GetEntries_GET(string userID, string category, string status, string timeframe, string notesText, string showArchived)
        {
            try
            {
                if (int.TryParse(category.Trim(), out int parsedCategory) && int.TryParse(status.Trim(), out int parsedStatus) && int.TryParse(timeframe.Trim(), out int parsedTimeframe) && bool.TryParse(showArchived.Trim(), out bool parsedShowArchived))
                {
                    return EntryController.GetEntries(userID.Trim(), parsedCategory, parsedStatus, parsedTimeframe, (notesText == null) ? notesText : notesText.Trim(), parsedShowArchived);
                }
                else throw new Exception("Invalid values passed.");
            }
            catch (Exception e)
            {
                return new List<Entry>()/*$"Error getting entries: {e.Message}"*/;
            }


        }

        [HttpGet("GetStatuses")]
        public List<Status> GetStatuses_GET()
        {
            return EntryController.GetStatuses();
        }

        [HttpGet("GetAllergens")]
        public List<Allergen> GetAllergens_GET()
        {
            return EntryController.GetAllergens();
        }

        [HttpGet("GetCategories")]
        public List<Category> GetCategories_GET()
        {
            return EntryController.GetCategories();
        }

        [HttpGet("GetCategoriesNoDia")]
        public List<Category> GetCategoriesNoDia_GET()
        {
            return EntryController.GetCategoriesNoDia();
        }

        //////////////////////////////////
        // Patch
        //////////////////////////////////

        [HttpPatch("ChangeArchived")]
        public string ChangeArchivedEntry_PATCH(string id)
        {
            if (int.TryParse(id.Trim(), out int parsedID))
            {
                return EntryController.ChangeArchivedEntryByID(parsedID);
            }
            else return "Invalid ID was passed.";
        }
    }
}
