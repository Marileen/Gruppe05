<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

$title         = $_POST['title'];
$description   = $_POST['description'];
$dateTime      = $_POST['dateTime'];
$street        = $_POST['street'];
$nr            = $_POST['nr'];
$postcode      = $_POST['postcode'];
$city          = $_POST['city'];
$mapLink       = $_POST['mapLink'];
$user          = $_POST['userID'];

$items         = $_POST['items'];       //das muss ein Array sein

//Daten eintragen
$sql = "INSERT INTO Events (Title, Description, Street, Nr, Postcode, City, CalendarDate, User_ID, MapLink) VALUES ('$title','$description','$street','$nr','$postcode','$city', '$dateTime', '$user', '$mapLink')";
$db_erg = mysql_query($sql);

if (mysql_affected_rows() > 0)
{
    echo "success";
{

mysql_free_result($db_erg);

?>
