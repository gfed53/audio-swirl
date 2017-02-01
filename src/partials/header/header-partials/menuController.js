(function(){
	angular
	.module('myApp')
	.controller('MenuController', ['ahAPIKeys', MenuController])

	function MenuController(ahAPIKeys){
		let vm = this;
		vm.update = ahAPIKeys.update;
	}
})();