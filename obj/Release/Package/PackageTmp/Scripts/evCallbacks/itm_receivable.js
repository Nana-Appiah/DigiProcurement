Ext.onReady(function () {

    var REQ_ID = 0;
    var REQ_No = '';
    var pfx = '';

    var rFrm = Ext.get('itm_receivable');

    rFrm.on('click', function () {

        var recF = Ext.getCmp('receiveWdow');

        if (!recF) {

            recF = new Ext.Window({
                id:'receiveWdow',
                title: 'ITEMS RECEIVABLE',
                height: 650,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 620 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: '', title: 'Receive Items', defaults: { xtype: 'panel', frame: true },
                                items: [
                                    {
                                        defaults: { xtype: 'panel', border: true, frame:true, height: 630 },layout:'column',
                                        items: [
                                            {
                                                columnWidth: .3, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'searchFrm', title: 'Department Search',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', anchor: '90%', allowBlank: false }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'dptsearch', store: lib.returnDepartmentStore('/Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.returnRequisitionNumbersGrid('/Requisition/GetRequisitionNos', 5, Ext.getCmp('dptsearch').getValue(), Ext.getCmp('mgmtFinalApprovedGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Final Approvals',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'mgmtFinalApprovedGrid', height: 425, autoScroll: true, autoExpandColumn: 'RequisitionNo',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionNo', type: 'string' },
                                                                        { name: 'Requestee', type: 'string' },
                                                                        { name: 'priority', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'RequisitionNo'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'RequisitionNo', header: 'Requisition No', width: 150, hidden: false, sortable: true, dataIndex: 'RequisitionNo' },
                                                                    { id: 'Requestee', header: 'Requisition No', width: 150, hidden: true, sortable: true, dataIndex: 'Requestee' },
                                                                    { id: 'priority', header: 'Priority', width: 150, hidden: true, sortable: true, dataIndex: 'priority' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);
                                                                        REQ_ID = record.get('Id');
                                                                        REQ_No = record.get('RequisitionNo');

                                                                        var STATUS_ID = 5;
                                                                        lib.returnRequisitionRecord('/Requisition/GetRequisitionDetails2', REQ_ID, STATUS_ID, Ext.getCmp('ApprLPOGrid'))
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .7, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'approvedLPOFrm', title: 'Approved LPOs',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'ApprLPOGrid', height: 200, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                //plugins: mgmtEditor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' }
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
                                                                    { id: 'narration', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'narration' }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'btn-item-receive', text: 'Receive Items',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var count = Ext.getCmp('ApprLPOGrid').getStore().getCount();
                                                                        if (count > 0) {
                                                                            Ext.MessageBox.confirm("Receive Items", "By this action, you are confirming taking physical custody of said items. Continue?", function (btn) {

                                                                                if (btn == "yes") {
                                                                                    //perform an action here
                                                                                    $.post('/Requisition/ReceiveProcurement', { ReqNo: REQ_No }).done(function (rs) {
                                                                                        if (rs.status.toString() == "true") {
                                                                                            Ext.Msg.alert('ITEMS RECEIVED', 'Items from requisition ' + REQ_No + ' physically received', this);
                                                                                            $('#btn-item-clear').trigger('click');
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'btn-item-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('searchFrm').getForm().reset();
                                                                        Ext.getCmp('mgmtFinalApprovedGrid').getStore().removeAll();
                                                                        Ext.getCmp('ApprLPOGrid').getStore().removeAll();
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
                    }
                ]
            }).show();

        }

    });

});