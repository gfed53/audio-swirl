//jshint esversion: 6

angular
.module("myApp", ["ui.bootstrap", "ui.router"])

.run(['ahAPIKeys', (ahAPIKeys)=>{
	ahAPIKeys.init()
	.then(()=>{
		//Do nothing
	});
	
}]);