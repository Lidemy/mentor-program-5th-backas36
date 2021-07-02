<?php
  if(empty($_GET['category_id'])||
     empty($_GET['article_id'])){
    header('Location:index.php');
    exit;
  }
$category_id = $_GET['category_id'];
$article_id = $_GET['article_id'];

  include('./header.php');
  include('./banner.php');
?>

  <main>
  
     <ol class="breadcrumb">
          <li><a href="index.php">首頁</a></li>

          <li><a href="category_articles.php?category_id=<?php echo escape($category_id)?>.'&article_id='.<?php echo escape($article_id)?>" class="active"><?php echo getCategoryFromId($category_id)?></a></li>
      </ol>
    <div class="wrapper">
      <div class="articles">
        <?php  
          $sql = 'SELECT * From yang36_articles '. 
                'WHERE is_deleted IS NULL '.
                'AND category_id = ? '.
                'ORDER BY article_id DESC';
          $stmt = $conn->prepare($sql);
          $stmt->bind_param('i', $category_id);

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
            <div class="article__time"><?php echo escape($articles['created_at']) ; ?></div>
          </div>
          <div class="article__body">
            <p><?php echo escape($articles['article_content']);?></p>
          </div>
          <div class="article__footer">
            <a href="article.php?category_id=<?php echo $category_id .'&article_id=' . $articles['article_id'] ?>" class="btn btn-link"> More</a>
          </div>
        </div>
        <?php } ?>
      </div>

<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>