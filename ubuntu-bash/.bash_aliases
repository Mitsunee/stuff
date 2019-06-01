### Phantombot Console ###
#alias to open the console of Phantombot running as a service
alias kitsuneemaid='journalctl -u phantombot --follow --lines=all'

### LS Deluxe Overrides (requires package: LS Deluxe) ###
alias l='lsd -F'
alias ll='lsd -lF'
alias la='lsd -a'
alias ls='lsd'
alias tree='lsd --tree'

### Misc launch commands ###
#ckb-next is used for RGB on corsair peripherals (requires package: ckb-next)
alias corsair-rgb='ckb-next'

#quick command to kill and restart KDE
alias restart-kde='kquitapp5 plasmashell && kstart5 plasmashell'

### APT ###
#shows the full install log of apt
alias apt-install-log='echo "APT INSTALL LOG:" && cat /var/log/apt/history.log | grep -i " install "'

### Aptitude (requires package: aptitude)###
#update alias
alias update='sudo aptitude update'

#upgrade alias
alias upgrade='sudo aptitude safe-upgrade'

#shows the last 20 packages upgraded via aptitude
alias upgrade-log='echo "APTITUDE UPGRADE LOG: (Last 20)" && cat /var/log/aptitude | grep -i "\[UPGRADE\]" | tail -n 20 | grep -i "\[UPGRADE\]"'

#install alias
alias install='sudo aptitude install'

#shows the last 20 packages installed via aptitude
alias install-log='echo "APTITUDE INSTALL LOG: (Last 20)" &&  cat /var/log/aptitude | grep -i "\[INSTALL\]" | tail -n 20 | grep -i "\[INSTALL\]"'

#shows all packages installed via aptitude
alias install-log-full='echo "APTITUDE INSTALL LOG:" &&  cat /var/log/aptitude | grep -i "\[INSTALL\]"'

### Custom Commands ###
## Filecount ##
#count files in the current directory
alias fcount='printf "${PWD##*/} - $(find . -maxdepth 1 -type f | wc -l) Files\n"'

#recursively count files in the current directory and subdirectories
alias rfcount='printf "${PWD##*/} - $(find . -type f | wc -l) Files\n"'

#recursevely count files for each subdirectory in a nice list
alias dirsfcount='for dir in ./*; do if test -d "$dir"; then printf "$dir - $(find "$dir" -type f | wc -l) Files\n"; fi; done'

## Other ##
#run optipng for all PNG files in the current directory and its subdirectories (requires package: optipng)
alias roptipng='find . -name "*.png" -print0 | xargs -0 -n 1 optipng'
#edit this file
alias edit-alias='nano ~/.bash_aliases'
