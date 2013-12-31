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
