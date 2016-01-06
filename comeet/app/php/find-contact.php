<?php

require_once('config.php');

$db_link = mysql_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT);

$db_sel = mysql_select_db(MYSQL_DATENBANK)
or die("Auswahl der Datenbank fehlgeschlagen");

$firstname  = strtolower($_POST['firstname']);
$lastname   = strtolower($_POST['lastname']);

//wenn eins von beiden leer ist dann xxx setzen, damit nicht alles gefunden wird
if ($firstname == '') {
    $firstname = 'xxx';
}
if ($lastname == '') {
    $lastname = 'xxx';
}

$sql = "SELECT * FROM Users WHERE LOWER(Firstname) LIKE '$firstname%' OR LOWER(Lastname) LIKE '$lastname%'";

$db_erg = mysql_query($sql);

$result = '{"results":[';

while ($row = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
{
$result = $result.'"{"firstname" : "'.$row["Firstname"].'", "lastname" : "'.$row["Lastname"].'"},"';
}

//nach dem letzten kein Komma mehr
$result = rtrim($result, ",");
$result = $result.']}';

echo $result;


mysql_free_result($db_erg);

?>

