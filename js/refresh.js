// clone redactor
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

        cloneRedactor.refresh = function(OriginalTextarea,editeur,textarea_editor)
        {
			// test toute les 500ms si le contenu du div editeur a etait modifié, 
			// si oui il copie le contenu du div vers le textarea d'origine.
			var old_OriginalTextarea = OriginalTextarea.innerHTML;
			var old_editeur = editeur.innerHTML;
			setInterval(function()
			{

				var new_OriginalTextarea = OriginalTextarea.innerHTML;
				var new_editeur = editeur.innerHTML;

				if(new_OriginalTextarea != old_OriginalTextarea)
				{
					textarea_editor.innerHTML = new_OriginalTextarea;
	                		editeur.innerHTML = textarea_editor.value;
					old_OriginalTextarea = new_OriginalTextarea;	
					old_editeur = textarea_editor.value;
				}
				else if (new_editeur != old_editeur)
				{
					OriginalTextarea.innerHTML = new_editeur;
					old_OriginalTextarea = OriginalTextarea.innerHTML;
					old_editeur = new_editeur;
				}

// clone redactor
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

        cloneRedactor.refresh = function(OriginalTextarea,editeur,textarea_editor)
        {
			// test toute les 500ms si le contenu du div editeur a etait modifié, 
			// si oui il copie le contenu du div vers le textarea d'origine.
			var old_OriginalTextarea = OriginalTextarea.innerHTML;
			var old_editeur = editeur.innerHTML;
			setInterval(function()
			{

				var new_OriginalTextarea = OriginalTextarea.innerHTML;
				var new_editeur = editeur.innerHTML;

				if(new_OriginalTextarea != old_OriginalTextarea)
				{
					textarea_editor.innerHTML = new_OriginalTextarea;
	                editeur.innerHTML = textarea_editor.value;
					old_OriginalTextarea = new_OriginalTextarea;	
					old_editeur = textarea_editor.value;
				}
				else if (new_editeur != old_editeur)
				{
					OriginalTextarea.innerHTML = new_editeur;
					old_OriginalTextarea = OriginalTextarea.innerHTML;
					old_editeur = new_editeur;
				}

				if(OriginalTextarea.disabled == true) {
					editeur.contentEditable = false;
					textarea_editor.disabled = false;
				}
				else {
					editeur.contentEditable = true;
					textarea_editor.disabled = true;
				}

			}, 200);

        }

})();



			}, 200);

        }

})();


