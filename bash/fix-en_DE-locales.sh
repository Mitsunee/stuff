#!/bin/bash

sudo locale-gen en_US en_US.UTF-8 de_DE de_DE.UTF-8
sudo localedef -i de_DE -f UTF-8 en_DE.UTF-8

