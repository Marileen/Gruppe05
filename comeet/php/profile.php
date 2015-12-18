<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

//Ausgeben was in der session var user_ID steht

session_start();
//echo "Session UserID: ".$_SESSION["userID"];
$userID = $_SESSION["userID"];

$sql = "SELECT * FROM Users WHERE User_ID = $userID";

$db_erg = mysql_query($sql);
$row = mysql_fetch_object($db_erg);

if (mysql_affected_rows() == 1) {
    echo $row->Username.$row->Password.$row->Email;
}

mysql_free_result($db_erg);

?>

