Ext.onReady(function () {

    var mgmtEditor = lib.returnEditorControl();
    var REQUISITION_NUMBER = '';
    var LPO_Status = '';

    var LPO_ID = 0;
    var LPO_No = '';

    var mgmt = Ext.get('management');

    mgmt.on('click', function () {

        var req = Ext.getCmp('mgmtWdow');

        if (!req) {
            req = new Ext.Window({
                id: 'mgmtWdow',
                height: 650,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'MANAGEMENT',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 620 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: '',
                                title: 'Build LPO',
                                defaults: { xtype: 'panel', frame: true, height: 600 }, layout: 'form',
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
                                                                        lib.returnRequisitionNumbersGrid('Requisition/GetRequisitionNos', 2, Ext.getCmp('mgmtdept').getValue(), Ext.getCmp('mgmtReqGrid'));
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

                                                                        var REQUISITION_ID = record.get('Id');
                                                                        REQUISITION_NUMBER = record.get('RequisitionNo');

                                                                        $('#mgmbRNo').val(record.get('RequisitionNo'));
                                                                        $('#mgmbRequestee').val(record.get('Requestee'));
                                                                        $('#mgmPriority').val(record.get('priority'));
                                                                        //REQUISITION_ID = record.get('Id');
                                                                        //lib.returnRequistionDetails('Requisition/GetRequisitionDetails', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'));
                                                                        lib.getItemGridGivenRequisitionID('Requisition/GetRequisitionItemList', REQUISITION_ID, 2, Ext.getCmp('mgmtReqItemsGrid'));
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
                                                            { id: 'mgmbRNo', xtype: 'textfield', fieldLabel: 'RequistionNo', disabled: true },
                                                            { id: 'mgmbRequestee', xtype: 'textfield', fieldLabel: 'Requesting By', disabled: true },
                                                            { id: 'mgmPriority', xtype: 'textfield', fieldLabel: 'Priority', disabled: true }
                                                        ],
                                                        listeners: {
                                                            'render': function () {
                                                                //lib.getPrelimData('/Requisition/GetRequisitionPrelimData', Ext.getCmp('bRNo'), Ext.getCmp('bRequestee'), Ext.getCmp('bComp'), Ext.getCmp('bDept'));
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'mgmreqs', title: 'Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'mgmtReqItemsGrid', height: 200, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                plugins: mgmtEditor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' },
                                                                        { name: 'amt', type: 'int' }
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
                                                                        id: 'amt', header: 'Amt', width: 150, hidden: false, sortable: false, dataIndex: 'amt',
                                                                        editor: {
                                                                            xtype: 'numberfield', allowBlank: false, allowNegative: false, minValue: 1, maxValue: 1000000
                                                                        }
                                                                    }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Calculate Total Amout',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        //update requisition with amount column
                                                                        //create an LPO record
                                                                        //update requisition with LPO_ID

                                                                        var tot = 0;

                                                                        var ee = Ext.getCmp('mgmtReqItemsGrid').getStore().getRange();
                                                                        Ext.each(ee, function (item, idx) {
                                                                            tot = tot + parseInt(item.get('amt'));
                                                                        });

                                                                        $('#txtTotal').val(tot.toString());
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'mgmproctotal', title: 'Procurement Total', defaults: { xtype: 'textfield', allowBlank: false, disabled: true }, layout: 'fit',
                                                        items: [
                                                            { id: 'txtTotal', style: { 'font-size': '20px', 'color': 'red', 'text-align': 'center' } }
                                                        ]
                                                    },
                                                    {
                                                        id: 'mgmvendorfrm', title: 'Select Vendor',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            { id: 'mgmvendor', store: lib.returnVendorStore('Utility/GetVendors'), valueField: 'VendorID', displayField: 'VendorName' }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Build LPO',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var reqs = [];
                                                                        var swap = [];
                                                                        var resultant = [];

                                                                        var store = Ext.getCmp('mgmtReqItemsGrid').getStore().getRange();

                                                                        Ext.each(store, function (item, idx) {
                                                                            if (parseInt(item.get('amt')) > 0) {
                                                                                var str = item.get('Id') + ',' + item.get('amt');
                                                                                swap[idx] = [str];
                                                                            }
                                                                        });

                                                                        resultant = swap.filter(function (val) { return val !== undefined; });
                                                                        for (var z = 0; z < resultant.length; z++) {
                                                                            reqs.push(resultant[z]);
                                                                        }

                                                                        $.post('Requisition/CreateLPORecord',
                                                                            {
                                                                                rNo: REQUISITION_NUMBER, vID: Ext.getCmp('mgmvendor').getValue(),
                                                                                LPOstatus: 3, finStatusId: 3, totAmt: Ext.fly('txtTotal').getValue(),
                                                                                dta: reqs
                                                                            }).done(function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    Ext.MessageBox.alert("LOCAL PURCHASE ORDER", r.data, this);
                                                                                    $('#mgm-btn-clear').trigger('click');
                                                                                }
                                                                            })
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'mgm-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('mgmtRequest').getForm().reset();
                                                                        Ext.getCmp('mgmtReqItemsGrid').getStore().removeAll();
                                                                        Ext.getCmp('mgmproctotal').getForm().reset();
                                                                        Ext.getCmp('mgmvendorfrm').getForm().reset();
                                                                    }
                                                                }
                                                            }
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
                            },
                            {
                                id: '',
                                title: 'Create LPO',
                                defaults: { xtype: 'panel', frame: true, height: 580 }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel' }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .3, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '', title: 'Local Purchasing Orders',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'LPOGrid', height: 450, autoScroll: true, autoExpandColumn: 'LPONumber',
                                                                //plugins: editor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'requisitionNumber', type: 'string' },
                                                                        { name: 'nameOfVendor', type: 'string' },
                                                                        { name: 'LPOTotalAmount', type: 'string' },
                                                                        { name: 'LPONumber', type: 'string' },
                                                                        { name: 'statusOfLPO', type: 'string' }

                                                                    ]),
                                                                    groupField: 'LPONumber'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'Requisition', width: 150, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'requisitionNumber', header: 'Req #', width: 150, hidden: true, sortable: true, dataIndex: 'requisitionNumber' },
                                                                    { id: 'nameOfVendor', header: 'Vendor', width: 150, hidden: true, sortable: true, dataIndex: 'nameOfVendor' },
                                                                    { id: 'LPOTotalAmount', header: 'Amount', width: 150, hidden: true, sortable: true, dataIndex: 'LPOTotalAmount' },
                                                                    { id: 'LPONumber', header: 'LPO #', width: 250, hidden: false, sortable: true, dataIndex: 'LPONumber' },
                                                                    { id: 'statusOfLPO', header: 'Status', width: 150, hidden: false, sortable: true, dataIndex: 'statusOfLPO' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnLocalPurchasingOrderGrid('Requisition/GetLPOs', Ext.getCmp('LPOGrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnLocalPurchasingOrderGrid('Requisition/GetLPOs', Ext.getCmp('LPOGrid'));
                                                                        },5000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var rec = e.getStore().getAt(t);
                                                                        $('#lpodetvendor').val(rec.get('nameOfVendor'));
                                                                        $('#lpodetamt').val(rec.get('LPOTotalAmount'));

                                                                        LPO_Status = rec.get('statusOfLPO');
                                                                        LPO_ID = rec.get('Id');
                                                                        LPO_No = rec.get('LPONumber');

                                                                        lib.returnItemGridGivenLPONumber('Requisition/GetRequisitionItemListUsingLPO', rec.get('Id'), Ext.getCmp('LPOReqGrid'));
                                                                    }
                                                                }
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Refresh',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        lib.returnLocalPurchasingOrderGrid('Requisition/GetLPOs', Ext.getCmp('LPOGrid'));
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
                                                        id: 'LPORegGridFrm', title: 'Grid comes here',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'LPOReqGrid', height: 100, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' },
                                                                        { name: 'amt', type: 'decimal' }
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
                                                                        id: 'amt', header: 'Amt', width: 150, hidden: false, sortable: false, dataIndex: 'amt'
                                                                    }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    },
                                                    {
                                                        id: 'LPODetailsFrm', title: 'LPO Details', defaults: { xtype: 'textfield', anchor: '95%', disabled: true }, layout: 'form',
                                                        items: [
                                                            { id: 'lpodetvendor', fieldLabel: 'Vendor' },
                                                            { id: 'lpodetamt', fieldLabel: 'Amount (GHc)' }
                                                        ]
                                                    },
                                                    {
                                                        id: 'LPOProcFrm', title: 'Procurement Type', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'proctypeid', store: lib.returnProcurementTypeStore('Utility/GetProcurementTypes'),
                                                                valueField: 'ProcurementTypeID', displayField: 'ProcurementDescription',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.returnProcessFlowData('Requisition/GetProcessFlowDetails', Ext.getCmp('proctypeid').getValue(), Ext.getCmp('LPOPFLimit'), Ext.getCmp('PFListGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'LPOotherFrm', title: 'Other Info', defaults: { xtype: 'datefield', format: 'd-m-Y', anchor: '95%' }, layout: 'form',
                                                        items: [
                                                            { xtype: 'numberfield', id: 'vat', fieldLabel: 'VAT', minValue: 1, maxValue: 30 },
                                                            { id: 'pdate', fieldLabel: 'Purchase Date' },
                                                            { id: 'expdate', fieldLabel: 'Delivery Date' },
                                                            { xtype: 'combo', id: 'payment', fieldLabel: 'Payment Term', forceSelection: true, typeAhead: true, mode: 'local', store: ['Cash', 'Cheque'] },
                                                            { xtype: 'textfield', id: 'cheque', fieldLabel: 'Cheque No' },
                                                            { xtype: 'textfield', id: 'shipping', fieldLabel: 'Shipping Addr' },
                                                            { xtype: 'textarea', id: 'terms', fieldLabel: 'Terms and Conditions' }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'lpo-btn-save', text: 'Send LPO for Approval',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var procfrm = Ext.getCmp('LPOProcFrm').getForm();
                                                                        var frm = Ext.getCmp('LPODetailsFrm').getForm();
                                                                        var ff = Ext.getCmp('LPOotherFrm').getForm();

                                                                        if (frm.isValid() && ff.isValid() && procfrm.isValid())
                                                                        {
                                                                            if (LPO_Status != "Vendor selected") {
                                                                                Ext.MessageBox.alert("LPO Generated", "Selected Local Purchase Order has already been generated", this);
                                                                                return false;
                                                                            }

                                                                            var str = LPO_ID + ',' + Ext.fly('vat').getValue() + ',' + Ext.fly('pdate').getValue() + ',' +
                                                                                Ext.fly('expdate').getValue() + ',' + Ext.fly('shipping').getValue() + ',' +
                                                                                Ext.fly('payment').getValue() + ',' + Ext.fly('terms').getValue() + ',' + Ext.getCmp('proctypeid').getValue();

                                                                            $.post('Requisition/CreateLocalPurchasingOrder',
                                                                                {
                                                                                    _value: str
                                                                                })
                                                                                .done(function (r) {
                                                                                    if (r.status.toString() == "true") {
                                                                                        $('#lpo-btn-clear').trigger('click');
                                                                                        Ext.MessageBox.alert("Local Purchasing Order", "LPO with number " + LPO_No + " sent for approval", this)
                                                                                    }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'lpo-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('LPORegGridFrm').getForm().reset();
                                                                        Ext.getCmp('LPODetailsFrm').getForm().reset();
                                                                        Ext.getCmp('LPOProcFrm').getForm().reset();
                                                                        Ext.getCmp('LPOotherFrm').getForm().reset();

                                                                        Ext.getCmp('LPOPFLimitFrm').getForm().reset();
                                                                        Ext.getCmp('PFListGrid').getStore().removeAll();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true },layout:'form',
                                                items: [
                                                    {
                                                        id: 'LPOPFLimitFrm', title: 'Threshold Limit', defaults: { xtype: 'textfield', allowBlank: false, style: { 'font-size': '15px', 'color': 'red', 'text-align': 'center' } }, layout: 'fit',
                                                        items: [
                                                            {id:'LPOPFLimit'}
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Approving Actors',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'PFListGrid', height: 425, autoScroll: true, autoExpandColumn: 'value',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'value', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'value'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'Id', width: 150, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'value', header: 'Persons', width: 150, hidden: false, sortable: true, dataIndex: 'value' }
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
            }).show();
        }

    });

});