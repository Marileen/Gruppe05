<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

session_start();
$user_id = $_SESSION["userID"];

$thisM = $_POST['thisM'];
$nextM = $_POST['nextM'];

$result = '';

//var dummyResponse = '{"thisMonth" : [{"day" : "2"}, {"day" : "4"}], "nextM" : [{"day" : "3"}, {"day" : "5"}]}';

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{
    //Datenbank nach Eventeinträgen abfragen
    //Datum der Events an denen die aktuelle user_id teilnimmt und die im bereich der nächsten 2 monate liegen
    //Tage der Events nur zurückliefern
    $sql = "SELECT * FROM Events JOIN Attendees ON Events.User_ID = Attendees.User_ID WHERE Attendees.User_ID = $user_id AND Events.month = $thisM";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);
    //monate holen
    $result= $result.$thisM.'--'.$user_id.'--'.$nextM;
    $result= $result.'{"thisMonth" : [';
    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC)) {
        //todo: mehrfache vermeiden, indem erst in ein array schreiben und dann die mehrfachen rauslöschen
        $result= $result.'{"day" : "'.$row["month"].'"},';
    }
    $result = rtrim($result, ",");
    $result= $result.']';

    $sql = "SELECT * FROM Events JOIN Attendees ON Events.User_ID = Attendees.User_ID WHERE Attendees.User_ID = $user_id AND Events.month = $nextM";
    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);
    //monate holen
    $result= $result.', "nextM" : [';
    while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC)) {
        //todo: mehrfache vermeiden, indem erst in ein array schreiben und dann die mehrfachen rauslöschen
        $result= $result.'"{"day" : "'.$row["month"].'"},';
    }
    $result = rtrim($result, ",");
    $result= $result.']}';

}

echo $result;

mysql_free_result($db_erg);

?>

