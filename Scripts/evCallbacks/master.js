Ext.onReady(function () {

    var Idx = 0;
    var editStatus = "";
    var vendorTypeEditStatus = false;
    var currencyEditStatus = false;
    var ItemCategoryEditStatus = false;
    var ItemMasterEditStatus = false;
    var pfx = '..';

    var currencyGrid = function (ktrl) {
        $.getJSON(pfx + 'Utility/GetCurrencies', {}, function (rs) {
            var ar = [];
            if (rs.status.toString() == "true") {

                $.each(rs.data, function (i, d) {
                    ar[i] = [d.CurrencyID, d.CurrencyName, d.CurrencySymbol];
                });

                ktrl.getStore().loadData(ar);
            }
        }, "json");
    }

    var mast = Ext.get('mast');

    mast.on('click', function () {

        var req = Ext.getCmp('masterform');

        if (!req) {
            req = new Ext.Window({
                id: 'masterform',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'MENU MASTER FORM',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: 'vMaster',
                                title: 'Vendor Master',
                                defaults: { xtype: 'panel', frame: true, height: 550 }, layout: 'form',
                                items: [
                                    {
                                        title: 'Vendor Basic Information', defaults: { xtype: 'panel', frame: true, height:500 }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true, autoScroll: true }, layout: 'accordion',
                                                items: [
                                                    {
                                                        title: 'Vendor Details', id: 'vndbasicfrm', defaults: { xtype: 'textfield', anchor: '90%' },
                                                        items: [
                                                            {
                                                                id: 'vdID', fieldLabel: 'Vendor ID', emptyText: 'Vendor ID',
                                                                style: { 'font-size': '20px', 'color': 'red', 'text-align': 'center' },
                                                                listeners: {
                                                                    'render': function () {
                                                                        $.getJSON(pfx + '/Utility/GenerateVendorNo', {}, function (r) {
                                                                            $('#vdID').val(r.data.toString());
                                                                        });
                                                                        $('#vdID').attr('readonly', true);
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'vdName', fieldLabel: 'Name', emptyText: 'Business Name'
                                                            },
                                                            {
                                                                xtype: 'combo', id: 'vdtype', fieldLabel: 'Vendor Type', forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local',
                                                                store: lib.LoadVendorTypeStore(pfx + '/Utility/GetVendorTypes'),
                                                                valueField: 'Id', displayField: 'Description'
                                                            },
                                                            {
                                                                id: 'vdloc', fieldLabel: 'Location', emptyText: 'Location of business'
                                                            },
                                                            { id: 'vdTIN', fieldLabel: 'TIN Number', emptyText: 'enter TIN number' },
                                                            { id: 'vdRNo', fieldLabel: 'Registration No', emptyText: 'enter company registration number' },
                                                            { id: 'vdInc', xtype: 'datefield', format: 'd-M-Y', fieldLabel: 'Inc. Date', emptyText: 'Date of Incorporation' },
                                                            
                                                            {
                                                                xtype: 'combo', id: 'vbtype', fieldLabel: 'Business Type', emptyText: 'select business type',
                                                                forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local',
                                                                store: lib.getBusinessTypeStore(pfx + '/Utility/GetCompanyTypes'),
                                                                valueField: 'BusinessTypeID', displayField: 'BusinessDescription'
                                                            },
                                                            //
                                                            { id: 'vcon', fieldLabel: 'Contact Person', emptyText: 'enter name of the contact person' },
                                                            { id: 'votel', fieldLabel: 'Office Tel', emptyText: 'office telephone' },
                                                            { id: 'vhtel', fieldLabel: 'Home Tel', emptyText: 'home telephone' },
                                                            { id: 'vemail', fieldLabel: 'Email Address', emptyText: 'enter email address' },
                                                            { id: 'vghpost', fieldLabel: 'Ghana Post Addr', emptyText: 'enter GH Post Address' },
                                                            { id: 'vweb', fieldLabel: 'Website', emptyText: 'enter website URL' },
                                                            { id: 'vlinkedin', fieldLabel: 'LinkedIn', emptyText: 'enter LinkedIn account' },
                                                            { id: 'vfb', fieldLabel: 'FaceBook', emptyText: 'enter facebook account' }
                                                        ],
                                                        buttons: [
                                                            {
                                                                text: 'Save Vendor Info',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var vf = Ext.getCmp('vndbasicfrm').getForm();
                                                                        //var commfrm = Ext.getCmp('vndCommfrm').getForm();
                                                                        if (vf.isValid()) {
                                                                            $.post(pfx + '/Master/SaveBasicVendorInformation',
                                                                                {
                                                                                    _id: Idx, vID: Ext.fly('vdID').getValue(), vName: Ext.fly('vdName').getValue(), vTypeID: Ext.getCmp('vdtype').getValue(),
                                                                                    location: Ext.fly('vdloc').getValue(), vTIN: Ext.fly('vdTIN').getValue(), regNo: Ext.fly('vdRNo').getValue(),
                                                                                    incDate: Ext.fly('vdInc').getValue(), bTypeID: Ext.getCmp('vbtype').getValue(),

                                                                                    vcon: Ext.fly('vcon').getValue(), votel: Ext.fly('votel').getValue(), vhtel: Ext.fly('vhtel').getValue(), vemail: Ext.fly('vemail').getValue(),
                                                                                    vghpost: Ext.fly('vghpost').getValue(), vweb: Ext.fly('vweb').getValue(), vlinkedin: Ext.fly('vlinkedin').getValue(),
                                                                                    fb: Ext.fly('vfb').getValue()
                                                                                })
                                                                                .done(function (r) {
                                                                                    if (r.status.toString() == "true") {
                                                                                        $('#btn-vndor-clear').trigger('click');
                                                                                        lib.returnVendorGrid(pfx + '/Utility/GetVendors', Ext.getCmp('vListGrid'));
                                                                                        Idx = 0;
                                                                                    }
                                                                                });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'btn-vndor-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('vndbasicfrm').getForm().reset();
                                                                        //Ext.getCmp('vndCommfrm').getForm().reset();
                                                                        $('#vdName').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    //estimated turnover form
                                                    {
                                                        id: '', title: 'Estimated Sales for Previous Acc Period', defaults: { xtype: 'numberfield', anchor: '95%', allowBlank: true },
                                                        items: [
                                                            {
                                                                id: '', fieldLabel: 'Previous Sales', emptyText: 'sales for previous accounting period'
                                                            },
                                                            {
                                                                id: '', fieldLabel: 'Previous Profilt', emptyText: 'profit for previous accounting period'
                                                            }
                                                        ],
                                                        buttons: [
                                                            {
                                                                text: 'Save Estimates Record',
                                                                listeners: {
                                                                    'click': function (btn) {

                                                                    }
                                                                }
                                                            },
                                                            {
                                                                text: 'Clear Estimates Record',
                                                                hidden: true,
                                                                listeners: {
                                                                    'click': function (btn) {

                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    //estimated sales form
                                                    {
                                                        id: '', title: 'Estimated Sales for Current Acc Period', defaults: { xtype: 'numberfield', anchor: '95%', allowBlank: true },
                                                        items: [
                                                            {
                                                                id: '', fieldLabel: 'Est. Sales', emptyText: 'est. sales for current accounting period'
                                                            },
                                                            { id: '', fieldLabel: 'Est. Profilt', emptyText: 'est. profilt for current accounting period' }
                                                        ]
                                                    },
                                                    //Directors form
                                                    {
                                                        title: 'Directors', defaults: { xtype: 'textfield', anchor:'95%', allowBlank: true }, layout: 'form',
                                                        items: [
                                                            { id: '', fieldLabel: 'First Director', emptyText: 'enter first director' },
                                                            { id: '', fieldLabel: 'Email', emptyText: 'email of first director' },
                                                            { id: '', fieldLabel: 'Second Director', emptyText: 'enter second director' },
                                                            { id: '', fieldLabel: 'Email', emptyText: 'email of second director' }
                                                        ]
                                                    }
                                                ]    
                                            },
                                            {
                                                columnWidth: .5, title: 'Vendor List', defaults: { xtype: 'panel', frame: true, height: 900 },
                                                items: [
                                                    {
                                                        defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                        items: [
                                                            {
                                                                id: '',
                                                                items: [
                                                                    new Ext.grid.GridPanel({
                                                                        id: 'vListGrid', height: 800, autoScroll: true, autoExpandColumn: 'VendorName',
                                                                        store: new Ext.data.GroupingStore({
                                                                            reader: new Ext.data.ArrayReader({}, [
                                                                                { name: 'VendorID', type: 'int' },
                                                                                { name: 'VendorNo', type: 'string' },
                                                                                { name: 'VendorName', type: 'string' },
                                                                                { name: 'VendorLocation', type: 'string' },
                                                                                { name: 'ContactPerson', type: 'string' },
                                                                                { name: 'NameOfOwner', type: 'string' },
                                                                                { name: 'CompanyContact', type: 'string' },
                                                                                { name: 'CompanyHomeContact', type: 'string' }
                                                                            ]),
                                                                            sortInfo: {
                                                                                field: 'VendorID',
                                                                                direction: 'ASC'
                                                                            },
                                                                            groupField: 'VendorName'
                                                                        }),
                                                                        columns: [
                                                                            { id: 'VendorID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'VendorID' },
                                                                            { id: 'VendorNo', header: 'VendorNo', width: 80, hidden: false, sortable: true, dataIndex: 'VendorNo' },
                                                                            { id: 'VendorName', header: 'VendorName', width: 350, hidden: false, sortable: true, dataIndex: 'VendorName' },
                                                                            { id: 'VendorLocation', header: 'VendorLocation', width: 400, hidden: true, sortable: true, dataIndex: 'VendorLocation' },
                                                                            { id: 'ContactPerson', header: 'ContactPerson', width: 200, hidden: false, sortable: true, dataIndex: 'ContactPerson' },
                                                                            { id: 'NameOfOwner', header: 'NameOfOwner', width: 200, hidden: false, sortable: true, dataIndex: 'NameOfOwner' },
                                                                            { id: 'CompanyContact', header: 'CompanyContact', width: 150, hidden: false, sortable: true, dataIndex: 'CompanyContact' },
                                                                            { id: 'CompanyHomeContact', header: 'CompanyHomeContact', width: 150, hidden: false, sortable: true, dataIndex: 'CompanyHomeContact' }
                                                                        ],
                                                                        stripeRows: true,
                                                                        listeners: {
                                                                            'render': function () {
                                                                                lib.returnVendorGrid(pfx + '/Utility/GetVendors', Ext.getCmp('vListGrid'));
                                                                            },
                                                                            'afterrender': function () {
                                                                                setInterval(function () {
                                                                                    lib.returnVendorGrid(pfx + '/Utility/GetVendors', Ext.getCmp('vListGrid'));
                                                                                },20000);
                                                                            },
                                                                            'rowdblclick': function (e, t) {
                                                                                var record = e.getStore().getAt(t);

                                                                                Idx = record.get('VendorID');
                                                                                $('#vdID').val(record.get('VendorNo'));
                                                                                $('#vdName').val(record.get('VendorName'));
                                                                                $('#vdloc').val(record.get('vdloc'));
                                                                                $('#vcon').val(record.get('ContactPerson'));
                                                                                $('#votel').val(record.get('CompanyContact'));
                                                                                $('#vhtel').val(record.get('CompanyHomeContact'));
                                                                            }
                                                                        }
                                                                    })
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //end of vendor
                            {
                                id: 'vendorType',
                                title: 'Vendor Type',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: 'fVndSave', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                items: [
                                                    { id: 'vndtype', fieldLabel: 'Vendor Type', emptyText: 'enter vendor type' }
                                                ]
                                            }
                                        ],
                                        buttons: [
                                            {
                                                text: 'Save Vendor Type', title: 'Vendor Type',
                                                listeners: {
                                                    'click': function (btn) {
                                                        var f = Ext.getCmp('fVndSave').getForm();
                                                        if (f.isValid()) {
                                                            if (vendorTypeEditStatus == false) {
                                                                $.post(pfx + '/Master/SaveVendorType', { vendorDescription: Ext.fly('vndtype').getValue() }, function (response) {
                                                                    if (response.status.toString() == "true") {
                                                                        lib.LoadVendorTypeGrid(pfx + '/Utility/GetVendorTypes', Ext.getCmp('xVnd'));
                                                                        f.reset();
                                                                        $('#vndtype').focus();
                                                                    }
                                                                }, "json")
                                                            }
                                                            else {
                                                                $.post(pfx + '/Master/UpdateVendorType', { vId: Idx, vendorDescription: Ext.fly('vndtype').getValue() }).done(function (res) {
                                                                    if (res.status.toString()) {
                                                                        f.reset();
                                                                        $('#vndtype').focus();
                                                                        lib.LoadVendorTypeGrid(pfx + '/Utility/GetVendorTypes', Ext.getCmp('xVnd'));
                                                                        vendorTypeEditStatus = false;
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: '', title: 'Vendor Type List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xVnd', height: 480, autoScroll: true, autoExpandColumn: 'Description',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'Description', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'Id',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'Description'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                            { id: 'Description', header: 'Vendor Type', width: 250, hidden: false, sortable: true, dataIndex: 'Description' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen
                                                                lib.LoadVendorTypeGrid(pfx + '/Utility/GetVendorTypes', Ext.getCmp('xVnd'));
                                                            },
                                                            'afterrender': function () {
                                                                setInterval(function () {
                                                                    lib.LoadVendorTypeGrid(pfx + '/Utility/GetVendorTypes', Ext.getCmp('xVnd'));
                                                                }, 180000)
                                                            },
                                                            'rowdblclick': function (e, t) {
                                                                var record = e.getStore().getAt(t);
                                                                $('#vndtype').val(record.get('Description'));
                                                                Idx = record.get('Id');
                                                                vendorTypeEditStatus = true;
                                                            }
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'categoryMaster',
                                title: 'Category Master',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'column',
                                items: [
                                    {
                                        columnWidth: .5, title: 'Item Category', defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: 'fItmCat', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                items: [
                                                    {
                                                        id: 'xitmcatname', fieldLabel: 'Category Name', emptyText: 'category name'
                                                    },
                                                    {
                                                        id: 'xitmcatdescrib', xtype: 'textarea', fieldLabel: 'Description', emptyText: 'enter description', allowBlank: true
                                                    }
                                                ],
                                                buttons: [
                                                    {
                                                        text: 'Save Category',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                var f = Ext.getCmp('fItmCat').getForm();
                                                                if (f.isValid()) {
                                                                    if (ItemCategoryEditStatus == false) {
                                                                        $.post(pfx + '/Master/SaveItemCategory',
                                                                            { name: Ext.fly('xitmcatname').getValue(), describ: Ext.fly('xitmcatdescrib').getValue() }, function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    lib.LoadItemCategoryGrid(pfx + '/Utility/GetItemCategories', Ext.getCmp('xItmCat'));
                                                                                    $('#btnitmclear').trigger('click');
                                                                                }
                                                                            }, "json");
                                                                    }
                                                                    else {
                                                                        $.post(pfx + '/Master/UpdateItemCategory',
                                                                            { id: Idx, name: Ext.fly('xitmcatname').getValue(), describ: Ext.fly('xitmcatdescrib').getValue() })
                                                                            .done(function (res) {
                                                                                if (res.status.toString() == "true") {
                                                                                    lib.LoadItemCategoryGrid(pfx + '/Utility/GetItemCategories', Ext.getCmp('xItmCat'));
                                                                                    $('#btnitmclear').trigger('click');
                                                                                    ItemCategoryEditStatus = false;
                                                                                }
                                                                            });
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'btnitmclear', text: 'Clear Category',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                Ext.getCmp('fItmCat').getForm().reset();
                                                                $('#xitmcatname').focus();
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .5, title: 'Item Category List', defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: '',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xItmCat', height: 300, autoScroll: true, autoExpandColumn: 'nameOfCategory',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'nameOfCategory', type: 'string' },
                                                                { name: 'descriptionOfCategory', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'nameOfCategory',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'nameOfCategory'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                            { id: 'nameOfCategory', header: 'Item Category', width: 250, hidden: false, sortable: true, dataIndex: 'nameOfCategory' },
                                                            { id: 'descriptionOfCategory', header: 'Description', width: 160, hidden: true, sortable: true, dataIndex: 'descriptionOfCategory' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen
                                                                lib.LoadItemCategoryGrid(pfx + '/Utility/GetItemCategories', Ext.getCmp('xItmCat'));
                                                            },
                                                            'afterrender': function () {
                                                                setInterval(function () {
                                                                    lib.LoadItemCategoryGrid(pfx + '/Utility/GetItemCategories', Ext.getCmp('xItmCat'));
                                                                }, 180000)
                                                            },
                                                            'rowdblclick': function (e, t) {
                                                                var record = e.getStore().getAt(t);
                                                                Idx = record.get('Id');
                                                                $('#xitmcatname').val(record.get('nameOfCategory'));
                                                                $('#xitmcatdescrib').val(record.get('descriptionOfCategory'));
                                                                ItemCategoryEditStatus = true;
                                                            }
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //end of item Master
                            {
                                id: 'itemMaster',
                                title: 'Item Master',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: 'fmas_seci', title: 'Section I', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                items: [
                                                    { id: 'itmname', fieldLabel: 'Item Name', emptyText: 'Item Name' },
                                                    {
                                                        id: 'itmcode', fieldLabel: 'Item Code', emptyText: 'Item Code',
                                                        listeners: {
                                                            'render': function () {
                                                                $('#itmcode').attr('readonly', true);
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'cboCat', xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local',
                                                        fieldLabel: 'Item Category', emptyText: 'category', valueField: 'Id', displayField: 'nameOfCategory',
                                                        store: lib.categoryStore(pfx + '/Utility/GetItemCategories'),
                                                        listeners: {
                                                            'select': function () {
                                                                $.getJSON(pfx + '/Utility/GetItemCode', { category: Ext.fly('cboCat').getValue(), categoryID: Ext.getCmp('cboCat').getValue() },
                                                                    function (fxn) {
                                                                        if (fxn.status.toString() == "true") {
                                                                            $('#itmcode').val(fxn.data.toString());
                                                                            $('#cboitm_measure').focus();
                                                                        }
                                                                    });

                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                id: 'fmas_secii', title: 'Section II', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                items: [
                                                    {
                                                        id: 'cboitm_measure', fieldLabel: 'Measured In', emptyText: 'Unit of measurement',
                                                        store: lib.getItemMetrics(pfx + '/Utility/GetSIUnits'),
                                                        valueField: 'Id', displayField: 'Measurement'
                                                    },
                                                    { id: 'itm_minstk', xtype: 'numberfield', fieldLabel: 'Min. Stock Level' },
                                                    { id: 'itm_maxstk', xtype: 'numberfield', fieldLabel: 'Max. Stock Level' },
                                                    {
                                                        id: 'itm_mas_describ', xtype: 'textarea', fieldLabel: 'Description', allowBlank: true
                                                    }
                                                ]
                                            },
                                            {
                                                title: 'Actions',
                                                items: [],
                                                buttons: [
                                                    {
                                                        id: 'btn-mas-save', text: 'Save Item',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                var fseci = Ext.getCmp('fmas_seci').getForm();
                                                                var fsecii = Ext.getCmp('fmas_secii').getForm();

                                                                if (fseci.isValid() && fsecii.isValid()) {
                                                                    if (ItemMasterEditStatus == false) {
                                                                        $.post(pfx + '/Master/SaveItem',
                                                                            {
                                                                                cname: Ext.fly('itmname').getValue(), catID: Ext.getCmp('cboCat').getValue(),
                                                                                code: Ext.fly('itmcode').getValue(), measured: Ext.fly('cboitm_measure').getValue(),
                                                                                minStock: Ext.fly('itm_minstk').getValue(), maxStock: Ext.fly('itm_maxstk').getValue(),
                                                                                describ: Ext.fly('itm_mas_describ').getValue()
                                                                            }
                                                                        ).done(function (r) {
                                                                            Ext.getCmp('xItmMaster').getStore().removeAll();
                                                                            lib.getItemGrid(pfx + '/Utility/GetItemList', Ext.getCmp('xItmMaster'));
                                                                            $('#btn-mas-clear').trigger('click');
                                                                        })
                                                                    }
                                                                    else {
                                                                        $.post(pfx + '/Master/UpdateItem',
                                                                            {
                                                                                id: Idx, cname: Ext.fly('itmname').getValue(), catID: Ext.getCmp('cboCat').getValue(),
                                                                                code: Ext.fly('itmcode').getValue(), measured: Ext.fly('cboitm_measure').getValue(),
                                                                                minStock: Ext.fly('itm_minstk').getValue(), maxStock: Ext.fly('itm_maxstk').getValue(),
                                                                                describ: Ext.fly('itm_mas_describ').getValue()
                                                                            })
                                                                            .done(function (res) {
                                                                                if (res.status.toString() == "true") {
                                                                                    Ext.getCmp('xItmMaster').getStore().removeAll();
                                                                                    lib.getItemGrid(pfx + '/Utility/GetItemList', Ext.getCmp('xItmMaster'));
                                                                                    $('#btn-mas-clear').trigger('click');
                                                                                    ItemMasterEditStatus = false;
                                                                                }
                                                                            });
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'btn-mas-clear', text: 'Clear Item',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                Ext.getCmp('fmas_seci').getForm().reset();
                                                                Ext.getCmp('fmas_secii').getForm().reset();
                                                                $('#itmname').focus();
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                title: 'Item Master List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xItmMaster', height: 480, autoScroll: true, autoExpandColumn: 'ProductName',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'ProductName', type: 'string' },
                                                                { name: 'ProductCode', type: 'string' },
                                                                { name: 'Metric', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'ProductName',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'ProductName'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                            { id: 'ProductName', header: 'Item', width: 250, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                            { id: 'ProductCode', header: 'Code', width: 160, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                            { id: 'Metric', header: 'Category', width: 20, hidden: false, sortable: true, dataIndex: 'Metric' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen
                                                                lib.getItemGrid(pfx + '/Utility/GetItemList', Ext.getCmp('xItmMaster'));
                                                            },
                                                            'afterrender': function () {
                                                                setInterval(function () {
                                                                    lib.getItemGrid(pfx + '/Utility/GetItemList', Ext.getCmp('xItmMaster'));
                                                                }, 5000)
                                                            },
                                                            'rowdblclick': function (e, t) {
                                                                var record = e.getStore().getAt(t);
                                                                Idx = record.get('Id');
                                                                $('#itmname').val(record.get('ProductName'));
                                                                $('#itmcode').val(record.get('ProductCode'));

                                                                ItemMasterEditStatus = true;
                                                            }
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //end of category master
                            {
                                id: 'financialPeriod',
                                title: 'Financial Year',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: 'frmFinYr', title: 'Enter Financial Year', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', anchor: '95%' }, layout: 'form',
                                                items: [
                                                    {
                                                        id: 'pfrom', fieldLabel: 'Period From', emptyText: 'financial commencement year',
                                                        store: lib.getFinancialYear('current')
                                                    },
                                                    {
                                                        id: 'pto', fieldLabel: 'Period To', emptyText: 'financial commencement year',
                                                        store: lib.getFinancialYear('')
                                                    },
                                                    { id: 'fncom', xtype: 'textarea', fieldLabel: 'Comments', emptyText: 'enter comments' }
                                                ],
                                                buttons: [
                                                    {
                                                        text: 'Save Financial Year',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                if (Ext.getCmp('frmFinYr').getForm().isValid()) {
                                                                    if (lib.saveAccPeriod(pfx + '/Master/SaveAccountingPeriod',
                                                                        Ext.fly('pfrom').getValue(), Ext.fly('pto').getValue(),
                                                                        Ext.fly('fncom').getValue()) == "true") {
                                                                        Ext.Msg.alert(lib.stat, 'It worked', this);
                                                                        if (lib.stat == "true") {
                                                                            $('#frmFinClr').trigger('click');
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'frmFinClr', text: 'Clear Financial Year',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                Ext.getCmp('frmFinYr').getForm().reset();
                                                                $('#pfrom').focus();
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: '', title: 'Financial Year List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xfin', height: 300, autoScroll: true, autoExpandColumn: 'FinancialYr',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'FinancialYrID', type: 'int' },
                                                                { name: 'FinancialYr', type: 'string' },
                                                                { name: 'Description', type: 'string' },
                                                                { name: 'IsActive', type: 'int' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'FinancialYr',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'FinancialYr'
                                                        }),
                                                        columns: [
                                                            { id: 'FinancialYrID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'FinancialYrID' },
                                                            { id: 'FinancialYr', header: 'Financial Period', width: 250, hidden: false, sortable: true, dataIndex: 'FinancialYr' },
                                                            { id: 'Description', header: 'Description', width: 160, hidden: true, sortable: true, dataIndex: 'Description' },
                                                            { id: 'isActive', header: 'Active', width: 20, hidden: true, sortable: true, dataIndex: 'IsActive' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen
                                                                lib.getAccountingPeriod(pfx + '/Utility/getAccountPeriods', Ext.getCmp('xfin'));
                                                            },
                                                            'afterrender': function () {
                                                                setInterval(function () {
                                                                    lib.getAccountingPeriod(pfx + '/Utility/getAccountPeriods', Ext.getCmp('xfin'));
                                                                }, 60000)
                                                            }
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //end of financial year
                            {
                                id: 'currencyLookup',
                                title: 'Currency',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: 'frmCur', title: 'Enter Currency', defaults: { xtype: 'textfield', anchor: '100%' },
                                                items: [
                                                    { id: 'cursymbol', fieldLabel: 'Symbol' },
                                                    { id: 'curname', fieldLabel: 'Currency Name' }
                                                ],
                                                buttons: [
                                                    {
                                                        text: 'Save',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                var curFrm = Ext.getCmp('frmCur').getForm();
                                                                if (curFrm.isValid()) {
                                                                    if (currencyEditStatus == false) {
                                                                        $.post(pfx + '/Master/SaveCurrency',
                                                                            { currency: Ext.fly('curname').getValue(), symbol: Ext.fly('cursymbol').getValue() },
                                                                            function (rs) {
                                                                                if (rs.status.toString() == "true") {
                                                                                    //retrieve store from library and load the grid control
                                                                                    lib.currencyGrid(pfx + '/Utility/GetCurrencies', Ext.getCmp('xcur'));
                                                                                }
                                                                            }, "json");
                                                                    }
                                                                    else {
                                                                        $.post(pfx + '/Master/UpdateCurrency', { id: Idx, currency: Ext.fly('curname').getValue(), symbol: Ext.fly('cursymbol').getValue() })
                                                                            .done(function (res) {
                                                                                if (res.status.toString() == "true") {
                                                                                    curFrm.reset();
                                                                                    lib.currencyGrid(pfx + '/Utility/GetCurrencies', Ext.getCmp('xcur'));
                                                                                    currencyEditStatus = false;
                                                                                }
                                                                            });
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Clear',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                Ext.getCmp('frmCur').getForm().reset();
                                                                $('#cursymbol').focus();
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: '', title: 'Currency List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xcur', height: 300, autoScroll: true, autoExpandColumn: 'nameOfcurrency',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'nameOfcurrency', type: 'string' },
                                                                { name: 'denominationSymbol', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'nameOfcurrency',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'nameOfcurrency'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                            { id: 'nameOfcurrency', header: 'Currency', width: 200, hidden: false, sortable: true, dataIndex: 'nameOfcurrency' },
                                                            { id: 'denominationSymbol', header: 'Symbol', width: 60, hidden: false, sortable: true, dataIndex: 'denominationSymbol' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                lib.currencyGrid(pfx + '/Utility/GetCurrencies', Ext.getCmp('xcur'));
                                                            },
                                                            'afterrender': function () {
                                                                setInterval(function () {
                                                                    lib.currencyGrid(pfx + '/Utility/GetCurrencies', Ext.getCmp('xcur'));
                                                                }, 60000)
                                                            },
                                                            'rowdblclick': function (e, t) {
                                                                var record = e.getStore().getAt(t);
                                                                Idx = record.get('Id');
                                                                $('#cursymbol').val(record.get('denominationSymbol'));
                                                                $('#curname').val(record.get('nameOfcurrency'));
                                                                currencyEditStatus = true;
                                                            }
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //end of currency lookup
                        ]
                    }
                ]
            }).show();
        }

    });

});