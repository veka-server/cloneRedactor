
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

