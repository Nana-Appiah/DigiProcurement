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