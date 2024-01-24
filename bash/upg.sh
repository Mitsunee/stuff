#!/bin/bash

# global variables
CHOICE=""
CHOICE_ALL=0
ASSUME_YES=0
CONFIRM=0

# Requires gum ()
if ! [ -x "$(command -v gum)" ]; then
  echo "Error: gum is not installed." >&2
  echo "Run 'go install github.com/charmbracelet/gum@latest' to install." >&2
  exit 1;
fi

# Special case for NPM because ncu only prints the upgrade string
upgrade_npm () {
  NCU_COMMAND="$(npm-check-updates -g | grep 'npm -g install')";
  if [[ $NCU_COMMAND == "" ]]; then
    echo "All npm packages up to date";
    return;
  fi
  gum confirm "Run '$NCU_COMMAND'?" && \
    bash -c "$NCU_COMMAND" _;
}

# Prints help text
print_help() {
  echo "Version 2.0";
  echo "Usage: upg [flags]";
  echo -e "       upg [ -h | --help | -a | --all | -y | --assume-yes ]\n";
  echo "   -h, --help      Print this help";
  echo "   -a, --all       Run all available upgrade commands, skip selection";
  echo "   -y,";
  echo "   --assume-yes    Don't ask whether to upgrade specific package type";
}

# wrapper around gum that handles ASSUME_YES
confirm () {
  if [[ $ASSUME_YES = 1 ]]; then 
    CONFIRM=1;
    return;
  fi

  gum confirm "$1" && CONFIRM=1 || CONFIRM=0;
}

# handle args
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -a|--all) 
      CHOICE_ALL=1 ;;
    -y|--assume-yes)
      ASSUME_YES=1 ;;
    -ya|-ay)
      CHOICE_ALL=1; ASSUME_YES=1 ;;
    -h|--help)
      print_help; exit 0 ;;
    *) echo "Warning: Unknown parameter passed: $1" ;;
  esac
  shift
done

if [[ $CHOICE_ALL = 0 ]]; then
  CHOICE=$(gum choose \
    --no-limit \
    --cursor.foreground="#F83" \
    --selected.foreground="#F83" \
    --selected=system,flatpak \
    "system" "flatpak" "cargo" "golang" "npm");
else
  CHOICE="system,flatpak,cargo,golang,npm";
fi

if [[ $CHOICE == *"system"* ]]; then
  confirm "Updating system packages with dnf";
  if [[ $CONFIRM = 1 ]]; then sudo dnf upgrade --refresh; fi;
fi

if [[ $CHOICE == *"flatpak"* ]]; then
  confirm "Updating flatpak packages";
  if [[ $CONFIRM = 1 ]]; then flatpak update; fi;
fi

if [[ $CHOICE == *"cargo"* ]]; then
  confirm "Updating cargo packages";
  if [[ $CONFIRM = 1 ]]; then cargo install-update -a; fi;
fi

if [[ $CHOICE == *"golang"* ]]; then
  confirm "Updating go packages";
  if [[ $CONFIRM = 1 ]]; then go-global-update; fi;
fi

if [[ $CHOICE == *"npm"* ]]; then
  confirm "Updating for npm package updates";
  if [[ $CONFIRM = 1 ]]; then upgrade_npm; fi;
fi

unset upgrade_npm print_help confirm CHOICE CHOICE_ALL ASSUME_YES CONFIRM;
exit 0;
