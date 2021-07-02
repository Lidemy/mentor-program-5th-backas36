<?php


  include('./header.php');

  include('./banner.php');
?>

<?php if(!$username){ ?>
  <main>
     <ol class="breadcrumb">
          <li><a href="index.php">首頁</a></li>
          <li><a href="index.php" class="active">最新文章</a></li>
      </ol>
    <div class="wrapper">
      <div class="articles">
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
          $page = 1;  
          if(!empty($_GET['page'])){
            $page = intval($_GET['page']);
          }
          $item_per_page = 5;
          $offset = ($page -1) * $item_per_page;
          
          $sql = 'SELECT A.article_title,A.created_at, A.category_id, A.article_id, A.article_content, C.category_name '.
                 'From yang36_articles AS A '.
                 'LEFT JOIN yang36_categories AS C '.
                 'ON A.category_id = C.category_id '.
                 'WHERE A.is_deleted IS NULL '.
                 'ORDER BY A.article_id DESC '.
                 'limit ? offset ?';
                 
          $stmt = $conn->prepare($sql);
          $stmt->bind_param('ii', $item_per_page, $offset); 
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
          <div class="article__body">
            <p><?php echo escape($articles['article_content']);?></p>
          </div>
          <div class="article__footer">
            <a href="article.php?category_id=<?php echo escape($articles['category_id'])?>&article_id=<?php echo escape($articles['article_id'])?>" class="btn btn-link"> More</a>
          </div>
        </div>
        <?php } ?>

        <!-- 分頁 -->
          <?php
            $sql = 'select count(article_id) as count from yang36_articles where is_deleted is NULL';

            $stmt = $conn->prepare($sql);
            $result = $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            //echo $row['count']
            $total_page = ceil($row['count'] / $item_per_page);
          ?>
          <div class="page__info">
              <?php if($page !=1 ) {?>
                <a href="index.php?page=<?php echo $page -1 ?>"> < </a>
              <?php } ?>
              <span><?php echo $page ?> / <?php echo $total_page?> </span>
              <?php if($page != $total_page ) {?>
                <a href="index.php?page=<?php echo $page +1 ?>"> > </a>
                <a href="index.php?page=<?php echo $total_page ?>"> 最末頁 </a>
              <?php } ?>
          </div>
       
      </div>
     
<?php } else if ($user && $user['role'] === 'admin') { ?>
  <main>
     <ol class="breadcrumb">
          <li><a href="index.php">首頁</a></li>
          <li><a href="index.php" class="active">最新文章</a></li>
      </ol>
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
          $page = 1;  
          if(!empty($_GET['page'])){
            $page = intval($_GET['page']);
          }
          $item_per_page = 5;
          $offset = ($page -1) * $item_per_page;
          
          $sql = 'SELECT A.article_title,A.created_at, A.category_id, A.article_content, A.article_id, C.category_name '.
                 'From yang36_articles AS A '.
                 'LEFT JOIN yang36_categories AS C '.
                 'ON A.category_id = C.category_id '.
                 'WHERE A.is_deleted IS NULL '.
                 'ORDER BY A.article_id DESC '.
                 'limit ? offset ?';
                 
          $stmt = $conn->prepare($sql);
          $stmt->bind_param('ii', $item_per_page, $offset); 
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

        <!-- 分頁 -->
          <?php
            $sql = 'select count(article_id) as count from yang36_articles where is_deleted is NULL';

            $stmt = $conn->prepare($sql);
            $result = $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            //echo $row['count']
            $total_page = ceil($row['count'] / $item_per_page);
          ?>
          
          <div class="page__info">
              <?php if($page !=1 ) {?>
                <a href="index.php?page=<?php echo $page -1 ?>"> < </a>
              <?php } ?>
              <span><?php echo $page ?> / <?php echo $total_page?> </span>
              <?php if($page != $total_page ) {?>
                <a href="index.php?page=<?php echo $page +1 ?>"> > </a>
                <a href="index.php?page=<?php echo $total_page ?>"> 最末頁 </a>
              <?php } ?>
          </div>
       
      </div>
<?php } ?>






<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>