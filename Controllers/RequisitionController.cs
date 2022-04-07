using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc;
using DigiProc.Helpers;
using System.Diagnostics;

namespace DigiProc.Controllers
{
    public class RequisitionController : Controller
    {
        [HttpGet]
        public JsonResult GetRequisitionPrelimData()
        {
            try
            {
                var strRequisitionNo = new RequisitionHelper() { }.GenerateRequisitionNumber();
                var obj = new Utility();
                UserSession session = (UserSession)Session["userSession"];
                var defaultCompany = obj.getDefaultCompany();
                
                return Json(new { status = true, reqNo = strRequisitionNo, 
                    requester = session.userName, department = session.userDepartment.Name, 
                    companyName = defaultCompany.CompanyDescription },JsonRequestBehavior.AllowGet);

            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }
    }
}