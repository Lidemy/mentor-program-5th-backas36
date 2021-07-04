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

  if(is_null($user) || $user['role'] !== 'admin'){
    header('Location: index.php');
    exit();
  }

  $sql = 'SELECT * FROM yang36_users';

  $stmt = $conn->prepare($sql);
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
  <title>Comments - admin</title>
  <link rel="stylesheet" href="./reset.css">
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <header class="header__warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="admin__header">
        <a href="index.php" class="board__btn">留言板</a>
        <a href="handle_logout.php" class="board__btn">登出</a>  
    </div>
   
    <table class="users">
      <caption class="table__title"> 使用者一覽表</caption>
      <thead>
        <tr>
          <td>User ID</td>
          <td>Nickname</td>
          <td>Username</td>
          <td>Role</td>
        </tr>
      </thead>
      <tbody>
        <?php while ($row = $result->fetch_assoc()){
        ?>
        <tr>
          <td><?php echo escape($row['id']) ?></td>
          <td><?php echo escape($row['nickname']) ?></td>
          <td><?php echo escape($row['username']) ?></td>
          <td>
            <form action="handle_role.php" method="post" class="role__form">
              <input type="hidden" name="id" value="<?php echo escape($row['id'])?>">
              <select class="input__field form-hide" name="role">
                <?php if(escape($row['role']) == 'admin' ){?>
                  <option value="normal">normal</option>
                  <option value="ban" >ban</option>
                  <option value="admin" selected>admin</option>
                <?php } else if($row['role']== 'normal') {?>
                  <option value="normal" selected>normal</option>
                  <option value="ban">ban</option>
                  <option value="admin">admin</option>
                <?php } else if($row['role'] == 'ban'){ ?>
                  <option value="normal">normal</option>
                  <option value="ban" selected>ban</option>
                  <option value="admin" >admin</option>  
                <?php }?>
              </select>
              <!--<input type="submit" value="更改" class="role__btn">-->
            </form>

          </td>
        </tr>
        <?php } ?>
      </tbody>
    </table>

  </main>
  <script>
    const tbody = document.querySelector('tbody')
    tbody.addEventListener('change',(e)=>{
      const form = e.target.parentElement
      if(e.target.classList.contains('input__field') &&
        (form.lastElementChild.tagName.toLowerCase() !== 'input')){
       
          const input = document.createElement('input')
          input.classList.add('role__btn')
          input.setAttribute('value','更改')
          input.setAttribute('type','submit')
          form.appendChild(input)
        
      }
      
    })

  </script>
</body>

</html>