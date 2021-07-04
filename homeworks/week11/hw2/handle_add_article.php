<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  
    if (empty($_POST['article_title']) || 
        empty($_POST['category_id']) || 
        empty($_POST['article_content']) ){
    header('Location: add_article.php?errorCode=1');
    die();
  }

  $article_title = $_POST['article_title'];
  $category_id = $_POST['category_id'];
  $article_content = $_POST['article_content'];
  if(isAdmin($user)){
    $sql = 'INSERT INTO yang36_articles(article_title, category_id, article_content) VALUES (?, ? ,?)';
  }

  $stmt = $conn -> prepare($sql);
  $stmt->bind_param('sis',$article_title, $category_id, $article_content);

  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }
  header('Location:article_all.php');
?>