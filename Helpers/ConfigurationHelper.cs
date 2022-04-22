using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Web;
using DigiProc;

using System.Diagnostics;

namespace DigiProc.Helpers
{
    public interface IConfigurationHelper
    {
        bool CreateUserAccount();
        bool AmendUserProfile();
    }
    public class ConfigurationHelper
        :IConfigurationHelper
    {

        #region Private properties

        private ProcurementDbEntities config = new ProcurementDbEntities();

        #endregion

        public bool CreateUserAccount()
        {
            return true;
        }
        public bool AmendUserProfile()
        {
            return true;
        }

        #region Getters

        public List<ProfileManager> GetProfiles()
        {
            //gets the list of profiles in the data store using the status (1=in use, 0=inactive)

            List<ProfileManager> profileManagers = new List<ProfileManager>();

            try
            {
                var dta = config.Profiles.ToList();
                if (dta.Count() > 0)
                {
                    foreach(var d in dta)
                    {
                        var obj = new ProfileManager() { 
                            Id = d.Id,
                            nameOfProfile = d.profileName,
                            contentOfProfile = d.profileContent
                        };

                        if (d.inUse == 1) { obj.profileInUse = @"Yes"; } else { obj.profileInUse = @"No"; }

                        profileManagers.Add(obj);
                    }
                }

                return profileManagers;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return profileManagers;
            }
        }

        public List<UserManager> GetUsers()
        {
            //gets list of managers in the data store
            List<UserManager> userManagers = new List<UserManager>();

            try
            {
                var _data = config.Usrs.ToList();
                if (_data.Count() > 0)
                {
                    foreach(var d in _data)
                    {
                        var obj = new UserManager() { };
                        userManagers.Add(obj);
                    }
                }

                return userManagers;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return userManagers;
            }
        }

        #endregion

    }

    public struct ProfileManager
    {
        public int Id { get; set; }
        public string nameOfProfile { get; set; }
        public string contentOfProfile { get; set; }
        public string profileInUse { get; set; } //Yes|No
    }

    public struct UserManager
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string nameOfDepartment { get; set; }
        public string isActive { get; set; }
        public string isLogged { get; set; }
        public ProfileManager PrManager { get; set; }
    }

}