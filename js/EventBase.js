// gestion des boutons simple
(function(){
	// requis
	var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};


        cloneRedactor.EventBase = function(UniqueId){
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
					cloneRedactor.customCommand(tableau_input[this.id.replace('_'+UniqueId, '')], false, '', UniqueId);
				  };
				}
			}
        }

})();
