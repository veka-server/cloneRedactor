// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.EventLien = function(UniqueId) {

          if(document.getElementById('link_'+UniqueId))
          {
            document.getElementById('link_'+UniqueId).onclick=function()
            {
                // enregistrer la selection et continue seulement si une selection est présente
                if(myApp.enregistrer_selection() == '') return false;

                myApp.sourceId = UniqueId;

                //ouverture de la popup
                document.getElementById('popup_link').popup_open();
            }
          }

          if(document.getElementById('creer_link'))
          {
            document.getElementById('creer_link').onclick=function()
            {
              // recuperer l'url dans la popup
              var url = document.getElementById('url-lien').value;
              // fermeture de la popup
              document.getElementById('popup_link').popup_close();

              if(url != '') // si il y a une url
              {

                if(typeof linkNode == "object") // si linkNode est un objet alors nous somme dans une edition
                {
                  // remplace l'ancienne url par la nouvelle
                  linkNode.href = url;
                  delete linkNode;
                }
                else
                {
                  // restorer la selection
                  myApp.restorer_selection();
                  // execution de la commande
                  myApp.customCommand('createlink', false, url, myApp.sourceId);
                }
              }
            }
          }

    }

})();

