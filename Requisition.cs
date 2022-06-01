//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DigiProc
{
    using System;
    using System.Collections.Generic;
    
    public partial class Requisition
    {
        public int RequisitionID { get; set; }
        public string RequisitionNo { get; set; }
        public string RequestedBy { get; set; }
        public Nullable<int> FinancialYrID { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public Nullable<int> DepartmentID { get; set; }
        public Nullable<int> RequisitionTypeID { get; set; }
        public string Location { get; set; }
        public Nullable<int> CurrencyID { get; set; }
        public Nullable<int> PriorityID { get; set; }
        public Nullable<decimal> RequisitionTotal { get; set; }
        public string RequisitionDescription { get; set; }
        public Nullable<int> RequisitionStatusID { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string AuthorizedBy { get; set; }
        public Nullable<System.DateTime> AuthorizedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public Nullable<int> isNotif { get; set; }
        public string reqSrc { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual Department Department { get; set; }
        public virtual FinancialYear FinancialYear { get; set; }
        public virtual PriorityType PriorityType { get; set; }
        public virtual RequisitionStatu RequisitionStatu { get; set; }
        public virtual RequisitionType RequisitionType { get; set; }
    }
}
