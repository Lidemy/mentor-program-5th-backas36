<!-- 網址在這 http://mentor-program.co/mtr04group5/yang36/week11_hw1/index.php -->
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

  $page = 1;
  if (!empty($_GET['page'])){
    $page = intval($_GET['page']);
  }
  $item_per_page = 5;
  $offset = ($page - 1) * $item_per_page;
  
  $sql = 'SELECT comments.id As id, '.
          'comments.content AS content, '.
          'comments.created_at AS created_at, '.
          'users.nickname AS nickname, '. 
          'users.username AS username '.
          'FROM yang36_comments AS comments '.
          'LEFT JOIN yang36_users AS users '.
          'ON users.username = comments.username '.
          'Where comments.is_deleted is NULL '.
          'ORDER BY comments.id DESC '.
          'limit ? offset ?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt->execute();
  if(!$result){
    die('Error:' . $conn->error);
  }
  $result = $stmt -> get_result();
?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="./reset.css">
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <header class="header__warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
   
    <div class="board__header">
       
      <h1 class="board_title">Comments</h1>
      <div class="board_statu">
        <?php if(!$username){ ?>
          <a href="register.php" class="board__btn">註冊</a>
          <a href="login.php" class="board__btn">登入</a>
        <?php } else { ?>
          <?php if($user && $user['role']==='admin'){ ?>
          <a href="admin.php" class="board__btn">後台管理</a>
          <?php } ?>  
          <a href="handle_logout.php" class="board__btn">登出</a>  
          <form action="update_user.php" method="post">
            <span class="board__edit">編輯暱稱</span><span  class="input__field input__field-hide">
              <input type="text" name="nickname"  />
              <input type="submit" class="board__btn" value="更改"/>
             </span>
          </form>
          
        <?php } ?>
      </div>

    </div>
    <?php 
      if(!empty($_GET['errorCode'])){
        $errorCode = $_GET['errorCode'];
        $msg = 'error';
        if($errorCode === '1'){
          $msg = '請填入完整的資料';
        }else if($errorCode === '2'){
          $msg = '請先登入再留言';
        }
        echo '<div class="comment__warning">'. $msg .'</div>';
      }
    ?>
    
    <form action="handle_add_comment.php" method="POST" class="board__form-edit">
      <?php if($username && !hasPermission($user,'create',NULL)) {?>
        <div class="login__warning">你已經被停權</div>
      <?php } else if($username) { ?>
        <textarea textarea name="content" rows="5" placeholder = "<?php echo $user['nickname']; ?>，想些什麼？"></textarea>
          <div class="board__submit">
        <input type="submit" class="board__btn-submit" value="送出">
      </div>
      <?php } else { ?>
        <div class="login__warning">請先登入再留言</div>
      <?php } ?>
    
    
    </form>

    <div class="board__hr"></div>

    <section class="board_comments">
      <?php while($row = $result->fetch_assoc()){ 
        //print_r($row)
      ?>
      <div class="board__comment">
        <div class="comment__avatar"></div>
        <div class="comment__body">
          <div class="comment__info">
            <span class="comment__author">
            <?php echo escape($row['nickname']); ?>
            (@<?php echo escape($row['username']); ?>)
            </span>
            <span class="comment__time"><?php echo escape($row['created_at']); ?></span>
            <?php if(hasPermission($user,'update',$row)){ ?>
              <a href="update_comment.php?id=<?php echo escpae($row['id'])?>">編輯</a>
              <a href="delete_comment.php?id=<?php echo escape($row['id'])?>">刪除</a>
            <?php } ?>
          </div>
          <div class="comment__content"><?php echo escape($row['content']); ?></div>
        </div>
      </div>
      <?php } ?>
    </section>

    <div class="board__hr"></div>
    <?php
      $sql = 'select count(id) as count from yang36_comments where is_deleted is NULL;';

      $stmt = $conn->prepare($sql);
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      //echo $row['count']
      $total_page = ceil($row['count'] / $item_per_page);
    ?>
    <div class="page-info">
      <span>總共有 <?php echo escape($row['count']) ?> 筆留言， 頁數：</span>
      <span><?php echo escape($page) ?> / <?php echo escape($total_page)?></span>
    </div>
    <div class="paginator">
      <?php if($page !=1) { ?>
      <a href="index.php?page=1">首頁</a>
      <a href="index.php?page=<?php echo $page -1 ?>"> << </a>
      <?php } ?>
      <?php if($page != $total_page) { ?>
      <a href="index.php?page=<?php echo $page +1 ?>"> >> </a>
      <a href="index.php?page=<?php echo $total_page ?>">最末頁</a>
      <?php } ?>
    </div>
  </main>

  <script>
    const btn = document.querySelector('.board__edit')
    if(btn){
      btn.addEventListener('click',(e)=>{
      const form = document.querySelector('.input__field')
      form.classList.toggle('input__field-hide')
    })
    }
  
  </script>
</body>

</html>

