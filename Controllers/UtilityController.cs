using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Diagnostics;
using DigiProc.Helpers;

namespace DigiProc.Controllers
{
    public class UtilityController : Controller
    {
        [HttpGet]
        public JsonResult GetAssignedModules()
        {
            //return Json(new { });
            //system uses the username session variable to get the modules assigned to this user
            try
            {
                Session["username"] = @"nappiah";

                var obj = new Utility();
                var usModules = obj.getUserModules(Session["username"].ToString());
                return Json(usModules, JsonRequestBehavior.AllowGet);
            }
            catch (Exception errmsg) { Debug.Print(errmsg.Message); return Json(new { error = errmsg }); }
        }

        [HttpGet]
        public JsonResult GetItemCategories()
        {
            return Json(true);
        }

    }
}