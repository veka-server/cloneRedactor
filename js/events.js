// clone redactor
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

	cloneRedactor.events = function(element, UniqueId) {

		var textarea_editor = document.getElementById('textarea_editor_'+UniqueId+'');
		var editor = document.getElementById('editor_'+UniqueId+'');
		var editeur = document.getElementById('div_editor_'+UniqueId+'');
		var divbackcolopicker = document.getElementById('DIVbackcolorpicker_'+UniqueId+'');

		// copie des dimenssion du textarea source ( 14px car padding 7px )
		editor.style.minHeight = element.offsetHeight-14+'px';
		editeur.style.minHeight = element.offsetHeight-14+'px';
		textarea_editor.style.minHeight = element.offsetHeight-14+'px';
		editor.style.width = element.offsetWidth-14+'px';

		// copie les margin
		var style = element.currentStyle || window.getComputedStyle(element);
		editor.style.marginTop = style.marginTop;
		editor.style.marginLeft = style.marginLeft;
		editor.style.marginRight = style.marginRight;
		editor.style.marginBottom = style.marginBottom;

		editor.style.minHeight = style.height;
		editor.style.width = style.width;

		// copy border
		editor.style.borderRightWidth = style.borderRightWidth;
		editor.style.borderLeftWidth = style.borderLeftWidth;
		editor.style.borderBottomWidth = style.borderBottomWidth;
		editor.style.borderTopWidth = style.borderTopWidth;
		editor.style.borderRightStyle = style.borderRightStyle;
		editor.style.borderLeftStyle = style.borderLeftStyle;
		editor.style.borderBottomStyle = style.borderBottomStyle;
		editor.style.borderTopStyle = style.borderTopStyle;
		editor.style.borderRightColor = style.borderRightColor;
		editor.style.borderLeftColor = style.borderLeftColor;
		editor.style.borderBottomColor = style.borderBottomColor;
		editor.style.borderTopColor = style.borderTopColor;

		textarea_editor.style.width = style.width;

		// ajoute le contenu du textarea dans le redactor
        editeur.innerHTML = textarea_editor.value;

	    //defini le div comme editable
        editeur.contentEditable='true';

        // genereation des actions lors du cliq sur les boutons simple
        cloneRedactor.EventBase(UniqueId);

        cloneRedactor.EventLien(UniqueId);

        cloneRedactor.EventImage(UniqueId);

        cloneRedactor.EventColorText(UniqueId);

        cloneRedactor.EventFormat(UniqueId);

        cloneRedactor.EventSwitch(textarea_editor, editeur, UniqueId);

        // copie, toutes les 100ms, les données dans le textarea originel
        cloneRedactor.refresh(element,editeur)

        // fermer les fenetre ouverte si l'on clique a l'exterieur de celle-ci
        cloneRedactor.closeInutilise();

        // ouvre la fenetre de modification de lien
        cloneRedactor.EventClic(editeur);

	}	

})();
