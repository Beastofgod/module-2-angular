(function (){
    'use strict';

    angular.module('stuffnsuch', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

// should be full to start
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var ctr1 = this;

        ctr1.items = ShoppingListCheckOffService.getBuyItems();
        ctr1.hasItems = ShoppingListCheckOffService.getBuyItems().length === 0;
        ctr1.itemBought = function(itemIndex) {
            ShoppingListCheckOffService.itemBought(itemIndex);
        }
    };

// should be empty to start
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var ctr2 = this;
        ctr2.items = ShoppingListCheckOffService.getBoughtItems();
        ctr2.hasItems = ShoppingListCheckOffService.getBoughtItems().length === 0;
    };


    function ShoppingListCheckOffService() {
        var service = this;

        var itemsOnBuyList = [
        {name:"thing", quantity: 9},
        {name:"purse", quantity: 5},
        {name:"orange", quantity: 2}];
        var itemsOnBoughtList = [];

        service.itemBought = function(itemIndex){
            itemsOnBoughtList.push(itemsOnBuyList[itemIndex]);
            itemsOnBuyList.splice(itemIndex,1);
        }

        service.getBuyItems = function(){
            return itemsOnBuyList;
        }
        service.getBoughtItems = function(){
            return itemsOnBoughtList;
        }
    };
})();
