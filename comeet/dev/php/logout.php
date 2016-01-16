<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];

$sqlOffline = "UPDATE Users SET Status = 'offline' WHERE User_ID = $user_id";
$db_erg = mysql_query($sqlOffline);

//Session löschen
session_destroy();

mysql_free_result($db_erg);

?>

