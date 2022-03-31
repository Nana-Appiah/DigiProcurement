Ext.onReady(function () {

    var mgmt = Ext.get('management');

    mgmt.on('click', function () {

        var req = Ext.getCmp('mgmtWdow');

        if (!req) {
            req = new Ext.Window({
                id: 'mgmtWdow',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'MANAGEMENT',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 670 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {

                            }
                        ]
                    }
                ]
            }).show();
        }

    });

});