$('#logoff').bind('click', function (e) {
    e.preventDefault();
    var pfx = '..';
    Ext.MessageBox.confirm("Log off", "Are you sure you want to log off", function (btn) {
        
        if (btn == "yes") {
            $.post(pfx + '/Home/Logout', {}, function (response) {
                if (response.toString() == "true") {
                    window.location = '/procurement';
                }
                else {
                    //redirect to an error page. to be implemented later
                    window.location = '/procurement';
                }

            });
        }
    });
});