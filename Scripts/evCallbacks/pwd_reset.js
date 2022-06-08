Ext.onReady(function () {

    var pfx = '';
    var pwdForm = Ext.get('pwd_reset');

    pwdForm.on('click', function () {

        var idChallenge = Ext.getCmp('IDChallenge');

        if (!idChallenge) {
            idChallenge = new Ext.Window({
                id: 'IDChallenge',
                height: 200,
                width: 400,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'ID CHALLENGE FORM',
                defaults: { xtype: 'panel', frame: true, height: 200 },
                items: [
                    {
                        defaults: { xtype: 'form', frame: true, border: true }, layout: 'form',
                        items: [
                            {
                                id: 'idChallengeFrm', title: 'PASSWORD RESET', defaults: { xtype: 'textfield', anchor: '90%', allowBlank: false },
                                items: [
                                    { id: 'usr', fieldLabel: 'User' },
                                    { id: 'pwd', fieldLabel: 'New Password', inputType: 'password' },
                                    { id: 'pwdC', fieldLabel: 'Pwd Confirm', inputType: 'password' }
                                ],
                                buttons: [
                                    {
                                        id: 'btn-usr-change', text: 'Change Password',
                                        listeners: {
                                            'click': function (btn) {
                                                var pwd = $('#pwd').val();
                                                var pwdC = $('#pwdC').val();

                                                if (pwd == pwdC) {
                                                    //change the password
                                                    $.post(pfx + '/User/ChangeUserPassword',
                                                        { newPassword: Ext.fly('pwd').getValue() }).done(function (rs) {
                                                            if (rs.status.toString() == "true") {
                                                                Ext.Msg.alert('ID CHALLENGE', 'Password change for user ' + Ext.fly('usr').getValue() + ' successful', this);
                                                            }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        id: 'btn-usr-clear', text: 'Clear',
                                        handler: function (btn) {
                                            $('#pwdC').val('');
                                            $('#pwd').val('').focus();
                                        }
                                    }
                                ],
                                listeners: {
                                    'afterrender': function () {
                                        //fetch session object
                                        $.getJSON(pfx + '/User/GetSessionData', {}, function (rs) {
                                            if (rs.status.toString() == "true") {
                                                $('#usr').val(rs.data.userName.toString()).attr('readonly', true);

                                                $('#pwd').val('').focus();
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    }
                ]
            }).show();
        }

    });

});