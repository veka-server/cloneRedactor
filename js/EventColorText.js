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
