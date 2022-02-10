<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET');
 require('conexion.php');
 //$_POST['msg'];
 
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}
$sql ="SELECT * FROM foros";

$result=mysqli_query($conn,$sql);
$json = array();
if (mysqli_num_rows($result)>0) {
 while ($row = $result->fetch_array()) {

  $data = array('unique' => $row['id_coment'],'cedula' => $row['Cedula'],'nombres' => $row['nombres'],'msg' => $row['msg'],'fecha_creacion' => $row['creacion_fecha'],'posicion' => $row['posicion'],'msgAdmin' => $row['msgAdmin'],'Admin_Fecha' => $row['Admin_Fecha'],'foro' => $row['foro'], 'estado' => $row['estado']);
  $comentario = array('id' => $row['id'], 'data' => $data );

  array_push($json, $comentario);
 }
 echo json_encode($json);
}



?>