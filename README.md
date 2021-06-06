# SCPReader
node + python scp reader. made for uplime with love.

### Usage
0) clone the repo
1) `npm install`
2) `./scpread.py <id>`
3) To install, I recommend you symlink scpread.py into a directory that's on your PATH, like so:
```sh
    ln -s /path/to/this/repo/scpread.py /home/user/.local/bin/scpread
```
4) That way, to update, you can just do
```sh
    git pull
```
Inside `/path/to/this/repo` whenever there are updates.

_**Note:**_ Make sure that `get.js` and `scpread.py` are always in the same directory.

### TODO
(Feel free to open a PR)

[] Migrate entire thing to Python ([readabilipy](https://pypi.org/project/readabilipy/))
[] Add a way to detect when SCP doesn't exist

### License

```
    Copyright (C) 2021 Siddharth S Singh

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```