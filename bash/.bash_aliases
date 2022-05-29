### dev ###
alias find-todo='egrep -nrHi "(\/{2,}|\/\*+|#+) ?(TODO|WIP|DEBUG|PLACEHOLDER|NOTE|TEMP|BUG)"'
alias find-todo-src='egrep -nrHi "\/(\*+|\/+) ?(TODO|WIP|DEBUG|PLACEHOLDER|NOTE|TEMP|BUG)" src'

# node.js/yarn
alias yrn='yarn run'
alias yadd='yarn add'
alias yrm='yarn remove'
alias yup='yarn upgrade-interactive'
complete -W '--latest' yup
alias npkill='npkill --exclude ".cache,.config,.atom,.var"'
alias n='sudo n' # always use n as su
alias npm-up='sudo npm i -g npm@latest && ncu -g'

# rust
alias rust-up='rustup update && cargo install-update -a'

# git
alias gp='git push'
alias gpt='git push --tags'
alias gpull='git pull'
alias gc='git commit'
alias gcm='git commit -m'
alias gbr-spawn='read -p "New Branch Name: " TEMP && git branch $TEMP && git checkout $TEMP && git push -u origin $TEMP;'
alias glog='git log --oneline | head -n 20'

# atom flatpak cli
alias atom='flatpak run --command=atom io.atom.Atom'
alias apm='flatpak run --command=apm io.atom.Atom'

### Launch commands ###
# redis systemd
alias redis-start='sudo systemctl start redis-server'
alias redis-stop='sudo systemctl stop redis-server'
alias redis-status='sudo systemctl status redis-server'

# optipng
alias opti-normal='optipng -o4'
alias opti-crazy='optipng -o7 -zm1-9'

# opticat script
alias opticat='/home/mitsu/scripts/optiCat.sh'
complete -W 'run add length' opticat

# aptitude
alias update='sudo aptitude update'
alias upgrade='sudo aptitude update && sudo aptitude full-upgrade && flatpak update'
alias upgradeable='apt list --upgradable'
alias install='sudo aptitude install'
alias uninstall='sudo aptitude remove'

### Custom Commands ###
# set volume
alias set-volume='amixer -D pulse sset Master'
complete -W '0% 60% 70% 80% 90% 100%' set-volume

# count files in the current directory
alias fcount='printf "${PWD##*/} - $(find . -maxdepth 1 -type f | wc -l) Files\n"'

# recursively count files in the current directory and subdirectories
alias rfcount='printf "${PWD##*/} - $(find . -type f | wc -l) Files\n"'

# forget bash history of this session
alias forget='history -c'

### Other ###
alias ..="cd .."

# edit this file
alias edit-alias='nano ~/.bash_aliases && . ~/.bash_aliases'

# good manners
alias please='sudo'

# shutdown
alias ninii="sudo shutdown now"


echo "Loaded aliases"
