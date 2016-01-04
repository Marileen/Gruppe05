<?php

/*
 * Beim Aufrufen der Event Detail Seite
 * überprüfen ob eingeloggter user okay ist
 * und dann das Event anhand der ID holen
 *
 * */


require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

session_start();
$user_id = $_SESSION["userID"];

$event_id = $_POST['id'];

$result = '{}';
$hasItems =0;
$hasTN = 0;

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{
    //Datenbank nach Eventeinträgen abfragen
    $sql = "SELECT * FROM Events WHERE Event_ID = $event_id";
    $db_erg = mysql_query($sql);

    //wem gehört das Event
    $sqlOwner = "SELECT * FROM Users JOIN Events ON Users.User_ID = Events.User_ID WHERE Events.Event_ID = $event_id";
    $db_ergOwner = mysql_query($sqlOwner);
    $rowOwner = mysql_fetch_object($db_ergOwner);
    $Owner = $rowOwner->Firstname.' '.$rowOwner->Lastname;


    //irgendwie gut verpacken und zurückgeben
    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = '{"title" : "'.$row["Title"].'", "description" : "'.$row["Description"].'", "street" : "'.$row["Street"].'"'.', "nr" : "'.$row["Nr"].'"'.', "postcode" : "'.$row["Postcode"].'"'.', "city" : "'.$row["City"].'", "date" : "'.$row["CalendarDate"].'"'.', "Owner" : "Event von '.$Owner.'"'.', "eventID" : "'.$row["Event_ID"].'"'.', "MapLink" : "'.$row["MapLink"].'"';
    }

    echo $row["Description"];

    $sqlTN ="SELECT * FROM Attendees WHERE Event_ID = $event_id";
    $db_ergTN = mysql_query($sqlTN);

    if (mysql_affected_rows() >= 1) {
        $result = $result . ', "attendees" : [';
        $hasTN =1;
    }

    while ($row = mysql_fetch_array( $db_ergTN, MYSQL_ASSOC))
    {

        $userID = $row["User_ID"];

        //User raussuchen anhand der User_id
        $sqlUser = "SELECT * FROM Users JOIN Attendees ON Users.User_ID = Attendees.User_ID WHERE Attendees.User_ID = $userID";
        $db_ergUser = mysql_query($sqlUser);
        $rowUser = mysql_fetch_object($db_ergUser);
        $result = $result.'{"Name" : "'.$rowUser->Firstname.' '.$rowUser->Lastname.'"';

        //Items zu User und Event holen
        $sqlItems = "SELECT * FROM Items WHERE User_ID = $rowUser->User_ID and Event_ID = $event_id";
        $db_ergItems = mysql_query($sqlItems);

        //ein User darf momentan nur eine Sache zu einem Event mitbringen, sonst kracht hier das json
        if (mysql_affected_rows() >= 1) {
            $hasItems = 1;
            $itemsTMP = "";
            while ($rowItems = mysql_fetch_array( $db_ergItems, MYSQL_ASSOC)) {
                $itemsTMP = $itemsTMP.'- '.$rowItems["Name"];
            }

            $result = $result.', "items" : "'.$itemsTMP.'"';

        }
            $result = $result.'},';
    }

    //nach dem letzten kein Komma mehr
    $result = rtrim($result, ",");

    if ($hasTN == 1) {
        $result = $result . ']';
    }
    $result = $result.'}';

}

echo $result;

mysql_free_result($db_erg);

?>

