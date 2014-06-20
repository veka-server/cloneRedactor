// generation des outils
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};
	
	var genOutils = function(outils){
        if(outils == undefined)
        {
          var outils = ['html', '|', 'format', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'rayer', '|', 'link', 'unlink', 'picture', '|', 'color', '|', 'orderedlist', 'unorderedlist','|', 'alignleft', 'aligncenter', 'alignright', 'justify'];
        }

	    // contenu des bulles d'aide au survole des boutons
        outils_title = {'html':'switch','bold':'gras','italic':'italique','underline':'sousligner','rayer':'rayer','link':'creer un lien','unlink':'supprimer un lien','picture':'creer une image','color':'changer la couleur du texte','orderedlist':'liste ordonné','unorderedlist':'liste non ordonné','alignleft':'aligner a gauche','aligncenter':'aligner au centre','alignright':'aligner a droite','justify':'justifier','format':'format du texte', 'undo':'annuler la derni&egrave;re action','redo':'retablir la derni&egrave;re action', 'format':'paragraphe'};

	    // genere le code HTML integrant la liste des outils
        var list_outils = [];
        for(var i = 0; i < outils.length; i++)
        {
          switch (outils[i])
          {
            case "|" :
                list_outils.push({separateur : true});
                break;
            case "format" :
                list_outils.push({format : true});
                break;
            case "color" :
                list_outils.push({colorText : true});
                break;
            default:
                list_outils.push({base : true , name : outils[i] , description : outils_title[outils[i]]});
                break;
          }
        }

        return list_outils;
	}

	myApp.genConfig = function(element, outils){

		// genere l'id du cloneRedactor
	    myApp.getUniqueId();

		var retour = {
		  UniqueId 	: 	myApp.lastId,
		  contenu	: 	element.textContent,
		  outils 	: 	genOutils(outils)
		};

		return retour;
	}
})();
