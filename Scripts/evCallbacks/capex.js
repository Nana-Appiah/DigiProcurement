Ext.onReady(function () {

    var capexform = Ext.get('capex');

    capexform.on('click', function () {

        var capexFrm = Ext.getCmp('frmCapex');

        if (!capexform) {
            capexform = new Ext.Window({
                id: 'frmCapex',
                height: 600,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'CAPEX FORM',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 570 },
            }).show();
        }

    });

});