Ext.define("APP.App", {
    constructor: function (config) {
        this.createMainUI();
        var me = this;
    },
    
    createMainUI: function () {
        var me = this;
        me.vp = Ext.create("Ext.container.Viewport", {
            layout: "fit",
            padding :'2px 2px 2px 2px',
            items: [{
                id:'mainApp',
                title:'APP',
                xtype: "panel",                  
                layout: "fit",                      
            }]
        });
        var el = Ext.getBody();
        el.mask("loading...");
        Ext.Ajax.request({
            url: 'data.php',
            method: "POST",
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                me.createMainMenu(data);
                el.unmask();
            }
        });
    },

    createMainMenu: function (root) {
        var me = this;
        var menuItemClick = function () {
            var fid = this.fid;
            if(fid == '21'){
                me.addRecords();
                return;
            }
            if(fid == '11'){
                location.replace("?id=C95DF5D80478C726");
                return;
            }            
    
        };
        var mainMenu = [];
        for (var i = 0; i < root.length; i++) {
            var m1 = root[i];
            var menuItem = Ext.create("Ext.menu.Menu");
            for (var j = 0; j < m1.children.length; j++) {
                var m2 = m1.children[j]; 
                menuItem.add({
                    text: m2.caption, fid: m2.fid, handler: menuItemClick
                });
            }
            mainMenu.push({text: m1.caption, menu: menuItem});
        }
        var mainToolbar = Ext.create("Ext.toolbar.Toolbar", {dock: "top"});           
        mainToolbar.add(mainMenu);
        this.vp.getComponent(0).addDocked(mainToolbar);
    },
       
    add: function (comp) {
        var me = this;
        Ext.getCmp('mainApp').add(comp);

        me.comp = comp;
    },
    
    addRecords:function(){
        var win = Ext.create('APP.AddForm', {parentForm: this});
        win.show();
    },
    refresh:function(){
        var me = this;
        
        me.comp.getMainsData();
        me.comp.getGroupData();
        
    },   
});