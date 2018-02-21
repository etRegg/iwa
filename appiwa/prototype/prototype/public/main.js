


function cleanArray(actual) {
	var newArray = new Array();
	for (var i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i]);
		}
	}
	return newArray;
}

campaining = [];
var mainApp = angular.module("prototype", [  'ui.router' ,'ngCookies',
	  'ui.router.redirect', 'ngResource']);



// angular.module('ng').filter('tel', function (){});
mainApp.service('CampagningService', function($q, $resource, $timeout) {
	// var $resource = initInjector.get('ngResource');


	var CT=$resource('/api/v1/campagnings/:id', { id: '@_id' }, {
	    update: {
	      method: 'PUT'
	    },
	    delete: {
		      method: 'DELETE'
		    }
	  });
	var campagning = [ ];
	var editCampagning = null;
	this.setOperationCampagning = function(contact) {
		var deferred = $q.defer();
		editCampagning = contact;
		$timeout(function() {
			deferred.resolve();
		}, 10);

		return deferred.promise;
	}
	this.getOperationCampagning = function() {
		var deferred = $q.defer();

		$timeout(function() {
			deferred.resolve(editCampagning);
		}, 10);

		return deferred.promise;
	}
	this.getCampagning = function() {
		var deferred = $q.defer();
		var C = $resource('/api/v1/campagnings');
		C.query().$promise.then(function(c) {
			campagning = c;

			deferred.resolve(campagning);

		});
		
/*
 * $timeout(function() { deferred.resolve(campagning); }, 1000);
 */
		return deferred.promise;
	}

	this.deleteCampagning = function() {
		var deferred = $q.defer();

		$timeout(function() {

			campagning.splice(contact.indexOf(editCampagning), 1);
			deferred.resolve();
		});

		return deferred.promise;
	}

	
	this.removeCampagning = function(con) {
		var deferred = $q.defer();
		console.log(con);
		CT.delete({id:""+con.id}, function(resp){
			  console.log(resp);
			  deferred.resolve();
			});	

		return deferred.promise;
	}
	this.addCampagning = function(con) {
		var deferred = $q.defer();
		var d=$resource(
		        "/api/v1/campagnings", 
		        {}, 
		        {
		            create: { 
		                method: "POST"// ,
		              // isArray: true
		            }
		        }
		    );
		d.create(con);
		deferred.resolve();
		return deferred.promise;
		}

	
	
	this.updateCampagning = function(con) {
		var deferred = $q.defer();
		console.log(con);
		// User.foo({id:'123', anotherParam: 'bar'}, <post data object>);
		CT.update({id:""+con.id},con ,function(resp){
			  console.log(resp)// whatever logic you want in here
			  deferred.resolve();
		});

		return deferred.promise;
	}

});

// ///////////////////////////////////////////////


mainApp.service('Auth', function($q, $resource, $timeout,$cookieStore) {



    this.token=null;
    var _this=this;
    this.isLoggedInAsync = function (is){
    	is($cookieStore.get('token') ==null);
    }


    
	this.loguin = function(con) {
		var deferred = $q.defer();
		var d=$resource(
		        "/auth/login", 
		        {}, 
		        {
		            create: { 
		                method: "POST",
		               // ,
		              // isArray: true
		            }
		        }
		    );
		d.create(con).$promise.then(function(a) {
			console.log(a);
			$cookieStore.put('token',a.token);
			deferred.resolve(a);

		});
		
		return deferred.promise;
		}


	this.register = function(con) {
		var deferred = $q.defer();
		var d=$resource(
		        "/up/register", 
		        {}, 
		        {
                           
	                create: { method: "POST" },
	       
	              }
		    );
		d.create(con).$promise.then(function(a) {
			console.log(a.token);
			$cookieStore.put('token',a.token);
			deferred.resolve(a);

		});

	
		
		
		return deferred.promise;
		}
	
	

});









// ///////////////////////////////////////////////////////////





mainApp.service('ContactService', function($q, $resource, $timeout) {
	// var $resource = initInjector.get('ngResource');

	var CT=$resource('/api/v1/contacts/:id', { id: '@_id' }, {
	    update: {
	      method: 'PUT'
	    },
	    delete: {
		      method: 'DELETE'
		    }
	  });
	
	var contact = [ ];

	var editContact = null;
	this.setOperationContact = function(contact) {
		var deferred = $q.defer();
		editContact = contact;
		$timeout(function() {
			deferred.resolve();
		}, 10);

		return deferred.promise;
	}
	this.getOperationContact = function() {
		var deferred = $q.defer();

		$timeout(function() {
			deferred.resolve(editContact);
		}, 10);

		return deferred.promise;
	}
	this.getContact = function() {
		var deferred = $q.defer();
		var User = $resource('/api/v1/contacts');
		User.query().$promise.then(function(users) {
			contact = users;
			// $location.path('/login');
			deferred.resolve(contact);

		});

/*
 * $timeout(function() { deferred.resolve(contact); }, 1000);
 */
		return deferred.promise;
	}

	this.deleteContact = function() {
		var deferred = $q.defer();
		console.log(this.operationContact);
		CT.delete({id:""+this.operationContact.id}, function(resp){
			  console.log(resp);
			  deferred.resolve();
			});	

		return deferred.promise;
	}

	this.addContact = function(con) {
		var deferred = $q.defer();
		var d=$resource(
		        "/api/v1/contacts", 
		        {}, 
		        {
		            create: { 
		                method: "POST"// ,
		              // isArray: true
		            }
		        }
		    );
		d.create(con);
		deferred.resolve();
		return deferred.promise;
	}
	this.updateContact = function(con) {
		var deferred = $q.defer();
		console.log(con);
		// User.foo({id:'123', anotherParam: 'bar'}, <post data object>);
		CT.update({id:""+con.id},con ,function(resp){
			  console.log(resp)// whatever logic you want in here
			  deferred.resolve();
		});

		return deferred.promise;
	}
	this.removeContact = function(con) {
		var deferred = $q.defer();

		console.log(con);
		CT.delete({id:""+con.id}, function(resp){
			  console.log(resp);
			  deferred.resolve();// whatever logic you want in here
			});

		return deferred.promise;
	}

	
});

mainApp.controller('list', function($scope,$location, ContactService) {
	$scope.title = "My Contacts";

	$scope.operationPerson = null;
	ContactService.getOperationContact().then(function(data) {
		ContactService.setOperationContact(null);
		console.log(data);
		if(!(data==null)){
		$scope.operationPerson = data;
		$scope.cancelPerson = data;
		
		}else{
			$scope.operationPerson =null;
			$scope.cancelPerson=null;
		}
	});
	$scope.select = function(t) {
		$scope.operationPerson = t;
		ContactService.setOperationContact(t);
	}
	$scope.refreshContact = function() {
		ContactService.getContact().then(function(contact) {
		
			$scope.persons = contact;
		});
	}

	$scope.refreshContact();

	$scope.addContact = function() {
	
		if($scope.cancelPerson==null){
		ContactService.addContact($scope.operationPerson).then(function() {
			$scope.refreshContact();
			$scope.operationPerson=null;	
		});
		}else{
			ContactService.updateContact($scope.operationPerson).then(function() {
				$scope.refreshContact();
				$scope.operationPerson=null;	
			});	
		}
		$location.path('list');

	}
	$scope.cancelContact = function() {
		$location.path('list');
	
		

	}

	$scope.deleteContact = function() {
		if(!($scope.cancelPerson==null)){
		ContactService.removeContact($scope.cancelPerson).then(function() {

			$scope.refreshContact();
	
			$scope.operationPerson=null;
            $scope.cancelPerson=null;
		});
		}
		
	}

	$scope.del = function() {
		if(!($scope.operationPerson==null)){
			ContactService.removeContact($scope.operationPerson).then(function() {
            $scope.refreshContact();
            $scope.operationPerson=null;
            $scope.cancelPerson=null;
		});
		}
	}
	$scope.acount = 1;
});



mainApp.controller('campagning', function($scope,$location, CampagningService) {
	$scope.title = "My Campagning";

	$scope.operationCampagning = null;
	CampagningService.getOperationCampagning().then(function(data) {
		CampagningService.setOperationCampagning(null);
		console.log("in campagning");
		if(!(data==null)){
		$scope.operationCampagning = data;
		$scope.cancelCampagning = data;
		}else{
			$scope.operationCampagning = null;
			$scope.cancelCampagning = null;
		}
	});
	$scope.select = function(t) {
		$scope.operationCampagning = t;
		CampagningService.setOperationCampagning(t);
	}
	$scope.refreshCampagning = function() {
		CampagningService.getCampagning().then(function(c) {
			$scope.campagning = c;
		});
	}

	$scope.refreshCampagning();

	$scope.addCampagning = function() {
		
		if($scope.cancelCampagning==null){
		CampagningService.addCampagning($scope.operationCampagning).then(function() {
			$scope.refreshCampagning();
			
		});
		}else{
			CampagningService.updateCampagning($scope.operationCampagning).then(function() {
				$scope.refreshCampagning();
				
			});	
		}
		$location.path('listc');

	}
	$scope.cancelCampagning = function() {
		$location.path('listc');
		

	}

	$scope.deleteCampagning = function() {
		CampagningService.removeCampagning($scope.cancelCampagning).then(function() {
            $scope.refreshCampagning();
		});
	}
	
	$scope.del = function() {
		if(!($scope.operationCampagning==null)){
		CampagningService.removeCampagning($scope.operationCampagning).then(function() {
            $scope.refreshCampagning();
            $scope.operationCampagning=null;
            $scope.cancelCampagning=null;
		});
		}
	}

	$scope.acount = 1;
});

// ///////////////////////////////////////

mainApp.controller('login', function($scope,$rootScope,Auth) {
	$scope.title = "Login";
    $scope.login = function(){
    	Auth.loguin($scope.dlogin).then(function(data){
    		console.log(data);

    	   
    	});
    	
    };
    $scope.dlogin={email:'',pass:''};
    $scope.rlogin={email:'',pass:'',name:''};
	$scope.titler = "Register";
    $scope.register = function(){
    	
    	Auth.register($scope.rlogin).then(function (data){
    	
    		console.log(data);
    	});
    };
    
    
    
	});






// //////////////////////////////////////////////////////////
var initInjector = angular.injector([ 'ng' ]);
mainApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	
	$httpProvider.interceptors.push(['$q', '$location', '$cookieStore', function($q, $location, $cookieStore) {
        return {
                'request': function (config) {
                    
                    if ($cookieStore.get('token')!==null) {
                        config.headers = {'Authorization': 'Bearer '+ $cookieStore.get('token')};
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                    	$cookieStore.put('token',null);
                    	$urlRouterProvider
                        //any url that doesn't exist in routes redirect to '/'
                          .otherwise('/list');
                    }
                    return $q.reject(response);
                }
            };
        }]);
	
	
	
	
   // $urlRouterProvider
   
     // .otherwise('/'); 

 }).run(function ($rootScope, $state,$cookieStore , $location, Auth) {
	// Redirect to login if route requires auth and you're not logged in
	    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
	      Auth.isLoggedInAsync(function(loggedIn) {
	        if ( !loggedIn) {
	        	

	              $rootScope.returnToState = toState.url;
	              $rootScope.returnToStateParams = toParams;
	              $state.go('list');
	          }
	    });
	});
 });
mainApp.config([ '$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise("/");
			var $http = initInjector.get('$http');
			var getOut = function(index,state) {
				var contents = null;
				$http({
					method : 'GET',
					url : 'view/' + index + '.html'
				}).then(function successCallback(response) {
					if (response.status == 200) {
						state.template = response.data;

					} else {
						state.template = '';
					}

				
				}, function errorCallback(response) {

				});
				return contents;
			}
			
			
			
			
			
			var get = function(index, state) {
				var contents = null;
				$http({
					method : 'GET',
					url : 'view/' + index + '.html'
				}).then(function successCallback(response) {
					if (response.status == 200) {
						state.template = response.data;

					} else {
						state.template = '';
					}

					$stateProvider.state(state);
				}, function errorCallback(response) {

				});
				return contents;
			}

			
		
			
			var loginState = {
					name : 'login',
					url:'/',
					controller : 'login'
				};
			get('login',loginState);
			
			
			var contactState = {
				name : 'edit',
				url : 'edit',
				controller : 'list'
			};
			get('editContact', contactState);
			var listState = {
				name : 'list',
				url : 'list',
				// templateUrl: 'view/listContact.html',
				controller : 'list'
			};
			get('listContact', listState);

			/**
			 * 
			 */
			
		   var cState = {
				name : 'editc',
				url : 'editc',
				controller : 'campagning'
			};
			get('ec', cState);
			var lState = {
				name : 'listc',
				url : 'listc',
				// templateUrl: 'view/listContact.html',
				controller : 'campagning'
			};
			get('lc', lState);
		

		} ]);
