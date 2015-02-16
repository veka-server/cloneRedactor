// Script d'ajout de fichier css a la page
(function(){

	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

	cloneRedactor.httpGet('config/config.json', function(data){

		var config = JSON.parse(data);

		cloneRedactor.url_upload = config.urlFichierUpload;

		// ajoute le fichier css a la page
		cloneRedactor.addCssFile("css/cloneRedactor.css");

	})

})();
