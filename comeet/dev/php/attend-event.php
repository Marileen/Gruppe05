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

session_start();
$userID          = $_SESSION["userID"];   //--> aus der Session holen
$eventID         = $_POST["id"];   //--> aus der Session holen

    foreach ($_POST as $id=>$value) {

        if ( (strlen($value) > 0) && (strpos($id, 'item') > -1) ) {
            echo $id.' val: '.$value;
            $sqlITEM = "UPDATE Items SET User_ID = $userID WHERE Item_ID= $value AND Event_ID = $eventID";
            $db_ergITEM = mysql_query($sqlITEM);
        }
    }

    $sqlAtt = "INSERT INTO Attendees (Event_ID, User_ID, status) VALUES ('$eventID', '$userID', 1)";
    $db_ergAtt = mysql_query($sqlAtt);

    if (mysql_affected_rows() >= 1) {
        echo "success: ".$value."  ";
    }

mysql_free_result($db_ergITEM);

}

?>
