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
    
    public partial class Module1
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Module1()
        {
            this.UserModules = new HashSet<UserModule1>();
        }
    
        public int ModuleID { get; set; }
        public string SystemName { get; set; }
        public string PublicName { get; set; }
        public Nullable<System.DateTime> DateAssigned { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserModule1> UserModules { get; set; }
    }
}
