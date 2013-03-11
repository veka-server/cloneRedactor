<?php 
	include('config.php');
	list($width, $height, $type, $attr) = getimagesize($_FILES['fichier']['tmp_name']);
	switch($type)
	{
		case 1: // GIF
		case 2: // JPEG
		case 3: // PNG
				// recuperer l'extention du fichier uploader
				$ext=strrchr($_FILES['fichier']['name'],'.');

				// genere le nouveau nom du fichier
				$nameFile = uniqid('uploadFile_').$ext;

				// deplace le fichier vers sa destination final
				if(move_uploaded_file($_FILES['fichier']['tmp_name'], $dossier_upload.$nameFile))
				{
					// retourne l'url vers la nouvelle image
					echo $url_upload.$nameFile;
					return 1;
				}
				break;
		default:
				return 0;
	}
?>