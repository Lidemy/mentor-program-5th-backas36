<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');    
  
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);


  if(empty($_GET['article_id']) || !isAdmin($user)){
      header('Location: index.php?errorCode=4');
      die('資料不齊全');
    }
  $article_id = $_GET['article_id'];

  


$sql = 'update yang36_articles SET is_deleted = 1 WHERE article_id  = ? ';



  $stmt = $conn->prepare($sql); 
  $stmt->bind_param('i', $article_id);
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }

  header('Location:index.php');

?>

http://localhost:8888/blog/delete_article.php?category_id=3&article_id=15

http://localhost:8888/blog/update_article.php?category_id=3&article_id=9