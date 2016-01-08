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
$contact_name = $_POST['name'];

//Gucken, ob die Session aktiv ist:
if (isset($user_id))
{
    //Datenbank nach Eventeinträgen abfragen
    $sql = "INSERT INTO Contacts (Contact_ID, User_ID) VALUES ($contact_id, $user_id)";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);

    if (mysql_affected_rows() >= 1) {
        echo '{"added" : [{"id" : "'.$contact_id.'", "status" : "success", "name" : "'.$contact_name.'"}]}';
    } else
    {
        echo '{"added" : [{"id" : "'.$contact_id.'", "status" : "failed contact", "name" : "'.$contact_name.'"}]}';
    }


}

else
{
    echo '{"added" : [{"id" : "'.$contact_id.'", "status" : "failed user", "name" : "'.$contact_name.'"}]}';
}


mysql_free_result($db_erg);

?>

