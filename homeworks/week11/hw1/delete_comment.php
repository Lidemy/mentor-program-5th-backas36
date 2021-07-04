<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(empty($_GET['id'])){
    header('Location: index.php?errorCode=1');
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_GET['id'];
  
  $sql = 'update yang36_comments SET is_deleted = 1 WHERE id = ? And username = ?';
  if(isAdmin($user)){
    $sql = 'update yang36_comments SET is_deleted = 1 WHERE id = ?';
  }
  
  $stmt = $conn->prepare($sql);
  
  if(isAdmin($user)) {
    $stmt->bind_param('i', $id);
  } else {
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }
  header('Location:index.php');
?>