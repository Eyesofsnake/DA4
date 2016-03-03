window.onload = function() {
    "use strict";
    var game = new Phaser.Game(885, 681, Phaser.CANVAS, 'Find the Object', { preload: preload, create: create, render: render });

    function preload() {

        game.load.spritesheet('button', 'assets/transparent.png', 193, 71);
        //game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
        game.load.image('image1','assets/image1.png');
        game.load.image('image2','assets/image2.png');
        game.load.image('image3','assets/image3.png');
        game.load.audio('music','assets/music.ogg');
        game.load.audio('wrong','assets/wrong.ogg');
        game.load.audio('right','assets/right.ogg');
    }

    var background;
    var music;
    var wrong;
    var right;
    var text; 
    var buttons1;
    var correctLetter1;
    var buttons2;
    var correctLetter2;

    var buttons3;
    var button31;
    var button32;
    var button33;
    var button34;
    var button35;

    function create() {

        background = game.add.sprite(443, 340, 'image1');
        background.anchor.setTo(0.5, 0.5)
        background.name = 'background';

        music = game.add.audio('music', 1, true, true);
        music.loop = true;
        music.autoplay = true;
        music.play();
        
        wrong = game.add.audio('wrong');
        right = game.add.audio('right');
        
        
        //text = game.add(0, 0, "Nah");

        level1();
    }
    
    function level1 () {
        background.loadTexture('image1');

        var button11 = game.add.button(373, 350, 'button', buttonPress1, this, 2, 1, 0);
        button11.name = 'cake';
        button11.width = 123;
        button11.height = 106;

        var button12 = game.add.button(275, 427, 'button', buttonPress1, this, 2, 1, 0);
        button12.name = 'strawberry';
        button12.width = 82;
        button12.height = 50;

        var button13 = game.add.button(315, 473, 'button', buttonPress1, this, 2, 1, 0);
        button13.name = 'banana';
        button13.width = 71;
        button13.height = 47;

        var button14 = game.add.button(387, 470, 'button', buttonPress1, this, 2, 1, 0);
        button14.name = 'apple';
        button14.width = 78;
        button14.height = 46;

        var button15 = game.add.button(470, 488, 'button', buttonPress1, this, 2, 1, 0);
        button15.name = 'cookie';
        button15.width = 104;
        button15.height = 46;

        buttons1 = [button11, button12, button13, button14, button15];
        correctLetter1 = buttons1[Math.floor(Math.random() * buttons1.length)].name.charAt(0);
        
        //text.destroy();
        text = game.add.text(5, 0, "Click on a food on the table that starts with the letter "+correctLetter1+".", {fill: 'white'});
    }

    function buttonPress1 (button) {
        if(correctLetter1 == button.name.charAt(0)){
            right.play();
            text.destroy();
            text = game.add.text(5, 0, "Correct, that is the "+button.name+", which does start with "+correctLetter1+".", {fill: 'white', boundsAlignH: 'center'});
            for(var i=0; i < buttons1.length; i++)
                buttons1[i].destroy();
            text.destroy();
            setTimeout(level2(), 50000);
        }
        else{
            wrong.play();
            text.destroy();
            text = game.add.text(5, 0, "No, that is the "+button.name+", and "+button.name+" does not start with "+correctLetter1+".", {fill: 'white', boundsAlignH: 'center'});
        }

    }
    
    function level2 () {
        background.loadTexture('image2');

        var button21 = game.add.button(125, 157, 'button', buttonPress2, this, 2, 1, 0);
        button21.name = 'calendar';
        button21.width = 165;
        button21.height = 140;

        var button22 = game.add.button(110, 220, 'button', buttonPress2, this, 2, 1, 0);
        button22.name = 'trophy';
        button22.width = 54;
        button22.height = 112;

        var button23 = game.add.button(133, 375, 'button', buttonPress2, this, 2, 1, 0);
        button23.name = 'clock';
        button23.width = 98;
        button23.height = 138;

        var button24 = game.add.button(123, 503, 'button', buttonPress2, this, 2, 1, 0);
        button24.name = 'notepad';
        button24.width = 80;
        button24.height = 34;

        var button25 = game.add.button(237, 460, 'button', buttonPress2, this, 2, 1, 0);
        button25.name = 'cup';
        button25.width = 51;
        button25.height = 59;

        var button26 = game.add.button(312, 85, 'button', buttonPress2, this, 2, 1, 0);
        button26.name = 'picture';
        button26.width = 181;
        button26.height = 134;

        var button27 = game.add.button(660, 150, 'button', buttonPress2, this, 2, 1, 0);
        button27.name = 'window';
        button27.width = 181;
        button27.height = 207;

        var button28 = game.add.button(614, 310, 'button', buttonPress2, this, 2, 1, 0);
        button28.name = 'book';
        button28.width = 127;
        button28.height = 58;

        var button29 = game.add.button(753, 328, 'button', buttonPress2, this, 2, 1, 0);
        button29.name = 'baseball';
        button29.width = 48;
        button29.height = 48;

        var button210 = game.add.button(801, 420, 'button', buttonPress2, this, 2, 1, 0);
        button210.name = 'bat';
        button210.width = 59;
        button210.height = 176;

        buttons2 = [button21, button22, button23, button24, button25, button26, button27, button28, button29, button210];
        correctLetter2 = buttons2[Math.floor(Math.random() * buttons2.length)].name.charAt(0);
        
        text = game.add.text(5, 0, "Click on an object that starts with the letter "+correctLetter2+".", {fill: 'white'});
    }
    
    function buttonPress2 (button) {
        if(correctLetter2 == button.name.charAt(0)){
            right.play();
            text.destroy();
            text = game.add.text(5, 0, "Correct, that is the "+button.name+", which does start with "+correctLetter1+".", {fill: 'white', boundsAlignH: 'center'});
            for(var i=0; i < buttons2.length; i++)
                buttons2[i].destroy();
            text.destroy();
            setTimeout(level1(), 3000);
        }
        else{
            wrong.play();
            text.destroy();
            text = game.add.text(5, 0, "No, that is the "+button.name+", and "+button.name+" does not start with "+correctLetter2+".", {fill: 'white', boundsAlignH: 'center'});
        }
    }
    
    function render () {

    }
};