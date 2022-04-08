using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using DigiProc;
using System.Diagnostics;
using System.Collections;

namespace DigiProc.Helpers
{
    public interface ICommitteeHelper
    {
        bool SavePosition(Position oPosition);
    }

    public class CommitteeHelper: ICommitteeHelper
    {
        private ProcurementDbEntities config = new ProcurementDbEntities();

        public Position oPosition { get; set; }

        #region Positions

        public bool SavePosition(Position oPosition)
        {
            try
            {
                if (oPosition.PositionID == 0)
                {
                    config.Positions.Add(oPosition);
                    config.SaveChanges();
                    return true;
                }
                else
                {
                    var o = config.Positions.Where(x => x.PositionID == oPosition.PositionID).FirstOrDefault();
                    o.Designation = oPosition.Designation;
                    config.SaveChanges();
                    return true;
                }
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return false;
            }
        }

        public List<Position> GetPositions()
        {
            List<Position> position_list = new List<Position>();
            try
            {
                var dta = config.Positions.ToList();
                if (dta.Count() > 0)
                {
                    foreach(var d in dta)
                    {
                        var p = new Position()
                        {
                            PositionID = d.PositionID,
                            Designation = d.Designation
                        };

                        position_list.Add(p);
                    }
                }

                return position_list.ToList();
            }
            catch(Exception ex)
            {
                return position_list;
            }
        }

        #endregion

        #region Committee

        public bool SaveCommittee(Committee o)
        {
            try
            {
                if (o.CommitteeID == 0)
                {
                    config.Committees.Add(o);
                    config.SaveChanges();
                    return true;
                }
                else
                {
                    var c = config.Committees.Where(cc => cc.CommitteeID == o.CommitteeID).FirstOrDefault();
                    c.CommitteeName = o.CommitteeName;
                    c.CommitteeDescription = o.CommitteeDescription;

                    config.SaveChanges();
                    return true;
                }
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return false;
            }
        }

        public List<Committee> GetCommittees()
        {
            //get committee list
            List<Committee> committee_list = new List<Committee>();

            try
            {
                var cList = config.Committees.ToList();
                if (cList.Count() > 0)
                {
                    foreach(var c in cList)
                    {
                        var o = new Committee()
                        {
                            CommitteeID = c.CommitteeID,
                            CommitteeName = c.CommitteeName,
                            CommitteeDescription = c.CommitteeDescription
                        };

                        committee_list.Add(o);
                    }
                }

                return committee_list.ToList();
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return committee_list;
            }
        }

        #endregion

        #region Committee-Membership

        public bool SaveCommitteeMembership(CommitteeMember cm)
        {
            try
            {
                if(cm.CommitteeMemberID == 0)
                {
                    config.CommitteeMembers.Add(cm);
                    config.SaveChanges();
                    return true;
                }
                else
                {
                    var o = config.CommitteeMembers.Where(x => x.CommitteeMemberID == cm.CommitteeMemberID).FirstOrDefault();
                    if (o != null)
                    {
                        o.CommitteeID = cm.CommitteeID;
                        o.LastName = cm.LastName;
                        o.FirstName = cm.FirstName;
                        o.OtherNames = cm.OtherNames;
                        o.PositionID = cm.PositionID;
                        o.EmailAddress = cm.EmailAddress;
                        o.active = cm.active;

                        config.SaveChanges();
                        return true;
                    }
                    else { return false; }
                }
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return false;
            }
        }

        public List<CommitteeMember> GetCommitteeMembers(int committeeId)
        {
            List<CommitteeMember> member_list = new List<CommitteeMember>();
            List<CommitteeMember> list = new List<CommitteeMember>();
            try
            {
                if (committeeId == 0)
                {
                    list = config.CommitteeMembers.ToList();
                }
                else
                {
                    list = config.CommitteeMembers.Where(c => c.CommitteeID == committeeId).ToList();
                }
                
                if (list.Count() > 0)
                {
                    foreach(var item in list)
                    {
                        var o = new CommitteeMember() 
                        { 
                            CommitteeMemberID = item.CommitteeMemberID,
                            CommitteeID = item.CommitteeID,
                            FirstName = item.FirstName,
                            LastName = item.LastName,
                            OtherNames = item.OtherNames,
                            PositionID = item.PositionID,
                            EmailAddress = item.EmailAddress,
                            active = item.active
                        };

                        member_list.Add(o);
                    }
                }

                return member_list;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return member_list;
            }
        }

        #endregion

    }
}