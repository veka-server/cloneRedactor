// Script d'ajout de fichier css a la page
(function(){

	// requis
	var myApp = window.myApp = window.myApp || {};

	var config = JSON.parse(myApp.httpGet('config/config.json'))

	myApp.url_upload = config.urlFichierUpload;

	// ajoute le fichier css a la page
	myApp.addCssFile("css/cloneRedactor.css");

})();
