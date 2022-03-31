using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigiProc;

namespace DigiProc.Helpers
{
    public class Utility
    {
        #region Properties

        private ProcurementDbEntities config = new ProcurementDbEntities();
        
        #endregion

        public Utility()
        {

        }

        public List<userModule> getUserModules(string nameOfuser)
        {
            /* method uses the argument to load the user modules to expose on the system */
            var exposed_modules = config.UserModules.Where(x => x.UserName == nameOfuser).ToList();
            List<userModule> list = new List<userModule>();

            foreach(var item in exposed_modules)
            {
                list.Add(new userModule { Id = item.UserModuleID, SystemName = item.Module.SystemName });
            }

            return list;
        }
    }

    public struct userModule
    {
        public int Id { get; set; }
        public string SystemName { get; set; }
    }
}