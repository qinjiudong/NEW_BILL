Ext.define("APP.List", {
	extend: 'Ext.panel.Panel',
	border:0,
	layout: "border",

	initComponent: function () {
		var me = this;	
        var mainsStore = Ext.create("Ext.data.Store", {
            fields: ["id", "date", "payout", "cate", "year", "month", "remark"]
        }); 
        me.mainsStore = mainsStore;
		var mainsGrid = Ext.create('Ext.grid.Panel', {
		    border:0,
		    forceFit: true,
		    store: mainsStore,
            columns: [
                {menuDisabled: true, flex: 0.2,header: 'ID', dataIndex: 'id', },
                {menuDisabled: true, flex: 0.5,header: 'DATE', dataIndex: 'date', },
                {menuDisabled: true, flex: 0.3,header: 'OUT', dataIndex: 'payout', },
                {menuDisabled: true, flex: 0.1,header: 'CATE', dataIndex: 'cate', },
                {menuDisabled: true, flex: 0.3,header: 'YEAR', dataIndex: 'year', },
                {menuDisabled: true, flex: 0.3,header: 'MONTH', dataIndex: 'month', },
                {menuDisabled: true, flex: 1.0,header: 'REMARK', dataIndex: 'remark', },
            ]
		});
		me.mainsGrid = mainsGrid;
        var groupStore = Ext.create("Ext.data.Store", {
            fields: ["year", "month", "total"]
        }); 
        me.groupStore = groupStore;
		var groupGrid = Ext.create('Ext.grid.Panel', {
		    border:0,
		    forceFit: true,
		    store: groupStore,	   
		    columns: [
                {menuDisabled: true, flex: 1.0,header: 'YEAR', dataIndex: 'year', },
                {menuDisabled: true, flex: 1.0,header: 'MONTH', dataIndex: 'month', },
                {menuDisabled: true, flex: 1.0,header: 'TOTAL', dataIndex: 'total', },
		    ],
		});
		me.groupGrid = groupGrid;
		Ext.apply(me, {
			items: [{
				region: 'east',
				title: 'Group',
				collapsible: true,
				items:groupGrid,
				split: true,
				flex:0.3,
				layout: "fit",	
			}, {
				region: 'center',
				items:mainsGrid,
				layout: "fit",
			}]
		});   
		me.callParent(arguments);
		me.getMainsData();
		me.getGroupData();
	},

	getMainsData:function(){
		var me = this;
		var store = me.mainsStore;
		store.removeAll();
		
		Ext.Ajax.request({
		    url: '/',
		    params: {id: '14AE53E17287DF45'},
		    success: function(response){
		         var data = Ext.JSON.decode(response.responseText);
		         store.add(data);
		         
		    }
		});
	},

	getGroupData:function(){
		var me = this;
		var store = me.groupStore;
		store.removeAll();
		
		Ext.Ajax.request({
		    url: '/',
		    params: {id: '72A334A9C34182B3'},		        
		    success: function(response){
		         var data = Ext.JSON.decode(response.responseText);
		         store.add(data);
		         
		    }
		});		
	},

});