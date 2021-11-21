# This alias should be used in case of fire (or other emergency) to:
# - make a commit with all changes
# - push to a new branch on the remote
# - shutdown your pc
# all with just a single action!
#
# It can be included in .bashrc or any other file imported by your shell's rc file

alias git-fire="TEMP=FIRE-\$USER-\$(git branch --show-current);git add -A && git commit -m 'oh shit a fire'; git branch \"\$TEMP\" && git push -u origin \"\$TEMP\" && shutdown now"
