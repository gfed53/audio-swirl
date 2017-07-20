//jshint esversion: 6

(function(){
	angular
	.module('myApp')
	.controller('MenuController', ['ahAPIKeys', MenuController]);

	function MenuController(ahAPIKeys){
		let vm = this;
		vm.update = ahAPIKeys.update;
	}
})();