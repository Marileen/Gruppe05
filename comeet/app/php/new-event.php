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
$user          = $_SESSION["userID"];   //--> aus der Session holen

////Daten des Events eintragen
$sql = "INSERT INTO Events (Title, Description, Street, Nr, Postcode, City, CalendarDate, User_ID, MapLink) VALUES ('$title','$description','$street','$nr','$postcode','$city', '$dateTime', '$user', '$mapLink')";
$db_erg = mysql_query($sql);

//Event ID holen

$sql = "SELECT * FROM Events WHERE Title = '$title' AND User_ID = $user";
$db_erg = mysql_query($sql);
$row = mysql_fetch_object($db_erg);
$eventID = $row->Event_ID;



foreach ($_POST as $id=>$value)
{
    echo $id.' val: '.$value;

    //kommt ein item_ vor?
    if (strpos($id, 'item_') > -1)
    {
        //Items in die DB eintragen:
        $sqlITEM = "INSERT INTO Items (Event_ID,User_ID,Name) VALUES ('$eventID', '$user', '$value')";
        $db_ergITEM = mysql_query($sqlITEM);
    }

    //kommt ein t_ vor?
    if (strpos($id, '_t') > -1)
    {
        //Teilnehmer zum Event in die DB eintragen

        echo "TEILNEMEHER";
    }
}

//Alle Postdaten durchgehen und wenn es ein "item" ist dann entsprechend behandeln
// und wenn es nicht title, descr us. ist, dann ist es ein Teilnehmer, oder besser wenn es mit "t_" anfängt
//
////Daten des Events eintragen
//$sql = "INSERT INTO Events (Title, Description, Street, Nr, Postcode, City, CalendarDate, User_ID, MapLink) VALUES ('$title','$description','$street','$nr','$postcode','$city', '$dateTime', '$user', '$mapLink')";
//$db_erg = mysql_query($sql);
//
//if (mysql_affected_rows() > 0)
//{
//    echo "success";
//{
//
//mysql_free_result($db_erg);

?>
