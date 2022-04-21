Ext.onReady(function () {

    var editor = lib.returnEditorControl();
    var capexform = Ext.get('capex');

    var CAPEX_LIST = [];

    capexform.on('click', function () {

        var capexFrm = Ext.getCmp('frmCapex');

        if (!capexFrm) {
            capexFrm = new Ext.Window({
                id: 'frmCapex',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'CAPEX FORM',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: '',
                                title: 'Annual Procurement Planner', defaults: { xtype: 'panel' }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'form', frame: true, border: true },
                                        items: [
                                            {
                                                id: 'capfrm',
                                                items: [
                                                    new Ext.grid.GridPanel({
                                                        id: 'capexGrid', height: 500, autoScroll: true, autoExpandColumn: 'ProductName',
                                                        plugins: editor,
                                                        store: new Ext.data.GroupingStore({
                                                            reader: new Ext.data.ArrayReader({}, [
                                                                { name: 'Id', type: 'int' },
                                                                { name: 'ProductName', type: 'string' },
                                                                { name: 'ProductCode', type: 'string' },
                                                                { name: 'Metric', type: 'string' },
                                                                { name: 'qty', type: 'int' },
                                                                { name: 'justification', type: 'string' },
                                                                { name: 'deadline', type:'string'}
                                                            ]),
                                                            sortInfo: {
                                                                field: 'Id',
                                                                direction: 'ASC'
                                                            },
                                                            groupField: 'ProductName'
                                                        }),
                                                        columns: [
                                                            { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                            { id: 'ProductName', header: 'Product', width: 150, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                            { id: 'ProductCode', header: 'Code', width: 100, hidden: true, sortable: true, dataIndex: 'ProductCode' },
                                                            { id: 'Metric', header: 'Measurement', width: 100, hidden: true, sortable: true, dataIndex: 'Metric' },
                                                            {
                                                                id: 'qty', header: 'Qty', width: 80, hidden: false, sortable: true, dataIndex: 'qty',
                                                                editor: { xtype: 'numberfield', allowBlank: true, allowNegative: false, minValue: 0, maxValue: 1000 }
                                                            },
                                                            {
                                                                id: 'justification', header: 'Justification', width: 150, hidden: false, sortable: false, dataIndex: 'justification',
                                                                editor: {xtype:'textfield', allowBlank: true}
                                                            },
                                                            {
                                                                id: 'deadline', header: 'Deadline', width: 120, hidden: false, sortable: false, dataIndex: 'deadline',
                                                                editor: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', store: lib.returnMonthStore() }
                                                            }
                                                        ],
                                                        stripeRows: true,
                                                        listeners: {
                                                            'render': function () {
                                                                lib.getItemGrid('Utility/GetItemList', Ext.getCmp('capexGrid'));
                                                            }
                                                        }
                                                    })
                                                ],
                                                buttons: [
                                                    {
                                                        id: 'capex-btn-save', text: 'Save Capex Plan',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                if (Ext.getCmp('capexGrid').getStore().getCount() > 0) {
                                                                    CAPEX_LIST.length = 0;
                                                                    var knt = 0;
                                                                    var results = [];
                                                                    var arr = [];

                                                                    var ee = Ext.getCmp('capexGrid').getStore().getRange();
                                                                    Ext.each(ee, function (item, idx) {
                                                                        if (parseInt(item.get('qty')) > 0) {
                                                                            var str = item.get('Id') + ',' + item.get('ProductCode') + ',' + item.get('ProductName') + ',' + item.get('qty') + ',' + item.get('justification') + ',' + item.get('deadline');
                                                                            
                                                                            //CAPEX_LIST[idx] = [item.get('Id'), item.get('ProductCode'), item.get('ProductName'), item.get('qty'), item.get('justification'), item.get('deadline')];
                                                                            arr[idx] = str;
                                                                            knt++;

                                                                        }
                                                                    });

                                                                    result = arr.filter(function (val) { return val !== undefined; });
                                                                    for (var z = 0; z < result.length; z++) {
                                                                        CAPEX_LIST.push(result[z]);
                                                                    }

                                                                    console.log(CAPEX_LIST);
                                                                    $.post('Capex/PostCapexData', { _data: CAPEX_LIST })
                                                                        .done(function (r) {
                                                                            if (r.status.toString() == "true") {
                                                                                Ext.MessageBox.alert("CAPEX", r.data, this);
                                                                                $('#capex-btn-clear').trigger('click');
                                                                            }
                                                                    });

                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'capex-btn-clear', text: 'Clear Capex',
                                                        listeners: {
                                                            'click': function (btn) {
                                                                //Ext.getCmp('capexGrid').getStore().removeAll();
                                                                lib.getItemGrid('Utility/GetItemList', Ext.getCmp('capexGrid'));
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //another panel
                            //{
                            //    title:'Another title'
                            //}
                        ]
                    }
                ]
            }).show();
        }

    });

});