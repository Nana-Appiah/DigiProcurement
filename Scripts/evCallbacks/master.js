Ext.onReady(function () {

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
                                defaults: { xtype: 'panel', frame: true, border: true, height:270 }, layout:'form',
                                items: [
                                    {
                                        title: 'Vendor Basic Information', defaults: { xtype: 'form' }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .5, defaults: { xtype: 'textfield', anchor: '90%' },
                                                items: [
                                                    {
                                                        fieldLabel:'Name',emptyText:'Business Name'
                                                    },
                                                    {
                                                        fieldLabel:'Location',emptyText:'Location of business'
                                                    },
                                                    { id: '', fieldLabel: 'TIN Number', emptyText: 'enter TIN number' },
                                                    { id: '', fieldLabel: 'Registration No', emptyText: 'enter company registration number' },
                                                    { id: '', xtype: 'datefield', format: 'd-M-Y', fieldLabel: 'Inc. Date', emptyText: 'Date of Incorporation' },
                                                    { xtype: 'combo', fieldLabel: 'Business Type', emptyText: 'select business type', forceSelection: true, typeAhead: true, allowBlank: false, local: 'mode', store: lib.getBusinessRegistrationTypes() }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        defaults: { xtype: 'tabpanel',tabPosition:'top',enablScroll:true,frame:true, height:220 },
                                        items: [
                                            {
                                                activeTab: 0,
                                                items: [
                                                    {
                                                        title: 'Communication', defaults: { xtype: 'form', frame: true, border: false },layout:'column',
                                                        items: [
                                                            {
                                                                columnWidth:.5,id: '',title:'Communication Details', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: true },
                                                                items: [
                                                                    { id: '', fieldLabel: 'Contact Person', emptyText: 'enter name of the contact person' },
                                                                    { id: '', fieldLabel: 'Office Tel', emptyText: 'office telephone' },
                                                                    { id: '', fieldLabel: 'Home Tel', emptyText: 'home telephone' },
                                                                    { id: '', fieldLabel: 'Email Address', emptyText: 'enter email address' },
                                                                    { id: '', fieldLabel: 'Ghana Post Addr', emptyText: 'enter GH Post Address' }
                                                                ],
                                                                buttons: [
                                                                    {
                                                                        text: 'Save Communication Details',
                                                                        listeners: {
                                                                            'click': function (btn) {

                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                columnWidth: .5, id: '', title: 'Social Media Presence of Vendor', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: true },
                                                                items: [
                                                                    { id: '', fieldLabel: 'Website', emptyText: 'enter website URL' },
                                                                    { id: '', fieldLabel: 'LinkedIn', emptyText: 'enter LinkedIn account' },
                                                                    { id: '', fieldLabel: 'FaceBook', emptyText: 'enter facebook account' }
                                                                ],
                                                                buttons: [
                                                                    {
                                                                        text: 'Save Details',
                                                                        listeners: {
                                                                            'click': function (btn) {

                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Estimated Turnover', defaults: { xtype: 'form', frame: true, border: true },layout:'column',
                                                        items: [
                                                            {
                                                                columnWidth:.4, id: '', title: 'Estimated Sales for Previous Acc Period', defaults: { xtype: 'numberfield', anchor: '95%', allowBlank: true },
                                                                items: [
                                                                    {
                                                                        id: '', fieldLabel: 'Previous Sales', emptyText: 'sales for previous accounting period'
                                                                    },
                                                                    {
                                                                        id: '', fieldLabel: 'Previous Profilt', emptyText: 'profit for previous accounting period'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                columnWidth: .4, id: '', title: 'Estimated Sales for Current Acc Period', defaults: { xtype: 'numberfield', anchor: '95%', allowBlank: true },
                                                                items: [
                                                                    {
                                                                        id: '', fieldLabel: 'Est. Sales', emptyText: 'est. sales for current accounting period'
                                                                    },
                                                                    { id: '', fieldLabel: 'Est. Profilt', emptyText: 'est. profilt for current accounting period'}
                                                                ]
                                                            },
                                                            {
                                                                columnWidth: .2,
                                                                items: [],
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
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Directors', defaults: { xtype: 'form', frame: true, border: true },layout:'column',
                                                        items: [
                                                            {
                                                                columnWidth:.4,id: '',title:'First Director', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: true },
                                                                items: [
                                                                    { id: '', fieldLabel: 'First Director', emptyText: 'enter first director' },
                                                                    { id: '', fieldLabel: 'Email', emptyText: 'email of first director' }
                                                                ]
                                                            },
                                                            {
                                                                columnWidth: .4,id: '',title:'Second Director', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: true },
                                                                items: [
                                                                    { id: '', fieldLabel: 'Second Director', emptyText: 'enter second director' },
                                                                    { id: '', fieldLabel: 'Email', emptyText: 'email of second director' }
                                                                ]
                                                            },
                                                            {
                                                                columnWidth: .2, frame: false, border: false,
                                                                items: [],
                                                                buttons: [
                                                                    {
                                                                        text: 'Save',
                                                                        listeners: {
                                                                            'click': function (btn) {

                                                                            }
                                                                        }
                                                                    }
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
                                                id: '', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                items: [
                                                    { id: '', fieldLabel: 'Vendor Type', emptyText: 'enter vendor type' }
                                                ]
                                            }
                                        ],
                                        buttons: [
                                            {
                                                text: 'Save Vendor Type',title:'Vendor Type',
                                                listeners: {
                                                    'click': function (btn) {

                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: '',title:'Vendor Type List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xVnd', height: 300, autoScroll: true, autoExpandColumn: 'VendorDescription',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'VendorTypeID', type: 'int' },
                                                                { name: 'VendorDescription', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'VendorTypeID',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'VendorDescription'
                                                        }),
                                                        columns: [
                                                            { id: 'VendorTypeID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'VendorTypeID' },
                                                            { id: 'VendorDescription', header: 'Vendor Type', width: 250, hidden: false, sortable: true, dataIndex: 'VendorDescription' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen

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
                                defaults: { xtype: 'panel', frame: true, border: true },layout:'column',
                                items: [
                                    {
                                        columnWidth: .5, title:'Item Category', defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: '', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                items: [
                                                    {
                                                        id:'', fieldLabel:'Category Name', emptyText:'category name'
                                                    },
                                                    {
                                                        xtype:'textarea', fieldLabel:'Description', emptyText:'enter description',allowBlank: true
                                                    }
                                                ],
                                                buttons: [
                                                    {
                                                        text: 'Save Category',
                                                        listeners: {
                                                            'click': function (btn) {

                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Clear Category',
                                                        listeners: {
                                                            'click': function (btn) {

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
                                                id:'',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xItmCat', height: 300, autoScroll: true, autoExpandColumn: 'CategoryName',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'CategoryID', type: 'int' },
                                                                { name: 'CategoryName', type: 'string' },
                                                                { name: 'CategoryDescription', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'CategoryName',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'CategoryName'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'CategoryID' },
                                                            { id: 'CategoryName', header: 'Item Category', width: 250, hidden: false, sortable: true, dataIndex: 'CategoryName' },
                                                            { id: 'CategoryDescription', header: 'Description', width: 160, hidden: true, sortable: true, dataIndex: 'CategoryDescription' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen

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
                                defaults: { xtype: 'panel', frame: true, border: true },layout:'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                title: 'Section I', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                items: [
                                                    { id: '', fieldLabel: 'Item Name', emptyText: 'Item Name' },
                                                    { id: '', fieldLabel: 'Item Code', emptyText: 'Item Code' },
                                                    { xtype: 'numberfield', fieldLabel: 'Min. Stock Level' },
                                                    { xtype: 'numberfield', fieldLabel: 'Max. Stock Level' }
                                                ]
                                            },
                                            {
                                                title: 'Section II', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                items: [
                                                    {
                                                        fieldLabel: 'Measurement', emptyText: 'Unit of measurement'
                                                    },
                                                    {
                                                        fieldLabel: 'Item Category', emptyText: 'category'
                                                    },
                                                    {
                                                        xtype: 'textarea', fieldLabel: 'Description', allowBlank: true
                                                    }
                                                ]
                                            },
                                            {
                                                title: 'Actions',
                                                items: [],
                                                buttons: [
                                                    {
                                                        text: 'Save Item',
                                                        listeners: {
                                                            'click': function (btn) {

                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Clear Item',
                                                        listeners: {
                                                            'click': function (btn) {

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
                                                        id: 'xItmCat', height: 450, autoScroll: true, autoExpandColumn: 'ItemName',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'ItemID', type: 'int' },
                                                                { name: 'ItemName', type: 'int' },
                                                                { name: 'ItemCode', type: 'string' },
                                                                { name: 'ItemCategory', type: 'int' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'ItemName',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'ItemCategory'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'ItemID' },
                                                            { id: 'ItemName', header: 'Item', width: 250, hidden: false, sortable: true, dataIndex: 'ItemName' },
                                                            { id: 'ItemCode', header: 'Code', width: 160, hidden: false, sortable: true, dataIndex: 'ItemCode' },
                                                            { id: 'ItemCategory', header: 'Category', width: 20, hidden: false, sortable: true, dataIndex: 'ItemCategory' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen

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
                                defaults: { xtype: 'panel', frame: true, border: true },layout:'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                title: 'Enter Financial Year', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', anchor:'95%' },layout:'form',
                                                items: [
                                                    {
                                                        id: '', fieldLabel: 'Period From',emptyText:'financial commencement year',
                                                        store: new Ext.data.Store({
                                                            autoLoad: true, restful: false,
                                                            url: '',
                                                            reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'year', type: 'int' }
                                                            ])
                                                        }), valueField: 'year', displayField: 'year',
                                                        listeners: {
                                                            'select': function () {
                                                                //validation destination year: should be later than year selected here

                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: '', fieldLabel: 'Period To', emptyText: 'financial commencement year',
                                                        store: new Ext.data.Store({
                                                            autoLoad: true, restful: false,
                                                            url: '',
                                                            reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'year', type: 'int' }
                                                            ])
                                                        }), valueField: 'year', displayField: 'year',
                                                        listeners: {
                                                            'select': function () {
                                                                //validation destination year: should be later than year selected here

                                                            }
                                                        }
                                                    }
                                                ],
                                                buttons: [
                                                    {
                                                        text: 'Save Financial Year',
                                                        listeners: {
                                                            'click': function (btn) {

                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Clear Financial Year',
                                                        listeners: {
                                                            'click': function (btn) {

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
                                                id:'',title: 'Financial Year List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xfin', height: 300, autoScroll: true, autoExpandColumn: 'FinancialYr',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'FinancialYrID', type: 'int' },
                                                                { name: 'FinancialYr', type: 'int' },
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
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'FinancialYrID' },
                                                            { id: 'FinancialYr', header: 'Financial Period', width: 250, hidden: false, sortable: true, dataIndex: 'FinancialYr' },
                                                            { id: 'Description', header: 'Description', width: 160, hidden: true, sortable: true, dataIndex: 'Description' },
                                                            { id: 'isActive', header: 'Active', width: 20, hidden: true, sortable: true, dataIndex: 'IsActive' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen

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
                                defaults: { xtype: 'panel', frame: true, border: true },layout:'column',
                                items: [
                                    {
                                        columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                title: 'Enter Currency', defaults: { xtype: 'textfield', anchor: '100%' },
                                                items: [
                                                    { id: '', fieldLabel: 'Symbol' },
                                                    { id: '', fieldLabel: 'Currency Name' }
                                                ],
                                                buttons: [
                                                    {
                                                        text: 'Save',
                                                        listeners: {
                                                            'click': function (btn) {

                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Clear',
                                                        listeners: {
                                                            'click': function (btn) {

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
                                                id:'',title:'Currency List',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'xcur', height: 300, autoScroll: true, autoExpandColumn: 'CurrencyName',
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'CurrencyID', type: 'int' },
                                                                { name: 'CurrencyName', type: 'string' },
                                                                { name: 'CurrencySymbol', type: 'string' }
                                                            ]),
                                                            sortInfo: {
                                                                field: 'CurrencyName',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'CurrencyName'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'CurrencyID' },
                                                            { id: 'CurrencyName', header: 'Currency', width: 200, hidden: false, sortable: true, dataIndex: 'CurrencyName' },
                                                            { id: 'CurrencySymbol', header: 'Symbol', width: 60, hidden: false, sortable: true, dataIndex: 'CurrencySymbol' }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                //calls function when the grid is rendered to the screen

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