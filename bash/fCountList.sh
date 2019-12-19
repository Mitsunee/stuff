#!/bin/bash

export scriptRoot="$(pwd)"
export rootLen=$((${#scriptRoot}+1))
# gotta export these due to using subshells later on

function fcountlist() {
	if [ ! -z "$1" ]; then
		pushd "$*" &> /dev/null
	fi
	current=${PWD}
	if [ "$current" == "$scriptRoot" ]; then
		printAs=${current##*/}
	else
		printAs=${current:rootLen}
	fi

	# Print this directory
	printf "${printAs} - $(find . -maxdepth 1 -type f | wc -l) Files\n"

	# Find directories in current directory and recursively use this function in a subshell
	find . -mindepth 1 -maxdepth 1 -type d -print0 | xargs -0 -n 1 -I {} bash -c 'fcountlist "{}"' _
	if [ ! -z "$1" ]; then
		popd &> /dev/null
	fi
}

export -f fcountlist

if [ -z "$1" ]; then
	fcountlist "$1"
else
	fcountlist
fi
