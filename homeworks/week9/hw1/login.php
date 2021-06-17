<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 | 登入</title>
  <link rel="stylesheet" href="./reset.css">
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <header class="header__warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="board__header">
      <h1 class="board_title">登入</h1>
      <div class="board_statu">
        <a href="index.php" .php" class="board__btn">回留言板</a>
        <a href="register.php" class="board__btn">註冊</a>
      </div>

    </div>

    <?php 
      if(!empty($_GET['errorCode'])){
        $errorCode = $_GET['errorCode'];
        $msg = 'error';
        if($errorCode === '1'){
          $msg = '請填入完整的資料';
        }else if ($errorCode === '2'){
          $msg = '帳號或密碼錯誤';
        }
        echo '<div class="comment__warning">'. $msg .'</div>';
      }
    ?>
    <form action="handle_login.php" method="POST" class="board__form-register">
      <div class="board__input">
        <span>帳 號：</span>
        <input type="username" name="username" />
      </div>
      <div class="board__input">
        <span>密 碼：</span>
        <input type="password" name="password" />
      </div>
      <div class="board__submit">
        <input type="submit" class="board__btn-submit" value="送出" />
      </div>
    </form>
  </main>
</body>

</html>