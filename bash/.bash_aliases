### LS Deluxe Overrides ###
alias l='lsd -F'
alias ll='lsd -lF'
alias la='lsd -a'
alias ls='lsd'
alias tree='lsd --tree'

### old fgo repos ###
alias fgo='read -p "Go to: fgo-" target_dir && cd "/var/www/fgo/fgo-$target_dir"'
alias fgo-assets='read -p "Go to: fgo-" target_dir && cd "/var/www/fgo/fgo-$target_dir/$target_dir/assets"'
alias fgo-upgrades-update='/home/mitsunee/scripts/update-fgo-upgrades.sh; cd /var/www/fgo/fgo-upgrades/upgrades/assets'

### OptiPNG ###
alias opti-normal='optipng -o4'
alias opti-crazy='optipng -o7 -zm1-9'
# opticat script
alias opticat='/home/mitsunee/scripts/optiCat.sh'
complete -W 'run add length' opticat

### dev ###
alias find-todo='egrep -nrHi "(\/{2,}|\/\*+|#+) ?(TODO|WIP|DEBUG|PLACEHOLDER|NOTE|TEMP|BUG)"'
alias find-todo-next='egrep -nrHi "\/(\*+|\/+) ?(TODO|WIP|DEBUG|PLACEHOLDER|NOTE|TEMP|BUG)" src pages scripts'
alias yrn='yarn run'
alias yadd='yarn add'
alias gp='git push'
alias gpt='git push --tags'
alias gbr='git branch'
alias npkill='npkill --exclude ".cache,.config,.atom"'

### Launch commands ###
# set volume
alias set-volume='amixer -D pulse sset Master'

# python3
alias snek='python3'

# aptitude
alias update='sudo aptitude update'
alias upgrade='sudo aptitude update && sudo aptitude safe-upgrade'
alias install='sudo aptitude install'
alias uninstall='sudo aptitude remove'

### Custom Commands ###
# count files in the current directory
alias fcount='printf "${PWD##*/} - $(find . -maxdepth 1 -type f | wc -l) Files\n"'

# recursively count files in the current directory and subdirectories
alias rfcount='printf "${PWD##*/} - $(find . -type f | wc -l) Files\n"'

# recursively count files for each subdirectory in a nice list
alias dirsfcount='for dir in ./*; do if test -d "$dir"; then printf "$dir - $(find "$dir" -type f | wc -l) Files\n"; fi; done'

# mkdir and cd into it
mkcd() {
    mkdir "$*" && cd "$*"
}

# check size of a directory (default pwd)
alias dirsize='du -h --max-depth=0'

# check size of all dirs in specified directory (default pwd)
alias dirsizes='du -h --max-depth=1'

# edit this file
alias edit-alias='nano ~/.bash_aliases && . ~/.bash_aliases'

### Other ###
# yeet history and peace out
alias forget='history -c && exit'

# good manners
alias please='sudo'

# shutdown
alias ninii="sudo shutdown now"


echo "Loaded aliases"
