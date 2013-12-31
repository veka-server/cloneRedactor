
// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.EventImage = function(UniqueId) {

          if(document.getElementById('link_'+UniqueId))
          {
            document.getElementById('picture_'+UniqueId).onclick=function()
            {
                // enregistrer la selection
                myApp.enregistrer_selection();

                myApp.sourceId = UniqueId;

                //ouverture de la popup
                document.getElementById('popup_image').popup_open();

                // si l'on clic sur le bouton d'upload, on simule un clic sur l'input d'upload
                document.getElementById('btn_upload_image').onclick=function()
                {
                    document.getElementById('upload_image').click();
                };

                // si un fichier est selectionné
                document.getElementById('upload_image').onchange=function(e1)
                {
                    // verifie que le fichier est une image et afffiche l'apercu

                        // Lis le fichier
                        var filename = e1.target.files[0]; 
                        var fr = new FileReader();

                        // apres la lecture
                        fr.onload = function(e2)
                        {
                            // nom du fichier = filename.name
                            // type de fichier = filename.type
                            // taille du fichier = filename.size

                            // selectionne l'object qui recevra l'apercu
                            var store = document.getElementById('store_uploadimgjhfgbd');

                            if(filename.type.search("image") != -1)
                            {
                                // Si le store est vide
                                if(store.innerHTML=='')
                                {
                                    store.className += (' dsib');
                                    // ajoute l'image dans l'apercu
                                    var img = document.createElement("img");
                                    img.src = e2.target.result;
                                    store.appendChild(img);
                                }
                                else
                                {
                                    // ajoute l'image dans l'apercu
                                    var img = document.getElementById('store_uploadimgjhfgbd').getElementsByTagName('img')[0];
                                    img.src = e2.target.result;
                                }

                              var params = {'fichier': e1.target.files[0]};
                              var url = myApp.post_to_url(myApp.url_upload, params);
                              document.getElementById('url-image').value = url;

                            }
                            else
                            {
                                store.innerHTML='';
                                document.getElementById('url-image').value = '';
                                alert('Seul les images sont autorisé');
                            }
                        }
                        fr.readAsDataURL(filename);

                };

            }
          }

          if(document.getElementById('creer_image'))
          {
            document.getElementById('creer_image').onclick=function()
            {

              // recuperer l'url dans la popup
              var url = document.getElementById('url-image').value;
              // fermeture de la popup
              document.getElementById('popup_image').popup_close();

              if(url != '') // si il y a une url
              {
                  // restorer la selection
                  myApp.restorer_selection();
                  // execution de la commande
                  myApp.customCommand('insertimage', false, url, myApp.sourceId);
              }
            }
          }


	};

})();

