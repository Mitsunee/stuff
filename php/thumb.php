<?php
/*
 * This php script either loads or creates a thumbnail of any png or jpg image in the folder it's in
 * Simply put the filename into the GET value imgid
 * there is a regex filter in place to prevent malicious requests from moving to a different folder
 *
 * Thumbnail size is hardcoded in line 41 to 42 to 256 * n px (height adjusts to aspect ratio)
 * Background color is hardcoded in line 43
 * JPEG Quality is hardcoded in line 46 to 47
 *
 * @author Mitsunee <https://www.mitsunee.com>
 * @license https://github.com/Mitsunee/stuff/blob/master/LICENSE
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

if(!file_exists("thumbnails/".$filename.".jpg")) {//checks if the thumbnail was not previously made
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
	$dst_h = floor(256/$size[0] * $size[1]);//calcutates height based on 256px using the same aspect ratio as the source image
	$thumb=imagecreatetruecolor(256,$dst_h);//256px width, $dst_h height
	imagefill($thumb,0,0,imagecolorallocate($thumb,0x13,0x13,0x13));//background color hardcoded to #131313
	imagecopyresampled($thumb,$im,0,0,0,0,256,$dst_h,$size[0],$size[1]);

	imagejpeg($thumb,NULL,93);//output new thumbnail with JPEG quality 93% to user
	imagejpeg($thumb,"thumbnails/".$filename.".jpg",93);//save thumbnail with JPEG quality 93% to server for future requests
	imagedestroy($im);
	imagedestroy($thumb);
} else {//thumbnail exists and gets loaded from file
	header('Content-Type: image/jpeg');
	readfile("thumbnails/".$filename.".jpg");
}?>
