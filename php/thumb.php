<?php
/*
 * This php script either loads or creates a thumbnail of any png or jpg image in the folder it's in
 * Simply put the filename into the GET value imgid
 * there is a regex filter in place to prevent malicious requests from moving to a different folder
 */
if(!isset($_GET["imgid"])) {
	http_response_code(404);
	die;
}
$filename = preg_replace ("/[.]*[^a-zA-Z0-9._-]/","",$_GET["imgid"]);
$fileext = substr($filename,-4);

if($filename=="" || !($fileext==".png"||$fileext==".jpg")){
	http_response_code(400);
	die;
}
$filename = substr($filename,0,-4);

if(!file_exists("thumbnails/".$filename.".jpg")) {
	//load original
	switch($fileext) {
		case ".png": $im = @ImageCreateFromPNG($filename.$fileext);break;
		case ".jpg": $im = @ImageCreateFromJPEG($filename.$fileext);break;
	}
	if (!$im) {//if no file was found at all, throw an error at their faces V:
        http_response_code(404);
        die;
	}
	$size=getimagesize($filename.$fileext);

	header('Content-Type: image/jpeg');
	//create thumbnail
	$dst_h = floor(256/$size[0] * $size[1]);
	$thumb=imagecreatetruecolor(256,$dst_h);
	imagefill($thumb,0,0,imagecolorallocate($thumb,0x13,0x13,0x13));
	imagecopyresampled($thumb,$im,0,0,0,0,256,$dst_h,$size[0],$size[1]);

	imagejpeg($thumb,NULL,93);
	imagejpeg($thumb,"thumbnails/".$filename.".jpg",93);
	imagedestroy($im);
	imagedestroy($thumb);
} else {
	header('Content-Type: image/jpeg');
	readfile("thumbnails/".$filename.".jpg");
}?>