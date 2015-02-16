// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.events = function(element, UniqueId) {

		var textarea_editor = document.getElementById('textarea_editor_'+UniqueId+'');
		var editor = document.getElementById('editor_'+UniqueId+'');
		var editeur = document.getElementById('div_editor_'+UniqueId+'');
		var divbackcolopicker = document.getElementById('DIVbackcolorpicker_'+UniqueId+'');

		// copie des dimenssion du textarea source ( 14px car padding 7px )
		editor.style.minHeight = element.offsetHeight-14+'px';
		editeur.style.minHeight = element.offsetHeight-14+'px';
		textarea_editor.style.minHeight = element.offsetHeight-14+'px';
		editor.style.width = element.offsetWidth-14+'px';

		// ajoute le contenu du textarea dans le redactor
        editeur.innerHTML = textarea_editor.value;

	    //defini le div comme editable
        editeur.contentEditable='true';

        // genereation des actions lors du cliq sur les boutons simple
        myApp.EventBase(UniqueId);

        myApp.EventLien(UniqueId);

        myApp.EventImage(UniqueId);

        myApp.EventColorText(UniqueId);

        myApp.EventFormat(UniqueId);

        myApp.EventSwitch(textarea_editor, editeur, UniqueId);

        // copie, toutes les 100ms, les données dans le textarea originel
        myApp.refresh(element,editeur)

        // fermer les fenetre ouverte si l'on clique a l'exterieur de celle-ci
        myApp.closeInutilise();

        // ouvre la fenetre de modification de lien
        myApp.EventClic(editeur);

	}	

})();
