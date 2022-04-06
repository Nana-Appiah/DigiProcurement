var access = access || {};

access.GetAssignedModules = function (URL, icons) {
    var _data;
    var icons_count = icons.length;
    $.getJSON(URL, {}, function (res) {
        $.each(res, function (idx, _value) {
            //iterating over the controls
            $.each(icons, function (i, ctrl) {
                var control = $(this);
                if (i <= icons_count - 1) {
                    if (control.hasClass(_value.SystemName)) {
                        $.getScript('../../Scripts/evCallbacks/' + _value.SystemName + '.js');
                        control.show();
                    }
                }

            });
        });
    });

    return _data;
}