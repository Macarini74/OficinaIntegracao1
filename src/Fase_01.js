class Fase_01 extends Phaser.Scene {


    // função para carregamento de assets
    preload ()
    {
        //load spritesheet
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });

        // load tile sheet
        this.load.image('tiles', 'assets/maps/Serene Village - Outside.png');

        // load map
        this.load.tilemapTiledJSON('themap', 'map_prj/the_map.json');

        //load spritesheet boss
        this.load.spritesheet('boss', 'assets/spritesheets/bossFinal.png',  { frameWidth: 90, frameHeight: 70});
    }

    // função para criação dos elementos
    create ()
    {

        // criação do mapa (json) e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

        // criação jogador
        this.player = new player(this, 100, 100, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.has_bow = false;    // previne de atirar flechas

        //criação do boss
        this.boss = this.physics.add.sprite(70*16, 20*16, 'boss', 638)

        // criação da colisão com camadas
        this.wallsLayer.setCollisionBetween(0, 140, true);
        this.physics.add.collider(this.player, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.keyE = this.input.keyboard.addKey('E');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.9);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2)

        //boss animation
        this.anims.create({
            key: 'boss',
            frames: this.anims.generateFrameNumbers('boss', {}),
            frameRate: 12,
            repeat: -1,
            repeatDelay: 500,
            yoyo: true
            });

        // criação das zonas
        this.zone_dlg = this.add.zone(100, 100).setSize(70, 100);
        this.physics.world.enable(this.zone_dlg);
        this.physics.add.overlap(this.player, this.zone_dlg);

        this.zone_ques = this.add.zone(800, 230).setSize(70, 50);
        this.physics.world.enable(this.zone_ques);
        this.physics.add.overlap(this.player, this.zone_ques);

        //ZONA P/ PERGUNTA 2
        //--------------------
        this.zone_ques1 = this.add.zone(375, 700).setSize(50, 50);
        this.physics.world.enable(this.zone_ques1);
        this.physics.add.overlap(this.player, this.zone_ques1);
        //--------------------

         //ZONA P/ PERGUNTA 3
        //--------------------
       // this.zone_ques2 = this.add.zone(500, 600).setSize(70, 100);
        //this.physics.world.enable(this.zone_ques2);
        //this.physics.add.overlap(this.player, this.zone_ques2);
        //--------------------

        // criação da mensagem "pressione E para interagir"
        var px = this.cameras.main.width/2;  // pos horizontal
        var ch = this.cameras.main.height
        var py = ch/2 + 0.2*ch/this.cameras.main.zoom;  // pos vertical
        console.log('pp', px, py)
        this.interact_txt = this.add.text(px, py, "Pressione E para interagir", {
            font: "15px Arial",
            fill: "#A0A0A0",
            align: "center", 
            stroke: '#000000',
            strokeThickness: 4,
        });
        this.interact_txt.setScrollFactor(0);  // deixa em posição relativa à camera (e não ao mapa)
        this.interact_txt.setVisible(false);   // deixa invisível

        // criação de lista de textos (diálogs) e do objeto dialog
        this.txtLst_0 = ["Olá Jogador\nProcure até as áreas e responda as perguntas.\nSe todas respostas forem corretas,\nse prepare para luta!\nSerá liberado o grande chefão!", "VAMOOS LÁ!"];
        this.quest_0 =  ["67 + { 50 . [ 70 ÷ ( 27 + 8 ) + 18 ÷ 2 ] + 21 }",
        3, "◯ 194", "◯ 193",  "◯ 195",  "◯ 197"]
        this.quest_1 =  ["[(18 + 3 · 2) ÷ 8 + 5 · 3] ÷ 6",
        2, "◯ 17", "◯ 20",  "◯ 18",  "◯ 19"]
        this.quest_2 = ["{[(8 · 4 + 3) ÷ 7 + (3 + 15 ÷ 5) · 3] · 2 – (19 – 7) ÷ 6} · 2 + 12", 2, "◯ 45", "◯ 38",  "◯ 49",  "◯ 43"]  
        this.quest_3 = ["[2*(– 3/4) - (–2/3)]", 1, "◯ -3/4", "◯ -5/6",  "◯ 3/4",  "◯ 5/6"]  
        this.quest_4 = ["3 x 5 + 8 / 2 – 8", 1, "◯ 12", "◯ 11",  "◯ 10",  "◯ 13"]  
        this.quest_5 = ["(10 * 5) + (4 * 7) - (7/2 * 8) - 40", 2, "◯ 38", "◯ 42", "◯ 46", "◯ 51"]
        this.quest_6 = ["(4 * 2/5) - (7 * 4/3)", 3, "◯ 113/15", "◯ -112/14", "◯ 117/14", "◯ -116/15"]
        this.quest_7 = ["(4/3 - 7/2) + (6/8 + 9/2) - (8/4 / 1/9)", 2, "◯ -10/3", "◯ 13/6", "◯ 10/3", "◯ -13/6"]
        this.quest_8 = [" {(1/3 * 3/4) - 10} + 89/14", 0, "◯ -95/28", "◯ 95/28", "◯ 96/27", "◯ 95/27"]
        this.quest_9 = [" (1 + 2 +3) / (7 + 10 + 9)", 2, "◯ 7/26", "◯ 6/26", "◯ 3/13", "◯ 5/13"]
  
        this.firstDialog = true;
        this.dialogs = new dialogs(this);   

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;

        console.group(this.player.body)
        console.log(this.physics)
    }


    // update é chamada a cada novo quadro
    update ()
    {
        // verifica e trata se jogador em zona ativa
        this.checkActiveZone();

        // verifica se precisa avançar no diálogo
        if (this.dialogs.isActive && !this.spacePressed && this.keySPACE.isDown){
            this.dialogs.nextDlg();
            this.spacePressed = true;   // seta flag para false para esperar a tecla espaço ser levantada
        }
        // se tecla solta, limpa a flag
        if (!this.keySPACE.isDown){
            this.spacePressed = false;
        }
    }

    // trata zona ativa
    checkActiveZone(){
        // se jogador dentro de zona e o diálogo não está ativo
        if (this.player.body.embedded && !this.dialogs.isActive){
            // mostra a mensagem e verifica a tecla pressionada
            this.interact_txt.setVisible(true);
            if (this.keyE.isDown){
                this.startDialogOrQuestion();
            } 
        }
        // se diálogo ativo ou fora da zona, esconde a msg
        else{
            this.interact_txt.setVisible(false);
        }
    }

    startDialogOrQuestion(){
        if (this.physics.overlap(this.player, this.zone_dlg)){
            if (this.firstDialog){
                this.dialogs.updateDlgBox(this.txtLst_0);
                this.firstDialog = false;
            }
            else{
                this.dialogs.updateDlgBox(this.txtLst_1);
            }
        }
        if (this.physics.overlap(this.player, this.zone_ques)){
            var num = Math.floor((Math.random() * 10))
            if(num == 0){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
            }else if(num == 1){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_1, acertou_fcn, errou_fcn);
            }else if(num == 2){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_2, acertou_fcn, errou_fcn);
            }else if(num == 3){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_3, acertou_fcn, errou_fcn);
            }else if(num == 4){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_4, acertou_fcn, errou_fcn);
            }else if(num == 5){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_5, acertou_fcn, errou_fcn);
            }else if(num == 6){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_6, acertou_fcn, errou_fcn);
            }else if(num == 7){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_7, acertou_fcn, errou_fcn);
            }else if(num == 8){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_8, acertou_fcn, errou_fcn);
            }else{
                this.dialogs.scene.dialogs.makeQuestion(this.quest_9, acertou_fcn, errou_fcn);
            }
        }
        if(this.physics.overlap(this.player, this.zone_ques1)){
            var num2 = Math.floor((Math.random() * 10))
            if(num2 == 0){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
            }else if(num2 == 1){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_1, acertou_fcn, errou_fcn);
            }else if(num2 == 2){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_2, acertou_fcn, errou_fcn);
            }else if(num2 == 3){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_3, acertou_fcn, errou_fcn);
            }else if(num2 == 4){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_4, acertou_fcn, errou_fcn);
            }else if(num2 == 5){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_5, acertou_fcn, errou_fcn);
            }else if(num2 == 6){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_6, acertou_fcn, errou_fcn);
            }else if(num2 == 7){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_7, acertou_fcn, errou_fcn);
            }else if(num2 == 8){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_8, acertou_fcn, errou_fcn);
            }else{
                this.dialogs.scene.dialogs.makeQuestion(this.quest_9, acertou_fcn, errou_fcn);
            }
        }
    }
}

function acertou_fcn(ptr){
    console.log("acertou");
    this.dialogs.hideBox();
}

function errou_fcn(ptr){
    console.log("errou")
    this.dialogs.hideBox();
}