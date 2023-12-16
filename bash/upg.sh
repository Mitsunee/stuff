#!/bin/bash

# Requires gum ()
if ! [ -x "$(command -v gum)" ]; then
  echo "Error: gum is not installed." >&2
  echo "Run 'go install github.com/charmbracelet/gum@latest' to install." >&2
  exit 1;
fi

upgrade_npm () {
  NCU_COMMAND="$(npm-check-updates -g | grep 'npm -g install')";
  gum confirm "Run '$NCU_COMMAND'?" && \
    bash -c "$NCU_COMMAND" _;
}

CHOICE=$(gum choose \
  --no-limit \
  --cursor.foreground="#F83" \
  --selected.foreground="#F83" \
  --selected=system,flatpak \
  "system" "flatpak" "cargo" "golang" "npm");

if [[ $CHOICE == *"system"* ]]; then
  gum confirm "Updating system packages with dnf" && \
    sudo dnf upgrade --refresh;
fi

if [[ $CHOICE == *"flatpak"* ]]; then
  gum confirm "Updating flatpak packages" && \
    flatpak update;
fi

if [[ $CHOICE == *"cargo"* ]]; then
  gum confirm "Updating cargo packages" && \
    cargo install-update -a;
fi

if [[ $CHOICE == *"golang"* ]]; then
  gum confirm "Updating go packages" && \
    go-global-update;
fi

if [[ $CHOICE == *"npm"* ]]; then
  gum confirm "Checking for npm package updates" && \
    upgrade_npm;
fi

unset upgrade_npm CHOICE;
exit 0;
