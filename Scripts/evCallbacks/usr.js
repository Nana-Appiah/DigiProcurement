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

usr.returnUserListGrid = function (_urlString, _widget) {
    var userList = [];
    $.getJSON(_urlString, {}, function (result) {
        if (result.status.toString() == "true") {
            $.each(result.data, function (i, d) {
                userList[i] = [d.Id, d.username, d.isActive, d.isLogged, d.nameOfDepartment, d.PrManager.nameOfProfile];
            });

            console.log(userList);
            _widget.getStore().removeAll();
            _widget.getStore().loadData(userList);
        }
    });
}

usr.returnApplicationModuleGrid = function (_urlString, _widget) {
    var app_module_list = [];
    $.getJSON(_urlString, {}, function (result) {
        if (result.status.toString() == "true") {
            $.each(result.data, function (i, d) {
                //alert(d.ModuleID); alert(d.SystemName); alert(d.PublicName); alert(d.DateAssigned);
                app_module_list[i] = [d.ModuleID, d.SystemName, d.PublicName, d.DateAssigned];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(app_module_list);
        }
    });
}

usr.returnApplicationModulesForProfile = function (_urlString, _PROFILE, _widget) {
    var module_profile = [];
    $.getJSON(_urlString, { _profile: _PROFILE }, function (results) {
        if (results.status.toString() == "true") {
            $.each(results.data, function (i, d) {
                module_profile[i] = [d.ModuleID, d.SystemName, d.PublicName, d.DateAssigned];
            });

            _widget.getStore().removeAll();
            _widget.getStore().loadData(module_profile);
        }
    });
}