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
        //private UserSession session = new UserSession();

        public RequisitionController()
        {
            //session = (UserSession)Session["userSession"];
        }

        [HttpGet]
        public JsonResult GetRequisitionPrelimData()
        {
            try
            {
                UserSession session = (UserSession)Session["userSession"];
                var strRequisitionNo = new RequisitionHelper() { }.GenerateRequisitionNumber(session.userDepartment.Name);
                var obj = new Utility();
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

        [HttpGet]
        public JsonResult GetRequisitionDetails(int requisitionID)
        {
            try
            {
                var _details = new RequisitionHelper() { }.getRequisitionDetails(requisitionID);
                return Json(new { status = true, data = _details },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetRequisitionNos(int departmentID, int statusID)
        {
            try
            {
                var requisition_numbers = new RequisitionHelper() { }.getRequisitionNumbers(departmentID,statusID);
                return Json(new { status = true, data = requisition_numbers },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult PostRequisitionRequest(string rqNo, string requestee, string comp, string dept,
                                                    int? rqnId, int? currencyId, int? priorityId, string location,string comment, string[] values)
        {
            try
            {
                //insert into dbo.requisition
                //insert into dbo.requisitionitems
                var util = new Utility();
                var oCompany = util.getDefaultCompany();
                var oDepartment = util.getDepartment(dept);
                var oFin = util.getActiveFinancialYear();
                var oReqStatus = util.GetRequisitionStatus(@"Pending");
                UserSession session = (UserSession) Session["userSession"];

                int success = 0;
                int failed = 0;

                var o = new Requisition() 
                { 
                    RequisitionNo = rqNo,
                    RequestedBy = requestee,
                    FinancialYrID = oFin.FinancialYrID,
                    CompanyID = oCompany.CompanyID,
                    DepartmentID = oDepartment.DepartmentID,
                    RequisitionTypeID = rqnId,
                    Location = location,
                    CurrencyID = currencyId,
                    PriorityID = priorityId,
                    RequisitionDescription = comment,
                    RequisitionStatusID = oReqStatus.RequisitionStatusID,
                    CreatedBy = session.userName,
                    CreatedDate = DateTime.Now,
                    isNotif = 0
                };

                var helper = new RequisitionHelper();
                var requisition_id = helper.SaveRequisition(o);

                if (requisition_id > 0)
                {
                    //iteration
                    foreach(var value in values)
                    {
                        //split
                        var str = value.Split(',');

                        //create object
                        var oReqItem = new RequisitionItem() { 
                            RequisitionID = requisition_id,
                            ItemID = new Utility() { }.getItemID(str[0]),
                            Narration = str[1],
                            Quantity = Convert.ToInt32(str[2]),
                            FinApprovalStatus = 1  //PENDING
                        };

                        if (helper.SaveRequisitionItems(oReqItem)) { success += 1; } else { failed += 1; }
                    }
                }

                return Json(new { status = true, data = $"Requisition {rqNo} saved successfully\r\nTotal Count = {values.Length.ToString()}, Successful inserts = {success.ToString()} Failed inserts = {failed.ToString()}" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception exc)
            {
                return Json(new { status = false, error = $"error: {exc.Message}" },JsonRequestBehavior.AllowGet);
            }
        }
    
    
        [HttpGet]
        public JsonResult GetRequisitionItemList(int requisitionID)
        {
            try
            {
                var requisition_items = new RequisitionHelper() { }.GetRequisitionItemLookups(requisitionID);
                return Json(new { status = true, data = requisition_items },JsonRequestBehavior.AllowGet);
            }
            catch(Exception exc)
            {
                return Json(new { status = false, error = $"error: {exc.Message}"},JsonRequestBehavior.AllowGet);
            }
        }
    
        [HttpPost]        
        public JsonResult ApproveRequisition(string[] dta)
        {
            try
            {
                int success = 0;
                int failed = 0;
                bool bln = false;

                int req_id = 0;

                if (dta.Length > 0)
                {                    
                    foreach (var d in dta)
                    {
                        var str = d.Split(',');
                        req_id = int.Parse(str[1]);

                        var obj = new RequisitionItem() { RequisitionItemID = int.Parse(str[0]) };
                        bln = new RequisitionHelper() { }.ApproveRequisitionItem(obj.RequisitionItemID, 2);

                        if (bln) { success += 1; } else { failed += 1; }
                    }

                    if (success == dta.Length) { new RequisitionHelper { }.ChangeRequisitionStatus(req_id, 2); }
                }

                return Json(new { status = bln, data = $"{success.ToString()} requisition items approved" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

    }
}