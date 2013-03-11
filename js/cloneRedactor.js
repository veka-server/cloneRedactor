/* ------------------------------------------------------------------------------------------------------
 *
 *  CLONEREDACTOR
 *
 * ---------------------------------------------------------------------------------------------------- */
/*
 *  CONFIGURATION
 */

    // url vers la page d'upload pour les images
    var url_upload = 'http://.../upload.php';



/* FONCTION READY */
var ready=(function(){var f,b,c={};c["[object Boolean]"]="boolean";c["[object Number]"]="number";c["[object String]"]="string";c["[object Function]"]="function";c["[object Array]"]="array";c["[object Date]"]="date";c["[object RegExp]"]="regexp";c["[object Object]"]="object";var d={isReady:false,readyWait:1,holdReady:function(g){if(g){d.readyWait++}else{d.ready(true)}},ready:function(g){if((g===true&&!--d.readyWait)||(g!==true&&!d.isReady)){if(!document.body){return setTimeout(d.ready,1)}d.isReady=true;if(g!==true&&--d.readyWait>0){return}f.resolveWith(document,[d])}},bindReady:function(){if(f){return}f=d._Deferred();if(document.readyState==="complete"){return setTimeout(d.ready,1)}if(document.addEventListener){document.addEventListener("DOMContentLoaded",b,false);window.addEventListener("load",d.ready,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",b);window.attachEvent("onload",d.ready);var g=false;try{g=window.frameElement==null}catch(h){}if(document.documentElement.doScroll&&g){a()}}}},_Deferred:function(){var j=[],k,h,i,g={done:function(){if(!i){var m=arguments,n,q,p,o,l;if(k){l=k;k=0}for(n=0,q=m.length;n<q;n++){p=m[n];o=d.type(p);if(o==="array"){g.done.apply(g,p)}else{if(o==="function"){j.push(p)}}}if(l){g.resolveWith(l[0],l[1])}}return this},resolveWith:function(m,l){if(!i&&!k&&!h){l=l||[];h=1;try{while(j[0]){j.shift().apply(m,l)}}finally{k=[m,l];h=0}}return this},resolve:function(){g.resolveWith(this,arguments);return this},isResolved:function(){return !!(h||k)},cancel:function(){i=1;j=[];return this}};return g},type:function(g){return g==null?String(g):c[Object.prototype.toString.call(g)]||"object"}};function a(){if(d.isReady){return}try{document.documentElement.doScroll("left")}catch(g){setTimeout(a,1);return}d.ready()}if(document.addEventListener){b=function(){document.removeEventListener("DOMContentLoaded",b,false);d.ready()}}else{if(document.attachEvent){b=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",b);d.ready()}}}}function e(h){d.bindReady();var g=d.type(h);f.done(h)}return e})();

/* POPUP */
ready(function(){var popup_ouverte="";if(!document.getElementById("shadow")){var shadow=document.createElement("div");shadow.id="shadow";document.body.appendChild(shadow)}Element.prototype.center=function(){this.style.position="fixed";this.style.top=Math.max(0,((window.innerHeight/2)-(this.offsetHeight/2)))+"px";this.style.left=Math.max(0,((window.innerWidth/2)-(this.offsetWidth/2)))+"px"};Element.prototype.show=function(){this.style.display="block"};Element.prototype.hide=function(){this.style.display="none"};Element.prototype.popup_open=function(){if(document.getElementById(popup_ouverte)){document.getElementById(popup_ouverte).popup_close()}popup_ouverte=this.id;document.getElementById("shadow").show();document.getElementById(popup_ouverte).show()};var timer=setInterval(function(){if(document.getElementById(popup_ouverte)){document.getElementById(popup_ouverte).center()}},100);Element.prototype.popup_close=function(){this.hide();document.getElementById("shadow").hide()};var list_popup=document.getElementsByClassName("popup_open");for(var i=0;i<list_popup.length;i++){list_popup[i].onclick=function(){var b=this.getAttribute("data-popup-src");var a=document.getElementById(b);a.popup_open()}}var list_popup=document.getElementsByClassName("popup_close");for(var i=0;i<list_popup.length;i++){list_popup[i].onclick=function(){var b=this.getAttribute("data-popup-src");var a=document.getElementById(b);a.popup_close()}}document.getElementById("shadow").onclick=function(){document.getElementById(popup_ouverte).popup_close()};});

/* ------------------------------------------------------------------------------------------------------
 *
 *  FONCTION UTILISABLE EN DEHORS DE CLONEREDACTOR
 *
 * ---------------------------------------------------------------------------------------------------- */

function confirmation(message)
{
    if(confirm(message))
    {
        return 0 ;
    }
    else
    {
        return 1 ;
    }    
}

function post_to_url(path, params, method) 
{

    method = method || "post";

    var oMyForm = new FormData();

    for (var k in params)
    {
        if (typeof params[k] !== 'function') 
        {
          oMyForm.append(k, params[k]);
        }
    }

    var oReq = new XMLHttpRequest();
    oReq.open(method, url_upload, false);
    oReq.send(oMyForm);

    return oReq.responseText;
}

// ajoute une classe a l'element
Element.prototype.addClass = function (classname) 
{
  this.className += ' '+classname;
}

// supprime une classe a l'element
Element.prototype.removeClass = function (classname)
{
  this.className = this.className.replace( '#(?:^|\s)'+classname+'(?!\S)#g' , '' )
}


function enregistrer_selection()
{
  savedRange = window.getSelection().getRangeAt(0);;
}

function restorer_selection()
{
   window.getSelection().removeAllRanges();
   window.getSelection().addRange(savedRange);
}

function creer_selection(startContainer, startOffset, endContainer, endOffset)
{
  var range = document.createRange();
  range.setStart(startContainer, startOffset);
  range.setEnd(endContainer, endOffset);

  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function selectAllNode(Node)
{
  // selection
  creer_selection(Node, 0, Node, Node.textContent.length)
}

function nodeFocus(Node)
{
   Node.focus();
}


function issetId(id)
{
  var monItem = document.getElementById(id);
  if (monItem) 
  {
    return 1;
  }  
    return 0;
}

function getStringAfterLastMotif(str, motif)
{
  return str.substr(str.lastIndexOf(motif)+1);
}

/* ------------------------------------------------------------------------------------------------------
 *
 *  CLONEREDACTOR
 *
 * ---------------------------------------------------------------------------------------------------- */
/*
 *  DEFINITION DES VARIABLES GLOBAL
 */

    var lastId = 0;       // variable utilisé pour donner un identifiant unique a chaque editeur
    var savedRange = "";  // variable qui contient la sauvegarde de la selection pour une utilisation ulterieur
    var ajout_popup = 0;  // variable qui verrouille l'integration de code html rededand
    var linkNode = "";

function cloneRedactor(textarea, config_outils) 
{


  /*------------------------------------
   *  FONCTIONS 
   *------------------------------------ */

              function getUniqueId()
              {
                return lastId++;
              }

              function colorpicker(command) 
              {
                var tableau = ['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646', '#ffff00', '#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#fff2ca', '#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#ffe694', '#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#b7dde8', '#fac08f', '#f2c314', '#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#92cddc', '#e36c09', '#c09100', '#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#31859b', '#974806', '#7f6000', 'none'];
                var retour = "";
                for(var i = 0; i < tableau.length; i++)
                {
                   retour += '<input type="button" name="color-'+command+'" class="color-'+(i+1)+'" data-commandValue="'+tableau[i]+'">';
                }
                return retour;
              }

              function desactiver_editeur_sauf(UniqueId)
              {
                var nb_editor = document.getElementsByName("ewysiwyg").length-1;
                for(var i=0;i<=nb_editor;i++) 
                {
                  if(UniqueId != i)
                  {
                    document.getElementById('div_editor_'+i).contentEditable = 'false';
                  }
                }
              }

              function customCommand(command, paramb, paramc, UniqueId)
              {
                  // desactivation des autre editeur
                  desactiver_editeur_sauf(UniqueId);
                  // modification du texte
                  document.execCommand (command, paramb, paramc);
                  // recuperation du focus
                  nodeFocus(document.getElementById("div_editor_"+UniqueId));
                  // reactivation des autres editeurs
                  resactiver_editeur();        
              }

              function resactiver_editeur()
              {
                var nb_editor = document.getElementsByName("ewysiwyg").length-1;
                for(var i=0;i<=nb_editor;i++) 
                {
                  document.getElementById('div_editor_'+i).contentEditable = 'true';
                }
              }

              // cacher les colorpicker ouvert
              function fermer_colorpicker()
              {
                var arr = document.getElementsByName('DIVcolorpicker');
                for(var i=0;i<arr.length;i++) 
                {
                  if(arr[i].style.display == "block")
                  {
                    // fermeture de tu colopicker ouvert
                    arr[i].style.display = 'none'

                    // desactivation du bouton 
                    var UniqueId = getStringAfterLastMotif(arr[i].id, '_');
                    var forecolor = document.getElementById('forecolor_'+UniqueId);
                    forecolor.className = forecolor.className.replace(" active", ""); 
                  }
                }          
              }

              // cacher les format de texte ouvert
              function fermer_divformat()
              {
                var arr = document.getElementsByName('DIVformat');
                for(var i=0;i<arr.length;i++) 
                {
                  if(arr[i].style.display == "block")
                  {
                    // fermeture de tout DIVformat ouvert
                    arr[i].style.display = 'none'

                    // desactivation du bouton 
                    var UniqueId = getStringAfterLastMotif(arr[i].id, '_');
                    var format = document.getElementById('format_'+UniqueId);
                    format.className = format.className.replace("active", ""); 
                  }
                }          
              }


        // fermer les fenetres tel que colopicker et le format texte lors d'un clic exterieur
              document.body.onclick = function(e)
              {
                var oElem = e ? e.target : event.srcElement;

                var MonTableau = ["forecolor_",
                                  "DIVcolorpicker_",
                                  "format_",
                                  "DIVformat_"];

                for(var i=0;i<MonTableau.length;i++) 
                {
                  if(oElem.id.search(MonTableau[i]) != -1)
                  {
                    return 0;
                  }
                }

                fermer_colorpicker();
                fermer_divformat();
              }


  /*------------------------------------
   *  DEFINITION DES VARIABLES
   *------------------------------------ */

    // creation de l'identifiant unique du cloneredactor
          var UniqueId = getUniqueId();

  /*------------------------------------
   *  GENERATION DU CODE HTML DE LA BARRE D'OUTILS
   *------------------------------------ */

    // contenu des bulles d'aide au survole des boutons
            config_outils_title = {'html':'switch','bold':'gras','italic':'italique','underline':'sousligner','rayer':'rayer','link':'creer un lien','unlink':'supprimer un lien','picture':'creer une image','color':'changer la couleur du texte','orderedlist':'liste ordonné','unorderedlist':'liste non ordonné','alignleft':'aligner a gauche','aligncenter':'aligner au centre','alignright':'aligner a droite','justify':'justifier','format':'format du texte', 'undo':'annuler la derni&egrave;re action','redo':'retablir la derni&egrave;re action', 'format':'paragraphe'};


    // defini la liste des outils si elle n'a pas etait generer par l'utilisateur
            if(config_outils == undefined)
            {
              var config_outils = ['html', '|', 'format', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'rayer', '|', 'link', 'unlink', 'picture', '|', 'color', '|', 'orderedlist', 'unorderedlist','|', 'alignleft', 'aligncenter', 'alignright', 'justify'];    
            }

    // genere le code HTML integrant la liste des outils
            var list_outils = "";
            for(var i = 0; i < config_outils.length; i++)
            {
              switch (config_outils[i])
              {
                case "|" :
                    list_outils += '<div class="separateur"></div>';  
                    break;
                case "format" :
                    list_outils += '<div style="float:left;position:relative;"><input type="button" title="'+config_outils_title['format']+'" class="icon-wysiwyg-format" id="format_'+UniqueId+'"><div id="DIVformat_'+UniqueId+'" name="DIVformat" style="display:none">'+
                    '<input name="format-button_'+UniqueId+'" value="Paragraphe" data-commandvalue="p" type="button"/>'+
                    '<input name="format-button_'+UniqueId+'" value="Code" data-commandvalue="pre" type="button"/>'+
                    '<input name="format-button_'+UniqueId+'" value="Titre 1" data-commandvalue="h1" type="button"/>'+
                    '<input name="format-button_'+UniqueId+'" value="Titre 2" data-commandvalue="h2" type="button"/>'+
                    '<input name="format-button_'+UniqueId+'" value="Titre 3" data-commandvalue="h3" type="button"/>'+
                    '<input name="format-button_'+UniqueId+'" value="Titre 4" data-commandvalue="h4" type="button"/>'+
                    '<input name="format-button_'+UniqueId+'" value="Titre 5" data-commandvalue="h5" type="button"/>'+
                    '</div></div>';
                    break;
                case "color" :
                    var input_color = colorpicker('forecolor_'+UniqueId);
                    list_outils += '<div style="float:left;position:relative;"><input title="'+config_outils_title['color']+'" type="button" class="icon-wysiwyg-color forecolor" id="forecolor_'+UniqueId+'"><div id="DIVcolorpicker_'+UniqueId+'" style="display:none;" name="DIVcolorpicker">'+input_color+'</div></div>';
                    break;
                default:
                    list_outils += '<input id="'+config_outils[i]+'_'+UniqueId+'" class="icon-wysiwyg-'+config_outils[i]+'" type="button" title="'+config_outils_title[config_outils[i]]+'">';
                    break;
              }
            }

    // ajoute le code HTML requis pour la popup de demande d'url une seul fois dans toute la page
            if(ajout_popup == 0)
            {
              list_outils += '<div class="popup" id="popup_link">'+
                                    '<h1>Inserer un lien</h1>'+
                                    'URL : '+
                                    '<input type="url" id="url-lien" class="inputlien" placeholder="lien ves la page" >'+
                                    '<input type="button" class="btn btn-primary" value="Valider" id="creer_link">'+
                              '</div>';  
              list_outils += '<div class="popup" id="popup_image">'+
                                    '<h1>Inserer une image</h1>'+
                                    'Url : '+
                                    '<input type="url" id="url-image" class="inputlien" placeholder="lien vers l\'image" >'+
                                    '<br><br><span class="muted">Ou s&eacute;l&eacute;ctionnez un fichier local :</span><br>'+
                                    '<input type="file"  name="image" id="upload_image" style="display:none;">'+
                                    '<input type="button" class="button_upload btn btn-warning" id="btn_upload_image" value="Heberger une image"/>'+
                                    '<div id="store_uploadimgjhfgbd"></div><br>'+
                                    '<input type="button" class="btn btn-primary" value="Valider" id="creer_image">'+
                              '</div>';  
                ajout_popup++;            
              }

  /*------------------------------------
   * INSERTION DU CODE HTML REQUIS PAR CLONEREDACTOR
   *------------------------------------ */

    // mise en place  du code html juste apres le textearea
            textarea.insertAdjacentHTML('afterend', 
              '<div id="editor_'+UniqueId+'" name="ewysiwyg" style="display:none;">'+
                '<div id="outils_'+UniqueId+'">'+
                  list_outils+
                '</div>'+
                '<div id="div_editor_'+UniqueId+'">'+
                  textarea.value+
                '</div>'+
                '<textarea id="textarea_editor_'+UniqueId+'"></textarea>'+
              '</div>');



  /*------------------------------------
   *  DEFINITION DES OBJET ISSUS DU NOUVEAU CODE HTML
   *------------------------------------ */

    // Objet 
          var textarea_editor = document.getElementById('textarea_editor_'+UniqueId+'');
          var editor = document.getElementById('editor_'+UniqueId+'');
          var editeur = document.getElementById('div_editor_'+UniqueId+'');
          var divcolopicker = document.getElementById('DIVcolorpicker_'+UniqueId+'');
          var divbackcolopicker = document.getElementById('DIVbackcolorpicker_'+UniqueId+'');



  /*------------------------------------
   * AFFICHAGE DU CLONE REDACTOR EN LIEU ET PLACE DU TEXTAREA
   *------------------------------------ */

    // copie des dimenssion du textarea source ( 14px car padding 7px )
          editor.style.minHeight = textarea.offsetHeight-14+'px';
          editeur.style.minHeight = textarea.offsetHeight-14+'px';
          textarea_editor.style.minHeight = textarea.offsetHeight-14+'px';
          editor.style.width = textarea.offsetWidth-14+'px';



    // dissimule le textarea de l'editeur
          textarea_editor.style.display = "none";

    //defini le div comme editable
          editeur.contentEditable='true';

    // dissimule le textarea original
          textarea.style.display = "none";
          
    // affiche cloneredactor
          editor.style.display = "block";
          

  /*------------------------------------
   *  GESTION DES BOUTONS 
   *------------------------------------ */

    // BOUTON STANDARD
          var tableau_input = { 'alignleft'     :'justifyleft',
                                'alignright'    :'justifyright',
                                'aligncenter'   :'justifycenter',
                                'justify'       :'justifyfull',
                                'unorderedlist' :'insertunorderedlist',
                                'orderedlist'   :'insertorderedlist',
                                'bold'   :'bold',
                                'underline'   :'underline',
                                'italic'   :'italic',
                                'unlink'   :'unlink',
                                'rayer'   :'strikethrough',
                                'undo'    :'undo',
                                'redo'    :'redo'
                                 };

          for(var key in tableau_input)
          {
            if(issetId(key+'_'+UniqueId))
            {
              document.getElementById(key+'_'+UniqueId).onclick = function()
              {
                // recuperation de l'UniqueId
                var UniqueId = getStringAfterLastMotif(this.id, '_');

                customCommand(tableau_input[this.id.replace('_'+UniqueId, '')], false, '', UniqueId);
              };
            }
          }



    // Format du texte
          var arr = document.getElementsByName('format-button_'+UniqueId);
          for(var i=0;i<arr.length;i++) 
          {
            arr[i].onclick = function()
            {
              // recuperation de la couleur 
              var type = this.getAttribute("data-commandvalue");
              // recuperation de l'UniqueId
              var UniqueId = getStringAfterLastMotif(this.name, '_');

              customCommand('formatBlock', false, type, UniqueId);
            };
          }

          if(issetId('format_'+UniqueId))
          {
            document.getElementById('format_'+UniqueId).onclick=function()
            {
              var divformat = document.getElementById('DIVformat_'+UniqueId);
              if(divformat.style.display == "none")
              {
                // fermer les colorpicker
                fermer_divformat();

                divformat.style.display = "block";
                this.className+=" active"; 
              }
              else
              {
                // fermer les colorpicker
                fermer_divformat();
              }
            }
          }

    // COULEUR DU TEXTE
          var arr = document.getElementsByName('color-forecolor_'+UniqueId);
          for(var i=0;i<arr.length;i++) 
          {
            arr[i].onclick = function()
            {
              // recuperation de la couleur 
              var color = this.getAttribute("data-commandvalue");
              // recuperation de l'UniqueId
              var UniqueId = getStringAfterLastMotif(this.name, '_');
              customCommand('forecolor', false, color, UniqueId);
            };
          }

          if(issetId('forecolor_'+UniqueId))
          {
            document.getElementById('forecolor_'+UniqueId).onclick=function()
            {
              //afficher
              if(divcolopicker.style.display == "none")
              {
                // fermer les color picker deja ouvert
                fermer_colorpicker();

                divcolopicker.style.display = "block";
                this.className+=" active"; 
              }
              else
              {
                // fermer les colorpicker
                fermer_colorpicker();
              }
            }
          }

    // INSERER UNE IMAGE
          if(issetId('link_'+UniqueId))
          {
            var sourceId = "";
            document.getElementById('picture_'+UniqueId).onclick=function()
            {
                // enregistrer la selection
                enregistrer_selection();

                // recuperation de l'uniqueId et stockage dans une variable global pour la recuperer
                // et determiner l'editeur parent lors de l'ecriture
                sourceId = getStringAfterLastMotif(this.id, '_');

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
                                    store.addClass('dsib');
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
                              var url = post_to_url(url_upload, params);
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

          if(issetId('creer_image'))
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
                  restorer_selection();
                  // execution de la commande
                  customCommand('insertimage', false, url, sourceId);
              }
            }
          }


    // INSERER UN LIEN
          if(issetId('link_'+UniqueId))
          {
            var sourceId = "";
            document.getElementById('link_'+UniqueId).onclick=function()
            {
                // enregistrer la selection
                enregistrer_selection();

                // recuperation de l'uniqueId et stockage dans une variable global pour la recuperer
                // et determiner l'editeur parent lors de l'ecriture
                sourceId = getStringAfterLastMotif(this.id, '_');

                //ouverture de la popup
                document.getElementById('popup_link').popup_open();
            }
          }

          if(issetId('creer_link'))
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
                  restorer_selection();
                  // execution de la commande
                  customCommand('createlink', false, url, sourceId);
                }
              }
            }
          }

    // SWITCH TO HTML
          if(issetId('html_'+UniqueId))
          {
            document.getElementById('html_'+UniqueId).onclick=function()
            {
              if(textarea_editor.style.display == "none")
              {
                this.className+=" active"; 
                textarea_editor.value = editeur.innerHTML;
                textarea_editor.style.height = editeur.offsetHeight-14+'px';
                textarea_editor.style.width = editeur.offsetWidth-14+'px';
                textarea_editor.style.display = "block";
                editeur.style.display = "none";
              }
              else
              {
                this.className = this.className.replace(" active", ""); 
                editeur.innerHTML = textarea_editor.value;
                textarea_editor.style.display = "none";
                editeur.style.display = "block";
              }
            }
          }

  /*------------------------------------
   *  DETECTION DES CLIC DANS LE TEXTE DE L'EDITEUR
   *------------------------------------ */

    // les lien

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

  

  /*------------------------------------
   *  COPIE DES DONNEES VERS LE TEXETAREA SOURCE
   *------------------------------------ */

    // test toute les 500ms si le contenu du div editeur a etait modifié, 
    // si oui il copie le contenu du div vers le textarea d'origine.
          var old_html = editeur.innerHTML;
          setInterval(function()
          {
             var newHtml = editeur.innerHTML;
             if (newHtml != old_html) 
             {
                textarea.innerHTML=editeur.innerHTML;
                old_html = newHtml;
             }
          }, 500);

}

/*------------------------------------
 *  DETECTE ET APPEL LES CLONEREDACTOR
 *------------------------------------
 *  Pour transformer un textarea en redactor il suffi de lui donner la classe Redactor
 */
ready(function()
{
    var list_Redactor = document.getElementsByClassName('cloneRedactor');
    for(var i=0;i<list_Redactor.length;i++) 
    {
      if(list_Redactor[i].getAttribute("data-outils"))
      {
        var outils = list_Redactor[i].getAttribute("data-outils").split(',');
        cloneRedactor(list_Redactor[i], outils );
      }
      else
      {
        cloneRedactor(list_Redactor[i]);
      }
    }

});