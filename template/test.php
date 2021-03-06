<?php  header( 'Content-Type: text/html; charset=UTF-8' );  ?>

<div id="editor_{{UniqueId}}" name="ewysiwyg">
	<div id="outils_{{UniqueId}}">

	{{#outils}}

		{{#separateur}}
			<div class="separateur"></div>
		{{/separateur}}

		
		{{#base}}
			<input id="{{name}}_{{UniqueId}}" class="icon-wysiwyg-{{name}}" title="{{description}}" type="button">
		{{/base}}

		{{#format}}
			<div style="float:left;position:relative;">
				<input title="Paragraphe" class="icon-wysiwyg-format" id="format_{{UniqueId}}" type="button">
				<div id="DIVformat_{{UniqueId}}" name="DIVformat" style="display:none">
					<input name="format-button_{{UniqueId}}" value="Paragraphe" data-commandvalue="p" type="button">
					<input name="format-button_{{UniqueId}}" value="Code" data-commandvalue="pre" type="button">
					<input name="format-button_{{UniqueId}}" value="Titre 1" data-commandvalue="h1" type="button">
					<input name="format-button_{{UniqueId}}" value="Titre 2" data-commandvalue="h2" type="button">
					<input name="format-button_{{UniqueId}}" value="Titre 3" data-commandvalue="h3" type="button">
					<input name="format-button_{{UniqueId}}" value="Titre 4" data-commandvalue="h4" type="button">
					<input name="format-button_{{UniqueId}}" value="Titre 5" data-commandvalue="h5" type="button">
				</div>
			</div>
		{{/format}}

		{{#colorText}}
			<div style="float:left;position:relative;">
				<input title="Changer la couleur du texte" class="icon-wysiwyg-color forecolor" id="forecolor_{{UniqueId}}" type="button">
				<div id="DIVcolorpicker_{{UniqueId}}" style="display:none;" name="DIVcolorpicker">
					<input name="color-forecolor_{{UniqueId}}" class="color-1" data-commandvalue="#ffffff" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-2" data-commandvalue="#000000" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-3" data-commandvalue="#eeece1" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-4" data-commandvalue="#1f497d" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-5" data-commandvalue="#4f81bd" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-6" data-commandvalue="#c0504d" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-7" data-commandvalue="#9bbb59" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-8" data-commandvalue="#8064a2" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-9" data-commandvalue="#4bacc6" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-10" data-commandvalue="#f79646" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-11" data-commandvalue="#ffff00" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-12" data-commandvalue="#f2f2f2" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-13" data-commandvalue="#7f7f7f" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-14" data-commandvalue="#ddd9c3" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-15" data-commandvalue="#c6d9f0" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-16" data-commandvalue="#dbe5f1" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-17" data-commandvalue="#f2dcdb" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-18" data-commandvalue="#ebf1dd" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-19" data-commandvalue="#e5e0ec" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-20" data-commandvalue="#dbeef3" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-21" data-commandvalue="#fdeada" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-22" data-commandvalue="#fff2ca" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-23" data-commandvalue="#d8d8d8" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-24" data-commandvalue="#595959" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-25" data-commandvalue="#c4bd97" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-26" data-commandvalue="#8db3e2" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-27" data-commandvalue="#b8cce4" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-28" data-commandvalue="#e5b9b7" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-29" data-commandvalue="#d7e3bc" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-30" data-commandvalue="#ccc1d9" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-31" data-commandvalue="#b7dde8" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-32" data-commandvalue="#fbd5b5" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-33" data-commandvalue="#ffe694" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-34" data-commandvalue="#bfbfbf" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-35" data-commandvalue="#3f3f3f" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-36" data-commandvalue="#938953" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-37" data-commandvalue="#548dd4" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-38" data-commandvalue="#95b3d7" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-39" data-commandvalue="#d99694" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-40" data-commandvalue="#c3d69b" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-41" data-commandvalue="#b2a2c7" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-42" data-commandvalue="#b7dde8" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-43" data-commandvalue="#fac08f" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-44" data-commandvalue="#f2c314" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-45" data-commandvalue="#a5a5a5" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-46" data-commandvalue="#262626" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-47" data-commandvalue="#494429" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-48" data-commandvalue="#17365d" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-49" data-commandvalue="#366092" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-50" data-commandvalue="#953734" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-51" data-commandvalue="#76923c" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-52" data-commandvalue="#5f497a" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-53" data-commandvalue="#92cddc" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-54" data-commandvalue="#e36c09" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-55" data-commandvalue="#c09100" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-56" data-commandvalue="#7f7f7f" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-57" data-commandvalue="#0c0c0c" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-58" data-commandvalue="#1d1b10" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-59" data-commandvalue="#0f243e" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-60" data-commandvalue="#244061" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-61" data-commandvalue="#632423" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-62" data-commandvalue="#4f6128" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-63" data-commandvalue="#3f3151" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-64" data-commandvalue="#31859b" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-65" data-commandvalue="#974806" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-66" data-commandvalue="#7f6000" type="button">
					<input name="color-forecolor_{{UniqueId}}" class="color-67" data-commandvalue="none" type="button">
				</div>
			</div>
		{{/colorText}}

	{{/outils}}
	</div>
	
	<div style="min-height: 186px;" id="div_editor_{{UniqueId}}" contenteditable="false"></div>

	<textarea id="textarea_editor_{{UniqueId}}" style="min-height: 186px; display: none;">{{contenu}}</textarea>

	<div class="popup" id="popup_link">
		<h1>Inserer un lien</h1>URL : <input id="url-lien" class="inputlien" placeholder="lien ves la page" type="url">
		<input class="btn btn-primary" value="Valider" id="creer_link" type="button">
	</div>

	<div class="popup" id="popup_image">
		<h1>Inserer une image</h1>Url : <input id="url-image" class="inputlien" placeholder="lien vers l'image" type="url">
		<br>
		<br>
		<span class="muted">Ou séléctionnez un fichier local :</span>
		<br>
		<input name="image" id="upload_image" style="display:none;" type="file">
		<input class="button_upload btn btn-warning" id="btn_upload_image" value="Heberger une image" type="button">
		<div id="store_uploadimgjhfgbd"></div>
		<br>
		<input class="btn btn-primary" value="Valider" id="creer_image" type="button">
	</div>

</div>
