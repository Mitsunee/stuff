#!/bin/bash

# Requires gum ()
if ! [ -x "$(command -v gum)" ]; then
  echo "Error: gum is not installed." >&2
  echo "Run 'go install github.com/charmbracelet/gum@latest' to install." >&2
  exit 1;
fi

CHOICE=$(gum choose \
  --no-limit \
  --cursor.foreground="#F83" \
  --selected.foreground="#F83" \
  --selected=system,flatpak \
  "system" "flatpak" "cargo" "npm");

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

if [[ $CHOICE == *"npm"* ]]; then
  gum confirm "Checking for npm package updates" && \
    npm-check-updates -g;
fi

exit 0;
