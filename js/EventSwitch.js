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

