<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(empty($_POST['role']) || empty($_POST['id'])){
    die('資料不齊全');
  }

  $role = $_POST['role'];
  $id = $_POST['id'];

  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if(!$user || $user['role'] !== 'admin'){
    header('Location: index.php');
    exit();
  }


  $sql = 'UPDATE yang36_users SET role = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }

  header('Location: admin.php');
?>