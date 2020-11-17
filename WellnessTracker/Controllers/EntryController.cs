using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WellnessTracker.Controllers
{
    public class EntryController : Controller
    {

        
        public IActionResult Index()
        {

            ViewBag.ID = User.Identity;

                return View();
        }
    }
}
