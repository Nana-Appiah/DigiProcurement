//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DigiProc.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class LPO
    {
        public int LPOID { get; set; }
        public string RequisitionNo { get; set; }
        public Nullable<decimal> VAT { get; set; }
        public Nullable<System.DateTime> PurchaseOrderDate { get; set; }
        public Nullable<System.DateTime> ExpectedDeliveryDate { get; set; }
        public string ShippingAddress { get; set; }
        public string PaymentTerm { get; set; }
        public string OtherTermsAndConditions { get; set; }
    }
}
