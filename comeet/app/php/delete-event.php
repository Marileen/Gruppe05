<?php

/*
 * Beim Aufrufen der Event Detail Seite
 * überprüfen ob eingeloggter user okay ist
 * und dann das Event anhand der ID holen
 *
 * */

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];

$event_id = $_POST['id'];

$result = '';

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{
    //Datenbank nach Eventeinträgen abfragen
    $sql = "DELETE * FROM Events WHERE Event_ID = $event_id";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);
    $result = $row;
}

echo $result;

mysql_free_result($db_erg);

?>

