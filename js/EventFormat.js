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

