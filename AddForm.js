Ext.define('APP.AddForm', {
    extend: "Ext.window.Window",
    config: {parentForm: null},
    initComponent: function () {
        var me = this;
        Ext.define('CateList', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name']
        });
        me.form = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            defaultType: 'textfield',
            url: '/',
            buttons: [{
                text: '重置',
                handler: function () {
                    me.form.getForm().reset();
                }
            }, {
                text: '保存',
                formBind: true,
                handler: function () {
                    var form = me.form.getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function (form, action) {
                                form.reset();
                                var parent = me.getParentForm();
                                parent.refresh();
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert('ERROR', 'failure');
                            }
                        });
                    }
                }
            }],
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '日期',
                    name: 'day',
                    format: 'Y-m-d',
                    allowBlank: false,
                },
                {
                    xtype: 'timefield',
                    fieldLabel: '时间',
                    name: 'time',
                    format: 'H:i:s',
                    allowBlank: false,
                }, {
                    xtype: 'numberfield',
                    fieldLabel: '金额',
                    name: 'payout',
                    allowBlank: false,
                }, {
                    xtype: 'combo',
                    fieldLabel: '类型',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'name'],
                        proxy: {
                            type: 'ajax',
                            url: '/',
                            extraParams: {id: '8D8A2C83E03910AC'},           
                        },
                        autoLoad: true
                    }),
                    value: '1',
                    editable: false,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'cate',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '备注',
                    name: 'remark',
                },{
                    xtype: "hidden",
                    name: "id",
                    value: '993CC90EDD4A072B'                    
                }
            ]
        });
        Ext.apply(me, {
            title: 'ADD',
            modal: true,
            items: [me.form]
        });
        me.callParent(arguments);
    },
});
                