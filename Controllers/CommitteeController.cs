using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DigiProc.Helpers;
using DigiProc;

namespace DigiProc.Controllers
{
    public class CommitteeController : Controller
    {
        #region Positions 

        [HttpPost]
        public JsonResult AddPosition(int _id, string cposition)
        {
            try
            {
                var obj = new Position() { 
                    PositionID = _id,
                    Designation = cposition
                };

                var helper = new CommitteeHelper() {  };
                var bln = helper.SavePosition(obj);

                return Json(new { status=bln, data = obj  },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetPositions()
        {
            try
            {
                var list = new CommitteeHelper() { }.GetPositions();
                return Json(new { status = true, data = list },JsonRequestBehavior.AllowGet);
            }
            catch(Exception x)
            {
                return Json(new { status = false, error = $"error: {x.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Committee

        public JsonResult AddCommittee(int _id, string cName, string cDescrib)
        {
            try
            {
                var obj = new Committee() { 
                    CommitteeID = _id,
                    CommitteeName = cName,
                    CommitteeDescription = cDescrib
                };

                var bln = new CommitteeHelper() { }.SaveCommittee(obj);
                return Json(new { status = bln, data = obj },JsonRequestBehavior.AllowGet);
            }
            catch(Exception e)
            {
                return Json(new { status = false, error = $"error: {e.Message}" },JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCommitteeList()
        {
            try
            {
                var committee_list = new CommitteeHelper() { }.GetCommittees();
                return Json(new { status = true, data = committee_list },JsonRequestBehavior.AllowGet);
            }
            catch(Exception e)
            {
                return Json(new { status = false, error = $"error: {e.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Committee-Membership

        [HttpPost]
        public JsonResult AddCommitteeMember(int id, string fname, string lname, string oname, string email, int pId, int cId, string activeStatus)
        {
            try
            {
                var obj = new CommitteeMember() { 
                    CommitteeMemberID = id,
                    FirstName = fname,
                    LastName = lname,
                    OtherNames = oname,
                    EmailAddress = email,
                    PositionID = pId,
                    CommitteeID = cId,
                    active = activeStatus == @"Active"? 1: 0
                };

                bool bln = new CommitteeHelper() { }.SaveCommitteeMembership(obj);
                return Json(new { status = bln, data = obj },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { status = false, error = $"error: {ex.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetCommitteeMembers(int cId)
        {
            try
            {
                var _data = new CommitteeHelper() { }.GetCommitteeMembers(cId);
                return Json(new { status = true, data = _data },JsonRequestBehavior.AllowGet);
            }
            catch(Exception e)
            {
                return Json(new { status = false, error = $"error: {e.Message}" },JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

    }
}