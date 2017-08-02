Ext.define("APP.Login", {
    extend: 'Ext.window.Window',
    title: "login",
    modal: true,
    closable: false,
    layout: "fit",
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            resizable: false,
            items: [{
                id: "loginForm",
                xtype: "form",
                bodyPadding: 5,
                defaultType: 'textfield',
                fieldDefaults: {labelWidth: 40},
                items: [{
                    id: "userName",
                    fieldLabel: "用户",
                    allowBlank: false,
                    name: "username",
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() === e.ENTER) {
                                Ext.getCmp("passWord").focus();
                            }
                        }
                    }
                }, {
                    id: "passWord",
                    fieldLabel: "密码",
                    allowBlank: false,
                    inputType: "password",
                    name: "password",
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() === e.ENTER) {
                                if (Ext.getCmp("loginForm").getForm().isValid()) {
                                    me.onOK();
                                }
                            }
                        }
                    }
                }],
                buttons: [{
                    text: "普通登录",
                    formBind: true,
                    handler: me.onOK,
                    scope: me
                }, {
                    text: "快捷登录",
                    handler: function () {
                    }
                }]
            }]
        });
        me.callParent(arguments);
    },
    onOK: function () {
        var me = this;
        var f = Ext.getCmp("loginForm");
        var el = f.getEl() || Ext.getBody();
        el.mask("登录中...");
        f.getForm().submit({
            url: "/",
            method: "POST",
            success: function (form, action) {
                location.replace('/');
            },
            failure: function (form, action) {
                el.unmask();
            }
        });
    }
});