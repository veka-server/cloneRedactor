// clone redactor
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

        cloneRedactor.EventFormat = function(UniqueId)
        {
          cloneRedactor.argsToArray(document.getElementsByName('format-button_'+UniqueId)).forEach(function(element, index, array)
          {
            element.onclick = function()
            {
              // recuperation de la couleur 
              var type = this.getAttribute("data-commandvalue");

              cloneRedactor.customCommand('formatBlock', false, type, UniqueId);
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
                cloneRedactor.fermer_divformat();

                divformat.style.display = "block";
                this.className+=" active"; 
              }
              else
              {
                // fermer les colorpicker
                cloneRedactor.fermer_divformat();
              }
            }
          }
        }

})();

