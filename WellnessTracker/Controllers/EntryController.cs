using System;
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

        public static string MakeEntry(int categoryID, int statusID, DateTime time, int carbs, int protein, int fats, string notes, double insulin, double bg)
        {
            try
            {
                /*
                if (categoryID )
                {
                    // category doesnt exist
                    throw new Exception("Category doesn't exist.");
                }
                else if (GetUserByID(id) != null)
                {
                    throw new Exception("Status doesn't exist.");
                }
                else if (GetUserByName(username) != null)
                {
                    // carbs, fats or protein > 9999 or < 0, 0 default
                    throw new Exception("Nutrition information values are out of range.");
                }
                else if (!TestString(username))
                {
                    // Insulin out of range
                    throw new Exception("Notes contain invalid characters.");
                }
                else if (!TestString(password))
                {
                    // bg out of range
                    throw new Exception("Password contains forbidden characters.");
                }
                else*/
                {
                    
                    using (EntryContext context = new EntryContext())
                    {
                        
                        Entry newEntry = new Entry(categoryID, statusID, time, carbs, protein, fats, notes, insulin, bg);
                        context.Entries.Add(newEntry);

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

            if (testString.Contains("(") || testString.Contains("=") || testString.Contains(";") || testString.Contains(")"))
            {
                result = false;
            }

            return result;
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
