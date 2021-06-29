<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if(!hasPermission($user, 'create', NULL)){
    header('Location: index.php');
    exit();
  }
  if (empty($_POST['content'])){
    header('Location: index.php?errorCode=1');
    die();
  }
  if(empty($_SESSION['username'])){
    header('Location: index.php?errorCode=2');
  }else{
    $user = getUserFromUsername($_SESSION['username']);
    $nickname = $user['nickname'];
    $content = $_POST['content'];
    
    $sql='INSERT INTO yang36_comments(username, content) VALUES (?,?)';
    
    $stmt = $conn -> prepare($sql);
    $stmt->bind_param('ss',$username, $content);

    $result = $stmt->execute();

    if(!$result){
      die($conn->error);
    }
    header('Location: index.php');
  }
  
?>