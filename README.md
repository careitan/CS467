melonJS boilerplate
-------------------------------------------------------------------------------

features :
- video autoscaling
- mobile optimized HTML/CSS
- swiping disabled on iOS devices
- debug Panel (if #debug)
- default icons
- distribution build
- standalone build for desktop operating systems
- optional ES5 shim for non ES5 compliant browser (see index.html)

## To run distribution

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone https://github.com/melonjs/boilerplate.git

Then in the cloned directory, simply run:

    npm install

You must also have `grunt-cli` installed globally:

    npm install -g grunt-cli

Running the game:

	grunt serve

And you will have the boilerplate example running on http://localhost:8000

## Building Release Versions

To build:

    grunt

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

----

Building a standalone desktop release:

    grunt dist

Running the desktop release on Windows:

    .\bin\electron.exe

Running the desktop release on macOS:

    open ./bin/Electron.app

Running the desktop release on Linux:

    ./bin/electron

Note that you may have to edit the file `Gruntfile.js` if you need to better dictate the order your files load in. Note how by default the game.js and resources.js are specified in a specific order.

-------------------------------------------------------------------------------
Copyright (C) 2011 - 2017 Olivier Biot
melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
=======
Aws cloud9 running instructions:

full_game_test/ (full game in melonJs someone else made):

    to run:
        1) right click full_game_test/index.html > preview
        2) click pop-out arrow in top right corner of preview tab, next to 'Browser'
    
    
    
game_test/ (blank boilerplate/template):
    if any changes have been made, rebuild the project first:
        1) in a console tab, cd into the game_test/ directory
        2) run cmd 'grunt'
    
    to run:
        1) right click game_test/build/index.html > preview
        2) click pop-out arrow in top right corner of preview tab, next to 'Browser'



github url:
    https://github.com/zwoolfolk/CS467


melonJS tutorials:
    https://medium.freecodecamp.org/lets-build-the-dig-dug-game-using-melonjs-5fc0c9fd7132
    http://melonjs.github.io/tutorial-platformer/
    http://melonjs.github.io/tutorial-space-invaders/
    
games made with melonJS (some have github links)
    https://github.com/melonjs/melonJS/wiki/made-with-melonJS

melonJS documentation:
    https://github.com/melonjs/boilerplate
    http://melonjs.github.io/melonJS/docs/
