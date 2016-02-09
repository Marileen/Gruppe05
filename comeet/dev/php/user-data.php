<?php

/*
 * Nur Session vars zurückgeben
 *
 * */

session_start();

if (isset($_SESSION["userdata"])) {
    echo $_SESSION["userdata"];
} else {
    echo "";
}

?>

