using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
                else
                {
                    using (EntryContext context = new EntryContext())
                    {
                        //password = SHA256.Create(password).ToString();
                        User newUser = new User(id, username, password, isDiabetic);
                        context.Users.Add(newUser);

                        context.SaveChanges();
                    }
                }


                return "Success";
            }
            catch (Exception e)
            {
                return $"Error saving new user: {e.Message}";
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
    }
}
