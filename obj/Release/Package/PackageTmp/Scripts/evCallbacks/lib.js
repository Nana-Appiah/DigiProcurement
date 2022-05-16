var lib = lib || {};

lib.stat = "";

lib.status = function (stat) {
    lib.stat = stat;
    return lib.stat;
}

lib.getBusinessTypeStore = function (_urlString) {
    var _store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'BusinessTypeID', type: 'int' },
            { name: 'BusinessDescription', type: 'string' }
        ])
    })

    return _store;
}

lib.categoryStore = function(_urlString) {
    var _store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'nameOfCategory', type:'string'}
        ])
    })

    return _store;
}

lib.PriorityTypeStore = function (_urlString) {
    var priority_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'nameOfPriority', type: 'string' }
        ])
    });

    return priority_store;
}

lib.RequisitionTypeStore = function (_urlString) {
    var requisition_type_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'RequisitionTypeID', type: 'int' },
            { name: 'RequisitionType1', type: 'string' }
        ])
    });

    return requisition_type_store;
}

lib.LoadVendorTypeStore = function (URL) {
    var vendorStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: URL,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'Description', type: 'string' }
        ])
    })

    return vendorStore;
}

lib.getItemMetrics = function (_urlString) {
    var metrics_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'SIUnitID', type: 'int' },
            { name: 'Measurement', type:'string'}
        ])
    })

    return metrics_store;
}

lib.getFinancialYear = function (status) {
    if (status == "current") {
        return ['2022'];
    }
    else {
        return ['2023'];
    }
}

lib.getAccountingPeriod = function (URL, control) {
    var parr = [];
    $.getJSON(URL, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                parr[i] = [d.FinancialYrID, d.FinancialYr, d.Description, d.IsActive]
            })

            control.getStore().loadData(parr);
        }
        
    });
}

lib.currencyGrid = function (URL,ktrl) {
    $.getJSON(URL, {}, function (rs) {
        var ar = [];
        if (rs.status.toString() == "true") {

            $.each(rs.data, function (i, d) {
                ar[i] = [d.Id, d.nameOfcurrency, d.denominationSymbol];
            });

            ktrl.getStore().loadData(ar);
        }
    }, "json");
}

lib.currencyStore = function (URLString) {
    var cur_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: URLString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'nameOfcurrency', type: 'string' }
        ])
    })

    return cur_store;
}

lib.LoadVendorTypeGrid = function (URL, control) {
    $.getJSON(URL, {}, function (r) {
        var vendortypes = [];
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                vendortypes[i] = [d.Id, d.Description];
            });

            control.getStore().loadData(vendortypes);
        }
    },"json");
}

lib.LoadItemCategoryGrid = function (URLString, control) {
    $.getJSON(URLString, {}, function (r) {
        var item_category = [];
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                item_category[i] = [d.Id, d.nameOfCategory, d.descriptionOfCategory];
            });

            control.getStore().loadData(item_category);
        }
    });
}

lib.saveAccPeriod = function (_URL, frm, to, describ) {
    $.post(_URL, { _from: frm, _to: to, _comment: describ }, function (rs) {
        lib.stat = rs.status.toString();
    }, "json");

    return lib.stat;
}

lib.getCategoryItemCode = function (_URLString, cat, catID) {
    var itemCodeString = "";
    $.getJSON(_URLString, { category: cat, categoryID: catID }, function (fxn) {
        if (fxn.status.toString() == "true") {
            itemCodeString = fxn.data.toString();
            
            return itemCodeString;
        }
    }); 
}

lib.getItemGrid = function (_URL, controlRef) {
    var dta = [];
    $.getJSON(_URL, { }, function (res) {
        if (res.status.toString() == "true") {
            $.each(res.data, function (i, d) {
                dta[i] = [d.Id, d.ProductName, d.ProductCode, d.SIUnit.Metric];
            });

            controlRef.getStore().loadData(dta);
        }
    });
}

lib.returnItemStore = function (_urlString) {
    var item_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'ProductName', type: 'string' }
        ])
    });

    return item_store;
}

lib.getItemGridGivenRequisitionID = function (_URL,_ID,_stat, controlRef) {
    var dta = [];
    $.getJSON(_URL, { requisitionID: _ID, statusID: _stat }, function (res) {
        if (res.status.toString() == "true") {
            $.each(res.data, function (i, d) {
                //alert(d.ProductCode); alert(d.ProductName);
                dta[i] = [d.Id, d.RequisitionId, d.ProductCode, d.ProductName, d.Quantity, d.narration];
            });
            
            controlRef.getStore().removeAll();
            controlRef.getStore().loadData(dta);
        }
    });
}

lib.returnItemGridGivenLPONumber = function (_urlString, _ID, _widget) {
    var dta = [];
    $.getJSON(_urlString, { LocalPONumber: _ID }, function (res) {
        if (res.status.toString() == "true") {
            $.each(res.data, function (i, d) {
                dta[i] = [d.Id, d.RequisitionId, d.item.ProductCode, d.item.ProductName, d.Quantity, d.narration, d.amt];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(dta);
        }
    });
}

//branch Requistion functions

lib.returnEditorControl = function () {
    return new Ext.ux.grid.RowEditor();
}

lib.getPrelimData = function (URL, bRNo, requestee, bComp, bDept) {
    var postBody = {};

    $.getJSON(URL, {}, function (r) {
        if (r.status.toString() == "true") {
            postBody = {
                reqNo: r.reqNo.toString(),
                requester: r.requester.toString(),
                companyName: r.companyName.toString(),
                department: r.department.toString()
            };
            
            bRNo.setValue(postBody.reqNo);
            requestee.setValue(postBody.requester);
            bComp.setValue(postBody.companyName);
            bDept.setValue(postBody.department);
        }
    });
}

//committee functions
lib.returnPositionGrid = function (urlString, _widget) {
    var pos = [];
    $.getJSON(urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                pos[i] = [d.PositionID, d.Designation];
            });

            //load widget
            _widget.getStore().loadData(pos);
        }
    });
}

lib.returnPositionStore = function (urlString) {
    var position_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'PositionID', type: 'int' },
            { name: 'Designation', type: 'string' }
        ])
    });

    return position_store;
}

lib.returnCommitteeGrid = function (url, _widget) {
    var committee = [];
    $.getJSON(url, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                committee[i] = [d.CommitteeID, d.CommitteeName, d.CommitteeDescription];
            });

            _widget.getStore().loadData(committee);
        }
    });
}

lib.returnCommitteeMembershipGrid = function (_urlString, _widget, _flag) {
    var members = [];
    $.getJSON(_urlString, {cId:_flag}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                members[i] = [d.Id, d.nameOfCommittee, d.firstname, d.surname, d.othernames, d.nameOfposition, d.email, d.actStatus];
            });

            _widget.getStore().loadData(members);
        }
    });
}

lib.getPositionStore = function (_urlString) {
    var positionStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'PositionID', type: 'int' },
            { name: 'Designation', type: 'string' }
        ])
    });

    return positionStore;
}

lib.getCommitteeStore = function (_urlString) {
    var committeeStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'CommitteeID', type: 'int' },
            { name: 'CommitteeName', type: 'string' }
        ])
    });

    return committeeStore;
}

lib.returnProcurementTypeGrid = function (_urlString, _widget) {
    var proctypes = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                proctypes[i] = [d.ProcurementTypeID, d.ProcurementDescription];
            });

            _widget.getStore().loadData(proctypes);
        }
    });
}

lib.returnProcurementTypeStore = function (_urlString) {
    var proctypeStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'ProcurementTypeID', type: 'int' },
            { name: 'ProcurementDescription', type: 'string' }
        ])
    })

    return proctypeStore;
}

lib.returnNotificationGroupGrid = function (_urlString, _widget) {
    var notif = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                notif[i] = [d.NotificationGroupID, d.NotificationGroupName, d.NotificationMailString, d.NotificationDescription];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(notif);
        }
    });
}

lib.returnNotificationStore = function (_urlString) {
    var notifStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'NotificationGroupID', type: 'int' },
            { name: 'NotificationGroupName', type: 'string' }
            //,{ name: 'NotificationMailString', type: 'string' },
            //{ name: 'NotificationDescription', type: 'string' }
        ])
    });

    return notifStore;
}

lib.returnProcessFlowGrid = function (_urlString, _widget) {
    var pfgrid = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                pfgrid[i] = [d.Id, d.nameOfProcurement, d.limit, d.order];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(pfgrid);
        }
    });
}

lib.returnProcessFlowStore = function (_urlString) {
    var pfStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'nameOfProcurement', type: 'string' }
        ])
    });

    return pfStore;
}

lib.returnPFNotificationGrid = function (_urlString, _widget) {
    var pfnotif = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                pfnotif[i] = [d.Id, d.IdOfProcessFlow, d.nameOfGroup];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(pfnotif);
        }
    });
}

lib.returnPflowList = function (_urlString, processflowID, _widget) {
    $.getJSON(_urlString, { _processflowID: processflowID }, function (r) {
        if (r.status.toString() == "true") {
            _widget.val(r.data.Flow.toString());
            _widget.attr('readonly', true);
        }
    });
}

//vendor grid
lib.returnVendorGrid = function (_urlString, _widget) {
    var vendor_list = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                vendor_list[i] = [d.VendorID, d.VendorNo, d.VendorName, d.VendorLocation, d.ContactPerson, d.NameOfOwner, d.CompanyContact, d.CompanyHomeContact];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(vendor_list);
        }
    });
}

lib.returnVendorStore = function (_urlString) {
    var vendor_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'VendorID', type: 'int' },
            { name: 'VendorName', type:'string'}
        ])
    });

    return vendor_store;
}

//Financial Controller
lib.returnDepartmentStore = function (_urlString) {
    var department_store = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'DepartmentID', type: 'int' },
            { name: 'Name', type: 'string' }
        ])
    });

    return department_store;
}

lib.returnRequisitionNumbersGrid = function (_urlString,_status,ID, _widget) {
    var req_nos = [];
    $.getJSON(_urlString, { departmentID: ID, statusID: _status }, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                req_nos[i] = [d.Id, d.RequisitionNo, d.Requestee, d.priority];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(req_nos);
        }
    });
}

lib.returnRequistionDetails = function (_urlString, _ID, rno, req, d, p) {
    $.getJSON(_urlString, { requisitionID: _ID }, function (r) {
        if (r.status.toString() == "true") {
            rno.val(r.data.RequisitionNo);
            req.val(r.data.Requestee);
            d.val(r.data.nameOfDepartment);
            p.val(r.data.priority);
        }
    });
}

lib.returnRequistionDetails2 = function (_urlString, _ID, rno, req, d, p, _STAT, _widget) {
    var dta = [];
    $.getJSON(_urlString, { requisitionID: _ID, statusID: _STAT }, function (r) {
        if (r.status.toString() == "true")
        {
            rno.val(r.data.RequisitionNo);
            req.val(r.data.Requestee);
            d.val(r.data.nameOfDepartment);
            p.val(r.data.priority);

            $.each(r.data.rLookups, function (i, d) {
                //alert(d.ProductCode); alert(d.ProductName); alert(d.Quantity); alert(d.narration);
                dta[i] = [d.Id, d.RequisitionId, d.ProductCode, d.ProductName, d.Quantity, d.narration];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(dta);
        }
    });
}

lib.storeRequisitionInSession = function (_urlString, rId) {
    $.post(_urlString, { rqID: rId }).done(function (r) {
        return r.status.toString();
    });
}

lib.returnRequisitionDocuments = function (_urlString, rId, _widget) {
    var docs = [];
    $.getJSON(_urlString, { rqID: rId }, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                //alert(d.fileDescription); alert(d.filepath);
                docs[i] = [d.Id, d.requisitionId, d.fileDescription, d.file, d.filepath];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(docs);
        }
    });
}

lib.returnRequisitionDocsForREQNos = function (_urlString, rNo, _widget) {
    var docs = [];
    $.getJSON(_urlString, { rqNo: rNo }, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                //alert(d.fileDescription); alert(d.filepath);
                docs[i] = [d.Id, d.requisitionId, d.fileDescription, d.file, d.filepath];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(docs);
        }
    });
}

lib.returnMonthStore = function () {
    //returns an array of the months of the year
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months;
}

lib.getCapexItemGrid = function (_urlString,_ID, _widget) {
    var capex_data = [];
    $.getJSON(_urlString, { departmentID: _ID }, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                capex_data[i] = [d.Id, d.itemName, d.capexCategory, d.QtyRequested, d.QtySupplied, d.QtyOutstanding, d.justification, d.financialYear, d.nameOfDepartment];
            });
        }

        _widget.getStore().removeAll();
        _widget.getStore().loadData(capex_data);
    });
}

//Local Purchasing Orders
lib.returnLocalPurchasingOrderGrid = function (_urlString, _widget) {
    var purchase_orders = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                purchase_orders[i] = [d.Id, d.requisitionNumber, d.nameOfVendor, d.LPOTotalAmount, d.LPONumber, d.statusOfLPO];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(purchase_orders);
        }
    });
}

lib.returnLocalPurchasingOrderApprovalGrid = function (_urlString, _widget) {
    var purchase_orders = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                purchase_orders[i] = [d.Id, d.requisitionNumber, d.nameOfVendor, d.LPOTotalAmount, d.LPONumber, d.statusOfLPO, d.PurchaseDate, d.ExpectedDate, d.ShippingAddress, d.PaymentTerm];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(purchase_orders);
        }
    });
}



lib.returnDistinctLPO = function (_urlString, _widget) {
    var purchase_orders = [];
    $.getJSON(_urlString, {}, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                purchase_orders[i] = [d.requisitionNumber];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(purchase_orders);
        }
    });
}

lib.returnProcessFlowData = function (_urlString, _param, _control, _widget) {
    var nameList = [];

    $.getJSON(_urlString, { _procurement_type_id: _param }, function (r) {
        if (r.status.toString() == "true")
        {
            $.each(r.data, function (i, d) {
                nameList[i] = [d.Id, d.value.toString()];
            });

            _control.setValue(r.limit.toString());
            _widget.getStore().removeAll();
            _widget.getStore().loadData(nameList);
        }
    });
}

lib.mssqlToJsDate = function (sqlDate) {
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    var sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sqlDateArr2 = sqlDateArr1[2].split(" ");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];
    var sqlDateArr4 = sqlDateArr3[2].split(".");
    //format of sqlDateArr4[] = ['ss','ms']
    var sSecond = sqlDateArr4[0];
    var sMillisecond = sqlDateArr4[1];

    return new Date(sYear, sMonth, sDay , sHour, sMinute, sSecond, sMillisecond);
}

lib.returnApprovalHistoryGrid = function (urlString,_ID, _widget) {
    var approvals = [];

    $.getJSON(urlString, { LPO_ID: _ID }, function (r) {
        if (r.status.toString() == "true") {
            $.each(r.data, function (i, d) {
                approvals[i] = [d.Id, d.LPO, d.PersonTag, d.ApprovalDate, d.ApprovalStatus, d.ApprovalComments];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(approvals);
        }
    });
}