<?php
  session_start();
  require_once('./conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  if(empty($nickname)||empty($username)||empty($password)){
    header('Location: register.php?errorCode=1');
    die();
  }

  $sql = 'INSERT INTO yang36_users(nickname, username, password) VALUES (?,?,?)';

  $stmt = $conn -> prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $result = $stmt->execute();

  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode === 1062){
      header('Location: register.php?errorCode=2');
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username;
  header('Location: index.php');
?>