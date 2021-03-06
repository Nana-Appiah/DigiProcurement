using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc;
using DigiProc.Helpers;

namespace DigiProc.Controllers
{
    public class CapexController : Controller
    {
        public JsonResult PostCapexData(string[] _data)
        {
            try
            {
                UserSession session = (UserSession)Session["userSession"];
                var deptObj = new Utility() { }.getDepartment(session.userDepartment.Name);
                var finObj = new Utility() { }.getActiveFinancialYear();
                int success = 0; int failed = 0;
                if (_data.Length > 0)
                {
                    new RequisitionHelper() { }.ClearCapex(deptObj.DepartmentID);
                    var helper = new Utility();

                    foreach(var dt in _data)
                    {
                        var s = dt.Split(',');
                        var itemObj = helper.GetItem(int.Parse(s[0]));
                        var objCapex = new Capex() 
                        { 
                            CapexItemID = itemObj.Id,
                            CapexTypeID = itemObj.ProductCategoryId,
                            QuantityRequested = int.Parse(s[3]),
                            QuantitySupplied = 0,
                            QuantityOutstanding = int.Parse(s[3]),
                            Justification = s[4],
                            EstimatedDeadline = s[5],
                            FinancialYrId = finObj.FinancialYrID,
                            DId = deptObj.DepartmentID
                        };

                        if (new RequisitionHelper { }.SaveCapex(objCapex)) { success += 1; } else { failed += 1; }
                    }
                }

                return Json(new { status = true, data = $"CAPEX process completed;{success.ToString()} purchase request sent for approval" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetCapexData(int departmentID)
        {
            try
            {
                var capex_list = new RequisitionHelper() { }.GetDepartmentCapexRecords(departmentID);
                return Json(new { status = true, data = capex_list },JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAlternateCapexData(int departmentID)
        {
            try
            {
                var cfg = new RequisitionHelper();
                var alternate_capex_list = cfg.GetDepartmentAlternateCapexRecords(departmentID);
                if (alternate_capex_list.Count() > 0)
                {
                    return Json(new {status = true, data = alternate_capex_list }, JsonRequestBehavior.AllowGet);
                }
                else { return Json(new { status = false, msg = @"No data" }, JsonRequestBehavior.AllowGet); }
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetCapexStatus()
        {
            //method is for getting the status of CAPEX branch inputs
            try
            {
                var Cfg = new RequisitionHelper();
                bool bn = Cfg.GetStatusOfCAPEX();
                var status = bn == true ? @"OPENED" : @"CLOSED";

                return Json(new { status = true, capexstatus = bn, data = status },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false,  error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult PostCapexStatus(int capexstatusId)
        {
            //statusId used to close or open CAPEX
            string strStatus = capexstatusId == 1 ? "CLICK TO CLOSE CAPEX" : "CLICK TO OPEN CAPEX";
            string btnStatus = capexstatusId == 1 ? "OPENED" : "CLOSED";

            try
            {

                var Cfg = new RequisitionHelper();
                bool bln = Cfg.SetStatusOfCAPEX(capexstatusId);

                return Json(new {status = bln, data = strStatus, btn = btnStatus },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

    }
}