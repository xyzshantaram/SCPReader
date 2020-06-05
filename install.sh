#!/usr/bin/env bash

npm install
rm scpread
echo
echo -e "#!/usr/bin/env bash" >> scpread
echo -e "if [[ \$1 =~ ^[0-9]+$ ]]; then " >> scpread
echo -e "node \"$PWD/main.js\" \"\$1\" | fmt --split-only -w \"\$(tput cols)\" | less; else" >> scpread
echo -e "echo -n \"Please enter a valid numerical SCP code.\"; fi" >> scpread
echo -ne "Select directory to install SCPReader to. (example: /home/user/bin) (preferably, this should be included in your \$PATH): "; read -r scp_install_dir
cp scpread "$scp_install_dir"/scpread
chmod +x "$scp_install_dir"/scpread
sleep 1
echo
echo -e "Install completed. Hopefully nothing broke. Enjoy stealthy SCP reading!\nPlease do not delete this directory until such time you wish to uninstall."\
        "\nTo uninstall, simply issue 'rm "$scp_install_dir"/scpread' and delete this directory."
