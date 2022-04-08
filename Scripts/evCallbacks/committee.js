Ext.onReady(function () {

    //statuses
    var recordId = 0;
    var PositionEditStatus = false;

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
                                                                        
                                                                        $.post('Committee/AddPosition',
                                                                            { _id: recordId, cposition: Ext.fly('cpos').getValue() }).done(function (res) {
                                                                                if (res.status.toString() == "true") {
                                                                                        $('#cPos-btn-clear').trigger('click');
                                                                                        lib.returnPositionGrid('Committee/GetPositions', Ext.getCmp('cPosgrid'));
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
                                                                        lib.returnPositionGrid('Committee/GetPositions',Ext.getCmp('cPosgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnPositionGrid('Committee/GetPositions',Ext.getCmp('cPosgrid'));
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
                                                                        $.post('Committee/AddCommittee',
                                                                            { _id: recordId, cName: Ext.fly('cCom-name').getValue(), cDescrib: Ext.fly('cCom-describ').getValue() })
                                                                            .done(function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    $('#cCom-btn-clear').trigger('click');
                                                                                    lib.returnCommitteeGrid('Committee/GetCommitteeList', Ext.getCmp('cComgrid'));
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
                                                                        lib.returnCommitteeGrid('Committee/GetCommitteeList', Ext.getCmp('cComgrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnCommitteeGrid('Committee/GetCommitteeList', Ext.getCmp('cComgrid'));
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
                                                                id: 'cbomem-pos', fieldLabel: 'Position', store: lib.getPositionStore('Committee/GetPositions'),
                                                                valueField: 'PositionID', displayField: 'Designation', emptyText: 'select position'
                                                            },
                                                            {
                                                                id: 'cbomem-com', fieldLabel: 'Committee', store: lib.getCommitteeStore('Committee/GetCommitteeList'),
                                                                valueField: 'CommitteeID', displayField: 'CommitteeName', emptyText: 'select commission'
                                                            },
                                                            {id:'cbomem-act', fieldLabel:'Active', store: ['Active','Inactive']}
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'cMem-btn-save', text: 'Save Membership',
                                                                handler: function (btn) {
                                                                    var frm = Ext.getCmp('cMemFrm').getForm();
                                                                    if (frm.isValid()) {
                                                                        alert('I am here');
                                                                        $.post('Committee/AddCommitteeMember',
                                                                            {
                                                                                id: recordId, fname: Ext.fly('cmem-fname').getValue(), lname: Ext.fly('cmemlname').getValue(),
                                                                                oname: Ext.fly('cmemoname').getValue(), email: Ext.fly('cmememail').getValue(),
                                                                                pId: Ext.getCmp('cbomem-pos').getValue(), cId: Ext.getCmp('cbomem-com').getValue(),
                                                                                activeStatus: Ext.fly('cbomem-act')
                                                                            })
                                                                            .done(function (r) {
                                                                                if (r.status.toString()) {

                                                                                    $('#cMem-btn-clear').trigger('click');
                                                                                    recordId = 0;
                                                                                }
                                                                        });
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'cMem-btn-clear',text:'Clear',
                                                                handler: function (btn) {
                                                                    Ext.getCmp('cMemFrm').getForm().reset();
                                                                    $('#cmem-fname').focus();
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
                                                                id: '', store: lib.getCommitteeStore('Committee/GetCommitteeList'), valueField: 'CommitteeID', displayField:'CommitteeName'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Membership List',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'cMemgrid', height: 400, autoScroll: true, autoExpandColumn: 'LastName',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'CommitteeMemberID', type: 'int' },
                                                                        { name: 'CommitteeID', type: 'int' },
                                                                        { name: 'LastName', type: 'string' },
                                                                        { name: 'FirstName', type: 'string' },
                                                                        { name: 'OtherNames', type: 'string' },
                                                                        { name: 'PositionID', type: 'int' },
                                                                        { name: 'EmailAddress', type: 'string' },
                                                                        { name: 'Active', type: 'int' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'CommitteeMemberID',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'CommitteeID'
                                                                }),
                                                                columns: [
                                                                    { id: 'CommitteeMemberID', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'CommitteeMemberID' },
                                                                    { id: 'CommitteeID', header: 'Committee', width: 150, hidden: false, sortable: true, dataIndex: 'CommitteeID' },
                                                                    { id: 'LastName', header: 'LastName', width: 120, hidden: false, sortable: true, dataIndex: 'LastName' },
                                                                    { id: 'FirstName', header: 'FirstName', width: 100, hidden: false, sortable: true, dataIndex: 'FirstName' },
                                                                    { id: 'OtherNames', header: 'OtherNames', width: 100, hidden: false, sortable: true, dataIndex: 'OtherNames' },
                                                                    { id: 'PositionID', header: 'PositionID', width: 100, hidden: false, sortable: true, dataIndex: 'PositionID' },
                                                                    { id: 'EmailAddress', header: 'EmailAddress', width: 100, hidden: false, sortable: true, dataIndex: 'EmailAddress' },
                                                                    { id: 'Active', header: 'Active', width: 100, hidden: false, sortable: true, dataIndex: 'Active' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnCommitteeMembershipGrid('Committee/GetCommitteeMembers', Ext.getCmp('cMemgrid'), 0);
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnCommitteeMembershipGrid('Committee/GetCommitteeMembers', Ext.getCmp('cMemgrid'), 0);
                                                                        },60000);
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
                                title:'Notification List'
                            }
                        ]
                    }
                ]
            }).show();
        }

    });
});