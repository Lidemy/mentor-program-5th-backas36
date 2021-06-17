<?php
  require_once('./conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  if(empty($nickname)||empty($username)||empty($password)){
    header('Location: register.php?errorCode=1');
    die();
  }

  $sql = sprintf('INSERT INTO yang36_users(nickname, username, password) VALUES ("%s","%s","%s")', 
  $nickname, 
  $username, 
  $password);

  $result = $conn->query($sql);

  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode === 1062){
      header('Location: register.php?errorCode=2');
    }
    die($conn->error);
  }

  
  header('Location: login.php');
?>