(function(){
  var app = angular.module('Authentication',[])

  app.controller('Auth', function(){
    this.tab = 1;

    this.setTab = function(table){
      this.tab = table;
      console.log("Table set to " + table);
    };

    this.panelNumber = function(panel){
      return this.tab === panel;
    };

  });
})();
