Ext.onReady(function () {

    //var editor = new Ext.ux.grid.RowEditor();
    var editor = lib.returnEditorControl();

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
                                                    { title:'Search'},
                                                    {
                                                        title: 'Requisition Items::Item Pool',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'Req', height: 250, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                plugins: editor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'Metric', type: 'string' },
                                                                        { name: 'qty', type: 'int' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ProductName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'ProductName', header: 'Product', width: 400, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                                    { id: 'ProductCode', header: 'Code', width: 100, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                                    { id: 'Metric', header: 'Measurement', width: 100, hidden: true, sortable: true, dataIndex: 'Metric' },
                                                                    {
                                                                        id: 'Qty', header: 'Qty', width: 100, hidden: false, sortable: true, dataIndex: 'qty',
                                                                        editor: { xtype: 'numberfield', allowBlank: true, allowNegative: false, minValue: 0, maxValue: 1000 }
                                                                    }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.getItemGrid('/Utility/GetItemList', Ext.getCmp('Req'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.getItemGrid('/Utility/GetItemList', Ext.getCmp('Req'));
                                                                        },180000);
                                                                    }
                                                                }
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Add Selected',
                                                                listeners: {
                                                                    'click': function (btn) {

                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: '', text: 'Clear Selected',
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
                                                columnWidth: .5, title: 'Requisitioned Items', defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'xBrRqList', height: 250, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'Qty', type: 'int' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ProductName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'ProductName', header: 'Item Desc', width: 250, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                                    { id: 'ProductCode', header: 'Item Qty', width: 250, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                                    { id: 'Qty', header: 'Rate', width: 250, hidden: false, sortable: true, dataIndex: 'Qty' }
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
                                                        title: 'Brief Comments', defaults: { xtype: 'htmleditor', height:150, anchor: '95%', allowBlank: false },layout:'fit',
                                                        items: [
                                                            {id:''}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Send Requistion',
                                                                handler: function (btn) {

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