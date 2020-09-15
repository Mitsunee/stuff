<?php
/*
 * boxes.php - A quick script to calculate the current amount of boxes in FGO Lottery events
 * AUTHOR: Mitsunee / https://www.mitsunee.com
 * Licensed under WTFPL
 */

//used to close the script if input is unexpected
function handleError() {
	echo "Please put [boxes opened] [currentTickets] as arguments".PHP_EOL;
	die;
}

//builds timestring from an amount of seconds
function makeTimeString($arg) {
	$left = $arg;
	//Day
	$days = floor($left / 86400);
	$left = $left % 86400;
	//Hour
	$hour = floor($left / 3600);
	$left = $left % 3600;
	//Mins
	$mins = floor($left / 60);
	
	//make strings
	$days = $days."d ";
	$hour = str_pad($hour, 2, "0", STR_PAD_LEFT)."h ";
	$mins = str_pad($mins, 2, "0", STR_PAD_LEFT)."m";

	return $days.$hour.$mins;
}

//Check if input is valid or kill script
if(count($argv)<3) handleError();
if(!is_numeric($argv[1])) handleError();
if(!is_numeric($argv[2])) handleError();

$eventStart = 1600070400;//Modify if not Gilfest 2020 NA
$eventEnd = 1601438340;//This too
$eventLength = $eventEnd - $eventStart;
$timeNow = time();
$timePassed = $timeNow - $eventStart;
$timePassedPct = round($timePassed / $eventLength * 100, 2);
$timeLeft = $eventLength - $timePassed;

$ticketTotal = (intval($argv[1])*600) + intval($argv[2]);//total tickets incl. opened boxes
$ticketPace = $ticketTotal / $timePassed * $eventLength; //extrapolate final ticket count based on how much time passed since the start of the event
$boxPace = floor($ticketPace/600);//convert extrapolated ticket count to boxes

//output
echo "     Boxes opened: ".$argv[1].PHP_EOL;
echo "  Current Tickets: ".$argv[2].PHP_EOL;
echo "Current Box Count: ".floor($ticketTotal/600).PHP_EOL;
echo "     Current Pace: ".round($ticketPace)." (".$boxPace." boxes)".PHP_EOL;
echo PHP_EOL.$timePassedPct."% of the event has passed. ".makeTimeString($timeLeft)." left.".PHP_EOL;

?>
