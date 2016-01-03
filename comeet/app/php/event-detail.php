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

session_start();
$user_id = $_SESSION["userID"];

$event_id = $_POST['id'];

$result = '{}';

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{
    //Datenbank nach Eventeinträgen abfragen
    $sql = "SELECT * FROM Events WHERE Event_ID = $event_id";
    $db_erg = mysql_query($sql);

    //irgendwie gut verpacken und zurückgeben

    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = '{"title" : "'.$row["Title"].'", "description" : "'.$row["Description"].'", "street" : "'.$row["Street"].'"'.', "nr" : "'.$row["Nr"].'"'.', "postcode" : "'.$row["Postcode"].'"'.', "city" : "'.$row["City"].'", "date" : "'.$row["CalendarDate"].'"'.', "userID" : "'.$row["User_ID"].'"'.', "eventID" : "'.$row["Event_ID"].'"';
    }

    $sqlTN ="SELECT * FROM Attendees WHERE Event_ID = $event_id";
    $db_ergTN = mysql_query($sqlTN);

    while ($row = mysql_fetch_array( $db_ergTN, MYSQL_ASSOC))
    {

        $userID = $row["User_ID"];

        $result = $result.', "attendees" : [';

        //User raussuchen anhand der User_id
        $sqlUser = "SELECT * FROM Users JOIN Attendees ON Users.User_ID = Attendees.User_ID WHERE Attendees.User_ID = $userID";
        $db_ergUser = mysql_query($sqlUser);
        $rowUser = mysql_fetch_object($db_ergUser);
        $result = $result.'{"Name" : "'.$rowUser->Firstname.' '.$rowUser->Lastname.'"}';

        //Items zu User und Event holen
        $sqlItems = "SELECT * FROM Items WHERE User_ID = $rowUser->User_ID and Event_ID = $event_id";
        $db_ergItems = mysql_query($sqlItems);

        while ($rowItems = mysql_fetch_array( $db_ergItems, MYSQL_ASSOC)) {
            $result = $result.', "items" : [{"Name" : "'.$rowItems["Name"].'"}]}';
        }

        $result = $result.']';

    }

    $result = $result.'}';

}

echo $result;

mysql_free_result($db_erg);

?>

