Ext.onReady(function () {

    var def_pic = "standard.jpg";

    var approvalFrm = Ext.get('approval');

    approvalFrm.on('click', function () {

        var approveFrm = Ext.getCmp('apprFrm');

        if (!approveFrm) {
            approveFrm = new Ext.Window({
                id: 'mgmtWdow',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'EXECUTIVE APPROVALS',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
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
                                                                id: 'procGrid', height: 425, autoScroll: true, autoExpandColumn: 'RequisitionNo',
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
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .6, defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                items: [
                                                    {
                                                        id: '',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'procApprovalGrid', height: 250, autoScroll: true, autoExpandColumn: 'Person',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'Person', type: 'string' },
                                                                        { name: 'Date', type: 'string' },
                                                                        { name: 'Status', type: 'string' },
                                                                        { name: 'Comments', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'Person'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'Person', header: 'Person', width: 150, hidden: false, sortable: true, dataIndex: 'Person' },
                                                                    { id: 'Date', header: 'Date', width: 150, hidden: true, sortable: true, dataIndex: 'Date' },
                                                                    { id: 'Status', header: 'Status', width: 150, hidden: true, sortable: true, dataIndex: 'Status' },
                                                                    { id: 'Comments', header: 'Comments', width: 150, hidden: true, sortable: true, dataIndex: 'Comments' }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    },
                                                    {
                                                        id: '', defaults: { xtype: 'textarea', disabled: true }, layout: 'fit',
                                                        items: [
                                                            { id: '' }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Comments', defaults: { xtype: 'textarea' }, layout: 'fit',
                                                        items: [
                                                            {id:''}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Approve Procurement',
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
                                id: '', title: 'Uploaded Quotations',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel', frame: true, border: true },layout:'column',
                                        items: [
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                items: [
                                                    {
                                                        id: '', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            {id:''}
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Files',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'uploadDocsGrid', height: 425, autoScroll: true, autoExpandColumn: 'Person',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'Person', type: 'string' },
                                                                        { name: 'Date', type: 'string' },
                                                                        { name: 'Status', type: 'string' },
                                                                        { name: 'Comments', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'Person'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'Person', header: 'Person', width: 150, hidden: false, sortable: true, dataIndex: 'Person' },
                                                                    { id: 'Date', header: 'Date', width: 150, hidden: true, sortable: true, dataIndex: 'Date' },
                                                                    { id: 'Status', header: 'Status', width: 150, hidden: true, sortable: true, dataIndex: 'Status' },
                                                                    { id: 'Comments', header: 'Comments', width: 150, hidden: true, sortable: true, dataIndex: 'Comments' }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .8, title: 'Uploaded Docs', defaults: { xtype: 'form', frame: true, border: true, height:450 }, layout: 'fit',
                                                items: [
                                                    {
                                                        id: '',
                                                        items: [
                                                            {
                                                                tpl: new Ext.XTemplate(
                                                                    '<div style="border:1px solid blue;max-width:890px;max-height:100%;">',
                                                                    '<img id="im" style="width:880px;height:550px;" src="{urlpath}" alt="{alternative}">',
                                                                    '</div>'
                                                                ),
                                                                id: 'wkfpic', compiled: true, data: { filename: 'filedata', alternative: 'preview image', urlpath: def_pic }, autoScroll: true
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