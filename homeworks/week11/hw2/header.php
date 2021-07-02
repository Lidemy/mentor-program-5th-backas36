<?php 
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');


  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }
  

?>
  <!DOCTYPE html>
    <html>

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yang36_Blog</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700;900&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="./reset.css">
      <link rel="stylesheet" href="./style.css">
    </head>

    <body>
      <header>
        <div class="wrapper">
          <input type="checkbox" id="menu_control">
          <label for="menu_control" class="menu__btn">
            <i class="fas fa-bars"></i>
          </label>
          <nav>
            <h1 class="logo">
              <a href="index.php">YangBLOG</a>
            </h1>
            <ul class="menu">
              <li>
                  <a href="article_all.php" class="">文章列表</a></li>
              <?php  
                  $sql = 'SELECT category_name, category_id From yang36_categories Where is_deleted IS NULL';
                  $stmt = $conn->prepare($sql);
                  $result = $stmt->execute();

                  if(!$result){
                    die('SQL Error'.$conn->error);
                  }

                  $result = $stmt->get_result();
                ?>
                <?php while ($category = $result->fetch_assoc()){?>
                  <li>
                  <a href="category_articles.php?category_id=<?php echo $category['category_id'];?>" class=""><?php echo escape($category['category_name'])?></a></li>
                <?php } ?>
             
            </ul>
         </nav>

        </div>
        <div class="user__info">          
          <div class="user_action">
            <?php if(!$username){ ?>
              <a href="login.php">登入</a></li>
            <?php } else if ($user && $user['role'] === 'admin') { ?>
              <div class="user__nickname"><?php echo escape($user['nickname'])?>管理員，你好</div>
              <a href="admin.php" >後台首頁</a>
              <a href="add_article.php" >新增文章</a>
              <a href="handle_logout.php">登出</a>
            <?php } else { ?>
              <div class="user__nickname"><?php echo escape($user['nickname'])?>，你好</div>
              <a href="handle_logout.php">登出</a>
            <?php } ?>
          </div>

        </div>
      </header>
