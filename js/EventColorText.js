// clone redactor
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

	cloneRedactor.EventColorText = function(UniqueId) {

          cloneRedactor.argsToArray(document.getElementsByName('color-forecolor_'+UniqueId)).forEach(function(element, index, array)
          {
            element.onclick = function()
            {
              // recuperation de la couleur 
              var color = this.getAttribute("data-commandvalue");
              cloneRedactor.customCommand('forecolor', false, color, UniqueId);
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
                cloneRedactor.fermer_colorpicker();

                divcolopicker.style.display = "block";
                this.className+=" active"; 
              }
              else
              {
                // fermer les colorpicker
                cloneRedactor.fermer_colorpicker();
              }
            }
          }

    }

})();
