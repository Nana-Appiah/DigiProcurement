Ext.onReady(function () {

    var breq = Ext.get('branchReq');

    breq.on('click', function () {

        var req = Ext.getCmp('branchRequisition');

        if (!req) {
            req = new Ext.Window({
                id: 'branchRequisition',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'BRANCH REQUISITION FORM',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: 'vMaster',
                                title: 'Requistion Center',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'fit',
                                items: [
                                    {
                                        defaults: { xtype: 'panel', frame: true, border: false }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        title: 'Branch Requisition', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                        items: [
                                                            { id: 'bRNo', xtype: 'textfield', fieldLabel: 'RequistionNo', disabled: true },
                                                            { id: 'bReq', xtype: 'textfield', fieldLabel: 'Requested By', disabled: true },
                                                            { id: 'bAccYr', xtype: 'textfield', fieldLabel: 'Accounting Yr', disabled: true },
                                                            { id: 'bDept', xtype: 'textfield', fieldLabel: 'Department', disabled: true }
                                                        ],
                                                        listeners: {
                                                            'render': function () {
                                                                $.getJSON('/Requisition/GetRequisitionNumber', {}, function (r) {
                                                                    if (r.status.toString() == "true") {
                                                                        $('#bRNo').val(r.data.toString()).attr('readonly',true);
                                                                    }
                                                                });
                                                                
                                                                $('#bReq').attr('readonly', true);
                                                                $('#bAccYr').attr('readonly', true);
                                                                $('#bDept').attr('readonly', true);
                                                            }
                                                        }
                                                    },
                                                    {
                                                        title: 'Add Requisition Items', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor:'95%' },
                                                        items: [
                                                            { id: '', fieldLabel: 'Item', emptyText: 'select Item' },
                                                            { id:'',xtype:'numberfield', fieldLabel: 'Quantity', emptyText:'enter quantity'}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Add Item',
                                                                listeners: {
                                                                    'click': function (btn) {

                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '',title:'Brief comments', defaults: { xtype: 'htmleditor', height:150 },layout:'fit',
                                                        items: [
                                                            {}
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .5, title: 'testing', defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'xBrRqList', height: 300, autoScroll: true, autoExpandColumn: 'ItemDescription',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'ItemID', type: 'int' },
                                                                        { name: 'ItemDescription', type: 'string' },
                                                                        { name: 'ItemQuantity', type: 'int' },
                                                                        { name: 'ItemRate', type: 'double' },
                                                                        { name: 'ItemAmt', type: 'double' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'ItemID',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ItemDescription'
                                                                }),
                                                                columns: [
                                                                    { id: 'ItemID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'VendorTypeID' },
                                                                    { id: 'ItemDescription', header: 'Item Desc', width: 250, hidden: false, sortable: true, dataIndex: 'ItemDescription' },
                                                                    { id: 'ItemQuantity', header: 'Item Qty', width: 250, hidden: false, sortable: true, dataIndex: 'ItemQuantity' },
                                                                    { id: 'ItemRate', header: 'Rate', width: 250, hidden: false, sortable: true, dataIndex: 'ItemRate' },
                                                                    { id: 'ItemAmt', header: 'Amount', width: 250, hidden: false, sortable: true, dataIndex: 'ItemAmt' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        //calls function when the grid is rendered to the screen

                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    },
                                                    {
                                                        title: 'Estimated Total Requisition (based on Average weighted Price)', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                        items: [
                                                            {id:'', fieldLabel:'Total Amt'}
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