function reg_test($pattern, $subject) {
    preg_match($pattern, $subject, $match);
    if (count($match) == 0) return false;
    return true;
}
