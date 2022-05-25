using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Diagnostics;

using DigiProc;
namespace DigiProc.Notif
{
    public class Message
    {
        public string to { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
        public string cc { get; set; }
        public string bcc { get; set; }
        public Attachment[] attachment { get; set; }
    }

    public class Attachment
    {
        public string fileName { get; set; }
        public string fileData { get; set; }
    }

    public class Worker
    {
        ProcurementDbEntities config = new ProcurementDbEntities();
        public string fetchUsingTag(string tagLine)
        {
            //fetch user name using tag
            try
            {
                var dat = config.Usrs.Where(u => u.tag.Contains(tagLine)).FirstOrDefault();
                if (dat.usrname.Contains(@"panafricansl.com")) 
                { 
                    return dat.usrname; 
                } 
                else { return String.Format("{0}{1}", dat.usrname, "@panafricansl.com"); }
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return string.Empty;
            }
        }
    }

}