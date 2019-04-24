#!/bin/bash

# Download an install git integration for zsh
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/
install.sh -O -)"

# Copy default ohMyZsh config and enable theme and plugins
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
source ~/.zshrc
echo "source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc

echo "To enable colored man pages do 'nano ~./.zshrc' and add 'colored-man-pages' to the plugins"
echo "To enable the agnoster theme change ZSH_THEME to 'agnoster'"