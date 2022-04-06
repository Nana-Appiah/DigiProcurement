using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigiProc;
using System.Diagnostics;

namespace DigiProc.Helpers
{
    public interface IPFHelper
    {
        bool CreateCommittee();
        bool CreatePosition();

        bool AddCommitteeMember();
        bool AddNotifier();

    }
    public class PFHelper: IPFHelper
    {
        #region Properties

        private ProcurementDbEntities config = new ProcurementDbEntities();

        public Committee oCommittee { get; set; }

        public CommitteeMember oCommitteeMember { get; set; }
        public Position oPosition { get; set; }
        public NotificationList oNotifier { get; set; }

        #endregion

        #region Implementations

        public bool CreateCommittee()
        {
            //create new record or update existing
            try
            {
                if (oCommittee.CommitteeID == 0)
                {
                    config.Committees.Add(oCommittee);
                }
                else
                {
                    var o = config.Committees.Where(c => c.CommitteeID == oCommittee.CommitteeID).FirstOrDefault();
                    o.CommitteeName = oCommittee.CommitteeName;
                    o.CommitteeDescription = oCommittee.CommitteeDescription;
                }

                config.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return false;
            }
        }

        public bool CreatePosition()
        {
            //create a record or update existing one
            try
            {
                if (oPosition.PositionID == 0)
                {
                    config.Positions.Add(oPosition);
                }
                else
                {
                    var o = config.Positions.Where(p => p.PositionID == oPosition.PositionID).FirstOrDefault();
                    o.Designation = oPosition.Designation;
                }
                
                config.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                throw ex;
            }
        }

        public bool AddCommitteeMember()
        {
            try
            {
                if (oCommitteeMember.CommitteeMemberID == 0)
                {
                    config.CommitteeMembers.Add(oCommitteeMember);
                }
                else
                {
                    var o = config.CommitteeMembers.Where(c => c.CommitteeMemberID == oCommitteeMember.CommitteeMemberID).FirstOrDefault();
                    o.CommitteeID = oCommitteeMember.CommitteeID;
                    o.LastName = oCommitteeMember.LastName;
                    o.FirstName = oCommitteeMember.FirstName;
                    o.OtherNames = oCommitteeMember.OtherNames;
                    o.PositionID = oCommitteeMember.PositionID;
                    o.EmailAddress = oCommitteeMember.EmailAddress;
                    o.active = oCommitteeMember.active;
                }

                config.SaveChanges();
                return true;
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                throw x;
            }
        }

        public bool AddNotifier()
        {
            //create new record or update existing
            try
            {
                if (oNotifier.NotificationID == 0)
                {
                    config.NotificationLists.Add(oNotifier);
                }
                else
                {
                    var o = config.NotificationLists.Where(n => n.NotificationID == oNotifier.NotificationID).FirstOrDefault();
                    o.FirstName = oNotifier.FirstName;
                    o.LastName = oNotifier.LastName;
                    o.EmailAddress = oNotifier.EmailAddress;
                    o.tag = oNotifier.tag;
                    o.isActive = oNotifier.isActive;
                }
                
                config.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                throw ex;
            }
        }

        #endregion

    }
}