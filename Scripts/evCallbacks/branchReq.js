Ext.onReady(function () {

    //var editor = new Ext.ux.grid.RowEditor();
    var editor = lib.returnEditorControl();
    var BIGDATA = [];

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
                                                        id:'ufrmBRequest',title: 'Branch Requisition', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                        items: [
                                                            { id: 'bRNo', xtype: 'textfield', fieldLabel: 'RequistionNo', disabled: true },
                                                            { id: 'bReq', xtype: 'textfield', fieldLabel: 'Requesting By', disabled: true },
                                                            { id: 'bDept', xtype: 'textfield', fieldLabel: 'Department', disabled: true },
                                                            { id: 'bComp', xtype: 'textfield', fieldLabel: 'Company', disabled: true }
                                                        ],
                                                        listeners: {
                                                            'render': function () {
                                                                $.getJSON('/Requisition/GetRequisitionPrelimData', {}, function (r) {
                                                                    if (r.status.toString() == "true") {
                                                                        $('#bRNo').val(r.reqNo.toString()).attr('readonly', true);
                                                                        $('#bReq').val(r.requester.toString()).attr('readonly', true);
                                                                        $('#bComp').val(r.companyName).attr('readonly', true);
                                                                        $('#bDept').val(r.department).attr('readonly', true);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id:'ufrmBDetails',title: 'Requisition Details', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                        items: [
                                                            {
                                                                id: '', fieldLabel: 'Requisition Type', store: lib.RequisitionTypeStore('/Utility/GetRequisitionTypes'),
                                                                valueField: 'RequisitionTypeID', displayField:'RequisitionType1'
                                                            },
                                                            {
                                                                id: '', fieldLabel: 'Currency', store: lib.currencyStore('/Utility/GetCurrencies'),
                                                                valueField: 'Id', displayField: 'nameOfcurrency'
                                                            },
                                                            {
                                                                id: '', fieldLabel: 'Priority', store: lib.PriorityTypeStore('/Utility/GetPriorityTypes'),
                                                                valueField: 'Id', displayField:'nameOfPriority'
                                                            },
                                                            {
                                                                xtype:'textfield', id:'', fieldLabel: 'Location'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Requisition::Item Pool',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'Req', height: 180, autoScroll: true, autoExpandColumn: 'ProductName',
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
                                                                        var ff = Ext.getCmp('ufrmBDetails').getForm();
                                                                        if (ff.isValid())
                                                                        {
                                                                            var result = [];
                                                                            BIGDATA.length = 0;
                                                                            var orders = [];
                                                                            var ee = Ext.getCmp('Req').getStore().getRange();
                                                                            var knt = 0;

                                                                            Ext.each(ee, function (item, idx) {
                                                                                if (parseInt(item.get('qty')) > 0) {
                                                                                    orders[idx] = [item.get('Id'), item.get('ProductName'), (item.get('qty') + ' units of ' + item.get('ProductName')), item.get('ProductCode'), item.get('qty')];
                                                                                    knt++;
                                                                                }
                                                                            });

                                                                            console.log(orders);

                                                                            result = orders.filter(function (val) { return val !== undefined; });
                                                                            for (var z = 0; z < result.length; z++) {
                                                                                BIGDATA.push(result[z]);
                                                                            }
                                                                            console.log(BIGDATA);
                                                                            //give selection of data to grid 
                                                                            Ext.getCmp('xBrRqList').getStore().loadData(BIGDATA);

                                                                        }
                                                                        else {
                                                                            Ext.Msg.alert('BRANCH REQUISITION STATUS', 'Please enter mandatory fields to do selection of Items', this);
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: '', text: 'Clear Selected',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('ufrmBRequest').getForm().reset();
                                                                        Ext.getCmp('Req').getStore().removeAll();
                                                                        Ext.getCmp('xBrRqList').getStore().removeAll();
                                                                        lib.getItemGrid('/Utility/GetItemList', Ext.getCmp('Req'));
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
                                                                        { name: 'ProductDescription', type: 'string' },
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
                                                                    { id: 'ProductName', header: 'Item Name', width: 350, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                                    { id: 'ProductDescription', header: 'Reqn Desc', width: 250, hidden: false, sortable: true, dataIndex: 'ProductDescription' },
                                                                    { id: 'ProductCode', header: 'Item Code', width: 250, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                                    { id: 'Qty', header: 'Units', width: 250, hidden: true, sortable: true, dataIndex: 'Qty' }
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