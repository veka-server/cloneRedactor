// Script d'ajout de fichier css a la page
(function(){

	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.httpGet('config/config.json', function(data){

		var config = JSON.parse(data);

		myApp.url_upload = config.urlFichierUpload;

		// ajoute le fichier css a la page
		myApp.addCssFile("css/cloneRedactor.css");

	})

})();
