
Hallo user: <?php echo $_POST['username']; ?>.
Sie heissen <?php echo $_POST['firstname']; ?>

Hallo user: <?php echo htmlspecialchars($_POST['username']); ?>.
Sie heissen <?php echo (int)$_POST['firstname']; ?>