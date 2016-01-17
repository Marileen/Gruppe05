<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];
//Postdaten abholen
$username  = $_POST['username'];
$password  = md5($_POST['password']);
$email  = $_POST['email'];

if (isset($_POST['username'])) {
  $sql = "UPDATE Users SET Username = '$username' WHERE User_ID = $user_id";
  $db_erg = mysql_query($sql);
  mysql_free_result($db_erg);
}

if (isset($_POST['password'])) {
    $sql = "UPDATE Users SET Password = '$password' WHERE User_ID = $user_id";
    $db_erg = mysql_query($sql);
    mysql_free_result($db_erg);
}

if (isset($_POST['email'])) {
    $sql = "UPDATE Users SET Email = '$email' WHERE User_ID = $user_id";
    $db_erg = mysql_query($sql);
    mysql_free_result($db_erg);
}

$sql = "SELECT * FROM Users WHERE WHERE User_ID = $user_id";
$db_erg = mysql_query($sql);
$row = mysql_fetch_object($db_erg);

$_SESSION["userdata"] = $row->Firstname.' '.$row->Lastname;
$_SESSION["userProfiledata"] = '{"name" : "'.$row->Username.'", "email" : "'.$row->Email.'"}';

echo "success";

?>

