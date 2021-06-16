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
      $sql = sprintf('SELECT * FROM yang36_users WHERE username ="%s"', $username);
      $result = $conn->query($sql);
      if(!$result){
        die($conn->error);
      }
      $row = $result->fetch_assoc();
      return $row;
  }
?>