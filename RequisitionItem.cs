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
    
    public partial class RequisitionItem
    {
        public int RequisitionItemID { get; set; }
        public Nullable<int> RequisitionID { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> Quantity { get; set; }
        public string Narration { get; set; }
        public Nullable<int> FinApprovalStatus { get; set; }
        public Nullable<decimal> Amt { get; set; }
        public Nullable<int> LPOID { get; set; }
    
        public virtual LPO LPO { get; set; }
    }
}
