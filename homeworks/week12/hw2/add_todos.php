<?php
  require_once('./conn.php');

  header('Content-Type:application/json;charset=utf8mb4');
  header('Access-Control-Allow-Origin: *');
  
  if(empty($_POST['todos'])){
    $json = array(
      'ok' => false,
      'message' => "Please input todos."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  
  $todos = $_POST['todos'];

  $sql = 'INSERT INTO yang36_todos (todos) VALUES (?)';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('s', $todos);
  $result = $stmt -> execute();
  
  if(!$result){
    $json = array(
      'ok' => false,
      'message' => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  };


  $json = array(
    'ok' => true,
    'id' => $conn->insert_id
  );
  $response = json_encode($json);
  echo $response;
?>