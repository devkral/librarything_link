#! /bin/bash

if [ "$1" = "--help" ];then
echo "Usage:"
echo "makeworking.sh <path to bash file>"
exit 0;
fi


sed -e 's/\/\/ .*//g' -e "s/^\s\+//g" -e "s/\s\+$//g" -e '/^$/d' "$1" | tr -d "\n"

