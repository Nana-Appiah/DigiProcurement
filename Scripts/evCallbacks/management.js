Ext.onReady(function () {

    var mgmtEditor = lib.returnEditorControl();
    var mgmt = Ext.get('management');

    mgmt.on('click', function () {

        var req = Ext.getCmp('mgmtWdow');

        if (!req) {
            req = new Ext.Window({
                id: 'mgmtWdow',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'MANAGEMENT',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: '',
                                title: 'Create LPO',
                                defaults: {xtype:'panel', frame: true, height:550 }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel' }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '', title: 'Search',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'mgmtdept', store: lib.returnDepartmentStore('Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.returnRequisitionNumbersGrid('Requisition/GetRequisitionNos',2, Ext.getCmp('mgmtdept').getValue(), Ext.getCmp('mgmtReqGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Approved Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'mgmtReqGrid', height: 425, autoScroll: true, autoExpandColumn: 'RequisitionNo',
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
                                                                    { id: 'RequisitionNo', header: 'Requisition No', width: 150, hidden: false, sortable: true, dataIndex: 'RequisitionNo' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'rowdblclick': function (e, t) {
                                                                        //var record = e.getStore().getAt(t);
                                                                        //REQUISITION_ID = record.get('Id');
                                                                        //lib.returnRequistionDetails('Requisition/GetRequisitionDetails', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'));
                                                                        //lib.getItemGridGivenRequisitionID('Requisition/GetRequisitionItemList', REQUISITION_ID, Ext.getCmp('fnReqItemsGrid'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .6, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'mgmtRequest', title: 'Results', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                        items: [
                                                            { id: 'bRNo', xtype: 'textfield', fieldLabel: 'RequistionNo', disabled: true },
                                                            { id: 'bRequestee', xtype: 'textfield', fieldLabel: 'Requesting By', disabled: true },
                                                            { id: 'bDept', xtype: 'textfield', fieldLabel: 'Department', disabled: true },
                                                            { id: 'bComp', xtype: 'textfield', fieldLabel: 'Company', disabled: true }
                                                        ],
                                                        listeners: {
                                                            'render': function () {
                                                                //lib.getPrelimData('/Requisition/GetRequisitionPrelimData', Ext.getCmp('bRNo'), Ext.getCmp('bRequestee'), Ext.getCmp('bComp'), Ext.getCmp('bDept'));
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: '', title: 'Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'mgmtReqItemsGrid', height: 170, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                plugins: mgmtEditor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' },
                                                                        { name: 'status', type: 'string' },
                                                                        { name: 'amt', type:'int'}
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
                                                                        id: 'status', header: 'Status', width: 100, hidden: false, sortable: true, dataIndex: 'status'
                                                                    },
                                                                    {
                                                                        id: 'amt', header: 'Amt', width: 150, hidden: false, sortable: false, dataIndex: 'amt',
                                                                        editor: { xtype: 'numberfield', allowBlank: false, allowNegative: false, minValue:1, maxValue: 1000000}
                                                                    }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '', title: 'Approved Items'
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
            }).show();
        }

    });

});