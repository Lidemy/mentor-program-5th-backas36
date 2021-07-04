<?php
  require_once('./conn.php');
  function generateToken(){
    $s = '';
    for($i=1; $i<=16; $i++){
      $s .= chr(rand(65,90));
    }
    return $s;
  }
  function getUserFromUsername($username){
      Global $conn;
      $sql = 'SELECT * FROM yang36_users WHERE username = ?';
      $stmt = $conn -> prepare($sql);
      $stmt -> bind_param('s', $username);
      $result = $stmt->execute();
      if(!$result){
        die($conn->error);
      }
      $result = $stmt-> get_result();
      $row = $result->fetch_assoc();
      return $row; //username, id, nickname, role
  }

  function escape($str){
    return htmlspecialchars($str, ENT_QUOTES);
  }

  // $action : update , delete, create
  function hasPermission($user, $action, $comment){
    if(is_null($user)) {
      return false;
    }
    if($user['role'] === 'admin') {
      return true;
    }
    if($user['role'] === 'normal') {
      if($action === 'create') return true;
      return $comment['username'] === $user['username'];
    }
    if($user['role'] === 'ban') {
      return $action !== 'create' ;
    }
  }
  function isAdmin($user){
    return $user['role'] === 'admin';
  }
?>