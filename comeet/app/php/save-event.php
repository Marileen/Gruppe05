<?php

require_once('config.php');

if (isset($_POST['userCheckup']))
{
    //user prüfen
    session_start();
    if (isset($_SESSION["userID"])) {
        echo "success";
    } else {
        echo "failed";
    }


} else

{

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

$update_event_id      = $_POST['id'];
$title         = $_POST['title'];
$description   = $_POST['description'];
$dateTime      = $_POST['dateTime'];
$dayD           = $_POST['day'];
$monthD         = $_POST['month'];
$yearD          = $_POST['year'];
$street        = $_POST['street'];
$nr            = $_POST['nr'];
$postcode      = $_POST['postcode'];
$city          = $_POST['city'];
$mapLink       = $_POST['mapLink'];

session_start();
$user          = $_SESSION["userID"];   //--> aus der Session holen

////Daten des Events eintragen

    if (isset($_POST['id'])) {
        echo "event to update".$update_event_id;
        $sql = "UPDATE Events SET Title = '$title', Description = '$description', Street = '$street', Nr = '$nr', Postcode = '$postcode', City = '$city', CalendarDate = '$dateTime', User_ID = '$user', MapLink = '$mapLink', dd= '$dayD', mm='$monthD', yyyy='$yearD' WHERE Event_ID = '$update_event_id'";

    } else {
        $sql = "INSERT INTO Events (Title, Description, Street, Nr, Postcode, City, CalendarDate, User_ID, MapLink, dd, mm, yyyy) VALUES ('$title','$description','$street','$nr','$postcode','$city', '$dateTime', '$user', '$mapLink', '$dayD', '$monthD', '$yearD')";
    }
    $db_erg = mysql_query($sql);

//Event ID holen

$sql = "SELECT * FROM Events WHERE Title = '$title' AND User_ID = $user";
$db_erg = mysql_query($sql);
$row = mysql_fetch_object($db_erg);
$eventID = $row->Event_ID;

    //gut, dann löschen wir jetzt einfach alle offenen items zu diesem Event, falls sie schon da sind und tragen sie neu ein, ist vielleicht nicht die tollste Lösung
    $sqlDelItems = "DELETE FROM Items WHERE Event_ID = $row->Event_ID AND (User_ID IS NULL OR User_ID = 0)";
    $db_ergDelItems = mysql_query($sqlDelItems);

foreach ($_POST as $id=>$value)
{
    //kommt ein item_ vor?
    if (strpos($id, 'item_') > -1)
    {
        //Items in die DB eintragen:
        //länge Prüfen
        if (strlen($value) > 1) {
            $sqlITEM = "INSERT INTO Items (Event_ID,User_ID,Name) VALUES ('$eventID', 0, '$value')";
            $db_ergITEM = mysql_query($sqlITEM);
        }
    }

    //kommt ein t_ vor? -> Vorerst noch nicht implementiert --> TODO
    if (strpos($id, '_t') > -1)
    {
        //Teilnehmer zum Event in die DB eintragen
        //$sqlITEM = "INSERT INTO Attendees ...";
    }
}

mysql_free_result($db_erg);
mysql_free_result($db_ergITEM);

}

?>
