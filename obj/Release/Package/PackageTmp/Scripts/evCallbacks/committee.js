Ext.onReady(function () {

    //statuses
    var recordId = 0;
    var PositionEditStatus = false;
    var pfx = '..';

    var committee = Ext.get('committee');

    committee.on('click', function () {

        var cform = Ext.getCmp('committeeForm');

        if (!cform) {
            cform = new Ext.Window({
                id: 'committeeForm',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'COMMITTEE FORM',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: 'pos',
                                title: 'Positions',
                                defaults: { xtype: 'panel', frame: true, border: true }, layout: 'fit',
                                items: [
                                    {
                                        defaults: { xtype: 'panel', frame: true, border: false }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'cPosFrm', title: 'Add Position', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                        items: [
                                                            {id: 'cpos', fieldLabel: 'Position', emptyText:'enter position'}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'cPos-btn-save', text: 'Save Position',
                                                                handler: function (btn) {
                                                                    var f = Ext.getCmp('cPosFrm').getForm();
                                                                    if (f.isValid()) {
                                                                        
                                                                        $.post(pfx + '/Committee/AddPosition',
                                                                            { _id: recordId, cposition: Ext.fly('cpos').getValue() }).done(function (res) {
                                                                                if (res.status.toString() == "true") {
                                                                                        $('#cPos-btn-clear').trigger('click');
                                                                                        lib.returnPositionGrid(pfx + '/Committee/GetPositions', Ext.getCmp('cPosgrid'));
                                                                                        recordId = 0;
                                                                                    }
                                                                         });
                                                                        
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'cPos-btn-clear', text: 'Clear Position',
                                                                handler: function (btn) {
                                                                    Ext.getCmp('cPosFrm').getForm().reset();
                                                                    $('#cpos').focus();
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
                                                        id: '', title: 'Position List',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cPosgrid', height: 180, autoScroll: true, autoExpandColumn: 'Designation',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'PositionID', type: 'int' },
                                                                        { name: 'Designation', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'PositionID',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'Designation'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'PositionID' },
                                                                    { id: 'Designation', header: 'Designation', width: 400, hidden: false, sortable: true, dataIndex: 'Designation' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnPositionGrid(pfx + '/Committee/GetPositions',Ext.getCmp('cPosgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnPositionGrid(pfx + '/Committee/GetPositions',Ext.getCmp('cPosgrid'));
                                                                        }, 60000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);
                                                                        recordId = record.get('PositionID');
                                                                        $('#cpos').val(record.get('Designation'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'ctee',
                                title: 'Committees', defaults: { xtype: 'panel', frame: true, border: true }, layout: 'fit',
                                items: [
                                    {
                                        defaults: { xtype: 'panel', frame: true, border: true }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id:'cComFrm',title: 'Create Committee', defaults: { xtype: 'textfield', allowBlank: false, anchor: '95%' }, layout: 'form',
                                                        items: [
                                                            { id: 'cCom-name', fieldLabel: 'Name', emptyText: 'enter committee name' },
                                                            { id:'cCom-describ', fieldLabel: 'Description', emptyText:'enter description', xtype:'textarea'}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'cCom-btn-save', text: 'Save Committee',
                                                                handler: function (btn) {
                                                                    var f = Ext.getCmp('cComFrm').getForm();
                                                                    if (f.isValid()) {
                                                                        $.post(pfx + '/Committee/AddCommittee',
                                                                            { _id: recordId, cName: Ext.fly('cCom-name').getValue(), cDescrib: Ext.fly('cCom-describ').getValue() })
                                                                            .done(function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    $('#cCom-btn-clear').trigger('click');
                                                                                    lib.returnCommitteeGrid(pfx + 'Committee/GetCommitteeList', Ext.getCmp('cComgrid'));
                                                                                    recordId = 0;
                                                                                }
                                                                            });

                                                                        
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'cCom-btn-clear', text: 'Clear',
                                                                handler: function (btn) {
                                                                    Ext.getCmp('cComFrm').getForm().reset();
                                                                    $('#cCom-name').focus();
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
                                                        title: 'Committee List',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cComgrid', height: 180, autoScroll: true, autoExpandColumn: 'CommitteeName',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'CommitteeID', type: 'int' },
                                                                        { name: 'CommitteeName', type: 'string' },
                                                                        { name: 'CommitteeDescription', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'CommitteeID',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'CommitteeName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'CommitteeID' },
                                                                    { id: 'CommitteeName', header: 'Committee', width: 400, hidden: false, sortable: true, dataIndex: 'CommitteeName' },
                                                                    { id: 'CommitteeDescription', header: 'Description', width: 400, hidden: true, sortable: true, dataIndex: 'CommitteeDescription' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnCommitteeGrid(pfx + '/Committee/GetCommitteeList', Ext.getCmp('cComgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnCommitteeGrid(pfx + '/Committee/GetCommitteeList', Ext.getCmp('cComgrid'));
                                                                        },60000);
                                                                    },
                                                                    'rowdblclick': function (e,t) {
                                                                        var record = e.getStore().getAt(t);

                                                                        recordId = record.get('CommitteeID');
                                                                        $('#cCom-name').val(record.get('CommitteeName'));
                                                                        $('#cCom-describ').val(record.get('CommitteeDescription'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'cteeM',
                                title: 'Committee Membership', defaults: { xtype: 'panel' },layout:'fit',
                                items: [
                                    {
                                        defaults: { xtype: 'panel', frame: true, border: true },layout:'column',
                                        items: [
                                            {
                                                columnWidth:.5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id:'cMemFrm',title: 'Committee Membership', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', anchor:'95%' },
                                                        items: [
                                                            { xtype: 'textfield', fieldLabel: 'First Name', emptyText: 'enter first name', id:'cmem-fname' },
                                                            { xtype: 'textfield', fieldLabel: 'Last Name', emptyText: 'enter last name', id:'cmemlname' },
                                                            { xtype: 'textfield', fieldLabel: 'Other name', emptyText: 'enter other names', allowBlank: true, id: 'cmemoname' },
                                                            { xtype:'textfield', fieldLabel:'Email', emptyText:'enter email address', allowBlank: false, id:'cmememail'},
                                                            {
                                                                id: 'cbomempos', fieldLabel: 'Position', store: lib.getPositionStore(pfx + '/Committee/GetPositions'),
                                                                valueField: 'PositionID', displayField: 'Designation', emptyText: 'select position'
                                                            },
                                                            {
                                                                id: 'cbomemcom', fieldLabel: 'Committee', store: lib.getCommitteeStore(pfx + '/Committee/GetCommitteeList'),
                                                                valueField: 'CommitteeID', displayField: 'CommitteeName', emptyText: 'select commission'
                                                            },
                                                            {id:'cbomemact', fieldLabel:'Active', store: ['Active','Inactive']}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'cMem-btn-save', text: 'Save Membership',
                                                                handler: function (btn) {
                                                                    var frm = Ext.getCmp('cMemFrm').getForm();
                                                                    if (frm.isValid()) {
                                                                        var dataParameter = '';

                                                                        dataParameter = [ recordId + ',' + Ext.fly('cmem-fname').getValue() + ',' +  Ext.fly('cmemlname').getValue() + ',' +
                                                                                    Ext.fly('cmemoname').getValue() + ',' + Ext.fly('cmememail').getValue() + ',' +
                                                                                    Ext.getCmp('cbomempos').getValue() + ',' +  Ext.getCmp('cbomemcom').getValue() + ',' +
                                                                                    Ext.fly('cbomemact').getValue()];

                                                                        $.post(pfx + '/Committee/AddCommitteeMember', { parameters: dataParameter }).done(function (r) {
                                                                            if (r.status.toString() == "true") {
                                                                                lib.returnCommitteeMembershipGrid(pfx + '/Committee/GetCommitteeMembers', Ext.getCmp('cMemgrid'), Ext.getCmp('cbomem-com').getValue());
                                                                                $('#cMembtnclear').trigger('click');
                                                                                recordId = 0;
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'cMembtnclear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('cMemFrm').getForm().reset();
                                                                        $('#cmem-fname').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                items: [
                                                    {
                                                        id: '', title: 'Committee Search',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local' },layout:'fit',
                                                        items: [
                                                            {
                                                                id: '', store: lib.getCommitteeStore(pfx + '/Committee/GetCommitteeList'), valueField: 'CommitteeID', displayField:'CommitteeName'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Membership List',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cMemgrid', height: 400, autoScroll: true, autoExpandColumn: 'nameOfCommittee',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'nameOfCommittee', type: 'string' },
                                                                        { name: 'surname', type: 'string' },
                                                                        { name: 'firstname', type: 'string' },
                                                                        { name: 'othernames', type: 'string' },
                                                                        { name: 'nameOfposition', type: 'string' },
                                                                        { name: 'email', type: 'string' },
                                                                        { name: 'actStatus', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'nameOfCommittee',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'actStatus'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'nameOfCommittee', header: 'Committee', width: 150, hidden: false, sortable: true, dataIndex: 'nameOfCommittee' },
                                                                    { id: 'surname', header: 'LastName', width: 120, hidden: false, sortable: true, dataIndex: 'surname' },
                                                                    { id: 'firstname', header: 'FirstName', width: 100, hidden: false, sortable: true, dataIndex: 'firstname' },
                                                                    { id: 'othernames', header: 'OtherNames', width: 100, hidden: false, sortable: true, dataIndex: 'othernames' },
                                                                    { id: 'nameOfposition', header: 'PositionID', width: 100, hidden: false, sortable: true, dataIndex: 'nameOfposition' },
                                                                    { id: 'email', header: 'EmailAddress', width: 100, hidden: false, sortable: true, dataIndex: 'email' },
                                                                    { id: 'actStatus', header: 'Active', width: 100, hidden: false, sortable: true, dataIndex: 'actStatus' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnCommitteeMembershipGrid(pfx + '/Committee/GetCommitteeMembers', Ext.getCmp('cMemgrid'), 0);
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnCommitteeMembershipGrid(pfx + '/Committee/GetCommitteeMembers', Ext.getCmp('cMemgrid'), 0);
                                                                        },10000);
                                                                    },
                                                                    'rowdblclick': function (e,t) {
                                                                        var record = e.getStore().getAt(t);

                                                                        recordId = record.get('Id');
                                                                        $('#cmem-fname').val(record.get('firstname'));
                                                                        $('#cmemlname').val(record.get('surname'));
                                                                        $('#cmemoname').val(record.get('othernames'));
                                                                        $('#cmememail').val(record.get('email'));
                                                                        //$('#cbomempos').val(record.get('nameOfposition'));
                                                                        //$('#cbomemcom').val(record.get('nameOfCommittee'));
                                                                        //$('#cbomemact').val(record.get('actStatus'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'nList',
                                title: 'Notification List', defaults: { xtype: 'panel', frame: true, height:530 },
                                items: [
                                    {
                                        defaults: { xtype: 'panel', frame: true, border: true }, layout: 'accordion',
                                        items: [
                                            {
                                                title: 'Create a Procurement Type', defaults: { xtype: 'form', frame: true, border: true }, layout: 'column',
                                                items: [
                                                    {
                                                        id: 'proctypefrm', title: 'Create Procurement Record', columnWidth: .5, defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },
                                                        items: [
                                                            {
                                                                id:'proctype', fieldLabel: 'Type'
                                                            }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'proctypefrm-btn-save', text: 'Save Procurement',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var ptf = Ext.getCmp('proctypefrm').getForm();
                                                                        if (ptf.isValid()) {
                                                                            var f = Ext.getCmp('proctypefrm').getForm();
                                                                            if (f.isValid()) {
                                                                                $.post(pfx + '/Committee/SaveProcurementType',
                                                                                    { _id: recordId, procDescrib: Ext.fly('proctype').getValue() })
                                                                                    .done(function (r) {
                                                                                        if (r.status.toString() == "true") {
                                                                                            lib.returnProcurementTypeGrid(pfx + '/Committee/GetProcurementTypes', Ext.getCmp('cProcTypegrid'));
                                                                                            $('#proctypefrm-btn-clear').trigger('click');
                                                                                            recordId = 0;
                                                                                        }
                                                                                });
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'proctypefrm-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('proctypefrm').getForm().reset();
                                                                        $('#proctype').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '',columnWidth:.5,title:'Procurement Records',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cProcTypegrid', height: 300, autoScroll: true, autoExpandColumn: 'ProcurementDescription',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'ProcurementTypeID', type: 'int' },
                                                                        { name: 'ProcurementDescription', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'ProcurementDescription',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ProcurementDescription'
                                                                }),
                                                                columns: [
                                                                    { id: 'ProcurementTypeID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'ProcurementTypeID' },
                                                                    { id: 'ProcurementDescription', header: 'Description', width: 150, hidden: false, sortable: true, dataIndex: 'ProcurementDescription' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnProcurementTypeGrid(pfx + '/Committee/GetProcurementTypes', Ext.getCmp('cProcTypegrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnProcurementTypeGrid(pfx + '/Committee/GetProcurementTypes', Ext.getCmp('cProcTypegrid'));
                                                                        },10000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);
                                                                        recordId = record.get('ProcurementTypeID');
                                                                        $('#proctype').val(record.get('ProcurementDescription'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                title: 'Define a Procurement Process Flow (PF)', defaults: {xtype:'form', frame: true, border: true }, layout: 'column',
                                                items: [
                                                    {
                                                        id: 'pffrm', title: 'PF Record', columnWidth: .5, defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', anchor: '95%' },
                                                        items: [
                                                            {
                                                                id: 'pfproctype', fieldLabel: 'Proc. Type', emptyText: 'Procurement Type',
                                                                store: lib.returnProcurementTypeStore(pfx + '/Committee/GetProcurementTypes'), valueField: 'ProcurementTypeID', displayField: 'ProcurementDescription'
                                                            },
                                                            { id: 'pflimit', fieldLabel: 'Limit', xtype: 'numberfield' },
                                                            { id: 'pforder', fieldLabel: 'Order', xtype: 'numberfield' },
                                                            { id:'pfList', fieldLabel: 'Flow', xtype:'textarea'}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'pffrm-btn-save', text: 'Save PF Record',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var f = Ext.getCmp('pffrm').getForm();
                                                                        if (f.isValid()) {
                                                                            $.post(pfx + '/Committee/SaveProcessFlow',
                                                                                {
                                                                                    _id: recordId, ptypeId: Ext.getCmp('pfproctype').getValue(),
                                                                                    limit: Ext.fly('pflimit').getValue(), _order: Ext.fly('pforder').getValue()
                                                                                })
                                                                                .done(function (r) {
                                                                                    if (r.status.toString() == "true") {
                                                                                        lib.returnProcessFlowGrid(pfx + '/Committee/GetProcessFlows', Ext.getCmp('cPFgrid'));
                                                                                        $('#pffrm-btn-clear').trigger('click');
                                                                                        recordId = 0;
                                                                                    }
                                                                                });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'pffrm-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('pffrm').getForm().reset();
                                                                        $('#pfproctype').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', columnWidth: .5,title:'ProcessFlow List',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cPFgrid', height: 300, autoScroll: true, autoExpandColumn: 'nameOfProcurement',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'nameOfProcurement', type: 'string' },
                                                                        { name: 'limit', type: 'int' },
                                                                        { name: 'order', type: 'int' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'nameOfProcurement',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'nameOfProcurement'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'nameOfProcurement', header: 'Procurement', width: 150, hidden: false, sortable: true, dataIndex: 'nameOfProcurement' },
                                                                    { id: 'limit', header: 'Limt', width: 150, hidden: false, sortable: true, dataIndex: 'limit' },
                                                                    { id: 'order', header: 'Order', width: 150, hidden: false, sortable: true, dataIndex: 'order' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnProcessFlowGrid(pfx + '/Committee/GetProcessFlows', Ext.getCmp('cPFgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnProcessFlowGrid(pfx + '/Committee/GetProcessFlows', Ext.getCmp('cPFgrid'));
                                                                        },15000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);

                                                                        recordId = record.get('Id');
                                                                        //$('#pfproctype').val(record.get('nameOfProcurement'));
                                                                        $('#pflimit').val(record.get('limit'));
                                                                        $('#pforder').val(record.get('order'));

                                                                        lib.returnPflowList(pfx + '/Committee/GetProcessFlowList', recordId, $('#pfList'));
                                                                    }
                                                                }

                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                title: 'Create a Notification Group', defaults: { xtype: 'form', frame: 'true', border: true }, layout: 'column',
                                                items: [
                                                    {
                                                        columnWidth:.5, id: 'ngfrm', title: 'Add Notification Record', defaults: { xtype: 'textfield', anchor: '95%', allowBlank: false },layout:'form',
                                                        items: [
                                                            {
                                                                id:'ngname', fieldLabel:'Name', emptyText:'enter group name'
                                                            },
                                                            {
                                                                id:'ngemail', fieldLabel:'Emails', emptyText:'enter comma-separated emails'
                                                            },
                                                            {
                                                                id:'ngdescrib', xtype:'textarea',fieldLabel: 'Description'
                                                            }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'ng-btn-save', text: 'Save Notification',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var f = Ext.getCmp('ngfrm').getForm();
                                                                        if (f.isValid()) {
                                                                            $.post(pfx + '/Committee/SaveNotificationGroup',
                                                                                {
                                                                                    _id: recordId, gname: Ext.fly('ngname').getValue(),
                                                                                    gemails: Ext.fly('ngemail').getValue(), gdescrib: Ext.fly('ngdescrib').getValue()
                                                                                }).
                                                                                done(function (r) {
                                                                                    if (r.status.toString() == "true") {
                                                                                        $('#ng-btn-clear').trigger('click');
                                                                                        lib.returnNotificationGroupGrid(pfx + '/Committee/GetNotificationGroups', Ext.getCmp('cNGgrid'));
                                                                                        recordId = 0;
                                                                                    }
                                                                            })
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'ng-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('ngfrm').getForm().reset();
                                                                        $('#ngname').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        columnWidth: .5, id: '', title: 'Notification Group List',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cNGgrid', height: 300, autoScroll: true, autoExpandColumn: 'NotificationGroupName',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'NotificationGroupID', type: 'int' },
                                                                        { name: 'NotificationGroupName', type: 'string' },
                                                                        { name: 'NotificationMailString', type: 'string' },
                                                                        { name: 'NotificationDescription', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'NotificationGroupName',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'NotificationGroupName'
                                                                }),
                                                                columns: [
                                                                    { id: 'NotificationGroupID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'NotificationGroupID' },
                                                                    { id: 'NotificationGroupName', header: 'Group', width: 150, hidden: false, sortable: true, dataIndex: 'NotificationGroupName' },
                                                                    { id: 'NotificationMailString', header: 'MailString', width: 150, hidden: true, sortable: true, dataIndex: 'NotificationMailString' },
                                                                    { id: 'NotificationDescription', header: 'Description', width: 150, hidden: true, sortable: true, dataIndex: 'NotificationDescription' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnNotificationGroupGrid(pfx + '/Committee/GetNotificationGroups', Ext.getCmp('cNGgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnNotificationGroupGrid(pfx + '/Committee/GetNotificationGroups', Ext.getCmp('cNGgrid'));
                                                                        },15000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);

                                                                        recordId = record.get('NotificationGroupID');
                                                                        $('#ngname').val(record.get('NotificationGroupName'));
                                                                        $('#ngemail').val(record.get('NotificationMailString'));
                                                                        $('#ngdescrib').val(record.get('NotificationDescription'));
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                title: 'Attach Notification List to Procurement Type', defaults: { xtype: 'form', frame: true, border: true }, layout: 'column',
                                                items: [
                                                    {
                                                        id:'notiflistfrm',columnWidth: .5, title: 'Notification List',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, anchor: '95%', mode: 'local', allowBlank: false },
                                                        items: [
                                                            {
                                                                id: 'notifpflow', fieldLabel: 'ProcessFlow', store: lib.returnProcessFlowStore(pfx + '/Committee/GetProcessFlows'),
                                                                valueField: 'Id', displayField: 'nameOfProcurement'
                                                            },
                                                            {
                                                                id: 'notifgroup', fieldLabel: 'Group', store: lib.returnNotificationStore(pfx + '/Committee/GetNotificationGroups'),
                                                                valueField: 'NotificationGroupID', displayField:'NotificationGroupName'
                                                            }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'notiflistfrm-btn-save', text: 'Save Notification List',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var frm = Ext.getCmp('notiflistfrm').getForm();
                                                                        if (frm.isValid()) {
                                                                            $.post(pfx + '/Committee/SavePFNotificationList',
                                                                                { _id: recordId, pfId: Ext.getCmp('notifpflow').getValue(), groupId: Ext.getCmp('notifgroup').getValue() })
                                                                                .done(function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    lib.returnPFNotificationGrid(pfx + '/Committee/GetPFNotificationList', Ext.getCmp('cPFNotifgrid'));
                                                                                    $('#notiflistfrm-btn-clear').trigger('click');
                                                                                    recordId = 0;
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'notiflistfrm-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('notiflistfrm').getForm().reset();
                                                                        $('#notifpflow').focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        columnWidth: .5, title: 'Notifications',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cPFNotifgrid', height: 300, autoScroll: true, autoExpandColumn: 'nameOfGroup',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'IdOfProcessFlow', type: 'int' },
                                                                        { name: 'nameOfGroup', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'nameOfGroup',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'nameOfGroup'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'IdOfProcessFlow', header: 'PF', width: 150, hidden: false, sortable: true, dataIndex: 'IdOfProcessFlow' },
                                                                    { id: 'nameOfGroup', header: 'NotificationGroup', width: 150, hidden: true, sortable: true, dataIndex: 'nameOfGroup' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnPFNotificationGrid(pfx + '/Committee/GetPFNotificationList', Ext.getCmp('cPFNotifgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnPFNotificationGrid(pfx + '/Committee/GetPFNotificationList', Ext.getCmp('cPFNotifgrid'));
                                                                        },15000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);
                                                                        recordId = record.get('Id');
                                                                    }
                                                                }

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