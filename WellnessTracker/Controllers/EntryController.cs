﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WellnessTracker.Models;

namespace WellnessTracker.Controllers
{
    public class EntryController : Controller
    {

        
        public static string RegisterUser(string id, string username, string password, bool isDiabetic)
        {
            try
            {

                if (id.Length < 36)
                {
                    throw new Exception("Invalid ID.");
                }
                else if (GetUserByID(id) != null)
                {
                    throw new Exception("ID already exists in the database.");
                }
                else if (GetUserByName(username) != null)
                {
                    throw new Exception("Username already exists in the database.");
                }
                else if (!TestString(username))
                {
                    throw new Exception("Username contains forbidden characters.");
                }
                else if (!TestString(password))
                {
                    throw new Exception("Password contains forbidden characters.");
                }
                else
                {
                    using (EntryContext context = new EntryContext())
                    {
                        password = GetHash(password);
                        User newUser = new User(id, username, password, isDiabetic);
                        context.Users.Add(newUser);

                        context.SaveChanges();
                    }
                }


                return "Success!";
            }
            catch (Exception e)
            {
                return $"Error saving new user: {e.Message}";
            }

        }

        public static string MakeEntry(int categoryID, string userID, int statusID, DateTime time, int carbs, int protein, int fats, string notes, double insulin, double bg, int allergen1, int allergen2, int allergen3, int exerciseLength)
        {
            try
            {

                if (notes != null)
                {
                    if (!TestString(notes))
                        throw new Exception("Notes contain invalid characters.");
                }

                if (allergen1 != 0)
                {
                    if (GetAllergenByID(allergen1) == null) throw new Exception("Passed allergen 1 doesn't exist.");
                }
                if (allergen2 != 0)
                {
                    if (GetAllergenByID(allergen2) == null) throw new Exception("Passed allergen 2 doesn't exist.");
                }
                if (allergen3 != 0)
                {
                    if (GetAllergenByID(allergen3) == null) throw new Exception("Passed allergen 3 doesn't exist.");
                }

                if (GetCategoryByID(categoryID) == null)
                {
                    throw new Exception("Category doesn't exist.");
                }
                else if (GetStatusByID(statusID) == null)
                {
                    throw new Exception("Status doesn't exist.");
                }
                else if (carbs > 9999 || carbs < 0 || protein > 9999 || protein < 0 || fats > 9999 || fats < 0)
                {
                    throw new Exception("Nutrition information values are out of range.");
                }
                else if (insulin < 0 || insulin > 999 || bg < 0 || bg > 999)
                {
                    throw new Exception("Diabetic data is out of range.");
                }
                else if (userID.Length != 36)
                {
                    throw new Exception("User ID is invalid.");
                }
                else if (GetUserByID(userID) == null)
                {
                    throw new Exception("User doesn't exist in the database.");
                }
                else if (exerciseLength < 0 || exerciseLength > 999)
                {
                    throw new Exception("Exercise length is invalid.");
                }
                else
                {                    
                    using (EntryContext context = new EntryContext())
                    {
                        
                        Entry newEntry = new Entry(categoryID, userID, statusID, time, carbs, protein, fats, notes, insulin, bg, exerciseLength);
                        context.Entries.Add(newEntry);
                        context.SaveChanges();

                        if (allergen1 != 0)
                        {
                            context.Allergen_Entries.Add(
                                    new Allergen_Entry()
                                    {
                                        AllergenID = allergen1,
                                        EntryID = newEntry.ID
                                    }

                                );
                        }

                        if (allergen2 != 0)
                        {
                            context.Allergen_Entries.Add(
                                    new Allergen_Entry()
                                    {
                                        AllergenID = allergen2,
                                        EntryID = newEntry.ID
                                    }

                                );
                        }

                        if (allergen3 != 0)
                        {
                            context.Allergen_Entries.Add(
                                    new Allergen_Entry()
                                    {
                                        AllergenID = allergen3,
                                        EntryID = newEntry.ID
                                    }

                                );
                        }

                        context.SaveChanges();
                    }
                }
                return "Success!";
            }
            catch (Exception e)
            {
                return $"Error making an entry: {e.Message}";
            }

        }

        public static List<string> ValidateUser(string username, string password)
        {
            List<string> validateReturn = new List<string>();

            try
            {

                if (GetUserByName(username) == null)
                {
                    throw new Exception("Username doesn't exist in the database.");
                }
                else if (!TestString(username))
                {
                    throw new Exception("Username contains forbidden characters.");
                }
                else if (!TestString(password))
                {
                    throw new Exception("Password contains forbidden characters.");
                }
                else
                {
                    User user;
                    password = GetHash(password);

                    using (EntryContext context = new EntryContext())
                    {
                        user = context.Users.Where(x => x.Username == username && x.Password == password).SingleOrDefault();
                    }
                    if (user == null)
                    {
                        throw new Exception("Wrong username or password.");
                    }
                    else
                    {
                        validateReturn.Add("Success!");
                        validateReturn.Add(user.ID);
                        validateReturn.Add(user.IsDiabetic.ToString().ToLower());
                        return validateReturn;
                    }

                }

            }
            catch (Exception e)
            {
                validateReturn.Add($"Error: {e.Message}");
                return validateReturn;
            }

        }

        public static User GetUserByID(string id)
        {
            User user;

            using (EntryContext context = new EntryContext())
            {
                user = context.Users.Where(x => x.ID == id).SingleOrDefault();
            }

            return user;
        }

        public static User GetUserByName(string username)
        {
            User user;

            using (EntryContext context = new EntryContext())
            {
                user = context.Users.Where(x => x.Username == username).SingleOrDefault();
            }

            return user;
        }

        public static bool TestString(string testString)
        {
            bool result = true;

            if (testString.Contains("*") || (testString.Contains("=") && !testString.Contains("http")) || testString.Contains(";"))
            {
                result = false;
            }

            return result;
        }
        public static Status GetStatusByID(int id)
        {
            Status status;

            using (EntryContext context = new EntryContext())
            {
                status = context.Statuses.Where(x => x.ID == id).SingleOrDefault();
            }

            return status;
        }

        public static List<Status> GetStatuses()
        {
            using (EntryContext context = new EntryContext())
            {
                return context.Statuses.OrderBy(x => x.Name).ToList();
            }
        }

        public static List<Allergen> GetAllergens()
        {
            using (EntryContext context = new EntryContext())
            {
                return context.Allergens.OrderBy(x => x.Name).ToList();
            }
        }

        public static Allergen GetAllergenByID(int allergenID)
        {
            using (EntryContext context = new EntryContext())
            {
                return context.Allergens.Where(x => x.ID == allergenID).SingleOrDefault();
            }
        }

        public static List<Category> GetCategories()
        {
            using (EntryContext context = new EntryContext())
            {
                return context.Categories.ToList();
            }
        }

        public static List<Category> GetCategoriesNoDia()
        {
            using (EntryContext context = new EntryContext())
            {
                return context.Categories.Where(x => x.IsDiabetic == false).ToList();
            }
        }

        public static Entry GetEntryByID(int id)
        {
            using (EntryContext context = new EntryContext())
            {
                return context.Entries.Where(x => x.ID == id).SingleOrDefault();
            }
        }

        public static List<Entry> GetEntries(string userID, int categoryID, int statusID, int timeframe, string notesText, bool showArchived = false)
        {
            try
            {
                if (categoryID != 0)
                {
                    if (GetCategoryByID(categoryID) == null)
                    {
                        throw new Exception("Category doesn't exist.");
                    }
                }

                if (statusID != 0)
                {
                    if (GetStatusByID(statusID) == null)
                    {
                        throw new Exception("Status doesn't exist.");
                    }
                }

                if (notesText != null)
                {
                    if (!TestString(notesText))
                    {
                        throw new Exception("Searched text contains invalid characters.");
                    }
                }

                if (timeframe < -1 || timeframe > 180)
                {
                    throw new Exception("Incorrect timeframe was received.");
                }
                else if (userID.Length != 36)
                {
                    throw new Exception("User ID is invalid.");
                }
                else if (GetUserByID(userID) == null)
                {
                    throw new Exception("User doesn't exist in the database.");
                }
                else
                {
                    List<Entry> listOfEntries = new List<Entry>();
                    using (EntryContext context = new EntryContext())
                    {
                        listOfEntries = context.Entries.Where(x => x.UserID == userID).Include(x => x.EntryCategory).Include(x => x.EntryStatus).Include(x => x.EntryAllergens).ThenInclude(x=> x.Allergen).OrderByDescending(x => x.Time).ToList();
                    }
                    if (!showArchived)
                    {
                        listOfEntries = listOfEntries.Where(x => x.IsArchived == false).ToList();
                    }

                    if (categoryID != 0)
                    {
                        listOfEntries = listOfEntries.Where(x => x.CategoryID == categoryID).ToList();
                    }

                    if (statusID != 0)
                    {
                        listOfEntries = listOfEntries.Where(x => x.StatusID == statusID).ToList();
                    }

                    if (timeframe != -1)
                    {
                        listOfEntries = listOfEntries.Where(x => (DateTime.Now - x.Time).TotalDays <= timeframe).ToList();
                    }

                    if (notesText != null && notesText != "")
                    {
                        listOfEntries = listOfEntries.Where(x => x.Notes.Contains(notesText)).ToList();
                    }

                    return listOfEntries;
                }
            }
            catch (Exception e)
            {
                return new List<Entry>()/*$"Error making an entry: {e.Message}"*/;
            }
        }

        public static string ChangeArchivedEntryByID(int id)
        {
            try 
            {
                Entry entryToBeChanged = GetEntryByID(id);

                if (entryToBeChanged == null)
                {
                    throw new Exception("Entry wasn't found.");
                }

                using (EntryContext context = new EntryContext())
                {
                    entryToBeChanged = context.Entries.Where(x => x.ID == id).SingleOrDefault();
                    entryToBeChanged.IsArchived = !entryToBeChanged.IsArchived;

                    context.SaveChanges();
                }

                return "Success!";
            }
            catch (Exception e)
            {
                return $"Error editing entry: {e.Message}";
            }

        }

        public static string ChangeEntryNotesByID(int id, string notes)
        {
            try
            {
                Entry entryToBeChanged = GetEntryByID(id);

                if (entryToBeChanged == null)
                {
                    throw new Exception("Entry wasn't found.");
                }
                else if (!TestString(notes))
                {
                    throw new Exception("Notes contain invalid characters.");
                }

                using (EntryContext context = new EntryContext())
                {
                    entryToBeChanged = context.Entries.Where(x => x.ID == id).SingleOrDefault();
                    
                    entryToBeChanged.Notes = notes;

                    context.SaveChanges();
                }

                return "Success!";
            }
            catch (Exception e)
            {
                return $"Error editing entry: {e.Message}";
            }

        }

        public static Category GetCategoryByID(int id)
        {
            Category category;

            using (EntryContext context = new EntryContext())
            {
                category = context.Categories.Where(x => x.ID == id).SingleOrDefault();
            }

            return category;
        }

        // Borrowed code from: https://www.c-sharpcorner.com/article/hashing-passwords-in-net-core-with-tips/
        // I used this code block as it would be hard to rewrite it on my own and make it any more different.
        // Method makes SHA256 class, using standard UTF8 encoding it breaks down the given string into bytes and hashes them, then it replaces "-" with empty space
        // Which returns SHA256 hash
        private static string GetHash(string text)
        {  
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));

                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}
