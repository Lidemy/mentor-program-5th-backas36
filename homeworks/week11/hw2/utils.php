<?php
  require_once('./conn.php');

  function escape($str){
    return htmlspecialchars($str, ENT_QUOTES);
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
    return $row; 
  }


  function getCategoryFromId($category_id){
    Global $conn;
    $sql = 'SELECT category_name FROM yang36_categories WHERE category_id = ?';
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('i', $category_id);
    $result = $stmt->execute();
    if(!$result){
      die($conn->error);
    }
    $result = $stmt-> get_result();
    $row = $result->fetch_assoc();
    return $row['category_name']; 
  }

  function getArticleFromId($category_id, $article_id){
    Global $conn;
    $sql = 'SELECT * FROM yang36_articles AS A WHERE A.category_id = ? AND A.article_id = ? AND A.is_deleted is null';
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('ii',$category_id ,$article_id);
    $result = $stmt->execute();
    if(!$result){
      die($conn->error);
    }
    $result = $stmt-> get_result();
    $row = $result->fetch_assoc();
    return $row; 
  }

  function isAdmin($user){
    return $user['role'] === 'admin';
  }
?>