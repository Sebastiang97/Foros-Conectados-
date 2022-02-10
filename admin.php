<?php
 require('conexion.php');
 
 $id = $_REQUEST['id'];
 $estado = $_REQUEST['estado'];
 $comentario = $_REQUEST['comentario'];
 

 echo "id: $id<br> estado: $estado<br>";
 
 /*if ($estado == '') {
  $estado = 'true';
 }*/


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}

if($comentario !== ''){
 $edit ="UPDATE foros SET estado = '$estado', msgAdmin = '$comentario', Admin_Fecha = now() WHERE id = $id";
}else{
 $edit ="UPDATE foros SET estado = '$estado', Admin_Fecha = now() WHERE id = $id";
}
echo "<br>$edit";


if ($conn->query($edit) === TRUE) {
 header("Location: http://localhost/coments/admin.html");
 echo "editado";
} else {
 echo "Error: " . $sql . "<br>" . $conn->error;
}


//header("Location: http://localhost/coments/index.html");



?>
