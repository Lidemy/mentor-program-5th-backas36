<?php
  require_once('./conn.php'); 
  require_once('./utils.php');

  include('./header.php');
  include('./banner.php');
?>
  <main>
      <ol class="breadcrumb">
          <li><a href="index.php">首頁</a></li>
          <li><a href="register.php" class="active">註冊</a></li>
      </ol>
    <div class="wrapper">
      <div class="form__field">
        <form action="handle_register.php" method="post" class="form form__login">
          <div class="form__input">
            <span>暱稱 ：</span>
            <input type="text" name="nickname" />
          </div>
          <div class="form__input">
            <span>帳號 ：</span>
            <input type="text" name="username" />
          </div>
         <div class="form__input">
            <span>密碼 ：</span>
            <input type="password" name="password" />
          </div>
          <div class="form__input">
            <input type="submit" class="btn btn-submit" value="Register"/><br />
          </div>
        </form>

      <?php
          if(!empty($_GET['errorCode'])){
            $errorCode = $_GET['errorCode'];
            $msg = 'error';
            if($errorCode === '1'){
              $msg = '請填入完整的資料';
            }else if ($errorCode === '2'){
              $msg = '此帳號已經被註冊囉';
            }
            echo '<div class="form__warning"><p>'. $msg .'</p></div>';
          }
      ?>
    </div>
<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>