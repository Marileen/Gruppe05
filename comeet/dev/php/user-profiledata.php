<?php

/*
 * Nur Session vars zurückgeben
 *
 * */

session_start();

if (isset($_SESSION["userProfiledata"])) {
    echo $_SESSION["userProfiledata"];
} else {
    echo "";
}

?>

