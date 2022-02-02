<?php
 require('conexion.php');
 
 $id_coment = $_REQUEST['id'];
 $nombres = $_REQUEST['nombres'];
 $comentario = $_REQUEST['comentario'];
 $foro = $_REQUEST['foro'];
 $cedula = $_REQUEST['cedula'];
 $posicion = $_REQUEST['posicion'];
 $res = $_REQUEST['res'];
 $estado = $_REQUEST['estado'];

 echo "nombres: $nombres <br> comentario: $comentario<br> foro: $foro<br> cedula: $cedula<br> posicion: $posicion<br> res: $res";
 
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}

if($posicion =="p"){
 $sql ="INSERT INTO foros (`id`, `id_coment`, `Cedula`, `nombres`, `msg`, `posicion`, `foro`, `estado`) VALUES (NULL, '$id_coment','$cedula', '$nombres', '$comentario', '$posicion', '$foro', '$estado')";
}else{
 $sql ="INSERT INTO foros (`id`, `id_coment`, `Cedula`, `nombres`, `msg`, `posicion`, `foro`, `estado`) VALUES (NULL, '$id_coment','$cedula', '$nombres', '$comentario', '', '$foro', '$estado')";
}

$edit ="UPDATE foros SET posicion = '$posicion' WHERE id = $res";

echo "<br>$edit";
echo "<br>$sql";

if ($conn->query($sql) === TRUE) {
 echo "Insertado";
} else {
 echo "Error: " . $sql . "<br>" . $conn->error;
}

if($res != ''){
 if ($conn->query($edit) === TRUE) {
  //header("Location: https://conectados.com.co/web/guest/-/foros");
  echo 'insertado';
 } else {
  echo "Error: " . $sql . "<br>" . $conn->error;
 }
}

header("Location: https://conectados.com.co/web/guest/-/foros");



?>
