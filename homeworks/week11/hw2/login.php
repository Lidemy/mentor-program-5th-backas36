<?php

  include('./header.php');
  include('./banner.php');

?>
  <main>
      <ol class="breadcrumb">
          <li><a href="index.php">首頁</a></li>
          <li><a href="login.php" class="active">登入</a></li>
      </ol>
    <div class="wrapper">
      <div class="form__field">
        <form action="handle_login.php" method="post" class="form form__login">
          <div class="form__input">
            <span>帳號 ：</span>
            <input type="text" name="username" />
          </div>
         <div class="form__input">
            <span>密碼 ：</span>
            <input type="password" name="password" />
          </div>
          <div class="form__input">
            <input type="submit" class="btn btn-submit" value="login"/><br />
            <a href="register.php" class="btn btn-light">Register New Account</a>
          </div>
        </form>

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
    </div>
<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>