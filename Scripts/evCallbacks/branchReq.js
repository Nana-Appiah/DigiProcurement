Ext.onReady(function () {

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