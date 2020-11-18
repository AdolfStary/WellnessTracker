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
                using (EntryContext context = new EntryContext())
                {
                    //password = SHA256.Create(password).ToString();
                    User newUser = new User(id, username, password, isDiabetic);
                    context.Users.Add(newUser);

                    context.SaveChanges();
                }

                return "Success";
            }
            catch (Exception e)
            {
                return $"Error saving new user: {e.Message}";
            }

        }
    }
}
