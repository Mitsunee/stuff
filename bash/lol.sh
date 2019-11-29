#!/bin/bash

# This script makes an ugly mess on your screen while using way too much CPU
# Like I have some joke aliases, so why not :3

while (true) do
    #rand=$[$RANDOM % ${#arr[@]}]
    randa=$[$RANDOM % 256]
    randb=$[$RANDOM % 256]
    #printf ${arr[$rand]}
    lol="\033[1;38;5;${randa}m\033[48;5;${randb}mLOL"
    printf ${lol}
    printf "\033[48;5;16m"
    printf " "
done
