<?php
$filename = "http://www.hater.sk/UID/MyApp/assets/videos.txt";
$data	  = fopen($filename, "r");
$array    = array();

while (!feof($data)) {
	$array[] = fgets($data);
}
fclose($data);
echo json_encode($array);
?>
