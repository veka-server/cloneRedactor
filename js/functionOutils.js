// liste des fonctions outils
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.argsToArray = function(args) {
	  var r = []; for (var i = 0; i < args.length; i++)
	    r.push(args[i]);
	  return r;
	}

	myApp.httpGet = function(theUrl, callback) {
	    var xmlHttp = null;

	    xmlHttp = new XMLHttpRequest();

		xmlHttp.onreadystatechange=function()
		{
			if (xmlHttp.readyState==4 && xmlHttp.status==200)
		    {
		        if (typeof callback === 'function') 
		        {
		        	callback(xmlHttp.responseText);
		        }
		    }
		}

	    xmlHttp.open( "GET", theUrl, true );
	    xmlHttp.send( null );

	}

	myApp.getUniqueId = function() {
		if(myApp.lastId === undefined)
			myApp.lastId = 0;
		else
			myApp.lastId++;
	}

	myApp.getStringAfterLastMotif = function(str, motif)
	{
	  return str.substr(str.lastIndexOf(motif)+1);
	}


	myApp.fermer_divformat = function() {
	myApp.argsToArray(document.getElementsByName('DIVformat')).forEach(function(element, index, array)
	{
	  if(element.style.display == "block")
	  {
	    // fermeture de tout DIVformat ouvert
	    element.style.display = 'none'

	    // desactivation du bouton 
	    var UniqueId = myApp.getStringAfterLastMotif(element.id, '_');
	    var format = document.getElementById('format_'+UniqueId);
	    format.className = format.className.replace("active", ""); 
	  }
	});
	}


	myApp.post_to_url = function(path, params, method) 
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
	    oReq.open(method, path, false);
	    oReq.send(oMyForm);

	    return oReq.responseText;
	}



	myApp.enregistrer_selection = function()
	{
	  savedRange = window.getSelection().getRangeAt(0);

	  return savedRange;
	}

	myApp.restorer_selection = function()
	{
	   window.getSelection().removeAllRanges();
	   window.getSelection().addRange(savedRange);
	}

	myApp.creer_selection = function(startContainer, startOffset, endContainer, endOffset)
	{
	  var range = document.createRange();
	  range.setStart(startContainer, startOffset);
	  range.setEnd(endContainer, endOffset);

	  var sel = window.getSelection();
	  sel.removeAllRanges();
	  sel.addRange(range);
	}

	myApp.selectAllNode = function(Node)
	{
	  // selection
	  creer_selection(Node, 0, Node, Node.textContent.length)
	}

	// cacher les colorpicker ouvert
	myApp.fermer_colorpicker = function()
	{
	myApp.argsToArray(document.getElementsByName('DIVcolorpicker')).forEach(function(element, index, array)
	{
	  if(element.style.display == "block")
	  {
	    // fermeture des colopicker ouvert
	    element.style.display = 'none'

	    // desactivation du bouton 
	    var UniqueId = myApp.getStringAfterLastMotif(element.id, '_');
	    var forecolor = document.getElementById('forecolor_'+UniqueId);
	    forecolor.className = forecolor.className.replace(" active", ""); 
	  }
	});
	}


	myApp.customCommand = function(command, paramb, paramc, UniqueId) {

		var desactiver_editeur_sauf = function(UniqueId) {
			var nb_editor = document.getElementsByName("ewysiwyg").length-1;
			for(var i=0;i<=nb_editor;i++) 
			{
				if(UniqueId != i)
				{
					document.getElementById('div_editor_'+i).contentEditable = 'false';
				}
			}
		}

		var reactiver_editeur = function() {
			var nb_editor = document.getElementsByName("ewysiwyg").length-1;
			for(var i=0;i<=nb_editor;i++) 
			{
				document.getElementById('div_editor_'+i).contentEditable = 'true';
			}
		}

		// desactivation des autre editeur
		desactiver_editeur_sauf(UniqueId);
		// modification du texte
		document.execCommand (command, paramb, paramc);
		// recuperation du focus
		if(document.getElementById("div_editor_"+UniqueId))
		document.getElementById("div_editor_"+UniqueId).focus();
		// reactivation des autres editeurs
		reactiver_editeur();        
	}

	myApp.addCssFile = function(lien){

		var newCss = document.createElement("link");
		newCss.setAttribute("rel", "stylesheet") ;
		newCss.setAttribute("type", "text/css") ;
		newCss.setAttribute("href", lien) ;

		document.getElementsByTagName('head')[0].appendChild(newCss);

	}


})();

