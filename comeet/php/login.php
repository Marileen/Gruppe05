<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

//Postdaten abholen (username und pw)
$username  = $_POST['username'];
$password  = $_POST['password'];

//Datenbank fragen ob es den user mit dem PW gibt
$sql = "SELECT * FROM Users WHERE Username = $username AND Password = $password";

$db_erg = mysql_query($sql);
$row = mysql_fetch_object($db_erg);

$result = "failed";

if (mysql_affected_rows() == 1)
{
    echo $row->Username.$row->Password;
    $result = "success";

    //Session mit user ID füllen
    session_start();
    $_SESSION["userID"] = $row->UserID;
}

echo $result;

mysql_free_result($db_erg);

?>

