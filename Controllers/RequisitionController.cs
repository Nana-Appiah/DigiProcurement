using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc;
using DigiProc.Helpers;
using System.Diagnostics;
using System.Configuration;
using System.IO;
using DigiProc.Notif;

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
        public JsonResult GetRequisitionDetails2(int requisitionID, int statusID)
        {
            try
            {
                var _details = new RequisitionHelper() { }.getRequisitionDetails(requisitionID,statusID);
                //var requisition_items = new RequisitionHelper() { }.GetRequisitionItemLookups(requisitionID, statusID);

                return Json(new { status = true, data = _details /*, items = requisition_items */ }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" }, JsonRequestBehavior.AllowGet);
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
                //use marathon-api to send mail notification to Admin Officer
                var dictMsg = new Dictionary<int, string>(); //for holding data for notification

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
                    isNotif = 1,
                    reqSrc = rqNo
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

                        if (helper.SaveRequisitionItems(oReqItem)) { success += 1; dictMsg.Add((int)oReqItem.ItemID, oReqItem.Narration); } else { failed += 1; }
                    }
                }

                var msg = new Message()
                {
                    to = new Worker() { }.fetchUsingTag(@"Finance Officer"),
                    subject = String.Format("PROCUREMENT REQUEST FROM {0}", session.userDepartment.Name),
                    body = String.Format("A Procurement request with reference {0} has been made by {1} from {2},seeking immediate attention.<br />Please log in to {3} as soon as possible to process request.<br />Thank you.", o.RequisitionNo, session.bioName, session.userDepartment.Name, ConfigurationManager.AppSettings["AppUrl"].ToString()),
                    cc = new Worker() { }.fetchUsingTag(@"Administrative Officer"),
                    bcc = new Worker() { }.fetchUsingTag(@"IT")
                };

                new ApiServer() { }.ApiMailRequest(msg);

                return Json(new { status = true, data = $"Requisition {rqNo} saved successfully\r\nTotal Count = {values.Length.ToString()}, Successful inserts = {success.ToString()} Failed inserts = {failed.ToString()}" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception exc)
            {
                return Json(new { status = false, error = $"error: {exc.Message}" },JsonRequestBehavior.AllowGet);
            }
        }
    
        [HttpPost]
        public JsonResult DeCoupleRequisitions(int rqItmID, string rqNo, string prodCode)
        {
            //method is used to de-couple requisitions
            try
            {
                var session = (UserSession)Session["userSession"];

                var objUtils = new Utility() { };
                var cfg = new RequisitionHelper() { };

                var itemObj = objUtils.GetItem(prodCode);
                var reqObj = cfg.GetRequisition(rqNo);

                //amend requisition object
                reqObj.RequestedBy = session.userName;
                reqObj.reqSrc = rqNo;

                var reqItm = cfg.GetRequisitionItem(rqItmID, itemObj.Id);

                reqObj.RequisitionNo = cfg.GenerateRequisitionSourceNumber(string.Format("{0}-", rqNo));
                reqObj.RequestedBy = session.userName;

                var bln = cfg.CreateSplinterRequisition(reqObj, reqItm);

                return Json(new { status = bln },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetRequisitionItemList(int requisitionID, int statusID)
        {
            try
            {
                var requisition_items = new RequisitionHelper() { }.GetRequisitionItemLookups(requisitionID, statusID);
                return Json(new { status = true, data = requisition_items },JsonRequestBehavior.AllowGet);
            }
            catch(Exception exc)
            {
                return Json(new { status = false, error = $"error: {exc.Message}"},JsonRequestBehavior.AllowGet);
            }
        }
    
        [HttpGet]
        public JsonResult GetRequisitionItemListUsingLPO(int LocalPONumber)
        {
            try
            {
                var requisition_items = new RequisitionHelper { }.GetRequisitionItemLookups(LocalPONumber);
                return Json(new { status = true, data = requisition_items },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, data = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
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
                    RequisitionHelper Cfg = new RequisitionHelper();

                    foreach (var d in dta)
                    {
                        var str = d.Split(',');
                        req_id = int.Parse(str[1]);

                        var obj = new RequisitionItem() { RequisitionItemID = int.Parse(str[0]) };
                        bln = Cfg.ApproveRequisitionItem(obj.RequisitionItemID, 2);
                        
                        if (bln) { success += 1; } else { failed += 1; }
                    }

                    if (success == dta.Length)
                    {
                        //amend the status of the requisition to approved
                        Cfg.ChangeRequisitionStatus(req_id, 2);  //2 = financial approval
                    }

                    //if (success == dta.Length) { new RequisitionHelper { }.ChangeRequisitionStatus(req_id, 2); }
                }

                //mail notification
                var msg = new Message()
                {
                    to = new Worker() { }.fetchUsingTag(@"Administrative Officer"),
                    subject = String.Format("PROCUREMENT APPROVAL"),
                    body = String.Format("A Procurement has been approved, seeking your immediate attention.<br />Please log in to {0} to process request.<br />Thank you.", ConfigurationManager.AppSettings["AppUrl"].ToString()),
                    cc = new Worker() { }.fetchUsingTag(@"Finance Officer")
                    ,bcc = new Worker() { }.fetchUsingTag(@"Fin")
                };

                new ApiServer() { }.ApiMailRequest(msg);

                return Json(new { status = bln, data = $"{success.ToString()} requisition items approved" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult CreateLPORecord(string rNo, int vID, int LPOStatus,int finStatusId,decimal totAmt, string[] dta)
        {
            try
            {
                var helper = new RequisitionHelper { };
                bool blnSuccess = false;

                //update requisition items
                if (dta.Length > 0)
                {
                    int success = 0; int failed = 0;

                    var LPONum = new RequisitionHelper() { }.GetLPOCount(rNo.Replace("REQN", "LPO"));
                    
                    var objPurchaseOrder = new LPO() { RequisitionNo = rNo, VendorID = vID, LPOStatusID = LPOStatus, TotAmt = totAmt, LPONo = LPONum };
                    int _id = helper.SaveLPO(objPurchaseOrder);

                    if (_id > 0)
                    {
                        foreach (var d in dta)
                        {
                            var str = d.Split(',');
                            var rq = new RequisitionItem() { RequisitionItemID = int.Parse(str[0]), Amt = decimal.Parse(str[1]),FinApprovalStatus = finStatusId, LPOID = _id };

                            blnSuccess = helper.UpdateRequisitionItem(rq);
                            if (blnSuccess) { success += 1; } else { failed += 1; }
                        }
                    }

                    if (success == dta.Length) {
                        new RequisitionHelper() { }.ChangeRequisitionStatus(rNo, LPOStatus);
                    }
                }

                //var msg = new Message()
                //{
                //    to = new Worker() { }.fetchUsingTag(@"Finance Officer"),
                //    subject = String.Format("LOCAL PURCHASING ORDER"),
                //    body = String.Format("A Procurement request with reference {0} has been made by {1} from {2},<br />\r\nseeking immediate attention\r\nPlease log in to {3} to process request\r\nThank you.", o.RequisitionNo, session.bioName, session.userDepartment.Name, ConfigurationManager.AppSettings["AppUrl"].ToString()),
                //    cc = new Worker() { }.fetchUsingTag(@"Administrative Officer"),
                //    bcc = new Worker() { }.fetchUsingTag(@"IT")
                //};

                //new ApiServer() { }.ApiMailRequest(msg);

                return Json(new { status = blnSuccess, data = $"Local Purchasing Order record created for {dta.Length.ToString()} items" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, data = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetLPOs()
        {
            //gets distinct LPOs
            try
            {
                //var POs = new RequisitionHelper { }.GetDistinctLPORequisitionNumbers();
                var POs = new RequisitionHelper { }.GetLocalPurchaseOrders();
                return Json(new { status = true, data = POs },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        //public JsonResult CreateLocalPurchasingOrder(int _id, string vat,DateTime pdate, DateTime expdate, string shipping, string payment, string terms)
        public JsonResult CreateLocalPurchasingOrder(string _value)
        {
            try
            {
                var obj = new LPO() { };

                var _values = _value.Split(',');

                obj.LPOID = int.Parse(_values[0]);
                obj.VAT = 0m;
                obj.PurchaseOrderDate = DateTime.ParseExact(_values[2],"dd-MM-yyyy", null);
                obj.ExpectedDeliveryDate = DateTime.ParseExact(_values[3], "dd-MM-yyyy", null);
                obj.ShippingAddress = _values[4];
                obj.PaymentTerm = _values[5];
                obj.OtherTermsAndConditions = _values[6];
                obj.ProcurementTypeId = int.Parse(_values[7]);
                obj.LPOStatusID = 4; //4=LPO Generated

                var bln = new RequisitionHelper { }.SaveLocalPurchaseOrder(obj);

                //var msg = new Message()
                //{
                //    to = new Worker() { }.fetchUsingTag(@"Finance Officer"),
                //    subject = String.Format("PROCUREMENT REQUEST FROM {0}", session.userDepartment.Name),
                //    body = String.Format("A Procurement request with reference {0} has been made by {1} from {2},\r\nseeking immediate attention\r\nPlease log in to {3} to process request\r\nThank you.", o.RequisitionNo, session.bioName, session.userDepartment.Name, ConfigurationManager.AppSettings["AppUrl"].ToString()),
                //    cc = new Worker() { }.fetchUsingTag(@"Administrative Officer"),
                //    bcc = new Worker() { }.fetchUsingTag(@"IT")
                //};

                //new ApiServer() { }.ApiMailRequest(msg);

                return Json(new { status = bln, data = obj },JsonRequestBehavior.AllowGet);  
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetProcessFlowDetails(int _procurement_type_id)
        {
            //uses procurement type id to fetch threshold amount, and the list of personnel to authorize procurement
            try
            {
                var pfObj = new PFHelper() { }.GetProcessFlow(_procurement_type_id);
                ProcessFlowList pfl = null;
                List<GenericLookup> nameList = new List<GenericLookup>();

                if (pfObj != null)
                {
                    //get process flow list using processflowid
                    pfl = new PFHelper() { }.GetProcessFlowList(pfObj.ProcessFlowID);
                    string[] str = pfl.Flow.Split('|');

                    //iteration
                    int k = 1;
                    foreach(var s in str)
                    {
                        var postBody = new GenericLookup { 
                            Id = k,
                            value = s
                        };

                        nameList.Add(postBody);
                    }

                    return Json(new { status = true, data = nameList, limit = pfObj.Limit },JsonRequestBehavior.AllowGet);
                }
                else { return Json(new { status = false, data=@"no data" },JsonRequestBehavior.AllowGet); }
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost] 
        public ActionResult fUpload()
        {
            bool bln;
            string networkPath = ConfigurationManager.AppSettings["sharedF"].ToString();

            try
            {
                if (Session["PotentialReqID"] != null)
                {
                    HttpPostedFileBase postedFile = Request.Files[0];

                    var Cfg = new RequisitionHelper() { };

                    var obj = new RequisitionFile()
                    {
                        RequisitionID = (int)Session["PotentialReqID"],
                        RequisitionFileDescription = Request.Files[0].FileName
                    };

                    obj.RequisitionFileName = new byte[postedFile.ContentLength];
                    postedFile.InputStream.Read(obj.RequisitionFileName, 0, postedFile.ContentLength);

                    //write stream to file
                    try
                    {
                        //var fpath = Path.Combine(Server.MapPath("~/uploads"), postedFile.FileName);
                        var fpath = Path.Combine(networkPath, postedFile.FileName);
                        using (var writer = new BinaryWriter(System.IO.File.OpenWrite(fpath)))
                        {
                            writer.Write(obj.RequisitionFileName);
                        }

                        bln = Cfg.SaveRequisitionFileUpload(obj);
                        return Json(new { status = bln }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception x) {
                        return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { status = false, data = $"Please select a requisition to upload documents for" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = false, data = $"Please select a requisition to upload documents for" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult FileUpload(string data)
        {
            try
            {
                if (Session["PotentialReqID"] != null)
                {
                    int i = Request.Files.Count;
                    HttpPostedFileBase postedFile = Request.Files[0];
                    Stream input = postedFile.InputStream;
                    byte[] inputByte;

                    byte[] buffer = new byte[16 * 1024];
                    using (MemoryStream ms = new MemoryStream())
                    {
                        
                        int read;
                        while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            ms.Write(buffer, 0, read);
                        }

                        inputByte = ms.ToArray();
                    }


                    //create requisition file object 
                    var Cfg = new RequisitionHelper() { };

                    var obj = new RequisitionFile()
                    {
                        RequisitionID = (int)Session["PotentialReqID"],
                        RequisitionFileDescription = Request.Files[0].FileName,
                        //RequisitionFileName = inputByte
                        RequisitionFileName = inputByte
                    };

                    bool bln = Cfg.SaveRequisitionFileUpload(obj);
                    return Json(new { status = bln }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, data = $"Please select a requisition to upload documents for" },JsonRequestBehavior.AllowGet);
                }

            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult StorePotentialRequisitonUploadID(int rqID)
        {
            //method stores a requisition id that can have a potential upload in the session object
            try
            {
                var session = (UserSession)Session["userSession"];
                if (Session["PotentialReqID"] != null) 
                {
                    Session.Remove("PotentialReqID");
                    session.potentialRequisitionfileID = 0;
                }

                Session["PotentialReqID"] = rqID;
                session.potentialRequisitionfileID = (int) Session["PotentialReqID"];

                return Json(new { status = true, data = session},JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetUploadsOfRequisition(int rqID)
        {
            //method gets the list of uploaded documents for a requisition
            try
            {
                //var rootPath = Server.MapPath("~/uploads");
                var rootPath = ConfigurationManager.AppSettings["sharedF"].ToString();
                var Cfg = new RequisitionHelper() { };
                var uploaded_documents = Cfg.GetRequisitionDocuments(rqID,rootPath);

                return Json(new { status = true, data = uploaded_documents },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetUploadsOfRequisitionNumber(string rqNo)
        {
            //method gets the list of uploaded documents, given the requsition number
            try
            {
                var rootPath = ConfigurationManager.AppSettings["sharedF"].ToString();
                var Cfg = new RequisitionHelper() { };

                var objRequisition = Cfg.GetRequisition(rqNo);
                var uploaded_documents = Cfg.GetRequisitionDocuments(objRequisition.RequisitionID, rootPath);

                return Json(new { status = true, data = uploaded_documents },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult ReceiveProcurement(string ReqNo)
        {
            //method is responsible for receiving procurement items and updating the capex
            try
            {
                var cfg = new RequisitionHelper();
                bool bln = cfg.ReceiveProcurementItems(ReqNo);

                return Json(new { status = bln },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

    }
}