
// clone redactor
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};

	cloneRedactor.closeInutilise = function(UniqueId) {

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

			cloneRedactor.fermer_colorpicker();
			cloneRedactor.fermer_divformat();
		}


	};

})();

