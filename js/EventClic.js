// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.EventClic = function(editeur) {

          // detect le clic dans l'editeur
          editeur.onclick=function()
          {
            // recuperation du noeud ou le clic a etait effectué
            var range = window.getSelection().getRangeAt(0);
            var node = range.startContainer.parentNode;

            var text = "";
            while(node)
            {
              // l'ajout du point c'est pour eviter une errreur si tagName n'existe pas
              text = "."+node.tagName; 
              if(text.toLowerCase () == ".a")
              {
                break;
              }
              else
              {
                node = node.parentNode;
              }
            }

            if(text.toLowerCase () == ".a")
            {
              // Enregistrement du noeud pour le recuperer lors de la modification du lien
              linkNode = node ;

              // recuperation de l'url du lien
              var lien = linkNode.href;

              // mise en place du lien actuel dans la popup
              document.getElementById('url-lien').value = lien;

              // affichage de la popup popup_link pour modifier le lien
              document.getElementById('popup_link').popup_open();
            }
        }



	};

})();
