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


$user_id = $_SESSION["userID"];

//Gucken, ob die Session aktiv ist:
if (isset($_SESSION["userID"]))
{

    //Datenbank nach Eventeinträgen abfragen
    $sql = "SELECT * FROM Events WHERE User_ID = $user_id";


    $db_erg = mysql_query($sql);
    $row = mysql_fetch_object($db_erg);


    //irgendwie gut verpacken und zurückgeben
    $result = $row;
//    $result = "failed";
//    //$result = $row->Username.$row->Password;
//
//    if (mysql_affected_rows() == 1)
//    {
//        echo $row->Username.$row->Password;
//        $result = "success";
//
//        //Session mit user ID füllen
//        session_start();
//        $_SESSION["userID"] = $row->User_ID;
//    }

    //dann noch die Freunde Events holen
    $sqlFriendEvents = "SELECT * FROM Events JOIN Contacts ON Contacts.Contact_ID = Events.User_ID WHERE Contacts.User_ID =  $user_id";

}

echo $result;

mysql_free_result($db_erg);

?>

