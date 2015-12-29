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

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{
    //Datenbank nach Eventeinträgen abfragen
    $sql = "SELECT * FROM Events WHERE Event_ID = $event_id";
    $db_erg = mysql_query($sql);

    //irgendwie gut verpacken und zurückgeben

    $result = $event_id;

    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = $result.'{"title" : "'.$row["Title"].'", "description" : "'.$row["Description"].'", "street" : "'.$row["Street"].'"'.', "nr" : "'.$row["Nr"].'"'.', "postcode" : "'.$row["Postcode"].'"'.', "city" : "'.$row["City"].'", "date" : "'.$row["CalendarDate"].'"'.', "userID" : "'.$row["User_ID"].'"'.', "eventID" : "'.$row["Event_ID"].'"}';
    }

}

echo $result;

mysql_free_result($db_erg);

?>

