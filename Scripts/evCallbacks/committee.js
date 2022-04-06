Ext.onReady(function () {


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
                                                        id:'', title:'Form One'
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '', title: 'Form Two'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'ctee',
                                title:'Committees'
                            },
                            {
                                id: 'cteeM',
                                title:'Committee Membership'
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