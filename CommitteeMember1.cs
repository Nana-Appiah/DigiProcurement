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
    
    public partial class CommitteeMember1
    {
        public int CommitteeMemberID { get; set; }
        public Nullable<int> CommitteeID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string OtherNames { get; set; }
        public Nullable<int> PositionID { get; set; }
        public string EmailAddress { get; set; }
        public Nullable<int> active { get; set; }
    
        public virtual Committee1 Committee { get; set; }
        public virtual Position1 Position { get; set; }
    }
}
