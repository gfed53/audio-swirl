(function(){
	angular
	.module("myApp")
	.controller("ErrorModalController", ["$uibModalInstance", ErrorModalController])

	function ErrorModalController($uibModalInstance){
		let vm = this;
		vm.ok = ok;

		function ok(){
			$uibModalInstance.close();
		}

		function cancel(){
			$uibModalInstance.dismiss();
		}
	}
})();