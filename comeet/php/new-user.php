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
$password   = $_POST['password'];
$username   = $_POST['username'];

$sql = "SELECT Email FROM Users WHERE Email = '$email'";

$db_erg = mysql_query($sql);

if (mysql_affected_rows() == 0)
{
    $sql = "INSERT INTO Users (Firstname, Lastname, Email, Birthdate, Password, Username) VALUES ('$firstname','$lastname','$email','$birthdate','$password','$username')";
    $db_erg = mysql_query($sql);

    echo "success";
}
else
{
    echo "failed";
}

mysql_free_result($db_erg);

?>

