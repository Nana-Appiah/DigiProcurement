using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc;
using DigiProc.Helpers;
using System.Diagnostics;

namespace DigiProc.Views.User
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Authenticate()
        {
            return View();
        }
        public ActionResult IDChallenge()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string usrname, string pwd)
        {
            try
            {
                usrname = usrname.Replace(@"panafricansl.com", string.Empty);
                string Hashed_Password = Security.Hashing.CreateMD5Hash(pwd);
                string data = string.Format("?username={0}&pass={1}", usrname, pwd);
                ApiServer api = new ApiServer() { ApiParams = data };

                string req = api.ApiRequest();
                //string req = @"OK";
                if (req.Contains(@"OK"))
                {
                    ConfigurationHelper Cfg = new ConfigurationHelper();
                    var objUser = Cfg.GetUser(usrname, Hashed_Password);

                    if ((objUser.isActive == @"Yes") && (objUser.isActiveDirectory == @"No"))
                    {
                        var usModules = new Utility() { }.getUserModules(objUser.username); //obj.getUserModules(session.userName);

                        var _session = new UserSession()
                        {
                            userDepartment = new Department { Name = objUser.nameOfDepartment },
                            userName = objUser.username,
                            userProfile = objUser.PrManager.nameOfProfile,
                            moduleString = objUser.PrManager.contentOfProfile,
                            modules = usModules,
                            approverTag = objUser.userTag,
                            bioName = string.Format("{0} {1} {2}", objUser.sname, objUser.fname, objUser.onames)
                        };

                        Session["userSession"] = _session;

                        //log event
                        new Log()
                        {
                            Entity = @"User",
                            Event = @"Authentication",
                            Description = string.Format("{0} logged into the Procurement system via Portsight at {1}",objUser.username, DateTime.Now.ToString()),
                            Actor = _session.userName
                        }.WriteLog();

                        return Json(new { status = true, data = objUser }, JsonRequestBehavior.AllowGet);
                        //return RedirectToAction("Main", "Home");
                    }
                    else if ((objUser.isActive == @"Yes") && (objUser.isActiveDirectory == @"Yes"))
                    {
                        //using database credentials to log in..validate password first
                        int iVerification = string.CompareOrdinal(Hashed_Password, objUser.userPassword);
                        if (iVerification == 0)
                        {
                            var usModules = new Utility() { }.getUserModules(objUser.username); //obj.getUserModules(session.userName);

                            var _session = new UserSession()
                            {
                                userDepartment = new Department { Name = objUser.nameOfDepartment },
                                userName = objUser.username,
                                userProfile = objUser.PrManager.nameOfProfile,
                                moduleString = objUser.PrManager.contentOfProfile,
                                modules = usModules,
                                approverTag = objUser.userTag,
                                bioName = string.Format("{0} {1} {2}", objUser.sname, objUser.fname, objUser.onames)
                            };

                            Session["userSession"] = _session;

                            //log event
                            new Log()
                            {
                                Entity = @"User",
                                Event = @"Authentication",
                                Description = string.Format("{0} logged into the Procurement system via Db Authentication at {1}", objUser.username, DateTime.Now.ToString()),
                                Actor = _session.userName
                            }.WriteLog();

                            return Json(new { status = true, data = objUser }, JsonRequestBehavior.AllowGet);
                        }
                        else { return Json(new {status = false, reason = @"pwd"},JsonRequestBehavior.AllowGet); }
                    }
                    else
                    {
                        return Json(new { status = false, reason = @"inactive" }, JsonRequestBehavior.AllowGet);
                    }
                }
                else { return Json(new { status = false, reason = @"pwd" },JsonRequestBehavior.AllowGet); }
            }
            catch (Exception ex)
            {
                return Json(new { status = false, reason = $"error: {ex.Message}" }, JsonRequestBehavior.AllowGet);
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

        [HttpGet]
        public JsonResult GetSessionData()
        {
            //method gets the session details of the user who has logged on
            try
            {
                UserSession session = (UserSession)Session["userSession"];
                return Json(new { status = true, data = session },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult ChangeUserPassword(string newPassword)
        {
            //method is used to reset the password
            try
            {
                ConfigurationHelper cfg = new ConfigurationHelper();
                UserSession session = (UserSession)Session["userSession"];

                var obj = new Usr()
                {
                    usrname = session.userName,
                    usrpassword = Security.Hashing.CreateMD5Hash(newPassword)
                };

                bool bln = cfg.AmendUserPassword(obj);

                return Json(new { status = bln },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

    }
}