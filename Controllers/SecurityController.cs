using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc;
using DigiProc.Helpers;
using System.Diagnostics;
using System.Collections;

namespace DigiProc.Controllers
{
    public class SecurityController : Controller
    {
        #region User-Profile

        [HttpGet]
        public JsonResult GetUserProfiles()
        {
            //1= active profiles, 0=inactive profiles
            try
            {
                var cfg = new ConfigurationHelper() { };
                var active_profiles = cfg.GetProfiles();
                return Json(new { status = true, data = active_profiles },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        public JsonResult saveUserCredentials()
        {
            //saves user credentials
            return Json(true);
        }

    }
}