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
                var finObj = new Utility() { }.getActiveFinancialYear();
                int success = 0; int failed = 0;
                if (_data.Length > 0)
                {
                    
                    var helper = new Utility();

                    foreach(var dt in _data)
                    {
                        var s = dt.Split(',');
                        var itemObj = helper.GetItem(int.Parse(s[0]));
                        var objCapex = new Capex() 
                        { 
                            CapexTypeID = helper.getItemCategory(itemObj.Id).Id,
                            QuantityRequested = int.Parse(s[3]),
                            Justification = s[4],
                            EstimatedDeadline = s[5],
                            FinancialYrId = finObj.FinancialYrID
                        };

                        if (new RequisitionHelper { }.SaveCapex(objCapex)) { success += 1; } else { failed += 1; }
                    }
                }

                return Json(new { status = true, data = $"CAPEX process completed;{success.ToString()}" },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }
    }
}