Ext.onReady(function () {

    var REQUISITION_ID = 0;
    var gridEditor = lib.returnEditorControl();
    var APPROVED_REQUISITIONS = [];

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
                                                                id: 'fnDept', store: lib.returnDepartmentStore('Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.returnRequisitionNumbersGrid('Requisition/GetRequisitionNos', Ext.getCmp('fnDept').getValue(), Ext.getCmp('fnReqGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Pending Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'fnReqGrid', height: 425, autoScroll: true, autoExpandColumn: 'RequisitionNo',
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
                                                                        lib.returnRequistionDetails('Requisition/GetRequisitionDetails', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'));
                                                                        lib.getItemGridGivenRequisitionID('Requisition/GetRequisitionItemList', REQUISITION_ID, Ext.getCmp('fnReqItemsGrid'));
                                                                    }
                                                                }
                                                            })
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
                                                                stripeRows: true
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
                                                                        $.post('Requisition/ApproveRequisition', { dta: APPROVED_REQUISITIONS })
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
                                                                        id: '', title: 'Search',
                                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, allowBlank: false, mode:'local' }, layout: 'fit',
                                                                        items: [
                                                                            { id: '', valueField: 'Id', displayField: 'ProductName', store: lib.returnItemStore('Utility/GetItemList') }
                                                                        ]
                                                                    },
                                                                    {
                                                                        id: '', title: 'Search Results',
                                                                        items: [
                                                                            //grid comes here
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
                            //{ title: 'Testing'}
                        ]
                    }
                ]
            }).show();
        }

    });

});