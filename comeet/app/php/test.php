<?php
require_once('config.php');
$db_link = mysql_connect ( MYSQL_HOST, 
                           MYSQL_BENUTZER, 
                           MYSQL_KENNWORT );
 
$db_sel = mysql_select_db( MYSQL_DATENBANK )
   or die("Auswahl der Datenbank fehlgeschlagen");
 
$sql = "SELECT * FROM Users";
 
$db_erg = mysql_query( $sql );
if ( ! $db_erg )
{
  die('Ungültige Abfrage: ' . mysql_error());
}
 
echo '<table border="1">';
while ($zeile = mysql_fetch_array( $db_erg, MYSQL_ASSOC))
{
  echo "<tr>";
  echo "<td>". $zeile['ID'] . "</td>";
  echo "<td>". $zeile['Firstname'] . "</td>";
  echo "<td>". $zeile['Lastname'] . "</td>";
  echo "<td>". $zeile['Email'] . "</td>";
  echo "<td>". $zeile['Password'] . "</td>";
  echo "<td>". $zeile['Birthdate'] . "</td>";
  echo "<td>". $zeile['Picture'] . "</td>";
  echo "</tr>";
}
echo "</table>";
 
mysql_free_result( $db_erg );
?>