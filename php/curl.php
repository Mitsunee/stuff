<?php
/**
 * one-time curl request
 *
 * This function can be used for easy curl requests. It replaces curl_exec as well as any setup before that in your code, as it simply returns whatever curl_exec did.
 *
 * @author Mitsunee <https://www.mitsunee.com>
 * @license https://github.com/Mitsunee/stuff/blob/master/LICENSE
 *
 * @param string $url The url to grab with curl
 * @return string 
 */
function curlRequest($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $ret = curl_exec($ch);
    curl_close($ch);
    return $ret;
}
?>
