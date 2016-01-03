<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

$firstname  = $_POST['firstname'];
$lastname   = $_POST['lastname'];
$email      = $_POST['email'];
$birthdate  = $_POST['bday'];
$password   = md5($_POST['password']);
$username   = $_POST['username'];

$sql = "SELECT Email FROM Users WHERE Email = '$email'";

$db_erg = mysql_query($sql);

if (mysql_affected_rows() == 0)
{
    //Daten eintragen
    $sql = "INSERT INTO Users (Firstname, Lastname, Email, Birthdate, Password, Username) VALUES ('$firstname','$lastname','$email','$birthdate','$password','$username')";
    $db_erg = mysql_query($sql);

    echo "success";
    mysql_free_result($db_erg);

    //User_ID zu den eingetragenen Daten holen
    $sql = "SELECT User_ID FROM Users WHERE Firstname = '$firstname' AND Lastname = '$lastname' AND Email = '$email'";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);

    /*session is started if you don't write this line can't use $_Session  global variable*/
    session_start();
    $_SESSION["userID"]= $row->User_ID;  //user ID aus dem DB Result holen

}
else
{
    echo "failed";
}

mysql_free_result($db_erg);

?>

