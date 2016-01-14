<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];

$event_id = $_POST['thisM'];
$event_id = $_POST['nextM'];

$result = '{}';

//var dummyResponse = '{"thisMonth" : [{"day" : "2"}, {"day" : "4"}], "nextM" : [{"day" : "3"}, {"day" : "5"}]}';

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{
    //Datenbank nach Eventeinträgen abfragen
    //Datum der Events an denen die aktuelle user_id teilnimmt und die im bereich der nächsten 2 monate liegen
    //Tage der Events nur zurückliefern
    $sql = "SELECT * FROM Events WHERE Event_ID = $event_id";
    $db_erg = mysql_query($sql);

    //wem gehört das Event
    $sqlOwner = "SELECT * FROM Users JOIN Events ON Users.User_ID = Events.User_ID WHERE Events.Event_ID = $event_id";
    $db_ergOwner = mysql_query($sqlOwner);
    $rowOwner = mysql_fetch_object($db_ergOwner);
    $Owner = $rowOwner->Firstname.' '.$rowOwner->Lastname;

    //als json verpacken und zurückgeben
    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = '{"title" : "'.$row["Title"].'", "description" : "'.$row["Description"].'", "street" : "'.$row["Street"].'"'.', "nr" : "'.$row["Nr"].'"'.', "postcode" : "'.$row["Postcode"].'"'.', "city" : "'.$row["City"].'", "date" : "'.$row["CalendarDate"].'"'.', "Owner" : "Event von '.$Owner.'"'.', "eventID" : "'.$row["Event_ID"].'"'.', "MapLink" : "'.$row["MapLink"].'"';
    }

    if ($rowOwner->User_ID == $user_id) {
        $result = $result.', "isMine" : "1"';
    } else
    {
        $result = $result.', "isMine" : "0"';
    }

    //Items die noch offen sind (noch keiner mitbringt)
    $sqlItemsOpen = "SELECT * FROM Items WHERE User_ID IS NULL OR User_ID < 1 AND Event_ID = $event_id";
    $db_ergItemsOpen = mysql_query($sqlItemsOpen);

    if (mysql_affected_rows() >= 1) {
        $itemsTMP = ',"openItems" : [';
        while ($rowItems = mysql_fetch_array( $db_ergItemsOpen, MYSQL_ASSOC)) {
            // ,"openItems" : [{"id" : "0", "name" : "Brot"}, ... ]
            $itemsTMP = $itemsTMP.'{"id" : "'.$rowItems["Item_ID"].'", "name" : "'.$rowItems["Name"].'"},';
        }
        //nach dem letzten kein Komma mehr
        $itemsTMP = rtrim($itemsTMP, ",");

        $result = $result.$itemsTMP.']';

    }


    /* TEILNEHMER */
    $sqlTN ="SELECT * FROM Attendees WHERE Event_ID = $event_id";
    $db_ergTN = mysql_query($sqlTN);

    if (mysql_affected_rows() >= 1) {
        $result = $result . ', "attendees" : [';
        $hasTN =1;
    };

    $isAttending = false;

    while ($row = mysql_fetch_array( $db_ergTN, MYSQL_ASSOC))
    {

        $userID = $row["User_ID"];

        if ($userID == $user_id) {
            $isAttending = true;
        }

        //User raussuchen anhand der User_id
        $sqlUser = "SELECT * FROM Users JOIN Attendees ON Users.User_ID = Attendees.User_ID WHERE Attendees.User_ID = $userID";
        $db_ergUser = mysql_query($sqlUser);
        $rowUser = mysql_fetch_object($db_ergUser);
        $result = $result.'{"Name" : "'.$rowUser->Firstname.' '.$rowUser->Lastname.'"';

        //Items zu User und Event holen
        $sqlItems = "SELECT * FROM Items WHERE User_ID = $rowUser->User_ID and Event_ID = $event_id";
        $db_ergItems = mysql_query($sqlItems);

        //Items, die User zu einem Event mitbringen
        if (mysql_affected_rows() >= 1) {
            $hasItems = 1;
            $itemsTMP = "";
            while ($rowItems = mysql_fetch_array( $db_ergItems, MYSQL_ASSOC)) {
                $itemsTMP = $itemsTMP.' - '.$rowItems["Name"];
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

    if ($isAttending == true) {
        $result = $result.', "isAttending" : "1"';
    } else {
        $result = $result.', "isAttending" : "0"';
    }
    $result = $result.'}';

}

echo $result;

mysql_free_result($db_erg);

?>

