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
    
    public partial class PFNotificationList1
    {
        public int PFNotificationListID { get; set; }
        public int PFID { get; set; }
        public Nullable<int> NotificationGroupID { get; set; }
    
        public virtual NotificationGroup1 NotificationGroup { get; set; }
        public virtual ProcessFlow1 ProcessFlow { get; set; }
    }
}