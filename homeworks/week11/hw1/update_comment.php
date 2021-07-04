<!-- 網址在這 http://mentor-program.co/mtr04group5/yang36/week9_hw1/index.php -->
<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }



  $sql = 'select * from yang36_comments where id = ? and username = ?';

  if(isAdmin($user)){
    $sql = 'select * from yang36_comments where id = ?';
  }
 
  $stmt = $conn->prepare($sql);
 
  if(isAdmin($user)){
    $stmt -> bind_param('i', $id);
  } else {
    $stmt->bind_param('is',$id, $username);
  }

  $result = $stmt->execute();
  if(!$result){
    die('Error:' . $conn->error);
  }
  $result = $stmt -> get_result();

  $row = $result->fetch_assoc();
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
      <h1 class="board_title">Edit - Comments</h1>
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
    
    <form action="handle_update_comment.php" method="POST" class="board__form-edit">
      <textarea name="content" rows="5" placeholder=""><?php echo $row['content']?></textarea>
      <div class="board__submit">
        <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
        <input type="submit" class="board__btn-submit" value="送出">
      </div>
    </form>
  </main>

</body>

</html>