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

            return View("Desktop");
        }

        public ActionResult Logout()
        {
            return Json(true);
        }


        [HttpPost]
        public JsonResult Login(string usrname, string pwd)
        {
            try
            {
                ConfigurationHelper Cfg = new ConfigurationHelper();
                var objUser = Cfg.GetUser(usrname, Security.Hashing.CreateHash(pwd));

                if (objUser.isActive == @"Yes")
                {
                    var usModules = new Utility() { }.getUserModules(objUser.username); //obj.getUserModules(session.userName);

                    var _session = new UserSession()
                    {
                        userDepartment = new Department { Name = objUser.nameOfDepartment },
                        userName = objUser.username,
                        userProfile = objUser.PrManager.nameOfProfile,
                        moduleString = objUser.PrManager.contentOfProfile,
                        modules = usModules
                    };

                    Session["userSession"] = _session;

                    return Json(new { status = true, data = objUser }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAssignedModules()
        {
            //system uses the username session variable to get the modules assigned to this user
            try
            {
                UserSession session = (UserSession)Session["userSession"];
                
                return Json(session.modules, JsonRequestBehavior.AllowGet);
            }
            catch (Exception errmsg) 
            { 
                return Json(new { status = false, error = $"error: {errmsg.Message}" }); 
            }
        }

    }
}