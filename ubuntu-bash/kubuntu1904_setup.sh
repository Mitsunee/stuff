#!/bin/bash

dpkg -l | grep -qw gdebi || sudo apt-get install -yyq gdebi
sudo apt update

# Install Packges
sudo apt install zsh git build-essential gcc make cmake ccmake powerline fonts-powerline zsh-syntax-highlighting aptitude optipng curl flatpak htop screen openssh-server

# Remove undesirable packages:
sudo apt purge gstreamer1.0-fluendo-mp3 deja-dup pluma -yy
sudo apt purge firefox -yy
sudo apt purge firefox-locale-en -yy
if [ -d "/home/$USER/.mozilla" ]; then
    rm -rf /home/$USER/.mozilla
fi
if [ -d "/home/$USER/.cache/mozilla" ]; then
    rm -rf /home/$USER/.cache/mozilla
fi

# Set up zsh as default shell and reboot
sudo usermod -s /usr/bin/zsh $(whoami)
sudo chsh -s /usr/bin/zsh root

# Install LSDeluxe 0.14.0
curl -s https://github.com/Peltoche/lsd/releases/download/0.14.0/lsd_0.14.0_amd64.deb
sudo dpkg -i lsd_0.14.0_amd64.deb

# Install Brave Browser
curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -
source /etc/os-release
echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-${UBUNTU_CODENAME}.list
sudo apt update
sudo apt install brave-keyring brave-browser

# Reboot
sudo reboot