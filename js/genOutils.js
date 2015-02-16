// generation des outils
(function(){
    // requis
    var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};
    
    var genOutils = function(outils){
        if(outils == undefined)
        {
          var outils = ['html', '|', 'format', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'rayer', '|', 'link', 'unlink', 'picture', '|', 'color', '|', 'orderedlist', 'unorderedlist','|', 'alignleft', 'aligncenter', 'alignright', 'justify'];
        }

        // contenu des bulles d'aide au survole des boutons
        outils_title = {'html':'Switch','bold':'Gras','italic':'Italique','underline':'Sousligner','rayer':'Rayer','link':'Creer un lien','unlink':'Supprimer un lien','picture':'Creer une image','color':'Changer la couleur du texte','orderedlist':'Liste ordonn\351','unorderedlist':'Liste non ordonn\351','alignleft':'Aligner a gauche','aligncenter':'Aligner au centre','alignright':'Aligner a droite','justify':'Justifier','format':'Format du texte', 'undo':'Annuler la derni\350re action','redo':'Retablir la derni\350re action', 'format':'Paragraphe'};

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

    cloneRedactor.genConfig = function(element, outils){

        // genere l'id du cloneRedactor
        cloneRedactor.getUniqueId();

        var retour = {
          UniqueId  :   cloneRedactor.lastId,
          contenu   :   element.textContent,
          outils    :   genOutils(outils)
        };

        return retour;
    }
})();
