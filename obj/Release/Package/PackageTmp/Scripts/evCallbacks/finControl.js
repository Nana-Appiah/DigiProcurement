Ext.onReady(function () {

    var REQUISITION_ID = 0;
    var gridEditor = lib.returnEditorControl();
    var APPROVED_REQUISITIONS = [];

    var CLOSED_CAPEX_STATUS_ID = 0;
    var pfx = '..';

    var finC = Ext.get('finControl');

    finC.on('click', function () {

        var financialControl = Ext.getCmp('financialController');

        if (!financialControl) {
            financialControl = new Ext.Window({
                id: 'financialController',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'FINANCIAL APPROVAL FORM',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: 'fMaster',
                                title: 'Finance Master',
                                defaults: { xtype: 'panel', frame: true, height: 550 }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel' }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                items: [
                                                    {
                                                        id: 'fnSearchFrm', title: 'Search', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'fnDept', store: lib.returnDepartmentStore(pfx + '/Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.returnRequisitionNumbersGrid(pfx + '/Requisition/GetRequisitionNos', 1, Ext.getCmp('fnDept').getValue(), Ext.getCmp('fnReqGrid'));
                                                                        lib.getCapexItemGrid(pfx + '/Capex/GetCapexData', Ext.getCmp('fnDept').getValue(), Ext.getCmp('DeptCapexGrid'));
                                                                        lib.getAlternateCapexItemGrid(pfx + '/Capex/GetAlternateCapexData', Ext.getCmp('fnDept').getValue(), Ext.getCmp('AltCapexGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Pending Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'fnReqGrid', height: 400, autoScroll: true, autoExpandColumn: 'RequisitionNo',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionNo', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'RequisitionNo'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'RequisitionNo', header: 'Requisition No', width: 250, hidden: false, sortable: true, dataIndex: 'RequisitionNo' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);
                                                                        REQUISITION_ID = record.get('Id');
                                                                        lib.returnRequistionDetails(pfx + '/Requisition/GetRequisitionDetails', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'));
                                                                        //lib.getItemGridGivenRequisitionID('Requisition/GetRequisitionItemList', REQUISITION_ID, 1, Ext.getCmp('fnReqItemsGrid'));
                                                                        
                                                                        //lib.returnRequistionDetails2('Requisition/GetRequisitionDetails2', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'), _STAT_ID, Ext.getCmp('fnReqItemsGrid'));
                                                                        $('#req-btn-get').trigger('click');
                                                                    }
                                                                }
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'req-btn-get', text: 'Get Requisition Items',hidden:true,
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var _STAT_ID = 1;
                                                                        lib.getItemGridGivenRequisitionID(pfx + '/Requisition/GetRequisitionItemList', REQUISITION_ID, _STAT_ID, Ext.getCmp('fnReqItemsGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                items: [
                                                    {
                                                        id: 'fnReqSource', title: 'Requisition Source', defaults: { xtype: 'textfield', anchor: '95%', disabled: true },
                                                        items: [
                                                            { id: 'rno', fieldLabel: 'Req No' },
                                                            { id: 'requestee', fieldLabel: 'Requestee' },
                                                            { id: 'dept', fieldLabel: 'Department' },
                                                            { id: 'priority', fieldLabel: 'Priority'}
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Requisition Items',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'fnReqItemsGrid', height: 170, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                plugins: gridEditor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' },
                                                                        { name: 'status', type:'string'}
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ProductName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'RequisitionId', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'RequisitionId' },
                                                                    { id: 'ProductCode', header: 'Product', width: 100, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                                    { id: 'ProductName', header: 'Code', width: 400, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                                    { id: 'Quantity', header: 'Qty', width: 50, hidden: false, sortable: true, dataIndex: 'Quantity' },
                                                                    { id: 'narration', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'narration' },
                                                                    {
                                                                        id: 'status', header: 'Status', width: 100, hidden: false, sortable: true, dataIndex: 'status',
                                                                        editor: { xtype: 'combo', allowBlank: false, forceSelection: true, typeAhead: true, mode:'local', store: ['Approve','Decline'] }
                                                                    }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            //lib.getItemGridGivenRequisitionID('Requisition/GetRequisitionItemList', REQUISITION_ID, 1, Ext.getCmp('fnReqItemsGrid'));
                                                                        },5000);
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    },
                                                    //another form here
                                                    {
                                                        id: 'fnCommentFrm', title: 'Comments', defaults: { xtype: 'textarea', allowBlank: false, anchor: '95%' }, layout: 'fit',
                                                        items: [
                                                            { id: '', height:90 }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'finC-btn-save', text: 'Save',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var ee = Ext.getCmp('fnReqItemsGrid').getStore().getRange();
                                                                        var knt = 0;
                                                                        
                                                                        var dta = [];
                                                                        var result = [];
                                                                        APPROVED_REQUISITIONS.length = 0;

                                                                        Ext.each(ee, function (item, i) {
                                                                            if (item.get('status') == "Approve") {
                                                                                var str = item.get('Id') + ',' +  item.get('RequisitionId') + ',' + item.get('ProductCode') + ',' + item.get('ProductName') + ',' + item.get('Quantity') + ',' + item.get('narration');
                                                                                //dta[i] = [item.get('Id'), item.get('RequisitionId'), item.get('ProductCode'), item.get('ProductName'), item.get('Quantity'), item.get('narration')];
                                                                                dta[i] = str;
                                                                                knt++;
                                                                            }
                                                                        });

                                                                        result = dta.filter(function (val) { return val !== undefined; });
                                                                        for (var z = 0; z < result.length; z++) {
                                                                            APPROVED_REQUISITIONS.push(result[z]);
                                                                        }

                                                                        //console.log(APPROVED_REQUISITIONS);
                                                                        //APPROVED_REQUISITIONS = dta;
                                                                        $.post(pfx + '/Requisition/ApproveRequisition', { dta: APPROVED_REQUISITIONS })
                                                                            .done(function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    Ext.MessageBox.alert("Financial Approval", r.data, this);
                                                                                    $('#finC-btn-clear').trigger('click');
                                                                                }
                                                                        });
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'finC-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('fnSearchFrm').getForm().reset();
                                                                        Ext.getCmp('fnCommentFrm').getForm().reset();
                                                                        Ext.getCmp('fnReqSource').getForm().reset();

                                                                        Ext.getCmp('fnReqGrid').getStore().removeAll();
                                                                        Ext.getCmp('fnReqItemsGrid').getStore().removeAll();

                                                                        $('#fnDept').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .3, defaults: { xtype: 'panel', border: true }, 
                                                items: [
                                                    {
                                                        defaults: { xtype: 'panel' },
                                                        items: [
                                                            {
                                                                defaults: { xtype: 'form', frame: true, border: true  },layout:'form',
                                                                items: [
                                                                    {
                                                                        id: '', title: 'Department CAPEX',
                                                                        items: [
                                                                            new Ext.grid.GridPanel({
                                                                                id: 'DeptCapexGrid', height: 200, autoScroll: true, autoExpandColumn: 'itemName',
                                                                                //plugins: editor,
                                                                                store: new Ext.data.GroupingStore({
                                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                                        { name: 'Id', type: 'int' },
                                                                                        { name: 'itemName', type: 'string' },
                                                                                        { name: 'capexCategory', type: 'string' },
                                                                                        { name: 'QtyRequested', type: 'string' },
                                                                                        { name: 'QtySupplied', type: 'int' },
                                                                                        { name: 'QtyOutstanding', type: 'string' },
                                                                                        { name: 'justification', type: 'string' },
                                                                                        { name: 'financialYear', type: 'string' },
                                                                                        { name: 'nameOfDepartment', type: 'string' }
                                                                                    ]),
                                                                                    sortInfo: {
                                                                                        field: 'Id',
                                                                                        direction: 'ASC'
                                                                                    },
                                                                                    groupField: 'itemName'
                                                                                }),
                                                                                columns: [
                                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                                    { id: 'itemName', header: 'Product', width: 200, hidden: false, sortable: true, dataIndex: 'itemName' },
                                                                                    { id: 'capexCategory', header: 'Category', width: 100, hidden: true, sortable: true, dataIndex: 'capexCategory' },
                                                                                    { id: 'QtyRequested', header: 'Qty Requested', width: 100, hidden: true, sortable: true, dataIndex: 'QtyRequested' },
                                                                                    { id: 'QtySupplied', header: 'Qty Supplied', width: 80, hidden: false, sortable: true, dataIndex: 'QtySupplied'},
                                                                                    { id: 'QtyOutstanding', header: 'Qty Outstanding', width: 150, hidden: false, sortable: false, dataIndex: 'QtyOutstanding'},
                                                                                    { id: 'justification', header: 'Justification', width: 120, hidden: true, sortable: false, dataIndex: 'justification'},
                                                                                    { id: 'financialYear', header: 'Deadline', width: 120, hidden: true, sortable: false, dataIndex: 'financialYear'},
                                                                                    { id: 'nameOfDepartment', header: 'Department', width: 200, hidden: true, sortable: false, dataIndex: 'nameOfDepartment'}
                                                                                ],
                                                                                stripeRows: true
                                                                            })
                                                                        ]
                                                                    },
                                                                    {
                                                                        id: '', title: 'Items Procured not in CAPEX',
                                                                        items: [
                                                                            new Ext.grid.GridPanel({
                                                                                id: 'AltCapexGrid', height: 200, autoScroll: true, autoExpandColumn: 'itemName',
                                                                                //plugins: editor,
                                                                                store: new Ext.data.GroupingStore({
                                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                                        { name: 'Id', type: 'int' },
                                                                                        { name: 'itemName', type: 'string' },
                                                                                        { name: 'Quantity', type: 'int' },
                                                                                        { name: 'nameOfDepartment', type: 'string' },
                                                                                        { name: 'financialYear', type: 'string' }
                                                                                    ]),
                                                                                    sortInfo: {
                                                                                        field: 'Id',
                                                                                        direction: 'ASC'
                                                                                    },
                                                                                    groupField: 'itemName'
                                                                                }),
                                                                                columns: [
                                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                                    { id: 'itemName', header: 'Product', width: 200, hidden: false, sortable: true, dataIndex: 'itemName' },
                                                                                    { id: 'Quantity', header: 'Quantity', width: 120, hidden: false, sortable: false, dataIndex: 'Quantity' },
                                                                                    { id: 'nameOfDepartment', header: 'Department', width: 200, hidden: true, sortable: false, dataIndex: 'nameOfDepartment' },
                                                                                    { id: 'financialYear', header: 'Deadline', width: 120, hidden: true, sortable: false, dataIndex: 'financialYear' }
                                                                                ],
                                                                                stripeRows: true
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
                                    }
                                ]
                            },
                            {
                                title: 'Capex', defaults: { xtype: 'panel' },
                                items: [
                                    {
                                        defaults: { xtype: 'panel' },
                                        items: [
                                            {
                                                defaults: { xtype: 'form', frame: true, border: true },layout:'form',
                                                items: [
                                                    {
                                                        id: 'capexDeptSearchFrm', title: 'Search',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'capexdept', store: lib.returnDepartmentStore(pfx + '/Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.getCapexItemGrid(pfx + '/Capex/GetCapexData', Ext.getCmp('capexdept').getValue(), Ext.getCmp('capexGridAppr'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Results', height: 490,
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'capexGridAppr', height: 450, autoScroll: true, autoExpandColumn: 'itemName',
                                                                //plugins: editor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'itemName', type: 'string' },
                                                                        { name: 'capexCategory', type: 'string' },
                                                                        { name: 'QtyRequested', type: 'string' },
                                                                        { name: 'QtySupplied', type: 'int' },
                                                                        { name: 'QtyOutstanding', type: 'string' },
                                                                        { name: 'justification', type: 'string' },
                                                                        { name: 'financialYear', type: 'string' },
                                                                        { name: 'nameOfDepartment', type:'string'}
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'itemName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'itemName', header: 'Product', width: 150, hidden: false, sortable: true, dataIndex: 'itemName' },
                                                                    { id: 'capexCategory', header: 'Category', width: 100, hidden: true, sortable: true, dataIndex: 'capexCategory' },
                                                                    { id: 'QtyRequested', header: 'Qty Requested', width: 100, hidden: true, sortable: true, dataIndex: 'QtyRequested' },
                                                                    {
                                                                        id: 'QtySupplied', header: 'Qty Supplied', width: 80, hidden: false, sortable: true, dataIndex: 'QtySupplied'
                                                                    },
                                                                    {
                                                                        id: 'QtyOutstanding', header: 'Qty Outstanding', width: 150, hidden: false, sortable: false, dataIndex: 'QtyOutstanding'
                                                                    },
                                                                    {
                                                                        id: 'justification', header: 'Justification', width: 120, hidden: false, sortable: false, dataIndex: 'justification'
                                                                    },                                                                   
                                                                    {
                                                                        id: 'financialYear', header: 'Deadline', width: 120, hidden: false, sortable: false, dataIndex: 'financialYear'
                                                                    },
                                                                    {
                                                                        id: 'nameOfDepartment', header: 'Department', width: 200, hidden: false, sortable: false, dataIndex: 'nameOfDepartment'
                                                                    }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Fetch All',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        //fetch all. dppartmentID parameter = 0
                                                                        var nDepartmentID = 0;
                                                                        lib.getCapexItemGrid(pfx + '/Capex/GetCapexData', nDepartmentID, Ext.getCmp('capexGridAppr'));
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: '', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('capexGridAppr').getStore().removeAll();
                                                                        Ext.getCmp('capexDeptSearchFrm').getForm().reset();
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: '', text: 'Print Csv',
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
                            },
                            {
                                title: 'Capex Status', defaults: { xtype: 'panel', frame: true, border: true  },
                                items: [
                                    {
                                        defaults: { xtype: 'button', anchor: '90%' },layout:'column',
                                        items: [
                                            { id:'capexstatus', xtype: 'textfield', disabled: true },
                                            {
                                                id:'capex-btn-status',width:150,
                                                listeners: {
                                                    'afterrender': function () {
                                                        //get status of CAPEX upon rendering
                                                       
                                                        $.getJSON(pfx + '/Capex/GetCapexStatus', {}, function (r) {
                                                            
                                                            if (r.status.toString() == "true") {
                                                                $('#capexstatus').val(r.data.toString());
                                                                if (r.data.toString() == 'OPENED') {
                                                                    Ext.getCmp('capex-btn-status').setText('CLICK TO CLOSE CAPEX');
                                                                    CLOSED_CAPEX_STATUS_ID = 0;
                                                                }
                                                                else if (r.data.toString() == 'CLOSED') {
                                                                    Ext.getCmp('capex-btn-status').setText('CLICK TO OPEN CAPEX');
                                                                    CLOSED_CAPEX_STATUS_ID = 1;
                                                                }
                                                            }
                                                        });
                                                    },
                                                    'click': function (btn) {
                                                        $.post(pfx + '/Capex/PostCapexStatus',
                                                            { capexstatusId: CLOSED_CAPEX_STATUS_ID })
                                                            .done(function (r) {
                                                                if (r.status.toString() == "true") {

                                                                    Ext.getCmp('capex-btn-status').setText(r.data.toString());
                                                                    $('#capexstatus').val(r.btn.toString());

                                                                    if (r.btn.toString() == "OPENED")
                                                                    {
                                                                        CLOSED_CAPEX_STATUS_ID = 0;   
                                                                    }
                                                                    else
                                                                    {
                                                                        CLOSED_CAPEX_STATUS_ID = 1;
                                                                    }
                                                                }
                                                        });
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
            }).show();
        }

    });

});