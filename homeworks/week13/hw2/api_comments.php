<?php
  require_once('./conn.php');

  header('Content-Type:application/json;charset=utf8mb4');
  header('Access-Control-Allow-Origin: *');


  if(is_null($_GET['site_key'])){
      $json = array(
        "ok" => false,
        "message" => "Please add site_key in url."
      );
      $response = json_encode($json);
      echo $response;
      die();
  }

  
  $site_key = $_GET['site_key'];
  $before = $_GET['before'];

  $sql = 'SELECT id, nickname, content, created_at '.
         'FROM yang36_discussions WHERE site_key = ? '.
         'AND is_deleted = 0'.
         (empty($before) ? '' : ' AND id < ?' )
         .' ORDER BY id DESC LIMIT 5';
  
  $stmt = $conn -> prepare($sql);
  if(empty($before)){
    $stmt->bind_param('s', $site_key);
  } else {
    $stmt -> bind_param('si', $site_key, $before);
  }
  $result = $stmt -> execute();
  if(!$result){
    $json = array(
      'ok' => false,
      'message' => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $discussions = array();
  while($row = $result->fetch_assoc()){
    array_push($discussions, array(
      'id' => $row['id'],
      'nickname'	=> $row['nickname'],
      'content'	=> $row['content'],
      'created_at' => $row['created_at']
      )
    );
  }

  $json = array(
    'ok' => true,
    'discussions' => $discussions
  );
  $response = json_encode($json);
  echo $response;
?>