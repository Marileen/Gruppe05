<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];

$contact_id = $_POST['id'];

//Gucken, ob die Session aktiv ist:
if (isset($user_id))
{
    //Datenbank nach Eventeinträgen abfragen
    $sql = "DELETE FROM Contacts WHERE Contact_ID = $contact_id and User_ID = $user_id";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);

    if (mysql_affected_rows() >= 1) {
        echo '{"deleted" : [{"id" : "'.$contact_id.'", "status" : "success"}]}';
    } else
    {
        echo '{"deleted" : [{"id" : "'.$contact_id.'", "status" : "failed contact"}]}';
    }


}

else
{
    echo '{"deleted" : [{"id" : "'.$contact_id.'", "status" : "failed user"}]}';
}


mysql_free_result($db_erg);

?>

