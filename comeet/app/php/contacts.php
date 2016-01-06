<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$userID = $_SESSION["userID"];

//Datenbank fragen ob es den user mit dem PW gibt
$sql = "SELECT * FROM Users JOIN Contacts On Users.User_ID = Contacts.Contact_ID WHERE Contacts.User_ID = $userID";

$db_erg = mysql_query($sql);

$result = "failed";

if (mysql_affected_rows() > 0)
{
    $result = '{"contacts":[';

    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = $result.'{ "name" : "'.$row["Firstname"].' '.$row["Lastname"].'", "status" : "'.$row["Status"].'", "id" : "'.$row["Contact_ID"].'"},';
    }

    $result = rtrim($result, ",");
    $result = $result.']}';
}

echo $result;

mysql_free_result($db_erg);

?>

