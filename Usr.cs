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
    
    public partial class Usr
    {
        public int Id { get; set; }
        public string surname { get; set; }
        public string firstname { get; set; }
        public string othernames { get; set; }
        public string usrname { get; set; }
        public string usrpassword { get; set; }
        public Nullable<int> deptId { get; set; }
        public Nullable<int> isActive { get; set; }
        public Nullable<int> isLogged { get; set; }
        public Nullable<int> isAD { get; set; }
        public Nullable<int> isAdmin { get; set; }
        public string uProfile { get; set; }
        public string tag { get; set; }
    
        public virtual Department Department { get; set; }
    }
}
