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
    
    public partial class ProcurementType1
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProcurementType1()
        {
            this.ProcessFlows = new HashSet<ProcessFlow1>();
        }
    
        public int ProcurementTypeID { get; set; }
        public string ProcurementDescription { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProcessFlow1> ProcessFlows { get; set; }
    }
}
