// liste des fonctions outils
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.argsToArray = function(args) {
	  var r = []; for (var i = 0; i < args.length; i++)
	    r.push(args[i]);
	  return r;
	}

	myApp.httpGet = function(theUrl) {
	    var xmlHttp = null;

	    xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false );
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
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

// Script d'ajout de fichier css a la page
(function(){

	// requis
	var myApp = window.myApp = window.myApp || {};

	var config = JSON.parse(myApp.httpGet('config/config.json'))

	myApp.url_upload = config.urlFichierUpload;

	// ajoute le fichier css a la page
	myApp.addCssFile("css/cloneRedactor.css");

})();
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all template text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices
   * in the original template of the token, respectively.
   *
   * Tokens that are the root node of a subtree contain two more elements: an
   * array of tokens in the subtree and the index in the original template at which
   * the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = this.parse(isFunction(partials) ? partials(token[1]) : partials[token[1]]);
        if (value != null) buffer += this.renderTokens(value, context, partials, originalTemplate);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.0";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));
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
		  contenu	: 	element.innerHTML,
		  outils 	: 	genOutils(outils)
		};

		return retour;
	}
})();
// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

        myApp.refresh = function(element,editeur)
        {
			// test toute les 500ms si le contenu du div editeur a etait modifié, 
			// si oui il copie le contenu du div vers le textarea d'origine.
			var old_html = editeur.innerHTML;
			setInterval(function()
			{
				var newHtml = editeur.innerHTML;
				if (newHtml != old_html) 
				{
					element.innerHTML=editeur.innerHTML;
					old_html = newHtml;
				}
			}, 100);
        }

})();


// gestion des boutons simple
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};


        myApp.EventBase = function(UniqueId){
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
				if(document.getElementById(key+'_'+UniqueId))
				{
				  document.getElementById(key+'_'+UniqueId).onclick = function()
				  {
					myApp.customCommand(tableau_input[this.id.replace('_'+UniqueId, '')], false, '', UniqueId);
				  };
				}
			}
        }

})();
// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

        myApp.EventFormat = function(UniqueId)
        {
          myApp.argsToArray(document.getElementsByName('format-button_'+UniqueId)).forEach(function(element, index, array)
          {
            element.onclick = function()
            {
              // recuperation de la couleur 
              var type = this.getAttribute("data-commandvalue");

              myApp.customCommand('formatBlock', false, type, UniqueId);
            };
          });

          if(document.getElementById('format_'+UniqueId))
          {
            document.getElementById('format_'+UniqueId).onclick=function()
            {
              var divformat = document.getElementById('DIVformat_'+UniqueId);
              if(divformat.style.display == "none")
              {
                // fermer les colorpicker
                myApp.fermer_divformat();

                divformat.style.display = "block";
                this.className+=" active"; 
              }
              else
              {
                // fermer les colorpicker
                myApp.fermer_divformat();
              }
            }
          }
        }

})();

// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.EventSwitch = function(textarea_editor, editeur, UniqueId) {

          if(document.getElementById('html_'+UniqueId))
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

    }

})();

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

// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.EventColorText = function(UniqueId) {

          myApp.argsToArray(document.getElementsByName('color-forecolor_'+UniqueId)).forEach(function(element, index, array)
          {
            element.onclick = function()
            {
              // recuperation de la couleur 
              var color = this.getAttribute("data-commandvalue");
              myApp.customCommand('forecolor', false, color, UniqueId);
            };
          });

          if(document.getElementById('forecolor_'+UniqueId))
          {
            document.getElementById('forecolor_'+UniqueId).onclick=function()
            {

			  var divcolopicker = document.getElementById('DIVcolorpicker_'+UniqueId+'');
              //afficher
              if(divcolopicker.style.display == "none")
              {
                // fermer les color picker deja ouvert
                myApp.fermer_colorpicker();

                divcolopicker.style.display = "block";
                this.className+=" active"; 
              }
              else
              {
                // fermer les colorpicker
                myApp.fermer_colorpicker();
              }
            }
          }

    }

})();
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


// clone redactor
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	myApp.closeInutilise = function(UniqueId) {

		// fermer les fenetres tel que colopicker et le format texte lors d'un clic exterieur
		document.body.onclick = function(e)
		{
			var oElem = e ? e.target : event.srcElement;

			var MonTableau = ["forecolor_","DIVcolorpicker_","format_","DIVformat_"];

			for(var i=0;i<MonTableau.length;i++) 
			{
			  if(oElem.id.search(MonTableau[i]) != -1)
			  {
			    return 0;
			  }
			}

			myApp.fermer_colorpicker();
			myApp.fermer_divformat();
		}


	};

})();

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
// clone redactor
(function(){

	// requis
	var myApp = window.myApp = window.myApp || {};
	
    myApp.cloneRedactor = function (element, outils ){

    	// rassemble les variables pour la creation du redactor
		var parametres = myApp.genConfig(element, outils);

    	// generer le code html du cloneRedactor
		var output = Mustache.render(myApp.httpGet("template/test.php"), parametres);

		// affiche le redactor juste apres le textarea originel
		element.insertAdjacentHTML('afterend',output);

		// gestion des events
		myApp.events(element, parametres.UniqueId);

    	// dissimule le textarea originel
    	element.style.display = 'none';

    }

})();
/*
 *	
 *
 */
(function(){
	// requis
	var myApp = window.myApp = window.myApp || {};

	/* FONCTION READY */
	var ready=(function(){var f,b,c={};c["[object Boolean]"]="boolean";c["[object Number]"]="number";c["[object String]"]="string";c["[object Function]"]="function";c["[object Array]"]="array";c["[object Date]"]="date";c["[object RegExp]"]="regexp";c["[object Object]"]="object";var d={isReady:false,readyWait:1,holdReady:function(g){if(g){d.readyWait++}else{d.ready(true)}},ready:function(g){if((g===true&&!--d.readyWait)||(g!==true&&!d.isReady)){if(!document.body){return setTimeout(d.ready,1)}d.isReady=true;if(g!==true&&--d.readyWait>0){return}f.resolveWith(document,[d])}},bindReady:function(){if(f){return}f=d._Deferred();if(document.readyState==="complete"){return setTimeout(d.ready,1)}if(document.addEventListener){document.addEventListener("DOMContentLoaded",b,false);window.addEventListener("load",d.ready,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",b);window.attachEvent("onload",d.ready);var g=false;try{g=window.frameElement==null}catch(h){}if(document.documentElement.doScroll&&g){a()}}}},_Deferred:function(){var j=[],k,h,i,g={done:function(){if(!i){var m=arguments,n,q,p,o,l;if(k){l=k;k=0}for(n=0,q=m.length;n<q;n++){p=m[n];o=d.type(p);if(o==="array"){g.done.apply(g,p)}else{if(o==="function"){j.push(p)}}}if(l){g.resolveWith(l[0],l[1])}}return this},resolveWith:function(m,l){if(!i&&!k&&!h){l=l||[];h=1;try{while(j[0]){j.shift().apply(m,l)}}finally{k=[m,l];h=0}}return this},resolve:function(){g.resolveWith(this,arguments);return this},isResolved:function(){return !!(h||k)},cancel:function(){i=1;j=[];return this}};return g},type:function(g){return g==null?String(g):c[Object.prototype.toString.call(g)]||"object"}};function a(){if(d.isReady){return}try{document.documentElement.doScroll("left")}catch(g){setTimeout(a,1);return}d.ready()}if(document.addEventListener){b=function(){document.removeEventListener("DOMContentLoaded",b,false);d.ready()}}else{if(document.attachEvent){b=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",b);d.ready()}}}}function e(h){d.bindReady();var g=d.type(h);f.done(h)}return e})();


/* POPUP */
	ready(function(){
			var popup_ouverte="";

			if(!document.getElementById("shadow")){
				var shadow=document.createElement("div");
				shadow.id="shadow";
				document.body.appendChild(shadow)
			}

			Element.prototype.center=function(){
				this.style.position="fixed";
				this.style.top=Math.max(0,((window.innerHeight/2)-(this.offsetHeight/2)))+"px";
				this.style.left=Math.max(0,((window.innerWidth/2)-(this.offsetWidth/2)))+"px";
			}

			Element.prototype.show=function(){this.style.display="block"};

			Element.prototype.hide=function(){this.style.display="none"};

			Element.prototype.popup_open=function(){
				if(popup_ouverte && document.getElementById(popup_ouverte)){
					document.getElementById(popup_ouverte).popup_close()
				}
				popup_ouverte=this.id;
				document.getElementById("shadow").show();
				document.getElementById(popup_ouverte).show();
			}
				
			var timer=setInterval(function(){
				if(popup_ouverte && document.getElementById(popup_ouverte)){
					document.getElementById(popup_ouverte).center();
				}
			},100);
			
			Element.prototype.popup_close=function(){
				this.hide();
				document.getElementById("shadow").hide();
			}

			var list_popup=document.getElementsByClassName("popup_open");
			for(var i=0;i<list_popup.length;i++){
				list_popup[i].onclick=function(){
					var b=this.getAttribute("data-popup-src");
					var a=document.getElementById(b);
					a.popup_open();
				}
			}

			var list_popup=document.getElementsByClassName("popup_close");
			for(var i=0;i<list_popup.length;i++){
				list_popup[i].onclick=function(){
					var b=this.getAttribute("data-popup-src");
					var a=document.getElementById(b);
					a.popup_close();
				}
			}
		document.getElementById("shadow").onclick=function(){
			document.getElementById(popup_ouverte).popup_close();
		};

	});



	/*------------------------------------
	 *  DETECTE ET APPEL LES CLONEREDACTOR
	 *------------------------------------
	 *  Pour transformer un textarea en redactor il suffi de lui donner la classe Redactor
	 */
	ready(function()
	{
		if(typeof document.execCommand != 'function') {
			alert('Votre navigateur ne suporte pas cloneRedactor.')
			return false;
		}

	    myApp.argsToArray(document.getElementsByClassName('cloneRedactor')).forEach(function(element, index, array)
	    {
	      if(element.getAttribute("data-outils"))
	      {
	        var outils = element.getAttribute("data-outils").split(',');
	        myApp.cloneRedactor(element, outils );
	      }
	      else
	      {
	        myApp.cloneRedactor(element);
	      }
	    });
	});

})();
