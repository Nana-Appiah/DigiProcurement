Ext.onReady(function () {

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
                                                store: lib.returnDepartmentStore('Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name'
                                            },
                                            {
                                                xtype: 'combo', id: 'xUstat', fieldLabel: 'User status', forceSelection: true, typeAhead: true, mode: 'local', store: ['ACTIVE', 'INACTIVE']
                                            },
                                            { xtype: 'combo', id: 'xAd', fieldLabel: 'AD status', forceSelection: true, typeAhead: true, mode: 'local', store: ['NO'] },
                                            {
                                                xtype: 'combo', id: 'uprf', fieldLabel: 'Profile', forceSelection: true, typeAhead: true, mode: 'local',
                                                store: usr.returnUserProfileStore('Security/GetUserProfiles'), valueField: 'Id', displayField: 'nameOfProfile'
                                            },
                                        ],
                                        buttons: [
                                            {
                                                id: 'btUsrD', text: 'Save User Account',
                                                listeners: {
                                                    'click': function (btn) {
                                                        var _s = $('#xPwd').val(); var _t = $('#xPwdc').val();
                                                        if (_s.toString() == _t.toString()) {
                                                            $.post('User/saveUserCredentials',
                                                                {
                                                                    usr: Ext.fly('xUsr').getValue(), pwd: Ext.fly('xPwd').getValue(), stat: Ext.fly('xUstat').getValue(),
                                                                    isAd: Ext.fly('xAd').getValue(), prof: Ext.fly('uprf').getValue(), dept: Ext.fly('xDpt').getValue()
                                                                })
                                                                .done(function (r) {
                                                                    if (r.status.toString()) {
                                                                        //create entries in the usermodule table entity
                                                                        $.post('Security/createUserModuleEntries', {}, function (xt) {
                                                                            if (xt.status.toString() == "true") {
                                                                                Ext.Msg.alert('USER ACCOUNT', 'User account created successfully', this);
                                                                                $('#btUsrClr').trigger('click');
                                                                            }
                                                                        }, "json");
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
                                                                    'afterrender': function () {
                                                                        //getGeneralProfiles(Ext.getCmp('grdPr'));
                                                                        usr.returnUserProfileGrid('Security/GetUserProfiles', Ext.getCmp('grdPr'));
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
                                                                        id: 'grdNUsrProf', title: '', height: 200, autoScroll: true,
                                                                        store: new Ext.data.GroupingStore({
                                                                            restful: false,
                                                                            reader: new Ext.data.ArrayReader({}, [
                                                                                { name: 'Id', type: 'int' },
                                                                                { name: 'module', type: 'string' },
                                                                                { name: 'describ', type: 'string' }
                                                                            ]),
                                                                            sortInfo: {
                                                                                field: "Id",
                                                                                direction: "ASC"
                                                                            },
                                                                            groupField: "Id"
                                                                        }),
                                                                        columns: [
                                                                            { id: 'id', header: 'ID', width: 60, hidden: true, sortable: true, dataIndex: 'id' },
                                                                            { id: 'module', header: 'MODULE', width: 60, hidden: true, sortable: true, dataIndex: 'module' },
                                                                            { id: 'describ', header: 'MODULES', width: 450, hidden: false, sortable: true, dataIndex: 'describ' }
                                                                        ], stripeRows: true,
                                                                        listeners: {
                                                                            'afterrender': function () {
                                                                                //getActiveProfiles(Ext.getCmp('grdNUsrProf'));
                                                                            },
                                                                            'rowdblclick': function (e, t) {
                                                                                /*
                                                                                var pro = e.getStore().getAt(t);
                                                                                //alert(_obj.get('module'));
                                                                                $.post('/User/storeUserProfile',
                                                                                    { id: pro.get('Id'), mod: pro.get('module'), modDescription: pro.get('describ') }, function (usr) {
                                                                                        if (usr.status.toString() == "true") {
                                                                                            var x = [];
                                                                                            $.each(usr.msg, function (i, dt) {
                                                                                                x[i] = [dt.Id, dt.module, dt.describ];
                                                                                            });
                                                                                            //var _st = Ext.getCmp('tUsrMod').getValue();
                                                                                            var _st = pro.get('module').toString();
                                                                                            if (Ext.getCmp('tUsrMod').getValue().length < 1) {
                                                                                                Ext.getCmp('tUsrMod').setValue(_st);
                                                                                            }
                                                                                            else {
                                                                                                Ext.getCmp('tUsrMod').setValue(Ext.fly('tUsrMod').getValue() + ',' + _st);
                                                                                            }
                                                                                            Ext.getCmp('grdSUsrProf').getStore().loadData();

                                                                                        }
                                                                                }, "json");
                                                                                */
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
                                                                    { xtype: 'textfield', id: 'tUsrMod', anchor: '100%', fieldLabel: 'Module(s)' },
                                                                    { xtype: 'textfield', id: 'tUsrProf', anchor: '100%', fieldLabel: 'Profile Name' }
                                                                ],
                                                                buttons: [
                                                                    {
                                                                        id: 'btUsrModClr',
                                                                        text: 'Clear Profile',
                                                                        listeners: {
                                                                            'click': function (btn) {
                                                                                /*
                                                                                $.post('/User/clearUserProfileSession', {}, function (xy) {
                                                                                    if (xy.status.toString() == "true") {
                                                                                        Ext.getCmp('fUsrMod').getForm().reset();
                                                                                    }
                                                                                }, "json");
                                                                                */
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'btUsrModSv', text: 'Save Profile',
                                                                        listeners: {
                                                                            'click': function (btn) {
                                                                                /*
                                                                                $.post('/User/saveUserProfile', { _profile: Ext.fly('tUsrProf').getValue(), _profContent: Ext.fly('tUsrMod').getValue() }, function (p) {
                                                                                    if (p.status.toString() == "true") {
                                                                                        //update the user profile grid
                                                                                        //update the profile combo box for user creation
                                                                                        Ext.Msg.alert('USER PROFILE', 'User Profile created successfully', this);
                                                                                    }
                                                                                }, "json");
                                                                                */
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
                                        { name: 'id', type: 'int' },
                                        { name: 'usrname', type: 'string' },
                                        { name: 'active', type: 'string' },
                                        { name: 'logged', type: 'string' },
                                        { name: 'actdirectory', type: 'string' },
                                        { name: 'profile', type: 'string' }
                                    ]),
                                    sortInfo: {
                                        field: "id",
                                        direction: "ASC"
                                    },
                                    groupField: "bname"
                                }),
                                columns: [
                                    { id: 'id', header: 'ID', width: 60, hidden: true, sortable: true, dataIndex: 'id' },
                                    { id: 'usrname', header: 'USERNAME', width: 250, hidden: false, sortable: true, dataIndex: 'usrname' },
                                    { id: 'active', header: 'ACTIVE', width: 250, hidden: false, sortable: true, dataIndex: 'active' },
                                    { id: 'logged', header: 'LOGGED', width: 200, hidden: false, sortable: true, dataIndex: 'logged' },
                                    { id: 'actdirectory', header: 'ACTIVE DIRECTORY', width: 200, hidden: false, sortable: true, dataIndex: 'actdirectory' },
                                    { id: 'profile', header: 'USER PROFILE', width: 250, hidden: false, sortable: true, dataIndex: 'profile' }
                                ], stripeRows: true,
                                listeners: {
                                    'afterrender': function () {
                                        //setInterval(getUserList(Ext.getCmp('grdUList')), 5000);
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