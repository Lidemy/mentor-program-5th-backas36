<?php
  $category_id = $_GET['category_id'];
  $article_id = $_GET['article_id'];
 
  include('./header.php');
  include('./banner.php');
?>

  <main>
  
    <ol class="breadcrumb">
        <li><a href="index.php">首頁</a></li>
        <?php $article = getArticleFromId($category_id,$article_id);
          //print_r($article);
         ?>
        <li><?php echo escape(getCategoryFromId($category_id))?></li>
        <li><a href="update_article.php?category_id=<?php echo escape($category_id)?>&article_id=<?php echo escape($article_id)?>" class="active"><?php echo escape($article['article_title'])?></a></li>
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
        <form action="handle_update_article.php" method="post">
          <div class="article">
            <div class="article__header">
              <div class="article__title">
                <div class="title">文章標題：</div>
                <input type="text"  name="article_title" value="<?php echo escape($article['article_title'])?>"/>
              </div>
              <div class="article__time">
                <div class="title">文章分類：</div>
                <?php 
                  $sql = 'SELECT * FROM yang36_categories WHERE is_deleted is NULL';
                  $stmt = $conn -> prepare($sql);
                  $result = $stmt->execute();
                  if(!$result){
                    die($conn->error);
                  }
                  $result = $stmt-> get_result();
                ?>
                <select class="input__field form-hide" name="category_id">
                 
                    <?php 
                      while ($row = $result -> fetch_assoc()) {
                      if($article['category_id'] == $row['category_id']){ ?>
                      <option value="<?php echo escape($row['category_id'])?>" selected><?php echo escape($row['category_name'])?></option>
                    <?php } else { ?>
                    <option value="<?php echo escape($row['category_id'])?>"><?php echo escape($row['category_name'])?></option>
                    <?php } ?>
                  <?php } ?>
                </select>

              </div>
              <div class="article__time">
                <?php echo escape($article['created_at'])?></div>
            </div>
            <div class="article__body">
              <div class="title">文章內容：</div>
              <textarea name="article_content"  cols="60" rows="30"><?php echo escape($article['article_content'])?></textarea>
            </div>
           
          </div>
          
          <input type="hidden" name="article_id" value="<?php echo $_GET['article_id']?>">
        

          <input type="submit" class="submit-btn" value="確認編輯"/>
        </form>
    
      </div>

<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>