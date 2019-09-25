### Phantombot Console ###
#alias to open the console of Phantombot running as a service
alias phantombot='journalctl -u phantombot --follow --lines=all'

### LS Deluxe Overrides (requires package: LS Deluxe) ###
alias l='lsd -F'
alias ll='lsd -lF'
alias la='lsd -a'
alias ls='lsd'
alias tree='lsd --tree'

#### OptiPNG (requires package: optipng)###
#optimize with my preffered setting (see optipng --help)
alias opti='optipng -o4'

#optimize with maximum setting
alias opti-crazy='optipng -o7 -zm1-9'

#add to queue
opti-add () {
    printf "$*\n" >> ~/.optipng_queue;
}

#run queue (note: you may want to edit this path to be more specific)
#                               vvvv
alias opti-run-queue='pushd ~/Pictures && cat ~/.optipng_queue | xargs -n 1 find . -iname | xargs -n 1 -I {} printf "%q\n" "{}" | xargs -n 1 optipng -o4 && printf "" >  ~/.optipng_queue && popd'

#count queue items
alias opti-queue-length='wc -l < ~/.optipng_queue'

### Misc launch commands ###
# Note: Obviously only copy the ones you need from here
#quick command to kill and restart KDE
alias restart-kde='kquitapp5 plasmashell && kstart5 plasmashell'

#bleachbit with sudo
# Note: opening bleachbit like this will give your users config, but with root priviledges.
alias bbit='sudo bleachbit'

#switch java version
alias java-switch-version='sudo update-alternatives --config java'

#scrcpy
alias android-capture='scrcpy -m 1600'

### SYSTEM MAINTENANCE ###
## APT
#shows the full install log of apt
alias apt-install-log='echo "APT INSTALL LOG:" && cat /var/log/apt/history.log | grep -i " install "'

## Aptitude (requires package: aptitude)
#update alias
alias update='sudo aptitude update'

#upgrade alias (also runs an update)
alias upgrade='sudo aptitude update && sudo aptitude safe-upgrade'

#full-upgrade alias (also runs an update)
alias upgrade-full='sudo aptitude update && sudo aptitude full-upgrade'

#shows the last 20 packages upgraded via aptitude
alias upgrade-log='echo "APTITUDE UPGRADE LOG: (Last 20)" && cat /var/log/aptitude | grep -i "\[UPGRADE\]" | tail -n 20 | grep -i "\[UPGRADE\]"'

#install alias (also runs an update!)
alias install='sudo aptitude update && sudo aptitude install'

#install alias (without update)
alias installquick='sudo aptitude install'

#remove alias
alias remove='sudo aptitude remove'

#shows the last 20 packages installed via aptitude
alias install-log='echo "APTITUDE INSTALL LOG: (Last 20)" &&  cat /var/log/aptitude | grep -i "\[INSTALL\]" | tail -n 20 | grep -i "\[INSTALL\]"'

#shows all packages installed via aptitude
alias install-log-full='echo "APTITUDE INSTALL LOG:" &&  cat /var/log/aptitude | grep -i "\[INSTALL\]"'

## NPM
#update npm
alias npm-update='sudo npm install npm@latest -g'

### Custom Commands ###
## Filecount ##
#count files in the current directory
alias fcount='printf "${PWD##*/} - $(find . -maxdepth 1 -type f | wc -l) Files\n"'

#recursively count files in the current directory and subdirectories
alias rfcount='printf "${PWD##*/} - $(find . -type f | wc -l) Files\n"'

#recursively count files for each subdirectory in a nice list
alias dirsfcount='for dir in ./*; do if test -d "$dir"; then printf "$dir - $(find "$dir" -type f | wc -l) Files\n"; fi; done'

## Other ##
#edit this file
alias edit-alias='nano ~/.bash_aliases'

#find alias
alias find-alias='alias -p | grep'

#check last bit of history
alias whatdidido='history | tail -n 11 | head -n 10'

#check size of a directory (default pwd)
alias dirsize='du -h --max-depth=0'

#check size of all dirs in specified directory (default pwd)
alias dirsizes='du -h --max-depth=1'

# Note: I put this echo here, so when the edit-alias alias is used I get confirmation
# that the end of this file was reached while reloading it again
echo "Loaded aliases"
