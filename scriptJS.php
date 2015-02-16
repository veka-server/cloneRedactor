<?php 

function curPageURL() {
 $pageURL = 'http';
 if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 }
 return $pageURL;
}

$dossier = dirname(curPageURL());

echo "var cloneRedactor = window.cloneRedactor = window.cloneRedactor || {};
cloneRedactor.URL = '".$dossier."';";

echo file_get_contents('js/functionOutils.js');
echo file_get_contents('js/config.js');
echo file_get_contents('js/mustache.js');
echo file_get_contents('js/genOutils.js');
echo file_get_contents('js/refresh.js');
echo file_get_contents('js/EventBase.js');
echo file_get_contents('js/EventFormat.js');
echo file_get_contents('js/EventSwitch.js');
echo file_get_contents('js/EventLien.js');
echo file_get_contents('js/EventColorText.js');
echo file_get_contents('js/EventClic.js');
echo file_get_contents('js/EventImage.js');
echo file_get_contents('js/closeInutilise.js');
echo file_get_contents('js/events.js');
echo file_get_contents('js/cloneRedactor.js');
echo file_get_contents('js/main.js');