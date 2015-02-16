// clone redactor
(function(){

	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};
	
    cloneRedactor.init = function (element, outils ){

    	// rassemble les variables pour la creation du redactor
		var parametres = cloneRedactor.genConfig(element, outils);

		cloneRedactor.httpGet(cloneRedactor.URL+"/template/test.php", function(data){

	    	// generer le code html du cloneRedactor
			var output = Mustache.render(data, parametres);

			// affiche le redactor juste apres le textarea originel
			element.insertAdjacentHTML('afterend',output);

			// gestion des events
			cloneRedactor.events(element, parametres.UniqueId);

	    	// dissimule le textarea originel
	    	element.style.display = 'none';

		})

    }

})();
