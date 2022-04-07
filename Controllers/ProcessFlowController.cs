using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DigiProc;
using DigiProc.Helpers;

namespace DigiProc.Controllers
{
    public class ProcessFlowController : Controller
    {

        #region Committee

        public JsonResult SaveCommittee(int id, string cname, string cDescription)
        {
            try
            {
                var obj = new Committee() 
                {
                    CommitteeName = cname,
                    CommitteeDescription = cDescription
                };

                bool bln = new PFHelper() { oCommittee = obj }.CreateCommittee();
                return Json(new { status = bln, data = obj },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Position

        public JsonResult SavePosition(int Id, string designation)
        {
            try
            {
                var wrapper = new PFHelper() { 
                    oPosition = new Position()
                    {
                        Designation = designation
                    }
                };

                bool bln = wrapper.CreatePosition();
                return Json(new { status = bln, data = wrapper.oPosition },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}"},JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region CommitteeMembership

        public JsonResult SaveCommitteeMembership(int memberID, int cID, string lastname, string firstname, string othernames, int positionID, string email, int isActive )
        {
            try
            {
                var obj = new CommitteeMember() { 
                    CommitteeMemberID = memberID,
                    CommitteeID = cID,
                    LastName = lastname,
                    FirstName = firstname,
                    OtherNames = othernames,
                    PositionID = positionID,
                    EmailAddress = email,
                    active = isActive
                };

                var wrapper = new PFHelper() { oCommitteeMember = obj };
                return Json(new { status = wrapper.AddCommitteeMember(), data = wrapper.oCommitteeMember },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region NotificationList

        public JsonResult AddNotificationList(int notifID, string firstname, string lastname, string email, string ntag, int active)
        {
            try
            {
                var obj = new NotificationList() { 
                    NotificationID = notifID,
                    FirstName = firstname,
                    LastName = lastname,
                    EmailAddress = email,
                    tag = ntag,
                    isActive = active
                };

                var helper = new PFHelper() { oNotifier = obj };
                return Json(new { status = helper.AddNotifier(), data = helper.oNotifier },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

    }
}