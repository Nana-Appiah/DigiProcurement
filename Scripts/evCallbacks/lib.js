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
                ar[i] = [d.CurrencyID, d.CurrencyName, d.CurrencySymbol];
            });

            ktrl.getStore().loadData(ar);
        }
    }, "json");
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

