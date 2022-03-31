using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigiProc.Models;

namespace DigiProc.Helpers
{
    public class Utility
    {
        #region Properties

        
        #endregion

        public List<UserModule> getUserModules(string nameOfuser)
        {
            /* method uses the argument to load the user modules to expose on the system */
            var exposed_modules = new List<UserModule>();

            //adding list arbitrarily
            var obj1 = new UserModule() { 
                UserModuleID = 1,
                SystemName = @"ext",
                PublicName = @"Exit",
                DateAssigned = DateTime.Now
            };

            var obj2 = new UserModule() { UserModuleID = 2, SystemName = @"cred" };
            var obj3 = new UserModule() { UserModuleID = 3, SystemName = @"sysAdmin" };
            var obj4 = new UserModule() { UserModuleID = 4, SystemName = @"management" };
            var obj5 = new UserModule() { UserModuleID = 5, SystemName = @"branchReq" };
            var obj6 = new UserModule() { UserModuleID = 6, SystemName = @"master" };
            var obj7 = new UserModule() { UserModuleID = 7, SystemName = @"committee" };

            exposed_modules.Add(obj1);
            exposed_modules.Add(obj2);
            exposed_modules.Add(obj3);
            exposed_modules.Add(obj4);
            exposed_modules.Add(obj5);
            exposed_modules.Add(obj6);
            exposed_modules.Add(obj7);

            return exposed_modules;
        }
    }
}