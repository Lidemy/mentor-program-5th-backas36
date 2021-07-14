<?php
  require_once('./conn.php');

  header('Content-Type:application/json;charset=utf8mb4');
  header('Access-Control-Allow-Origin: *');
  
  if(empty($_GET['todosId'])){
    $json = array(
      'ok' => false,
      'message' => "Please input todosId in url."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  
  $todos_id = intval($_GET['todosId']);

  $sql = 'SELECT * FROM yang36_todos WHERE todos_id = ?';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('s', $todos_id);

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

  $result = $stmt -> get_result();
  $row = $result -> fetch_assoc();
  $data=array(
    'todos_id'=> $row['todos_id'],
    'todos'=> $row['todos']
  );

  $json = array(
    'ok' => true,
    'data' => $data
  );
  $response = json_encode($json);
  echo $response;
?>