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
