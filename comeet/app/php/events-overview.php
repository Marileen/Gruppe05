<?php

/*
 * Beim Aufrufen der Overview Seite
 * überprüfen ob eingeloggter user okay ist
 * und dann die eigenen events sowie die
 * Events von Freunden holen
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
$result = '{}';

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{

    //Datenbank nach Eventeinträgen abfragen
    $sql = "SELECT * FROM Events WHERE User_ID = $user_id";
    $db_erg = mysql_query($sql);

    //irgendwie gut verpacken und zurückgeben

    $result = '{"events":[';


    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = $result.'{"title" : "'.$row["Title"].'", "description" : "'.$row["Description"].'", "street" : "'.$row["Street"].'"'.', "nr" : "'.$row["Nr"].'"'.', "postcode" : "'.$row["Postcode"].'"'.', "city" : "'.$row["City"].'", "date" : "'.$row["CalendarDate"].'"'.', "userID" : "'.$row["User_ID"].'"'.', "eventID" : "'.$row["Event_ID"].'"}';
    }

    $result = $result.'],';

    //dann noch die Freunde Events holen
    $sqlFriendEvents = "SELECT * FROM Events JOIN Contacts ON Contacts.Contact_ID = Events.User_ID WHERE Contacts.User_ID = $user_id";
    $db_erg = mysql_query($sqlFriendEvents);

    $result = $result.'"friendEvents" : [';

    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
    {
        $result = $result.'{"title" : "'.$row["Title"].'", "description" : "'.$row["Description"].'", "street" : "'.$row["Street"].'"'.', "nr" : "'.$row["Nr"].'"'.', "postcode" : "'.$row["Postcode"].'"'.', "city" : "'.$row["City"].'", "date" : "'.$row["CalendarDate"].'"'.', "userId" : "'.$row["User_ID"].'"'.', "eventID" : "'.$row["Event_ID"].'"},';
    }

    //nach dem letzten kein Komma mehr
    $result = rtrim($result, ",");

    $result = $result.']';  //Array friendEvents schliessen
    $result = $result.'}';  //JSON Objekt schliessen
}

echo $result;

mysql_free_result($db_erg);

?>

