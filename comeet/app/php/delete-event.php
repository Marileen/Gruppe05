<?php

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
if (isset($user_id))
{
    echo "kann nicht sein".$event_id.$user_id;
    //Datenbank nach Eventeinträgen abfragen
    $sql = "DELETE FROM Events WHERE Event_ID = $event_id and User_ID = $user_id";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);

    if (mysql_affected_rows() >= 1) {
        echo "success";
        //todo: auch die Mitbringeselitems löschen
    } else
    {
        echo "failed event";
    }


}

else {
    echo "failed user";
}


mysql_free_result($db_erg);

?>

