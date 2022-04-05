using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Diagnostics;
using DigiProc.Helpers;
using System.Threading.Tasks;

namespace DigiProc.Controllers
{
    public class MasterController : Controller
    {
        [HttpPost]
        public JsonResult SaveAccountingPeriod(int _from, int _to, string _comment)
        {
            try
            {
                bool bln = new Utility() { }.saveFinancialYear(_from, _to, _comment);
                return Json(new { status = true, data = bln },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult SaveCurrency(string currency, string symbol)
        {
            try
            {
                bool bln = new Utility() { }.saveCurrency(currency, symbol);
                return Json(new { status = true, data = bln },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new {status = false, error = $"error: {x.Message}"}, JsonRequestBehavior.AllowGet);
            }
        }

        #region Vendor-Types

        [HttpPost]
        public JsonResult SaveVendorType(string vendorDescription)
        {
            try
            {
                var obj = new Utility()
                {
                    oVendorType = new VendorType { VendorDescription = vendorDescription }
                };

                var bln = obj.saveVendorType();
                return Json(new { status = bln, data = obj },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Item-Category

        public JsonResult SaveItemCategory(string name, string describ)
        {
            try
            {
                var obj = new Utility()
                {
                    itemCategory = new ItemCategory
                    {
                        CategoryName = name,
                        CategoryDescription = describ
                    }
                };

                bool bln = obj.SaveItemCategory();
                return Json(new { status = bln, data = obj.itemCategory },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}"},JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Item

        public JsonResult SaveItem(string cname, int? catID, string code,string measured,int? minStock, int? maxStock, string describ)
        {
            //saves item into the data store
            try
            {
                var itemObj = new Item() { 
                    ItemName = cname,
                    ItemCategoryID = (int?)catID,
                    ItemCode = code,
                    MinStockLevel = minStock,
                    MaxStockLevel = maxStock,
                    ItemDescription = describ
                };

                var obj = new Utility()
                {
                    item = itemObj
                };

                bool bln = obj.SaveItem(measured);

                return Json(new { status = bln, data = itemObj },JsonRequestBehavior.AllowGet);
            }
            catch (Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Vendor

        [HttpPost]
        public JsonResult SaveBasicVendorInformation(string vID, string vName, int? vTypeID, string location, string vTIN, 
                                                        string regNo, DateTime? incDate, int? bTypeID,string vcon,string votel, string vhtel,
                                                            string vemail, string vghpost, string vweb, string vlinkedin, string fb)
        {
            try
            {
                Vendor obj = new Vendor() { 
                    VendorNo = vID,
                    VendorName = vName,
                    VendorLocation = location,
                    VendorTypeID = vTypeID,
                    TIN = vTIN,
                    CompanyRegistrationNo = regNo,
                    IncorporationDate = incDate,
                    CompanyBusinessTypeID = bTypeID,
                    ContactPerson = vcon,
                    CompanyContact = votel,
                    CompanyHomeContact = vhtel,
                    CompanyEmailAddress = vemail,
                    CompanyGHPostAddress = vghpost,
                    CompanyWebsite = vweb,
                    CompanyLinkedIn = vlinkedin,
                    CompanyFb = fb

                };

                var objWrapper = new VendorHelper() { oVendor = obj };

                bool bln = objWrapper.SaveBasicInformation();
                return Json(new { status = bln, data = obj },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

    }
}