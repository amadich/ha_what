class boot extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		// Bar 
		 var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            /*
            this.load.image('logo', 'zenvalogo.png');
            for (var i = 0; i < 100; i++) {
                this.load.image('logo'+i, 'zenvalogo.png');
            }
            */
		// load
        this.load.image("koshek","/public/assets/koshek.png");
		this.load.image("dora","/public/assets/Dora-or8.png");
        this.load.image("stone","/public/assets/stone.png");
        this.load.spritesheet("monster0","/public/assets/monster.png",{
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.aseprite('monster2', '/public/assets/monster2.png',"/public/assets/monster2.json");
            this.load.image("bubchat","/public/assets/bubchat.png");
	}

	create() {
        let x = 3200;
        
       let monster2 = this.physics.add.image(100,300,'monster2');
       let bubchat = this.physics.add.image(130,260,"bubchat")
      
      

       let container = this.add.container(0, 0, [ monster2, bubchat ]);
        this.physics.world.enable(container);
        setTimeout(()=>{
        monster2.flipX = true;
        container.body.setGravityX(-100)
        setTimeout(()=>{
            monster2.flipX = false;
            container.body.setGravityX(100)
        },3000)
       },x)
       container.body.setGravityX(100)



       for(i=0;i<=8;i= i + 2) {
        let koshek =  this.physics.add.image((100*i)+200,100,"koshek")
       }

	 player = this.physics.add.image(innerWidth/2,innerHeight/2,"dora");
     player.setBounce(1,1);
     player.setCollideWorldBounds(true);
     stone = this.physics.add.image(300,300,"stone");

     //player.body.setGravityY(10)
     //stone.disableBody(false,true)
     stone.setImmovable()
     this.physics.add.collider(player, stone);
     monster2.setImmovable()
     this.physics.add.collider(player, monster2);

     monster0 = this.physics.add.sprite(0,300,"monster0")
     monster0.setScale(1)
     this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('monster0', { start: 0, end: 1 }),
    frameRate: 5,
    repeat: -1
});
     monster0.anims.play("left",true);

     cursors = this.input.keyboard.createCursorKeys();


          		}

    update() {
        player.setVelocityY(0);
        player.setVelocityX(0);
     if (cursors.right.isDown) {
         player.setVelocityX(160);
         player.rotation += 0.05;
        //player.anims.play('right', true);
        }
        if (cursors.left.isDown) {
         player.setVelocityX(-160);
         player.rotation -= 0.05;
        //player.anims.play('right', true);
        }


     this.input.keyboard.on("keydown-CTRL", e=>{
        player.setGravityY(-300);
     });

     this.input.keyboard.on("keydown-S", e=>{
        player.setCollideWorldBounds(false);
        setTimeout(()=>{
        player.setCollideWorldBounds(true);
     },1000)
     });

    }

}