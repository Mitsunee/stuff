#!/bin/bash

# Quick bash script that allows you to grab the currently playing song from Spotify
# This program uses sed make sure it's installed

# Config vars
updateInterval=2 # In seconds
outputFile="./nowPlaying.txt"

# Functions
function grabXOutput() {
	xOutput="$(xwininfo -tree -root | grep \"spotify\" | egrep '[^(spotify)]\":')" # Get all open windows and output only the one from spotify not titled "spotify"
}

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
