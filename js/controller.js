'use strict';

angular.module('starter')
    .controller('mainCtrl', ['$scope', '$filter', 'ngTableParams', 'ngDialog', 'dataFactory', '$uibModal',
        function($scope, $filter, ngTableParams, ngDialog, dataFactory, $uibModal) {

            $scope.init = function() {
                $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 10,
                    sorting: {
                        firstName: 'asc' // initial sorting
                    }
                }, {
                    total: 0,
                    getData: function($defer, params) {
                        dataFactory.getData().then(function(data) {
                            var orderedData = {};

                            if ($scope.txtSearch) {
                                orderedData = $filter('filter')(data, $scope.txtSearch);
                                orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
                            } else {
                                orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                            }

                            params.total(data.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        });
                    }
                });
            };

            $scope.$watch('txtSearch', function() {
                $scope.tableParams.reload();
            });

            $scope.confirmDelete = function(id) {
                ngDialog.openConfirm({
                    template: 'templates/confirm.html',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function(value) {
                    Code.deleteCode(id).then(function(response) {
                        console.log('response: ', response);
                        toastr.success('Record Successfully Deleted', 'Deleted...');
                        $scope.initCodes();
                    });
                }, function(value) {
                    console.log('rejected:' + value);
                });;
            };

            $scope.openMail = function(data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/mail.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'modal-md',
                    resolve: {
                        senderDetails: function() {
                            return data;
                        }
                    }
                });
                modalInstance.result.then(function(selectedItem) {
                    console.log('selectedItem: ', selectedItem);
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    ])
    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance,senderDetails,dataFactory) {
    	console.log('senderDetails: ',senderDetails);

    	$scope.data = {};
    	$scope.data.to = senderDetails.email;
    	$scope.data.sendTo = {
    		email: senderDetails.email,
    		name: senderDetails.fistName + ' ' + senderDetails.lastName,
    		type: 'to'
    	};

        $scope.send = function() {
        	console.log('data: ', $scope.data);
        	dataFactory.sendMessage($scope.data).then(function(response){
        		console.log('response: ',response);
        	});
            // $uibModalInstance.close('save');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
