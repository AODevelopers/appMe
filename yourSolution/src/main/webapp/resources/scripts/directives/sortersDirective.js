huntApp.directive('sorter', function () {

   
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/sorterDirective.html?v=' + version,
        scope: {
            sorterString: '=',
            sorterCollection: '=',
            hasCheckbox: '=',
            showDoneButton: '=',
            sorterItemClick: '=',
            isItemChecked: '=',
            saveChanges: '=',
            orderattr: '=',
        },
        link: function (scope, element, attrs) {
            scope.titleString = '';

            var setTextOfSelectedTitles = function (sale) {
                if (scope.sorterString != 'Radius') {
                    if (scope.sorterCollection) {
                        scope.titleString = '';
                        scope.sorterCollection.forEach(function (items) {
                            items.forEach(function (item) {
                                if (item.isChecked || (!!sale && item.name == 'Sale')) {
                                    scope.titleString = scope.titleString + ', ' + item.name;
                                }
                            });


                        });
                        scope.titleString = scope.titleString.substr(2);
                    }
                }
            };

            var eraseAll = function () {
                if (scope.sorterString != 'Radius') {
                    if (scope.sorterCollection) {
                        scope.titleString = '';

                        scope.sorterCollection.forEach(function (items) {
                            items.forEach(function (item) {
                                item.isChecked = false;
                            });
                        });
                    }
                }
            };

            scope.$on('closeSorterPanel', function (e, sorterString) {
                if (scope.sorterString != sorterString) {
                    scope.showSorterPanel = false;
                }
            });

            scope.$on('bodyClicked', function () {
                scope.showSorterPanel = false;
                notifyAngular(scope);
            });

            scope.sorterArrowClick = function () {
                scope.showSorterPanel = !scope.showSorterPanel;
                scope.$emit('closeSorterPanels', scope.sorterString);
            }

            scope.doneButtonClicked = function (e) {
                window.childDiv = '';
                mainScroll(true);
                scope.titleString = '';

                scope.$emit('rootClearSortersSelections', scope.sorterString);
                setTextOfSelectedTitles();

                scope.saveChanges(e);
            }



            scope.$on('updateSorterText', function () {
                setTextOfSelectedTitles();
            });

            scope.$on('showSaleTitleOnSorter', function () {
                setTextOfSelectedTitles('sale');
            });

            scope.$on('eraseAll', function () {
                eraseAll();
            });

            scope.sorterItemClickWrapper = function (item, $event, sorterString) {
                if (!scope.showDoneButton) {
                    window.childDiv = '';
                    mainScroll(true);

                    scope.sorterCollection.forEach(function (items) {
                        items.forEach(function (item) {
                            item.isChecked = false;
                        });
                    });

                    item.isChecked = true;

                    scope.$emit('rootClearSortersSelections', scope.sorterString);
                    setTextOfSelectedTitles();
                }

                scope.sorterItemClick(item, $event, sorterString);
            };

            scope.$on('clearSortersSelections', function (event, sorterString) {
                if (sorterString == 'Radius') {
                    if (scope.sorterString != 'Radius') {
                        scope.titleString = '';
                    }
                }
                else if (!scope.showDoneButton && sorterString != scope.sorterString && scope.sorterString != 'Radius') {
                    scope.titleString = '';
                }
            });

            scope.$on('updateKMSorterText', function (event, title) {
                if (scope.sorterString == 'Radius') {
                    scope.titleString = !!title ? title + ' km' : '2.5 km';
                }
                if (scope.sorterString == 'Status') {
                    if (title == 'All' && !!title) {
                        scope.titleString = '';
                    }
                    else {
                        scope.titleString = title;
                    }
                }
            })
        }
        }
});