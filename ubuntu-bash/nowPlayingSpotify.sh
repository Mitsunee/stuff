#!/bin/bash

# Quick bash script that allows you to grab the currently playing song from Spotify
# Based on: https://obsproject.com/forum/resources/now-playing-bash-script.341/

# Config vars
updateInterval=2 # In seconds
outputFile="./nowPlaying.txt"

# Functions
<<<<<<< HEAD
function grabResID() {
    window="$(xwininfo -tree -root | grep '"Spotify' | egrep --invert-match 'spotify\": \(\"spotify')"
    cutSpaces="${window##*0x}"
    resID="0x${cutSpaces%% \"*}"
}

function grabXOutput() {
	xOutput="$(xwininfo -tree -root | grep $resID)"
}

grabResID
echo "Spotify window resID: $resID"
=======
function grabXOutput() {
	xOutput="$(xwininfo -tree -root | grep \"Spotify | egrep --invert-match 'spotify\": \(\"spotify')" # Get all open windows and output only the one from spotify not titled "spotify"
}

>>>>>>> 5602aa0be982f1b51603cc24cf38d11ae7ee4c42
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

	# Output to console and file, unless playback is paused
	if [ "$songName" != "Spotify Premium" ]; then # Playback not paused
		echo "Now Playing: $songName"
		echo "$songName">$outputFile
	fi
	sleep $updateInterval
done
