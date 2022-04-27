Ext.onReady(function () {

    var def_pic = "standard.jpg";
    var LPO_ID = 0;

    var approvalFrm = Ext.get('approval');

    approvalFrm.on('click', function () {

        var approveFrm = Ext.getCmp('apprFrm');

        if (!approveFrm) {
            approveFrm = new Ext.Window({
                id: 'mgmtWdow',
                height: 700,
                width: 1300,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'EXECUTIVE APPROVALS',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 670 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: '', title: 'Procurement Approval',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel' },layout:'column',
                                        items: [
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                items: [
                                                    {
                                                        id: '', title: 'Search for Status',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            {}
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Procurements',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'procGrid', height: 550, autoScroll: true, autoExpandColumn: 'LPONumber',
                                                                //plugins: editor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'requisitionNumber', type: 'string' },
                                                                        { name: 'nameOfVendor', type: 'string' },
                                                                        { name: 'LPOTotalAmount', type: 'string' },
                                                                        { name: 'LPONumber', type: 'string' },
                                                                        { name: 'statusOfLPO', type: 'string' },

                                                                        { name: 'PurchaseDate', type: 'datetime' },
                                                                        { name: 'ExpectedDate', type: 'datetime' },
                                                                        { name: 'ShippingAddress', type: 'string' },
                                                                        { name: 'PaymentTerm', type: 'string' }

                                                                    ]),
                                                                    groupField: 'LPONumber'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'Requisition', width: 150, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'requisitionNumber', header: 'Req #', width: 150, hidden: true, sortable: true, dataIndex: 'requisitionNumber' },
                                                                    { id: 'nameOfVendor', header: 'Vendor', width: 150, hidden: true, sortable: true, dataIndex: 'nameOfVendor' },
                                                                    { id: 'LPOTotalAmount', header: 'Amount', width: 150, hidden: true, sortable: true, dataIndex: 'LPOTotalAmount' },
                                                                    { id: 'LPONumber', header: 'LPO #', width: 250, hidden: false, sortable: true, dataIndex: 'LPONumber' },
                                                                    { id: 'statusOfLPO', header: 'Status', width: 150, hidden: true, sortable: true, dataIndex: 'statusOfLPO' },

                                                                    { id: 'PurchaseDate', header: 'Purchase Date', width: 150, hidden: true, sortable: true, dataIndex: 'PurchaseDate' },
                                                                    { id: 'ExpectedDate', header: 'Expected Date', width: 150, hidden: true, sortable: true, dataIndex: 'ExpectedDate' },
                                                                    { id: 'ShippingAddress', header: 'Address', width: 150, hidden: true, sortable: true, dataIndex: 'ShippingAddress' },
                                                                    { id: 'PaymentTerm', header: 'Payment Term', width: 150, hidden: true, sortable: true, dataIndex: 'PaymentTerm' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnLocalPurchasingOrderApprovalGrid('/ProcessFlow/GetLPOsToApprove', Ext.getCmp('procGrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnLocalPurchasingOrderApprovalGrid('/ProcessFlow/GetLPOsToApprove', Ext.getCmp('procGrid'));
                                                                        },30000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var rec = e.getStore().getAt(t);

                                                                        LPO_ID = rec.get('Id');
                                                                        $('#vd').val(rec.get('nameOfVendor'));
                                                                        $('#pd').val(rec.get('PurchaseDate'));
                                                                        $('#dd').val(rec.get('ExpectedDate'));

                                                                        $('#sha').val(rec.get('ShippingAddress'));
                                                                        $('#pt').val(rec.get('PaymentTerm'));
                                                                        $('#rq').val(rec.get('requisitionNumber'));

                                                                        //get approval history
                                                                        lib.returnApprovalHistoryGrid('/ProcessFlow/GetLPOApprovalHistory', LPO_ID, Ext.getCmp('procApprovalGrid'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .6, defaults: { xtype: 'panel', frame: true, border: true },layout:'form',
                                                items: [
                                                    {
                                                        defaults: { xtype: 'form',frame:true, border: true }, layout:'column',
                                                        items: [
                                                            {
                                                                columnWidth: .5, defaults: { xtype: 'textfield', anchor:'90%', disabled: true },title:'I',
                                                                items: [
                                                                    { id: 'vd', fieldLabel: 'Vendor', emptyText:'vendor' },
                                                                    { id: 'pd', fieldLabel: 'Purchase Date',emptyText:'purchase order date' },
                                                                    { id: 'dd', fieldLabel: 'Delivery Date', emptyText:'expected delivery date' }
                                                                ]
                                                            },
                                                            {
                                                                columnWidth: .5, defaults: { xtype: 'textfield', anchor:'90%', disabled: true }, title: 'II',
                                                                items: [
                                                                    { id: 'sha', fieldLabel: 'Shipping Address', emptyText:'shipping address' },
                                                                    { id: 'pt', fieldLabel: 'Payment Term', emptyText:'payment terms' },
                                                                    { id: 'rq', fieldLabel: 'Requisition', emptyText:'LPO requisition source' }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                        items: [
                                                            {
                                                                id: '',
                                                                items: [
                                                                    new Ext.grid.GridPanel({
                                                                        id: 'procApprovalGrid', height: 200, autoScroll: true, autoExpandColumn: 'PersonTag',
                                                                        store: new Ext.data.GroupingStore({
                                                                            reader: new Ext.data.ArrayReader({}, [
                                                                                { name: 'Id', type: 'int' },
                                                                                { name: 'LPO', type: 'string' },
                                                                                { name: 'PersonTag', type: 'string' },
                                                                                { name: 'ApprovalDate', type: 'string' },
                                                                                { name: 'ApprovalStatus', type: 'string' },
                                                                                { name: 'ApprovalComments', type: 'string' }
                                                                            ]),
                                                                            sortInfo: {
                                                                                field: 'Id',
                                                                                direction: 'ASC'
                                                                            },
                                                                            groupField: 'PersonTag'
                                                                        }),
                                                                        columns: [
                                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                            { id: 'LPO', header: 'LPO', width: 150, hidden: false, sortable: true, dataIndex: 'LPO' },
                                                                            { id: 'PersonTag', header: 'Person', width: 150, hidden: false, sortable: true, dataIndex: 'PersonTag' },
                                                                            { id: 'ApprovalDate', header: 'Date', width: 150, hidden: true, sortable: true, dataIndex: 'ApprovalDate' },
                                                                            { id: 'ApprovalStatus', header: 'Status', width: 150, hidden: true, sortable: true, dataIndex: 'ApprovalStatus' },
                                                                            { id: 'ApprovalComments', header: 'Comments', width: 150, hidden: true, sortable: true, dataIndex: 'ApprovalComments' }
                                                                        ],
                                                                        stripeRows: true,
                                                                        listeners: {
                                                                            'rowdblclick': function (e, t) {
                                                                                var record = e.getStore().getAt(t);
                                                                                $('#hist_comments').val(record.get('ApprovalComments'));
                                                                            }
                                                                        }
                                                                    })
                                                                ]
                                                            },
                                                            {
                                                                id: '', defaults: { xtype: 'textarea', disabled: true }, layout: 'fit',
                                                                items: [
                                                                    { id: 'hist_comments' }
                                                                ]
                                                            },
                                                            {
                                                                id:'frmstatus',defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', store: ['Approve', 'Reject'] }, layout: 'fit',
                                                                items: [
                                                                    {id:'cboapprstatus'}
                                                                ]
                                                            },
                                                            {
                                                                id: 'frmcomments', title: 'Comments', defaults: { xtype: 'textarea' }, layout: 'fit',
                                                                items: [
                                                                    { id: 'current_comments' }
                                                                ],
                                                                buttons: [
                                                                    {
                                                                        id: 'btn-procurement-approve', text: 'Approve Procurement',
                                                                        listeners: {
                                                                            'click': function (btn) {
                                                                                var statusFrm = Ext.getCmp('frmstatus').getForm();
                                                                                var commentsFrm = Ext.getCmp('frmcomments').getForm();

                                                                                if (statusFrm.isValid() && (commentsFrm.isValid())) {
                                                                                    $.post('/ProcessFlow/SaveApprovalActivity',
                                                                                        {
                                                                                            _ID: LPO_ID, _status: Ext.fly('cboapprstatus').getValue(),
                                                                                            _comments: Ext.fly('current_comments').getValue()
                                                                                        })
                                                                                        .done(function (r) {
                                                                                            if (r.status.toString() == "true") {
                                                                                                Ext.Msg.alert('PROCUREMENT APPROVAL', r.data, this);
                                                                                            }
                                                                                    });
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }  
                                                ]
                                            },

                                            { columnWidth:.2, title:'Documents'}

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