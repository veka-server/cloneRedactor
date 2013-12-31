// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

        myApp.refresh = function(element,editeur)
        {
			// test toute les 500ms si le contenu du div editeur a etait modifié, 
			// si oui il copie le contenu du div vers le textarea d'origine.
			var old_html = editeur.innerHTML;
			setInterval(function()
			{
				var newHtml = editeur.innerHTML;
				if (newHtml != old_html) 
				{
					element.innerHTML=editeur.innerHTML;
					old_html = newHtml;
				}
			}, 100);
        }

})();


