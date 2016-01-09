<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];


//Datenbank fragen ob es den user mit dem PW gibt
$sql = "SELECT * FROM Users WHERE Username = '$username' AND Password = '$password'";

$db_erg = mysql_query($sql);
$row = mysql_fetch_object($db_erg);

$result = "failed";
//$result = $row->Username.$row->Password;

if (mysql_affected_rows() == 1)
{
    echo $row->Username.$row->Password;
    $result = "success";

    //online Status setzen
    $sqlOnline = "UPDATE Users SET Status = 'online' WHERE Username = '$username' AND Password = '$password' ";
    $db_ergOnline = mysql_query($sqlOnline);

    //Session mit user ID füllen
    session_start();
    $_SESSION["userID"] = $row->User_ID;
    $_SESSION["userdata"] = $row->Firstname.' '.$row->Lastname;
}

echo $result;

mysql_free_result($db_erg);

?>

