<?PHP
$updateInterval = 43200;
$output = array("status" => "error", "lastCached" => null);

if (!file_exists('fgo.json')) {
    // Refresh cache if file went missing
    $output = fgo_refresh();
} else {
    $currFile = file("fgo.json")[0];
    // Refresh if the file is too old
    if (json_decode($currFile, true)["lastCached"] + $updateInterval < time()) {
        $output = fgo_refresh();
    } else {
        $output = $currFile;
    }
}


header('Content-Type: application/json');
echo $output;
exit;

function fgo_refresh() {
    $cache = array();

    // curl site
    if (!$res = curlRequest("https://webview.fate-go.us/")) {
        return array("status" => "error", "error_on" => "curl commands");
    }
    $res = explode("\n", $res);

    /*
     * SLIDE
     */

    //find slide beginning
    $slide_offset = 0;
    for($i = 0; $i < count($res); $i++) {
        if (strpos($res[$i], 'class="slide"') !== false) {
            $slide_offset = $i;
            break;
        }
    }
    //selfdestruct if no slide was found
    if ($slide_offset == 0) return array("status" => "error", "error_on" => "slide_offset");

    //process slide and save end
    $slide_end = 0;
    $slide = array();
    for($i = $slide_offset; $i < count($res); $i++) {
        if (strpos($res[$i], '</div>') !== false) {
            $slide_end = $i;
            break;
        }
        if (strpos($res[$i], 'img') !== false) {
            preg_match('/src="([^"]+)"/', $res[$i], $m);
            $slide[]=$m[1];
        }
    }
    //selfdestruct if there was no end???
    if ($slide_offset > $slide_end || count($slide) == 0) return array("status" => "error", "error_on" > "slide_end");

    /*
     * POST LIST
     */

    //find post list beginning
    $list_offset = ($slide_end + 1);
    for ($i = $list_offset; $i < count($res); $i++) {
        if (strpos($res[$i], '<ul class="list">') !== false) {
            $list_offset = $i;
        }
    }
    //selfdestruct if no list was found
    if ($list_offset == ($slide_end + 1)) return array("status" => "error", "error_on" => "list_offset");

    //process list and save end
    $list_end = 0;
    $list = array();
    for ($i = $list_offset; $i < count($res); $i++) {
        if (strpos($res[$i], '</ul>') !== false) {
            $list_end = $i;
            break;
        }
        if (strpos($res[$i], '<a') !== false) {
            $temp = array();
            //match href
            preg_match('/href="([^"]+)"/', $res[$i], $m);
            $temp["href"] = $m[1];
            $i++;
            //match date
            preg_match('/date">([^<]+)</', $res[$i], $m);
            $temp["date"] = $m[1];
            $i++;
            //match title
            preg_match('/title">([^<]+)</', $res[$i], $m);
            $temp["title"] = $m[1];
            //get id
            preg_match('/\/[0-9]+\/([^\/]+)\//', $temp["href"], $m);
            $temp["id"] = $m[1];
            //check for image
            foreach ($slide as $img) {
                if (strpos($img, $temp["id"]) !== false) {
                    $temp["img"] = $img;
                    break;
                }
            }
            //commit
            $list[]=$temp;
            unset($temp);
        }
    }

    /*
     * NEW CACHE
     */
    $cache["status"] = "success";
    $cache["lastCached"] = time();
    $cache["news"] = $list;
    $cache = json_encode($cache);
    file_put_contents("fgo.json", $cache, LOCK_EX);
    return $cache;
}
?>
