#!/bin/bash

# Quick bash script that allows you to grab the currently playing song from Spotify
# Based on: https://obsproject.com/forum/resources/now-playing-bash-script.341/
# This program uses sed make sure it's installed

# Config vars
updateInterval=2 # In seconds
outputFile="./nowPlaying.txt"

# Functions
xwinlength=21 # The length of this string "xwininfo: Window id: "
function grabResourceID() {
	xwinoutput="$(xwininfo | grep 'Window id:')" # Grab the line containing the resource id from xwininfo
	cutoutput="${xwinoutput:xwinlength}" # Format it
	resourceID="${cutoutput%% *}"
}

function grabXOutput() {
	xOutput="$(xwininfo -tree -root | grep $resourceID)" # Get all open windows and output only the one with the resource id of the chosen player
}

echo "Click in the Spotify Client window..."
grabResourceID
echo "Resource ID is $resourceID"
echo "Press CTRL+C to exit the script"
printf "\n"

oldOutput="NULL"

while true; do
	grabXOutput
	if [ "$xOutput" == "$oldOutput" ]; then # Song hasn't changed
		sleep $updateInterval
  		continue
	fi

	oldOutput=$xOutput
	cutColon="${xOutput%%\":*}"
	songName="${cutColon##* \"}"

	# Testing
	#echo "xOutput $xOutput"
	#echo "cutColon $cutColon"
	#printf "\n"

	# Output to console and file, unless playback is paused
	if [ "$songName" != "Spotify Premium" ]; then # Playback not paused
		echo "Now Playing: $songName"
		echo "$songName">$outputFile
	fi
	sleep $updateInterval
done
