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
    
    public partial class NotificationGroup1
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NotificationGroup1()
        {
            this.PFNotificationLists = new HashSet<PFNotificationList1>();
        }
    
        public int NotificationGroupID { get; set; }
        public string NotificationGroupName { get; set; }
        public string NotificationMailString { get; set; }
        public string NotificationDescription { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PFNotificationList1> PFNotificationLists { get; set; }
    }
}
