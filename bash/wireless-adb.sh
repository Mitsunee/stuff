#!/bin/bash

set -e

handle-pairing () {
  IP=$1;
  PAIR_PORT=$2;
  PAIR_CODE=$3;

  # ask for pairing port if not given
  if [[ ! $PAIR_PORT ]]; then
    read -p "Enter Pairing Port: " PAIR_PORT;
  fi

  # ask for pairing code if not given
  if [[ ! $PAIR_CODE ]]; then
    read -p "Enter Pairing Code: " PAIR_CODE;
  fi

  if [[ ! $PAIR_PORT || ! $PAIR_CODE ]] then return 1; fi;

  # pair with phone
  RESULT=$(adb pair "$IP:$PAIR_PORT" "$PAIR_CODE");
  echo $RESULT;
  CHECK=$(echo $RESULT | grep -i success);
  if [[ ! $CHECK ]]; then return 1; fi;
}

handle-connect () {
  IP=$1;
  CONNECT_PORT="${2:-$PHONE_PORT}";

  # Ask whether to connect if port not given
  if [[ ! $CONNECT_PORT ]]; then
    read -p "Connect device? [Y/n/port]: " CONFIRM;
    if [[ $CONFIRM == [nN] ]]; then return 0; fi;
    if [[ $CONFIRM == [yY] ]]; then
      read -p "Enter Connection Port: " CONNECT_PORT;
    else
      CONNECT_PORT="$CONFIRM";
    fi
  fi

  # quit early if still no port given
  if [[ ! $CONNECT_PORT ]]; then return 0; fi;
  
  # connect with phone
  RESULT=$(adb connect "$IP:$CONNECT_PORT");
  echo $RESULT;
  CHECK=$(echo $RESULT | grep -i -v failed);
  if [[ ! $CHECK ]]; then return 1; fi;
}

# handle help command
if [[ $1 == "help" || $1 == "-h" || $1 == "--help" ]]; then
  echo -e "Wireless ADB Helper\n";
  echo -e "pairing:";
  echo "To pair a device (and then optionally connect) use the pair (or -p, --pair) command. If no command is given it is assumed you are trying to pair a device first.";
  echo -e "\nUsage: wireless-adb pair [pport] [pcode] [cport]\n";
  echo "Arguments:";
  echo -e "\tpport: Enter the port for pairing with the device";
  echo -e "\tpcode: Enter the pairing code";
  echo -e "\tcport: To immediatly connect the device enter the connection port";
  echo -e "\nconnecting:";
  echo "To connect to a previously paired device use the connect (or -c, --connect) command:"
  echo -e "\nUsage: wireless-adb connect [cport]\n";
  echo "Arguments:";
  echo -e "\tcport: Connection port of the paired device\n";
  echo -e "Note: Phone IP address can be provided via the \$PHONE env variable.";
  echo -e "      The connection port can also be provided via the \$PHONE_PORT env variable.";
  exit 0;
fi

## handle phone ip
IP="$PHONE";
## ask if not given via env
if [[ ! $IP ]]; then
  read -p "Enter Phone IP Address: " IP;
  if [[ ! $IP ]]; then exit 1; fi;
fi

# handle connect command
if [[ $1 == "connect" || $1 == "--connect" || $1 == "-c" ]]; then
  handle-connect "$IP" $2 || exit 1;
  exit 0;
fi

# handle pair command
if [[ $1 == "pair" || $1 == "--pair" || $1 == "-p" ]]; then
  shift;
fi

handle-pairing "$IP" $1 $2 || exit 1;
handle-connect "$IP" $3 || exit 1;
