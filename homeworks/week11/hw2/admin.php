<?php


  include('./header.php');

  include('./banner.php');
  if(!isAdmin($user)){
    header('Location:index.php');
    exit;
  }
?>

<main>
 <div class="wrapper">
      <div class="admin__articles">
        <?php 
            if(!empty($_GET['errorCode'])){
              $errorCode = $_GET['errorCode'];
              $msg = 'error';
              if($errorCode === '1'){
                $msg = '請填入完整的資料';
              }else if ($errorCode === '2'){
                $msg = '查無此帳號，要不要註冊一個？';
              }else if ($errorCode === '3'){
                $msg = '密碼錯誤';
              }
              echo '<div class="form__warning"><p>'. $msg .'</p></div>';
            }
          ?>
          <?php  
        
            
            $sql = 'SELECT A.article_title,A.created_at, A.category_id, A.article_content, A.article_id, C.category_name '.
                  'From yang36_articles AS A '.
                  'LEFT JOIN yang36_categories AS C '.
                  'ON A.category_id = C.category_id '.
                  'WHERE A.is_deleted IS NULL '.
                  'ORDER BY A.article_id DESC ';
                  
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute();

            if(!$result){
              die('SQL Error'.$conn->error);
            }

            $result = $stmt->get_result();
          ?>
          <?php while ($articles = $result->fetch_assoc()){ ?>
            <div class="article">
            <div class="article__header">
              <div class="article__title"><?php  echo escape($articles['article_title']) ; ?></div>
              <div class="article__time">【 <?php echo escape($articles['category_name']) ; ?> 】</div>
              <div class="article__time"><?php echo escape($articles['created_at']) ; ?></div>
            </div>
            <div class="article__footer">
              <a href="update_article.php?category_id=<?php echo escape($articles['category_id'])?>&article_id=<?php echo escape($articles['article_id'])?>" class="btn btn-link"> Edit</a>
              <a href="delete_article.php?category_id=<?php echo escape($articles['category_id'])?>&article_id=<?php echo escape($articles['article_id'])?>" class="btn btn-link"> Delete</a>
            </div>
          </div>
          <?php } ?>
      </div>
<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>