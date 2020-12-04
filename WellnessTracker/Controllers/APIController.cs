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
            try
            {
                if (bool.TryParse(isDiabetic.Trim(), out bool parsedIsDiabetic))
                {
                    return EntryController.RegisterUser(id.Trim(), username.Trim(), password.Trim(), parsedIsDiabetic);
                }
                else return "Invalid values passed.";
            }
            catch (Exception e)
            {
                return BadRequest($"Error registering new user: {e.Message}");
            }

        }
        
        [HttpPost("MakeEntry")]
        public ActionResult<string> MakeEntry_POST(string categoryID, string userID, string statusID, string time, string carbs, string protein, string fats, string notes, string insulin, string bg, string allergen1, string allergen2, string allergen3, string exerciseLength)
        {
            try
            {
                if (int.TryParse(categoryID.Trim(), out int parsedCategoryID) && int.TryParse(statusID.Trim(), out int parsedStatusID) &&
                    int.TryParse(carbs.Trim(), out int parsedCarbs) && int.TryParse(protein.Trim(), out int parsedProtein) && int.TryParse(fats.Trim(), out int parsedFats) &&
                    int.TryParse(allergen1.Trim(), out int parsedAllergen1) && int.TryParse(allergen2.Trim(), out int parsedAllergen2) && int.TryParse(allergen3.Trim(), out int parsedAllergen3) &&
                    double.TryParse(insulin.Trim(), out double parsedInsulin) && double.TryParse(bg.Trim(), out double parsedBG) && DateTime.TryParse(time.Trim(), out DateTime parsedTime)
                    && int.TryParse(exerciseLength.Trim(), out int parsedExerciseLength))
                {
                    return EntryController.MakeEntry(parsedCategoryID, userID, parsedStatusID, parsedTime, parsedCarbs, parsedProtein, parsedFats, (notes == null) ? notes : notes.Trim(), parsedInsulin, parsedBG, parsedAllergen1, parsedAllergen2, parsedAllergen3, parsedExerciseLength);
                }
                else throw new Exception("Invalid values were passed.");
            }
            catch (Exception e)
            {
                return BadRequest($"Error making an entry: {e.Message}");
            }
            
        }



        //////////////////////////////////
        // Get
        //////////////////////////////////

        [HttpGet("Validate")]
        public ActionResult<List<string>> ValidateUser_GET(string username, string password)
        {
            try
            {
                username = username.Trim();
                password = password.Trim();

                return EntryController.ValidateUser(username, password);
            }
            catch (Exception e)
            {
                return NotFound($"Error validating user: {e.Message}");
            }
        }

        [HttpGet("GetEntries")]
        public ActionResult<List<Entry>> GetEntries_GET(string userID, string category, string status, string timeframe, string notesText, string showArchived)
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
                return NotFound($"Error getting data: {e.Message}");
            }


        }

        [HttpGet("GetStatuses")]
        public ActionResult<List<Status>> GetStatuses_GET()
        {
            try
            {
                return EntryController.GetStatuses();
            }
            catch (Exception e)
            {
                return NotFound($"Error getting data: {e.Message}");
            }
        }

        [HttpGet("GetNegativeStatusAllergens")]
        public ActionResult<Dictionary<string, int>> GetNegativeStatusAllergens_GET(string userID, string timeframe, string showArchived)
        {
            try
            {
                if (int.TryParse(timeframe.Trim(), out int parsedTimeframe) && bool.TryParse(showArchived.Trim(), out bool parsedShowArchived))
                {
                    return EntryController.GetNegativeStatusAllergens(userID.Trim(), parsedTimeframe, parsedShowArchived);
                }
                else throw new Exception("Invalid values passed.");
            }
            catch (Exception e)
            {
                return NotFound($"Error getting data: {e.Message}");
            }
        }

        [HttpGet("GetAllergens")]
        public ActionResult<List<Allergen>> GetAllergens_GET()
        {
            try 
            {
                return EntryController.GetAllergens();
            }
            catch (Exception e)
            {
                return NotFound($"Error getting data: {e.Message}");
            }
        }

        [HttpGet("GetEntryAllergens")]
        public ActionResult<List<string>> GetEntryAllergens_GET(string userID, string entryID)
        {
            try
            {
                if (int.TryParse(entryID, out int parsedEntryID))
                {
                    return EntryController.GetEntryAllergens(userID.Trim(), parsedEntryID);
                }
                else throw new Exception("Invalid values passed.");
            }
            catch (Exception e)
            {
                return NotFound($"Error getting data: {e.Message}");
            }            
        }

        [HttpGet("GetCategories")]
        public ActionResult<List<Category>> GetCategories_GET()
        {
            try
            {
                return EntryController.GetCategories();
            }
            catch (Exception e)
            {
                return NotFound($"Error getting data: {e.Message}");
            }
        }

        [HttpGet("GetCategoriesNoDia")]
        public ActionResult<List<Category>> GetCategoriesNoDia_GET()
        {
            try
            {
                return EntryController.GetCategoriesNoDia();
            }
            catch (Exception e)
            {
                return NotFound($"Error getting data: {e.Message}");
            }
        }

        //////////////////////////////////
        // Patch
        //////////////////////////////////

        [HttpPatch("ChangeArchived")]
        public ActionResult<string> ChangeArchivedEntry_PATCH(string id)
        {
            try
            {
                if (int.TryParse(id.Trim(), out int parsedID))
                {
                    return EntryController.ChangeArchivedEntryByID(parsedID);
                }
                else throw new Exception("Invalid ID was passed.");
            }
            catch (Exception e)
            {
                return BadRequest($"Error archiving entry: {e.Message}");
            }
        }

        [HttpPatch("ChangeNotes")]
        public ActionResult<string> ChangeEntryNotes_PATCH(string id, string notes)
        {
            try
            {
                if (int.TryParse(id.Trim(), out int parsedID))
                {
                    return EntryController.ChangeEntryNotesByID(parsedID, notes);
                }
                else throw new Exception("Invalid ID was passed.");
            }
            catch (Exception e)
            {
                return BadRequest($"Error editing entry: {e.Message}");
            }
        }
    }
}
