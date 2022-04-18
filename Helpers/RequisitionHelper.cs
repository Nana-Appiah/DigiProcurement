using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using DigiProc;
using System.Diagnostics;


namespace DigiProc.Helpers
{
    public class RequisitionHelper
    {
        private ProcurementDbEntities config = new ProcurementDbEntities();

        #region Requisition
        public string GenerateRequisitionNumber(string dept)
        {
            var dateStr = string.Format("{0}-{1}-{2}",@"REQN",dept, getDate());
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

        public int SaveRequisition(Requisition item)
        {
            try
            {
                config.Requisitions.Add(item);
                config.SaveChanges();
                return item.RequisitionID;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return 0;
            }
        }

        public RequisitionLookup getRequisitionDetails(int _id)
        {
            //gets readonly data for requisitions
            RequisitionLookup obj = new RequisitionLookup();

            var helper = new Utility() { };

            try
            {
                var o = config.Requisitions.Where(r => r.RequisitionID == _id).FirstOrDefault();
                if (o != null)
                {
                    obj.Id = o.RequisitionID;
                    obj.RequisitionNo = o.RequisitionNo;
                    obj.Requestee = o.RequestedBy;
                    obj.nameOfDepartment = helper.getDepartment(o.DepartmentID).Name;
                    obj.priority = helper.GetPriority(o.PriorityID).PriorityDescription;
                }

                return obj;
            }
            catch(Exception e)
            {
                Debug.Print(e.Message);
                return obj;
            }
        }

        public List<RequisitionLookup> getRequisitionNumbers(int departmentId, int statusId)
        {
            List<RequisitionLookup> list = new List<RequisitionLookup>();
            try
            {
                //var dta = config.Requisitions.ToList();
                var dta = config.Requisitions.Where(rq => rq.DepartmentID == departmentId).Where(r => r.RequisitionStatusID == statusId).ToList();
                if (dta.Count() > 0)
                {
                    foreach(var d in dta)
                    {
                        var o = new RequisitionLookup() { 
                            Id = d.RequisitionID,
                            RequisitionNo = d.RequisitionNo
                        };

                        list.Add(o);
                    }
                }

                return list;
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return list;
            }
        }

        public bool ChangeRequisitionStatus(int _requisitionID, int _statusID)
        {
            //change the requisition status using requisition and status id 
            try
            {
                var obj = config.Requisitions.Where(r => r.RequisitionID == _requisitionID).FirstOrDefault();
                obj.RequisitionStatusID = _statusID;

                config.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return false;
            }
        }

        #endregion

        #region RequisitionItems
        public bool SaveRequisitionItems(RequisitionItem obj)
        {
            //saves requisition items
            try
            {
                config.RequisitionItems.Add(obj);
                config.SaveChanges();
                return true;
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return false;
            }
        }

        public List<RequisitionItemLookup> GetRequisitionItemLookups(int reqId)
        {
            //use requisitionId to fetch requisition items
            List<RequisitionItemLookup> rqitems = new List<RequisitionItemLookup>();
            try
            {
                var dta = config.RequisitionItems.Where(rq => rq.RequisitionID == reqId).ToList();
                if (dta.Count() > 0)
                {
                    foreach(var d in dta)
                    {
                        var o = new RequisitionItemLookup() { 
                            Id = d.RequisitionItemID,
                            RequisitionId = (int) d.RequisitionID,
                            item = new Utility { }.GetItem((int) d.ItemID),
                            Quantity = (int) d.Quantity,
                            narration = d.Narration
                        };

                        rqitems.Add(o);
                    }
                }

                return rqitems;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return rqitems;
            }
        }

        public bool ApproveRequisitionItem(int _id,int _statusId)
        {
            //method is responsible for the approval of a requisition item
            try
            {
                var obj = config.RequisitionItems.Where(rq => rq.RequisitionItemID == _id).FirstOrDefault();
                if (obj != null)
                {
                    obj.FinApprovalStatus = _statusId;
                    config.SaveChanges();

                    return true;
                }
                else { return false; }
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return false;
            }
        }

        #endregion

        #region Capex

        public bool ClearCapex(int _id)
        {
            //clears all current records of capex for the current financial year
            try
            {
                var dta = config.Capexes.Where(c => c.DId == _id).ToList();
                foreach(var d in dta)
                {
                    config.Capexes.Remove(d);
                    config.SaveChanges();
                }

                return true;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return false;
            }
        }

        public bool SaveCapex(Capex item)
        {
            try
            {
                if (item.CapexID == 0)
                {
                    config.Capexes.Add(item);
                    config.SaveChanges();
                    return true;
                }
                else { return false; }
            }
            catch (Exception ex)
            {
                Debug.Print(ex.Message);
                return false;
            }
        }

        public List<CapexLookup> GetDepartmentCapexRecords(int dId)
        {
            //gets capex records for selected department
            List<CapexLookup> records = new List<CapexLookup>();

            try
            {
                var data = config.Capexes.Where(c => c.DId == dId).ToList();
                if (data.Count() > 0)
                {
                    foreach(var d in data)
                    {
                        var o = new CapexLookup() { 
                            Id = d.CapexID,
                            itemName = new Utility() { }.GetItem((int) d.CapexItemID).ProductName,
                            deadline = d.EstimatedDeadline,
                            QtyRequested = (int) d.QuantityRequested,
                            QtySupplied = (int) d.QuantitySupplied,
                            QtyOutstanding = (int) d.QuantityOutstanding,
                            justification = d.Justification,
                            capexCategory = new Utility() { }.getItemCategory((int) d.CapexTypeID).nameOfCategory,
                            financialYear = new Utility() { }.getActiveFinancialYear().FinancialYr
                        };
                        records.Add(o);
                    }
                }

                return records;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return records;
            }
        }

        #endregion

    }

    public struct RequisitionLookup
    {
        public int Id { get; set; }
        public string RequisitionNo { get; set; }
        public string Requestee { get; set; }
        public string nameOfDepartment { get; set; }
        public string priority { get; set; }

    }

    public struct RequisitionItemLookup
    {
        public int Id { get; set; }
        public int RequisitionId { get; set; }
        public Product item { get; set; }
        public int Quantity { get; set; }
        public string narration { get; set; }
    }

    public struct CapexLookup
    {
        public int Id { get; set; }
        public string itemName { get; set; }
        public string capexCategory { get; set; }  //same as item category
        public string deadline { get; set; }
        public int QtyRequested { get; set; }
        public int QtySupplied { get; set; }
        public int QtyOutstanding { get; set; }
        public string justification { get; set; }
        public string financialYear { get; set; }
    }

}