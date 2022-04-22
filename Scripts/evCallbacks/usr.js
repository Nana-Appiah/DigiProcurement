var usr = usr || {};

usr.returnUserProfileGrid = function (_urlString, _widget) {
    //_profileStatus: 1 for active profiles, 0 for inactive profiles, widget for control getting data
    var profile_data = [];
    $.getJSON(_urlString, { }, function (result) {
        if (result.status.toString() == "true") {
            $.each(result.data, function (i,d) {
                profile_data[i] = [d.Id, d.nameOfProfile, d.contentOfProfile, d.profileInUse];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(profile_data);
        }
    });
}

usr.returnUserProfileStore = function (_urlString) {
    var activeProfileStore = new Ext.data.Store({
        autoLoad: true, restful: false,
        url: _urlString,
        reader: new Ext.data.JsonReader({ type: 'json', root: 'data' }, [
            { name: 'Id', type: 'int' },
            { name: 'nameOfProfile', type: 'string' }
        ])
    });

    return activeProfileStore;
}