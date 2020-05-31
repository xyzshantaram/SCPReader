#!/usr/bin/env bash

npm install
echo -e "#\!/usr/bin/env bash" >> scp
echo -e "node \"$PWD/main.js\" \"\$1\" | less" >> scp
echo -ne "Select directory to install SCPReader to. (example: /home/user/bin/) (preferably, this should be included in your \$PATH): "; read -r scp_install_dir
cp scp $scp_install_dir/scp
chmod +x $scp_install_dir/scp