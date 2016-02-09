window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    
    "use strict";
    var game = new Phaser.Game(300, 300, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles-1', 'assets/tiles-1.png');
        game.load.spritesheet('dude', 'assets/dude.png', 48, 32);
        game.load.image('door', 'assets/door.png');
        game.load.image('background', 'assets/black background.png');
        game.load.audio('steps1', 'assets/steps1.mp3');
        game.load.audio('steps2', 'assets/steps2.mp3');

    }

    var map;
    var tileset;
    var layer;
    var door;
    var player;
    var facing = 'right';
    var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var bg;
    var won = false;
    var nextStep = 1;
    var steps1;
    var steps2;
    var playing = false;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#000000';

        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        map = game.add.tilemap('level1');

        map.addTilesetImage('tiles-1');

        map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

        layer = map.createLayer('Tile Layer 1');

        //  Un-comment this on to see the collision tiles
        // layer.debug = true;

        layer.resizeWorld();

        game.physics.arcade.gravity.y = 250;
        
        door = game.add.sprite(789, 369, 'door');

        player = game.add.sprite(32, 32, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        //player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(46, 32, 1, 0);

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [4, 5, 6, 7], 10, true);

        game.camera.follow(player);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        steps1 = game.add.audio('steps1');
        //steps1
        steps2 = game.add.audio('steps2');

    }

    function update() {

        if(won)
            game.pause();
        
        if(game.physics.arcade.distanceBetween(player, door) <= 20){
            var winText = game.add.text(0, 0, "You Won!", { font: "64px Comic Sans", fill: "#ffffff", align: "center" });
            winText.fixedToCamera = true;
            winText.cameraOffset.setTo(15, 200);
            won = true;
        }
        
        if(steps1._isPlaying || steps2._isPlaying)
            playing = true;
        else
            playing = false;
        
        if(game.physics.arcade.collide(player, layer) && player.body.velocity.x != 0 && !playing)//!steps1._isPlaying && !steps2._isPlaying)
            playFx();
        else if(!playing)//!steps1._isPlaying && !steps2._isPlaying)
            nextStep = 1;
            

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;

            if (facing != 'left')
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;

            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else
        {
            if (facing != 'idle')
            {
                player.animations.stop();

                if (facing == 'left')
                {
                    player.frame = 0;
                }
                else
                {
                    player.frame = 4;
                }

                facing = 'idle';
            }
        }

        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
        {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }

    }
    
    function playFx(){
        if(!steps1._isPlaying && !steps2._isPlaying)
        switch (nextStep){
            case 1:
                steps1.play("", 0, 1, false, false);
                nextStep = 2;
                break;
                
            case 2:
                steps2.play("", 0, 1, false, false);
                nextStep = 1;
                break;
        }
    }

    function render () {

        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);

    }
};
