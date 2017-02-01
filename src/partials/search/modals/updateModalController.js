(function(){
	angular
	.module('myApp')
	.controller('UpdateModalController', ['$uibModalInstance', 'ahAPIKeys', UpdateModalController])

	function UpdateModalController($uibModalInstance, ahAPIKeys){
		let vm = this;
		vm.ok = ok;
		vm.cancel = cancel;

		//Existing submissions will occupy their respective boxes
		vm.apisObj = ahAPIKeys.apisObj;
		vm.currentUserName = ahAPIKeys.apisObj.id;

		function ok(obj){
			$uibModalInstance.close(obj);
		}

		function cancel(){
			$uibModalInstance.dismiss();
		}
	}
})();