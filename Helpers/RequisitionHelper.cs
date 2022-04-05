using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using DigiProc;

namespace DigiProc.Helpers
{
    public class RequisitionHelper
    {
        private ProcurementDbEntities config = new ProcurementDbEntities();

        public string GenerateRequisitionNumber()
        {
            var dateStr = string.Format("{0}-{1}",@"REQN", getDate());
            int _id = GetRequisitionCounter(dateStr);

            string _idString = new VendorHelper() { }.formatVendorID(_id.ToString());
            return string.Format("{0}-{1}", dateStr, _idString);
        }

        private string getDate()
        {
            var s = DateTime.Now.ToString("dd-MM-yyyy");
            var d = s.Substring(0, 2);
            var m = s.Substring(3, 2);
            var y = s.Substring(6, 4);

            return String.Format("{0}{1}{2}", y, m, d);
        }

        private int GetRequisitionCounter(string param)
        {
            //gets the counter for the requisition
            try
            {
                int _id = config.Requisitions.Where(x => x.RequisitionNo.Contains(param)).ToList().Count();
                return (_id + 1);
            }
            catch(Exception x)
            {
                return 1;
            }
        }

    }
}