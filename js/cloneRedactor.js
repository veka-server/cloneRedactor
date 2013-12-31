// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};
	
    myApp.cloneRedactor = function (element, outils ){

    	// rassemble les variables pour la creation du redactor
		var parametres = myApp.genConfig(element, outils);

    	// generer le code html du cloneRedactor
		var output = Mustache.render(myApp.httpGet("template/test.tmp"), parametres);

		// affiche le redactor juste apres le textarea originel
		element.insertAdjacentHTML('afterend',output);

		// gestion des events
		myApp.events(element, parametres.UniqueId);

    	// dissimule le textarea originel
    	element.style.display = 'none';

    }

})();
