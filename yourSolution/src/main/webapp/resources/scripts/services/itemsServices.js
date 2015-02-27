/// <reference path="../vendor/angular/angular.js" />
/// <reference path="GenericService.js" />
/// <reference path="../app.js" />
'use strict';

huntApp.factory('ItemsData', ['$http', '$q', '$log', function ($http, $q, $log) {

    return {

        /**
        * get all items for user
        */
        getAllItems: function () {

            var defferd = $q.defer();
            $http.get(Generics.params().url + '/api/list?withItemsModels=false', Generics.createUserToken()).

            success(function (data, status, headers, config) {

                if (data != null && data.Data.items != null) {
                    data.Data.brands = createBrands(data);
                }

                defferd.resolve(data);
                hideLoader();
            }).
            error(function (data, status, headers, config) {
                defferd.reject(status);
                hideLoader();
            });

            return defferd.promise;
        },

        /**
        * get all items in spree
        */
        /* -- Deprecated not in use
        getItemsInSpree: function (spreeId){
        
            $http.get('http://test.services.get hunt.com/api/Items/spree' + spreeId, getHeaders()).

           success(function (data, status, headers, config) {

           }).
           error(function (data, status, headers, config) {

           });
        },
        */
        saveItem: function (item) {

            var defferd = $q.defer();

            var request = {};
            request.type = 1;
            request.items = [];

            var itemData = {};
            itemData.id = item.id;
            itemData.title = item.title;
            itemData.storeName = item.storeName;
            itemData.brand = item.brand;
            itemData.description = item.description;
            itemData.price = item.price;
            itemData.oldPrice = item.oldPrice;
            itemData.prefferedCurrency = item.prefferedCurrency;
            itemData.currency = item.currency;
            itemData.expDate = item.expDate;
            itemData.storeItemID = item.storeItemID;
            itemData.spreeID = item.spreeID;

            request.items.push(itemData);

            $http.put(Generics.params().url + '/api/Items', request, Generics.createUserToken()).

           success(function (data, status, headers, config) {
               defferd.resolve(data);
           }).
           error(function (data, status, headers, config) {
               defferd.reject(status);
           });

            return defferd.promise;
        },

        removeItem: function (itemId) {

            var defferd = $q.defer();

            var request = { ids: [itemId] };

            $http['delete'](Generics.params().url + '/api/Items',
            {
                data: request,
                headers: Generics.createUserToken().headers
            }).

           success(function (data, status, headers, config) {
               defferd.resolve(data);
           }).
           error(function (data, status, headers, config) {
               defferd.reject(status);
           });

            return defferd.promise;
        },


        removeItemsFromPurchased: function (itemsArr, spreeID) {
            var request = {};
            request.type = 3;
            request.items = [];
            itemsArr.forEach(function (item) {
                request.items.push({
                    id: item.id,
                    archive: true,
                    spreeID: item.spreeID
                });
            });

            var defferd = $q.defer();
            $http.put(Generics.params().url + '/api/Items', request, Generics.createUserToken()).
             success(function (data, status, headers, config) {
                 defferd.resolve(data);
             }).
            error(function (data, status, headers, config) {
                $log.error('Failed to update hunt item spree' + status);
                defferd.reject(status);
            });

            return defferd.promise;
        },

        expendExpItem: function (id, date) {
            var defferd = $q.defer();

            var request = {
                id: id,
                date: date
            };

            $http.put(Generics.params().url + '/api/ItemsAction', request, Generics.createUserToken()).

           success(function (data, status, headers, config) {
               defferd.resolve(data);
           }).
           error(function (data, status, headers, config) {
               defferd.reject(status);
           });

            return defferd.promise;
        },

        getItem: function (id) {
            var defferd = $q.defer();
            var config = Generics.createUserToken();
            config.params = { "id": id };
            var url = Generics.params().url + '/api/ItemsAction';

            $http.get(url, config).
            success(function (data, status, headers, config) {
                defferd.resolve(data);
            }).
            error(function (data, status, headers, config) {
                defferd.reject(status);
            });

            return defferd.promise;
        },

        //getCertifiedStores: function () {
        //    var defferd = $q.defer();
        //    var config = Generics.createUserToken();
        //    var now = new Date();
        //    var url = "http://imagesnew.gethunt.com/ExtConf/j3.json?" + now.getDay() + "_" + now.getMonth();





        //    $http.get(url, config).
        //    success(function (data, status, headers, config) {
        //        defferd.resolve(data);
        //    }).
        //    error(function (data, status, headers, config) {
        //        defferd.reject(status);
        //    });

        //    return defferd.promise;
        //},

        moveItemsFromPurchasedToCollection: function (itemsArr, fromWhere) {
            var request = {};
            request.type = 0;

            if (fromWhere == 'purchased') {
                request.type = 9;
            }
            else if (fromWhere == 'archived') {
                request.type = 10;
            }
            else if (fromWhere == 'fromPurchasedToArchive') {
                request.type = 11;
            }
            else if (fromWhere == 'fromArchiveToDelete') {
                request.type = 12;
            }
            else if (fromWhere == 'listToList') {
                request.type = 13; //add to list
                request.type = 14; //remove list
            }

            request.items = [];
            itemsArr.forEach(function (item) {
                var itemData = {};
                itemData.id = item.id;
                itemData.title = item.title;
                itemData.storeName = item.storeName;
                itemData.brand = item.brand;
                itemData.description = item.description;
                itemData.price = item.price;
                itemData.oldPrice = item.oldPrice;
                itemData.prefferedCurrency = item.prefferedCurrency;
                itemData.currency = item.currency;
                itemData.expDate = item.expDate;
                itemData.storeItemID = item.storeItemID;
                itemData.spreeID = item.spreeID;
                itemData.imageUrl = item.imageUrl;

                request.items.push(itemData);
            });

            var defferd = $q.defer();
            $http.put(Generics.params().url + '/api/Items', request, Generics.createUserToken()).
             success(function (data, status, headers, config) {
                 defferd.resolve(data);
             }).
            error(function (data, status, headers, config) {
                defferd.reject(status);
            });

            return defferd.promise;
        },

        changeItemsList: function (item, oldListId, newListId) {
            var request = {};
            request.type = 14; //add to list
            request.items = [];
            var itemData = {};
            itemData.id = item.id;
            itemData.title = item.title;
            itemData.storeName = item.storeName;
            itemData.brand = item.brand;
            itemData.description = item.description;
            itemData.price = item.price;
            itemData.oldPrice = item.oldPrice;
            itemData.prefferedCurrency = item.prefferedCurrency;
            itemData.currency = item.currency;
            itemData.expDate = item.expDate;
            itemData.storeItemID = item.storeItemID;
            itemData.spreeID = item.spreeID;
            itemData.imageUrl = item.imageUrl;
            itemData.lists = [oldListId];
            request.items.push(itemData);
            var defferd = $q.defer();
            $http.put(Generics.params().url + '/api/Items', request, Generics.createUserToken()).
             success(function (data, status, headers, config) {
                 //Generics.exntention.updateItem(request.items[0], request.items[0].lists[0], "14");
                 request.type = 13; //remove list
                 request.items[0].lists = [newListId];
                 $http.put(Generics.params().url + '/api/Items', request, Generics.createUserToken()).
                     success(function (data, status, headers, config) {
                         //Generics.exntention.updateItem(request.items[0], request.items[0].lists[0], "13");
                         defferd.resolve(data);
                     }).
                    error(function (data, status, headers, config) {
                        defferd.reject(status);
                    });
             }).
            error(function (data, status, headers, config) {
                defferd.reject(status);
            });

            return defferd.promise;
        },

        //Resource example
        //var Todo = $resource('/api/1/todo/:id');

        ////create a todo
        //var todo1 = new Todo();
        //todo1.foo = 'bar';
        //todo1.something = 123;
        //todo1.$save();

        ////get and update a todo
        //var todo2 = Todo.get({id: 123});
        //todo2.foo += '!';
        //todo2.$save();

        ////delete a todo
        //Todo.$delete({id: 123});

    };

    /*
    * create brand collection
    */
    function createBrands(data) {

        var brandsData = { brands: [] };
        var addBrand;
        var newBrand;
        for (var i = 0; i < data.Data.items.length ; i++) {
            if (typeof data.Data.items[i].brand != undefined && data.Data.items[i].brand != '') {
                addBrand = true;
                for (var ii = 0; ii < brandsData.brands.length ; ii++) {
                    if (brandsData.brands[ii].name != '' && brandsData.brands[ii].name.toLowerCase().indexOf(data.Data.items[i].brand.toLowerCase()) != -1) {
                        addBrand = false;
                        brandsData.brands[ii].numOfItems = typeof brandsData.brands[ii].numOfItems == undefined ? 1 : brandsData.brands[ii].numOfItems + 1;
                        break;
                    }
                }
                if (addBrand) {
                    newBrand = {
                        name: data.Data.items[i].brand.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }),
                        numOfItems: 1
                    };
                    brandsData.brands.push(newBrand);
                }
            }
        }
        return brandsData;
    }

}]);