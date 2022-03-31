var lib = {} || $.lib;
lib.getBusinessRegistrationTypes = function () {
    /*here's the logic*/
    var business_list = new Array('Limited By Shares', 'Limited by Guarantee', 'Unlimited by Shares', 'Sole Proprietorship', 'External Company', 'Incorporated Partnership');
    return business_list;
}
