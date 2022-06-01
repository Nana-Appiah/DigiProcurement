Ext.onReady(function () {

    var mgmtEditor = lib.returnEditorControl();
    var REQUISITION_NUMBER = '';
    var REQUISITION_ID = 0;
    var SELECTED_RQ_ID = 0;
    var SELECTED_PRODUCT_CODE = '';
    var DEPARTMENT_ID = 0;

    var LPO_Status = '';

    var LPO_ID = 0;
    var LPO_No = '';
    var pfx = '..';

    var def_pic = "../../images/standard.jpg";

    var mgmt = Ext.get('management');

    mgmt.on('click', function () {

        var req = Ext.getCmp('mgmtWdow');

        if (!req) {
            req = new Ext.Window({
                id: 'mgmtWdow',
                height: 650,
                width: 1000,
                collapsible: false,
                resizable: false,
                closable: true,
                title: 'MANAGEMENT',
                defaults: { xtype: 'tabpanel', tabPosition: 'bottom', enableScroll: true, frame: true, height: 620 },
                items: [
                    {
                        activeTab: 0,
                        items: [
                            {
                                id: '',
                                title: 'Build LPO',
                                defaults: { xtype: 'panel', frame: true, height: 600 }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel' }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '', title: 'Search',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'mgmtdept', store: lib.returnDepartmentStore(pfx + '/Utility/GetDepartments'), valueField: 'DepartmentID', displayField: 'Name',
                                                                listeners: {
                                                                    'select': function () {
                                                                        DEPARTMENT_ID = Ext.getCmp('mgmtdept').getValue();
                                                                        lib.returnRequisitionNumbersGrid(pfx + '/Requisition/GetRequisitionNos', 2, DEPARTMENT_ID, Ext.getCmp('mgmtReqGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Approved Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'mgmtReqGrid', height: 425, autoScroll: true, autoExpandColumn: 'RequisitionNo',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionNo', type: 'string' },
                                                                        { name: 'Requestee', type: 'string' },
                                                                        { name: 'priority', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'RequisitionNo'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'RequisitionNo', header: 'Requisition No', width: 150, hidden: false, sortable: true, dataIndex: 'RequisitionNo' },
                                                                    { id: 'Requestee', header: 'Requisition No', width: 150, hidden: true, sortable: true, dataIndex: 'Requestee' },
                                                                    { id: 'priority', header: 'Priority', width: 150, hidden: true, sortable: true, dataIndex: 'priority' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'rowdblclick': function (e, t) {
                                                                        var record = e.getStore().getAt(t);

                                                                        REQUISITION_ID = record.get('Id');
                                                                        REQUISITION_NUMBER = record.get('RequisitionNo');

                                                                        $('#mgmbRNo').val(record.get('RequisitionNo'));
                                                                        $('#mgmbRequestee').val(record.get('Requestee'));
                                                                        $('#mgmPriority').val(record.get('priority'));
                                                                        //REQUISITION_ID = record.get('Id');
                                                                        lib.returnRequistionDetails2(pfx + '/Requisition/GetRequisitionDetails2', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'), 2, Ext.getCmp('mgmtReqItemsGrid'));
                                                                        //lib.getItemGridGivenRequisitionID('/Requisition/GetRequisitionItemList', REQUISITION_ID, 2, Ext.getCmp('mgmtReqItemsGrid'));
                                                                        lib.storeRequisitionInSession(pfx + '/Requisition/StorePotentialRequisitonUploadID', REQUISITION_ID)
                                                                        //do json call from the event listener
                                                                        

                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'mgmtRequest', title: 'Results', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local', allowBlank: false, anchor: '95%' },
                                                        items: [
                                                            { id: 'mgmbRNo', xtype: 'textfield', fieldLabel: 'RequistionNo', disabled: true },
                                                            { id: 'mgmbRequestee', xtype: 'textfield', fieldLabel: 'Requesting By', disabled: true },
                                                            { id: 'mgmPriority', xtype: 'textfield', fieldLabel: 'Priority', disabled: true }
                                                        ],
                                                        listeners: {
                                                            'render': function () {
                                                                //lib.getPrelimData('/Requisition/GetRequisitionPrelimData', Ext.getCmp('bRNo'), Ext.getCmp('bRequestee'), Ext.getCmp('bComp'), Ext.getCmp('bDept'));
                                                            }
                                                        }
                                                    },
                                                    {
                                                        id: 'mgmreqs', title: 'Requisitions',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'mgmtReqItemsGrid', height: 200, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                plugins: mgmtEditor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' },
                                                                        { name: 'amt', type: 'int' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ProductName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'RequisitionId', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'RequisitionId' },
                                                                    { id: 'ProductCode', header: 'Product', width: 100, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                                    { id: 'ProductName', header: 'Code', width: 400, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                                    { id: 'Quantity', header: 'Qty', width: 50, hidden: false, sortable: true, dataIndex: 'Quantity' },
                                                                    { id: 'narration', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'narration' },
                                                                    {
                                                                        id: 'amt', header: 'Amt', width: 150, hidden: false, sortable: false, dataIndex: 'amt',
                                                                        editor: {
                                                                            xtype: 'numberfield', allowBlank: false, allowNegative: false, minValue: 1, maxValue: 1000000
                                                                        }
                                                                    }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'rowdblclick': function (e, t) {
                                                                        var rekord = e.getStore().getAt(t);
                                                                        SELECTED_RQ_ID = rekord.get('Id');
                                                                        SELECTED_PRODUCT_CODE = rekord.get('ProductCode');
                                                                        //alert('requisition ID is ' + SELECTED_RQ_ID.toString());
                                                                    }
                                                                }
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Generate separate requisition',
                                                                listeners: {
                                                                    'click': function (e) {
                                                                        if ((SELECTED_RQ_ID > 0) && (SELECTED_PRODUCT_CODE.length > 0)) {

                                                                            Ext.MessageBox.confirm("Generate Requisition", "Are you sure you want to create a splinter requisition for " + SELECTED_PRODUCT_CODE + "?", function (btn) {
                                                                                if (btn == "yes") {
                                                                                    $.post(pfx + '/Requisition/DeCoupleRequisitions',
                                                                                        { rqItmID: SELECTED_RQ_ID, rqNo: Ext.fly('mgmbRNo').getValue(), prodCode: SELECTED_PRODUCT_CODE })
                                                                                        .done(function (rs) {
                                                                                            if (rs.status.toString() == "true") {
                                                                                                Ext.Msg.alert('SEPARATE REQUISITIONS', SELECTED_PRODUCT_CODE + ' splintered as a different requisition', this);

                                                                                                //refresh grid with old requisition data
                                                                                                lib.returnRequisitionNumbersGrid(pfx + '/Requisition/GetRequisitionNos', 2, DEPARTMENT_ID, Ext.getCmp('mgmtReqGrid'));
                                                                                                Ext.getCmp('mgmtReqItemsGrid').getStore().removeAll();
                                                                                                lib.returnRequistionDetails2(pfx + '/Requisition/GetRequisitionDetails2', REQUISITION_ID, $('#rno'), $('#requestee'), $('#dept'), $('#priority'), 2, Ext.getCmp('mgmtReqItemsGrid'));
                                                                                            }
                                                                                        });
                                                                                }
                                                                            });

                                                                            
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: '', text: 'Calculate Total Amout',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        //update requisition with amount column
                                                                        //create an LPO record
                                                                        //update requisition with LPO_ID

                                                                        var tot = 0;

                                                                        var ee = Ext.getCmp('mgmtReqItemsGrid').getStore().getRange();
                                                                        Ext.each(ee, function (item, idx) {
                                                                            tot = tot + parseInt(item.get('amt'));
                                                                        });

                                                                        $('#txtTotal').val(tot.toString());
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'mgmproctotal', title: 'Procurement Total', defaults: { xtype: 'textfield', allowBlank: false, disabled: true }, layout: 'fit',
                                                        items: [
                                                            { id: 'txtTotal', style: { 'font-size': '20px', 'color': 'red', 'text-align': 'center' } }
                                                        ]
                                                    },
                                                    {
                                                        id: 'mgmvendorfrm', title: 'Select Vendor',
                                                        defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            { id: 'mgmvendor', store: lib.returnVendorStore(pfx + '/Utility/GetVendors'), valueField: 'VendorID', displayField: 'VendorName' }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Build LPO',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var reqs = [];
                                                                        var swap = [];
                                                                        var resultant = [];

                                                                        var store = Ext.getCmp('mgmtReqItemsGrid').getStore().getRange();

                                                                        Ext.each(store, function (item, idx) {
                                                                            if (parseInt(item.get('amt')) > 0) {
                                                                                var str = item.get('Id') + ',' + item.get('amt');
                                                                                swap[idx] = [str];
                                                                            }
                                                                        });

                                                                        resultant = swap.filter(function (val) { return val !== undefined; });
                                                                        for (var z = 0; z < resultant.length; z++) {
                                                                            reqs.push(resultant[z]);
                                                                        }

                                                                        $.post(pfx + '/Requisition/CreateLPORecord',
                                                                            {
                                                                                rNo: REQUISITION_NUMBER, vID: Ext.getCmp('mgmvendor').getValue(),
                                                                                LPOstatus: 3, finStatusId: 3, totAmt: Ext.fly('txtTotal').getValue(),
                                                                                dta: reqs
                                                                            }).done(function (r) {
                                                                                if (r.status.toString() == "true") {
                                                                                    Ext.MessageBox.alert("LOCAL PURCHASE ORDER", r.data, this);
                                                                                    $('#mgm-btn-clear').trigger('click');
                                                                                }
                                                                            })
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'mgm-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('mgmtRequest').getForm().reset();
                                                                        Ext.getCmp('mgmtReqItemsGrid').getStore().removeAll();
                                                                        Ext.getCmp('mgmproctotal').getForm().reset();
                                                                        Ext.getCmp('mgmvendorfrm').getForm().reset();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .3, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'fp', title: 'Approved Items',
                                                        fileUpload: true, defaults: { xtype:'textfield', allowBlank: false, anchor:'100%' }, layout:'form',
                                                        items: [
                                                            //{ id:'file-name', emptyText:'enter the name of file' },
                                                            {
                                                                xtype: 'fileuploadfield', id: 'form-file', emptyText: 'select an image document'
                                                            }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Save',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var fpfrm = Ext.getCmp('fp').getForm();
                                                                        
                                                                        if (fpfrm.isValid()) {
                                                                            var formData = fpfrm.getValues();
                                                                            fpfrm.submit({
                                                                                //clientValidation: true,
                                                                                data: formData,
                                                                                url: pfx + '/Requisition/fUpload',
                                                                                method: 'POST',
                                                                                //waitMsg: 'Uploading document...please wait',
                                                                                success: function (form, action) {
                                                                                    //msg('Success', 'Processed file "' + o.result.file + '" on the server');
                                                                                    Ext.Msg.alert('Success', action.toString())
                                                                                },
                                                                                failure: function (form, action) {
                                                                                    Ext.Msg.alert('Failure', aciton.toString());
                                                                                }
                                                                            });

                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Image or Document uploads',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'GrdUploads', height: 250, autoScroll: true, autoExpandColumn: 'fileDescription',
                                                                //plugins: editor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'requisitionId', type: 'int' },
                                                                        { name: 'fileDescription', type: 'string' },
                                                                        { name: 'file', type: 'string' },
                                                                        { name: 'filepath', type: 'string' }
                                                                    ]),
                                                                    groupField: 'fileDescription'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: '#s', width: 150, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'requisitionId', header: 'ReqNo', width: 150, hidden: true, sortable: true, dataIndex: 'requisitionId' },
                                                                    { id: 'fileDescription', header: 'File', width: 150, hidden: false, sortable: true, dataIndex: 'fileDescription' },
                                                                    { id: 'file', header: 'File', width: 150, hidden: true, sortable: true, dataIndex: 'file' },
                                                                    { id: 'filepath', header: 'FilePath', width: 150, hidden: true, sortable: true, dataIndex: 'filepath' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            if (REQUISITION_ID > 0) {
                                                                                //get images for last requisition clicked
                                                                                lib.returnRequisitionDocuments(pfx + '/Requisition/GetUploadsOfRequisition', REQUISITION_ID, Ext.getCmp('GrdUploads'));
                                                                            }
                                                                            
                                                                        }, 2000);
                                                                        
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        
                                                                        var rec = e.getStore().getAt(t);

                                                                        var img = 'http://localhost/uploads/' + rec.get('fileDescription');
                                                                        window.open(img,'_blank','width=700,height=650');
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: '',
                                title: 'Create LPO',
                                defaults: { xtype: 'panel', frame: true, height: 580 }, layout: 'form',
                                items: [
                                    {
                                        defaults: { xtype: 'panel' }, layout: 'column',
                                        items: [
                                            {
                                                columnWidth: .3, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: '', title: 'Local Purchasing Orders',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'LPOGrid', height: 450, autoScroll: true, autoExpandColumn: 'LPONumber',
                                                                //plugins: editor,
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'requisitionNumber', type: 'string' },
                                                                        { name: 'nameOfVendor', type: 'string' },
                                                                        { name: 'LPOTotalAmount', type: 'string' },
                                                                        { name: 'LPONumber', type: 'string' },
                                                                        { name: 'statusOfLPO', type: 'string' }

                                                                    ]),
                                                                    groupField: 'LPONumber'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'Requisition', width: 150, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'requisitionNumber', header: 'Req #', width: 150, hidden: true, sortable: true, dataIndex: 'requisitionNumber' },
                                                                    { id: 'nameOfVendor', header: 'Vendor', width: 150, hidden: true, sortable: true, dataIndex: 'nameOfVendor' },
                                                                    { id: 'LPOTotalAmount', header: 'Amount', width: 150, hidden: true, sortable: true, dataIndex: 'LPOTotalAmount' },
                                                                    { id: 'LPONumber', header: 'LPO #', width: 250, hidden: false, sortable: true, dataIndex: 'LPONumber' },
                                                                    { id: 'statusOfLPO', header: 'Status', width: 150, hidden: false, sortable: true, dataIndex: 'statusOfLPO' }
                                                                ],
                                                                stripeRows: true,
                                                                listeners: {
                                                                    'render': function () {
                                                                        lib.returnLocalPurchasingOrderGrid(pfx + '/Requisition/GetLPOs', Ext.getCmp('LPOGrid'));
                                                                    },
                                                                    'afterrender': function () {
                                                                        setInterval(function () {
                                                                            lib.returnLocalPurchasingOrderGrid(pfx + '/Requisition/GetLPOs', Ext.getCmp('LPOGrid'));
                                                                        },5000);
                                                                    },
                                                                    'rowdblclick': function (e, t) {
                                                                        var rec = e.getStore().getAt(t);
                                                                        $('#lpodetvendor').val(rec.get('nameOfVendor'));
                                                                        $('#lpodetamt').val(rec.get('LPOTotalAmount'));

                                                                        LPO_Status = rec.get('statusOfLPO');
                                                                        LPO_ID = rec.get('Id');
                                                                        LPO_No = rec.get('LPONumber');

                                                                        lib.returnItemGridGivenLPONumber(pfx + '/Requisition/GetRequisitionItemListUsingLPO', rec.get('Id'), Ext.getCmp('LPOReqGrid'));
                                                                    }
                                                                }
                                                            })
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: '', text: 'Refresh',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        lib.returnLocalPurchasingOrderGrid(pfx + '/Requisition/GetLPOs', Ext.getCmp('LPOGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .5, defaults: { xtype: 'form', frame: true, border: true },
                                                items: [
                                                    {
                                                        id: 'LPORegGridFrm', title: 'Items',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'LPOReqGrid', height: 100, autoScroll: true, autoExpandColumn: 'ProductName',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'RequisitionId', type: 'int' },
                                                                        { name: 'ProductCode', type: 'string' },
                                                                        { name: 'ProductName', type: 'string' },
                                                                        { name: 'Quantity', type: 'int' },
                                                                        { name: 'narration', type: 'string' },
                                                                        { name: 'amt', type: 'decimal' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'ProductName'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'RequisitionId', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'RequisitionId' },
                                                                    { id: 'ProductCode', header: 'Product', width: 100, hidden: false, sortable: true, dataIndex: 'ProductCode' },
                                                                    { id: 'ProductName', header: 'Code', width: 400, hidden: false, sortable: true, dataIndex: 'ProductName' },
                                                                    { id: 'Quantity', header: 'Qty', width: 50, hidden: false, sortable: true, dataIndex: 'Quantity' },
                                                                    { id: 'narration', header: 'ID', width: 25, hidden: true, sortable: true, dataIndex: 'narration' },
                                                                    {
                                                                        id: 'amt', header: 'Amt', width: 150, hidden: false, sortable: false, dataIndex: 'amt'
                                                                    }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    },
                                                    {
                                                        id: 'LPODetailsFrm', title: 'LPO Details', defaults: { xtype: 'textfield', anchor: '95%', disabled: true }, layout: 'form',
                                                        items: [
                                                            { id: 'lpodetvendor', fieldLabel: 'Vendor' },
                                                            { id: 'lpodetamt', fieldLabel: 'Amount (GHc)' }
                                                        ]
                                                    },
                                                    {
                                                        id: 'LPOProcFrm', title: 'Procurement Type', defaults: { xtype: 'combo', forceSelection: true, typeAhead: true, allowBlank: false, mode: 'local' }, layout: 'fit',
                                                        items: [
                                                            {
                                                                id: 'proctypeid', store: lib.returnProcurementTypeStore(pfx + '/Utility/GetProcurementTypes'),
                                                                valueField: 'ProcurementTypeID', displayField: 'ProcurementDescription',
                                                                listeners: {
                                                                    'select': function () {
                                                                        lib.returnProcessFlowData(pfx + '/Requisition/GetProcessFlowDetails', Ext.getCmp('proctypeid').getValue(), Ext.getCmp('LPOPFLimit'), Ext.getCmp('PFListGrid'));
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'LPOotherFrm', title: 'Other Info', defaults: { xtype: 'datefield', format: 'd-m-Y', anchor: '95%' }, layout: 'form',
                                                        items: [
                                                            { xtype: 'numberfield', id: 'vat', fieldLabel: 'VAT', hidden: true, minValue: 1, maxValue: 30 },
                                                            { id: 'pdate', fieldLabel: 'Purchase Date' },
                                                            { id: 'expdate', fieldLabel: 'Delivery Date' },
                                                            { xtype: 'combo', id: 'payment', fieldLabel: 'Payment Term', forceSelection: true, typeAhead: true, mode: 'local', store: ['Cash', 'Cheque'] },
                                                            { xtype: 'textfield', id: 'cheque', fieldLabel: 'Cheque No',hidden: true },
                                                            { xtype: 'textfield', id: 'shipping', fieldLabel: 'Shipping Addr', hidden: true },
                                                            { xtype: 'textarea', id: 'terms', fieldLabel: 'Terms and Conditions' }
                                                        ],
                                                        buttons: [
                                                            {
                                                                id: 'lpo-btn-save', text: 'Send LPO for Approval',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        var procfrm = Ext.getCmp('LPOProcFrm').getForm();
                                                                        var frm = Ext.getCmp('LPODetailsFrm').getForm();
                                                                        var ff = Ext.getCmp('LPOotherFrm').getForm();

                                                                        if (frm.isValid() && ff.isValid() && procfrm.isValid())
                                                                        {
                                                                            if (LPO_Status != "Vendor selected") {
                                                                                Ext.MessageBox.alert("LPO Generated", "Selected Local Purchase Order has already been generated", this);
                                                                                return false;
                                                                            }

                                                                            var str = LPO_ID + ',' + Ext.fly('vat').getValue() + ',' + Ext.fly('pdate').getValue() + ',' +
                                                                                Ext.fly('expdate').getValue() + ',' + Ext.fly('shipping').getValue() + ',' +
                                                                                Ext.fly('payment').getValue() + ',' + Ext.fly('terms').getValue() + ',' + Ext.getCmp('proctypeid').getValue();

                                                                            $.post(pfx + '/Requisition/CreateLocalPurchasingOrder',
                                                                                {
                                                                                    _value: str
                                                                                })
                                                                                .done(function (r) {
                                                                                    if (r.status.toString() == "true") {
                                                                                        $('#lpo-btn-clear').trigger('click');
                                                                                        Ext.MessageBox.alert("Local Purchasing Order", "LPO with number " + LPO_No + " sent for approval", this)
                                                                                    }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                id: 'lpo-btn-clear', text: 'Clear',
                                                                listeners: {
                                                                    'click': function (btn) {
                                                                        Ext.getCmp('LPORegGridFrm').getForm().reset();
                                                                        //Ext.getCmp('LPODetailsFrm').getForm().reset();
                                                                        Ext.getCmp('LPOProcFrm').getForm().reset();
                                                                        Ext.getCmp('LPOotherFrm').getForm().reset();

                                                                        Ext.getCmp('LPOPFLimitFrm').getForm().reset();
                                                                        Ext.getCmp('PFListGrid').getStore().removeAll();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .2, defaults: { xtype: 'form', frame: true, border: true },layout:'form',
                                                items: [
                                                    {
                                                        id: 'LPOPFLimitFrm', title: 'Threshold Limit', defaults: { xtype: 'textfield', allowBlank: false, style: { 'font-size': '15px', 'color': 'red', 'text-align': 'center' } }, layout: 'fit',
                                                        items: [
                                                            {id:'LPOPFLimit'}
                                                        ]
                                                    },
                                                    {
                                                        id: '', title: 'Approving Actors',
                                                        items: [
                                                            new Ext.grid.GridPanel({
                                                                id: 'PFListGrid', height: 425, autoScroll: true, autoExpandColumn: 'value',
                                                                store: new Ext.data.GroupingStore({
                                                                    reader: new Ext.data.ArrayReader({}, [
                                                                        { name: 'Id', type: 'int' },
                                                                        { name: 'value', type: 'string' }
                                                                    ]),
                                                                    sortInfo: {
                                                                        field: 'Id',
                                                                        direction: 'ASC'
                                                                    },
                                                                    groupField: 'value'
                                                                }),
                                                                columns: [
                                                                    { id: 'Id', header: 'Id', width: 150, hidden: true, sortable: true, dataIndex: 'Id' },
                                                                    { id: 'value', header: 'Persons', width: 150, hidden: false, sortable: true, dataIndex: 'value' }
                                                                ],
                                                                stripeRows: true
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }).show();
        }

    });

});