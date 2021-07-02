<?php
  if(empty( $_GET['category_id']) || empty( $_GET['article_id'])){
    header('Location: index.php');
    exit;
  }
  $category_id = $_GET['category_id'];
  $article_id = $_GET['article_id'];

  $username = NULL;
  $user = NULL;

  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  include('./header.php');
  include('./banner.php');
?>

  <main>
  
    <ol class="breadcrumb">
        <li><a href="index.php">首頁</a></li>
        <?php $article = getArticleFromId($category_id,$article_id);
          //print_r($article);
         ?>
        <li><a href="category_articles.php?category_id=<?php echo escape($category_id) ?>.php" class="active"><?php echo escape(getCategoryFromId($category_id))?></a></li>
        <li><a href="article.php?category_id=<?php echo escape($category_id)?>&article_id=<?php echo escape($article_id)?>" class="active"><?php echo escape($article['article_title'])?></a></li>
    </ol>
    <div class="wrapper">
      <div class="articles">
          <div class="article">
          <div class="article__header">
            <div class="article__title"><?php echo escape($article['article_title'])?></div>
            <div class="article__time"><?php echo escape($article['created_at'])?></div>
          </div>
          <div class="article__body article-nolimit">
            <p><?php echo escape($article['article_content'])?></p>
          </div>
          <div class="article__footer">
            <div class="article-comments">
              <h2>Comments</h2>
              <?php 
                $sql = 'SELECT BC.username, BC.created_at, BC.content FROM yang36_blog_comments AS BC '. 
                        'LEFT JOIN yang36_articles AS A '. 
                        'ON BC.article_id = A.article_id '.
                        'WHERE BC.is_deleted is NULL '.
                        'AND A.category_id = ? '.
                        'AND BC.article_id = ?';

                  $stmt = $conn -> prepare($sql);
                  $stmt -> bind_param('ii',$category_id ,$article_id);
                  $result = $stmt->execute();
                  if(!$result){
                    die($conn->error);
                  }
                  $result = $stmt-> get_result();
                  while($row = $result->fetch_assoc()){
              ?>
              <div class="article-comment">
                <div class="article-comment__header">
                  <div class="article-comment__nickname"><?php echo $row['username']; ?></div>
                 
                  <div class="article-comment__time">
                  <?php echo escape($row['created_at']) ?>
                  </div>
                </div>
                <div class="article-comment__body">
                  <p><?php echo escape($row['content'])?></p>
                </div>
              </div>
                <?php } ?>

            </div>
          </div>
        </div>
      </div>

<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>