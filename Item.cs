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
    
    public partial class Item
    {
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public Nullable<int> MinStockLevel { get; set; }
        public Nullable<int> MaxStockLevel { get; set; }
        public string ItemDescription { get; set; }
        public Nullable<int> SIUnitID { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public Nullable<int> ItemCategoryID { get; set; }
    
        public virtual ItemCategory ItemCategory { get; set; }
        public virtual SIUnit SIUnit { get; set; }
    }
}
