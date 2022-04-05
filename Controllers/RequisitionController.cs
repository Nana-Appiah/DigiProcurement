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
        public JsonResult GetRequisitionNumber()
        {
            try
            {
                var strRequisitionNo = new RequisitionHelper() { }.GenerateRequisitionNumber();
                return Json(new { status = true, data = strRequisitionNo },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }
    }
}