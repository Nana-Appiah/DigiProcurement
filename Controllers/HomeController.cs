using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc.Helpers;

namespace DigiProc.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Desktop()
        {
            ViewBag.Message = @"eProcurement System v1.0";

            var _session = new UserSession() { 
                userDepartment = new Department { Name = @"IT" },
                userName = @"nappiah"
            };

            Session["userSession"] = _session;

            return View("Desktop");
        }

        public ActionResult Logout()
        {
            return Json(true);
        }

    }
}