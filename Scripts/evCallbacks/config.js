Ext.onReady(function () {

    var PROFILE_CONTENT = '';

    var usr_config = Ext.get('config');

    usr_config.on('click', function () {

        var sysConf = Ext.getCmp('systemConf');

        if (!sysConf) {

            sysConf = new Ext.Window({
                id: 'mgmtWdow',
                height: 700,
                width: 1200,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'USER MANAGEMENT',
                defaults: { xtype: 'panel', enableScroll: true, frame: true, height: 620 }, layout: 'form',
                items: [
                    {
                        height: 500, defaults: { xtype: 'panel' }, layout: 'column',
                        items: [
                            {
                                title: 'User Details', width: '50%', height: 480, defaults: { xtype: 'form', frame: true, border: true }, layout: 'accordion',
                                items: [
                                    {
                                        id: 'frmUsrD', title: 'Create User Account', defaults: { xtype: 'textfield', anchor: '90%', allowBlank: false },
                                        items: [
                                            { id: 'xUsr', fieldLabel: 'Username' },
                                            { id: 'xPwd', fieldLabel: 'Password', inputType: 'password' },
                                            { id: 'xPwdc', fieldLabel: 'Confirm', inputType: 'password' },
                                            {
                                                xtype: 'combo', id: 'xDpt', fieldLabel: 'Department', forceSelection: true, typeAhead: true, allowBlank: true, mode: 'local',
                                                store: lib.returnDepartmentStore('/Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name'
                                            },
                                            {
                                                xtype: 'combo', id: 'xUstat', fieldLabel: 'User status', forceSelection: true, typeAhead: true, mode: 'local', store: ['ACTIVE', 'INACTIVE']
                                            },
                                            { xtype: 'combo', id: 'xAd', fieldLabel: 'AD status', forceSelection: true, typeAhead: true, mode: 'local', store: ['NO'] },
                                            {
                                                xtype: 'combo', id: 'uprf', fieldLabel: 'Profile', forceSelection: true, typeAhead: true, mode: 'local',
                                                store: usr.returnUserProfileStore('/Security/GetUserProfiles'), valueField: 'Id', displayField: 'nameOfProfile'
                                            },
                                            {
                                                xtype: 'combo', id: 'utag', fieldLabel: 'Tag', forceSelection: true, typeAhead: true, allowBlank: true, mode: 'local',
                                                store: lib.returnPositionStore('/Committee/GetPositions'),valueField: 'PositionID', displayField:'Designation'
                                            }
                                        ],
                                        buttons: [
                                            {
                                                id: 'btUsrD', text: 'Save User Account',
                                                listeners: {
                                                    'click': function (btn) {
                                                        var _s = $('#xPwd').val(); var _t = $('#xPwdc').val();
                                                        if (_s.toString() == _t.toString()) {
                                                            $.post('/Security/saveUserCredentials',
                                                                {
                                                                    usr: Ext.fly('xUsr').getValue(), pwd: Ext.fly('xPwd').getValue(), stat: Ext.fly('xUstat').getValue(),
                                                                    isAd: Ext.fly('xAd').getValue(), prof: Ext.fly('uprf').getValue(), dId: Ext.getCmp('xDpt').getValue(),
                                                                    tg: Ext.fly('utag').getValue()
                                                                })
                                                                .done(function (r) {
                                                                    if (r.status.toString()) {
                                                                        //create entries in the usermodule table entity
                                                                        Ext.Msg.alert('USER ACCOUNT CREATION', r.data, this);
                                                                        $('#btUsrClr').trigger('click');
                                                                    }
                                                            });
                                                        }
                                                        else {
                                                            Ext.Msg.alert('INCORRECT PASSWORD', 'The Passwords entered are not the same', this);
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                id: 'btUsrClr', text: 'Clear User Account',
                                                listeners: {
                                                    'click': function (btn) {
                                                        Ext.getCmp('frmUsrD').getForm().reset();
                                                        $('#xUsr').focus();
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        id: 'frmUsrAmend', title: 'Amend User Profiles', defaults: { xtype: 'textfield', anchor: '100%' },
                                        items: [
                                            {
                                                id: 'amusr', fieldLabel: 'User name',
                                                listeners: {
                                                    'blur': function () {
                                                        
                                                        $.getJSON('/Security/GetCurrentProfileOfUser', { u: Ext.fly('amusr').getValue() }, function (rs) {
                                                            if (rs.status.toString() == "true") {
                                                                $('#amprof').val(rs.data.PrManager.nameOfProfile.toString()).attr('readonly', 'readonly');
                                                                $('#amnprof').val('').focus();
                                                            }
                                                        });
                                                        
                                                    }
                                                }
                                            },
                                            {
                                                id: 'amprof', fieldLabel: 'Current profile'
                                            },
                                            {
                                                id: 'amnprof', xtype: 'combo', fieldLabel: 'New Profile', forceSelection: true, typeAhead: true, mode: 'local',
                                                store: usr.returnUserProfileStore('/Security/GetUserProfiles'), valueField: 'Id', displayField: 'nameOfProfile',
                                                listeners: {
                                                    'blur': function () {
                                                        usr.returnApplicationModulesForProfile('/Security/GetApplicationModulesForProfile', Ext.fly('amnprof').getValue(), Ext.getCmp('grdamn'));
                                                    }
                                                }
                                            },
                                            new Ext.grid.GridPanel({
                                                id: 'grdamn', title: 'MODULES IN SELECTED PROFILE', height: 200, autoScroll: true, autoExpandColumn:'PublicName',
                                                store: new Ext.data.GroupingStore({
                                                    reader: new Ext.data.ArrayReader({}, [
                                                        { name: 'ModuleID', type: 'int' },
                                                        { name: 'SystemName', type: 'string' },
                                                        { name: 'PublicName', type: 'string' }
                                                    ]),
                                                    sortInfo: {
                                                        field: "ModuleID",
                                                        direction: "ASC"
                                                    },
                                                    groupField: "PublicName"
                                                }),
                                                columns: [
                                                    { id: 'ModuleID', header: 'ID', width: 60, hidden: true, sortable: true, dataIndex: 'ModuleID' },
                                                    { id: 'SystemName', header: '', width: 600, hidden: false, sortable: true, dataIndex: 'SystemName' },
                                                    { id: 'PublicName', header: '', width: 600, hidden: false, sortable: true, dataIndex: 'PublicName' }
                                                ], stripeRows: true
                                            })
                                        ],
                                        buttons: [
                                            {
                                                id: 'amnBtnSv', text: 'Save Amended Profile',
                                                listeners: {
                                                    'click': function (btn) {
                                                        /*
                                                            change profile name in the usr table
                                                            delete current profiles in the usrmodule table
                                                            create new profiles in the usrmodule table

                                                        */
                                                        var fr = Ext.getCmp('frmUsrAmend').getForm();
                                                        if (fr.isValid())
                                                        {
                                                            $.post('/Security/AmendUserProfile',
                                                                { u: Ext.fly('amusr').getValue(), pro: Ext.fly('amnprof').getValue() })
                                                                .done(function (res) {
                                                                    if (res.status.toString() == "true") {
                                                                        Ext.Msg.alert('AMEND USER PROFILE', res.data.toString(), this);
                                                                        $('#amnBtnClr').trigger('click');
                                                                    }
                                                            });
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                id: 'amnBtnClr', text: 'Clear',
                                                listeners: {
                                                    'click': function (btn) {
                                                        Ext.getCmp('frmUsrAmend').getForm().reset();
                                                        Ext.getCmp('grdamn').getStore().removeAll();
                                                        $('#amusr').val('').focus();
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                title: 'Profile Configuration', width: '50%', defaults: { xtype: 'tabpanel', tabPosition: 'top', enableScroll: true, frame: true, height: 500 },
                                items: [
                                    {
                                        activeTab: 0,
                                        items: [
                                            {
                                                id: '', title: 'User Profiles', defaults: { xtype: 'form', frame: true }, layout: 'form',
                                                items: [
                                                    {
                                                        title: '', defaults: { xtype: 'form', frame: true, border: true },
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'grdPr', title: '', height: 400, autoScroll: true,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'nameOfProfile', type: 'string' },
                                                                        { name: 'contentOfProfile', type: 'string' },
                                                                        { name: 'profileInUse', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: "Id",
                                                                        direction: "ASC"
                                                                    },
                                                                    groupField: "nameOfProfile"
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 60, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'nameOfProfile', header: '', width: 600, hidden: false, sortable: true, dataIndex: 'nameOfProfile' },
                                                                    { id: 'contentOfProfile', header: '', width: 600, hidden: true, sortable: true, dataIndex: 'contentOfProfile' },
                                                                    { id: 'profileInUse', header: '', width: 600, hidden: true, sortable: true, dataIndex: 'profileInUse' }
                                                                ], listeners: {
                                                                    'render': function () {
                                                                        usr.returnUserProfileGrid('/Security/GetUserProfiles', Ext.getCmp('grdPr'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            usr.returnUserProfileGrid('/Security/GetUserProfiles', Ext.getCmp('grdPr'));
                                                                        }, 10000);
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                id: '', title: 'New User Profile', defaults: { xtype: 'panel', frame: true, border: true, height: 230 }, layout: 'form',
                                                items: [
                                                    {
                                                        defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                                                        items: [
                                                            {
                                                                id: 'frmSUsrProf', title: '', width: '50%', height: 420, 
                                                                items: [
                                                                    new Ext.grid.GridPanel({
                                                                        id: 'grdNUsrProf', title: '', height: 200, autoScroll: true, autoExpandColumn: 'PublicName',
                                                                        store: new Ext.data.GroupingStore({
                                                                            restful: false,
                                                                            reader: new Ext.data.ArrayReader({}, [
                                                                                { name: 'ModuleID', type: 'int' },
                                                                                { name: 'SystemName', type: 'string' },
                                                                                { name: 'PublicName', type: 'string' },
                                                                                { name: 'DateAssigned', type: 'string' }
                                                                            ]),
                                                                            sortInfo: {
                                                                                field: "ModuleID",
                                                                                direction: "ASC"
                                                                            },
                                                                            groupField: "PublicName"
                                                                        }),
                                                                        columns: [
                                                                            { id: 'ModuleID', header: 'ID', width: 60, hidden: true, sortable: true, dataIndex: 'ModuleID' },
                                                                            { id: 'SystemName', header: 'SYSTEM_NAME', width: 60, hidden: true, sortable: true, dataIndex: 'SystemName' },
                                                                            { id: 'PublicName', header: 'MODULE', width: 450, hidden: false, sortable: true, dataIndex: 'PublicName' },
                                                                            { id: 'DateAssigned', header: 'DATE_ASSIGNED', width: 450, hidden: true, sortable: true, dataIndex: 'DateAssigned' }
                                                                        ], stripeRows: true,
                                                                        listeners: {
                                                                            'render': function () {
                                                                                usr.returnApplicationModuleGrid('/Security/GetApplicationModules', Ext.getCmp('grdNUsrProf'));
                                                                            },
                                                                            'afterrender': function () {
                                                                                setInterval(function () {
                                                                                    usr.returnApplicationModuleGrid('/Security/GetApplicationModules', Ext.getCmp('grdNUsrProf'));
                                                                                },10000);
                                                                            },
                                                                            'rowdblclick': function (e, t) {
                                                                                var record = e.getStore().getAt(t);
                                                                                if (PROFILE_CONTENT.length == 0) {
                                                                                    PROFILE_CONTENT = record.get('SystemName') + ',';
                                                                                }
                                                                                else {
                                                                                    
                                                                                    if (PROFILE_CONTENT.indexOf(record.get('SystemName')) == -1) {
                                                                                        PROFILE_CONTENT = PROFILE_CONTENT + record.get('SystemName') + ',';
                                                                                    }
                                                                                    
                                                                                }

                                                                                $('#tUsrMod').val(PROFILE_CONTENT);
                                                                            }
                                                                        }
                                                                    })
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        defaults: { xtype: 'form', frame: true, border: true }, layout: 'column', height: 150,
                                                        items: [
                                                            {
                                                                id: 'fUsrMod', width: '100%',
                                                                items: [
                                                                    { xtype: 'textfield', id: 'tUsrMod', anchor: '100%', fieldLabel: 'Module(s)', disabled: true },
                                                                    { xtype: 'textfield', id: 'tUsrProf', anchor: '100%', fieldLabel: 'Profile Name' }
                                                                ],
                                                                buttons: [
                                                                    {
                                                                        id: 'btUsrModClr',
                                                                        text: 'Clear Profile',
                                                                        listeners: {
                                                                            'click': function (btn) {
                                                                                PROFILE_CONTENT = '';
                                                                                $('#tUsrMod').val('');
                                                                                $('#tUsrProf').val('');
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'btUsrModSv', text: 'Save Profile',
                                                                        listeners: {
                                                                            'click': function (btn) {
                                                                                var f = Ext.getCmp('fUsrMod').getForm();
                                                                                if (f.isValid()) {
                                                                                    $.post('/Security/SaveUserProfile',
                                                                                        { _profile: Ext.fly('tUsrProf').getValue(), _profContent: Ext.fly('tUsrMod').getValue(), _profStatus:1})
                                                                                        .done(function (r) {
                                                                                            if (r.status.toString() == "true") {
                                                                                                usr.returnUserProfileGrid('/Security/GetUserProfiles', Ext.getCmp('grdPr'));
                                                                                                Ext.Msg.alert('USER PROFILE', r.data.profileName + ' created successfully', this);
                                                                                            }
                                                                                        });
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', defaults: { xtype: 'button' }, layout: 'hbox',
                                                        items: [
                                                            //{ text: 'Save User Configuration' }, { text: 'Clear Fields' }, { text: 'Close Window' }
                                                        ]
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
                        title: 'User List', height: 200, defaults: { xtype: 'form', frame: true, border: true },
                        items: [
                            new Ext.grid.GridPanel({
                                id: 'grdUList', title: '', height: 130, autoScroll: true,
                                store: new Ext.data.GroupingStore({
                                    reader: new Ext.data.ArrayReader({}, [
                                        { name: 'Id', type: 'int' },
                                        { name: 'username', type: 'string' },
                                        { name: 'isActive', type: 'string' },
                                        { name: 'isLogged', type: 'string' },
                                        { name: 'nameOfDepartment', type: 'string' },
                                        { name: 'nameOfProfile', type: 'string' }
                                    ]),
                                    sortInfo: {
                                        field: "id",
                                        direction: "ASC"
                                    },
                                    groupField: "nameOfDepartment"
                                }),
                                columns: [
                                    { id: 'Id', header: 'ID', width: 60, hidden: true, sortable: true, dataIndex: 'Id' },
                                    { id: 'username', header: 'USERNAME', width: 250, hidden: false, sortable: true, dataIndex: 'username' },
                                    { id: 'isActive', header: 'ACTIVE', width: 250, hidden: false, sortable: true, dataIndex: 'isActive' },
                                    { id: 'isLogged', header: 'LOGGED', width: 200, hidden: false, sortable: true, dataIndex: 'isLogged' },
                                    { id: 'nameOfDepartment', header: 'DEPARTMENT', width: 200, hidden: false, sortable: true, dataIndex: 'nameOfDepartment' },
                                    { id: 'nameOfProfile', header: 'USER PROFILE', width: 250, hidden: false, sortable: true, dataIndex: 'nameOfProfile' }
                                ], stripeRows: true,
                                listeners: {
                                    'render': function () {
                                        usr.returnUserListGrid('/Security/GetUsers', Ext.getCmp('grdUList'));
                                    },
                                    'afterrender': function () {
                                        setInterval(function () {
                                            usr.returnUserListGrid('/Security/GetUsers', Ext.getCmp('grdUList'));
                                        }, 30000);
                                    }
                                }
                            })
                        ]
                    }
                ]
            }).show();
        }

    });

});