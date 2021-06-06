#!/usr/bin/env python

import subprocess
import argparse
import os
import re

hlt = {
    "reset": "\033[0m",
    "italic": "\033[3m",
    "bold": "\033[1m",
    "underline": "\033[4m",
    "error_color": "\033[38;5;1m",
    "unfocus_color": "\033[38;5;8m",
    "set_title": "\033]0;%s\a"
}

def slice_lines(line, length):
    sliced = [line[i:i + length] for i in range(0, len(line), length)]
    return sliced

def get_user_input(prompt):
    a = None
    try:
        a = input(prompt)
    except (EOFError, KeyboardInterrupt):
        raise EOFError
    return a

def page(lines):
    cols, rows = os.get_terminal_size()
    screenfuls = slice_lines(lines, rows - 1)
    for count, screenful in enumerate(screenfuls):
        for line in screenful:
            print(line)
        if (count + 1) == len(screenfuls):
            continue
        else:
            try:
                cmd = get_user_input(f"{hlt['bold']}{hlt['unfocus_color']}Enter to continue reading, Ctrl-C to stop: {hlt['reset']}")
                if re.match(r'\d+', cmd):
                    get_and_display(cmd)
            except:
                print(f'\r{" " * cols}\r', end='')
                break
            print(f'\033[1A\r{" " * cols}\r', end='')

def get_and_display(num):
    js_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "get.js")
    if os.access(js_path, os.F_OK):
        output = subprocess.getoutput("%s %s" %(js_path, num))
        output = output.split("\n")
        page(output)
    else:
        print(hlt["bold"] + hlt["error_color"] + "Error: get.js not found: are you sure it is in the same directory as scpread.py?" + hlt["reset"])

if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog='scpread', description="Command-line SCP reader.")
    parser.add_argument("id", help="The number of the SCP you want to read.", type=int)
    args = parser.parse_args()

    get_and_display(str(args.id))

    while True:
        try:
            cmd = get_user_input(f"{hlt['bold']}Enter an SCP ID, Ctrl-C/exit to stop: {hlt['reset']}")
            if not re.match(r'\d+', cmd):
                print(hlt['bold'] + hlt["error_color"] +  "Enter only numeric characters!" + hlt['reset'] )
                continue
            else:
                get_and_display(cmd)
        except:
            exit(0)