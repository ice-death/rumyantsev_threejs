import * as THREE from 'three';
import appMc from './appMc.js';
import appMc3d from './appMc3d.js';
import {moduleTexture, textureToLoad} from './texture.js';
import {
	createContainer,		
	createSprite,
	createRect,
	RandomInteger}	from './innerApi.js';
import {
	StageDown,		
	StageMove,
	StageUp
}	from './events.js';

const InitBasicObj = () => {

	let i,j, objTemp;
		
	//------------------------------------------------------------------------------------	
	//- 3D WORLD
	
	//- Light
	
	appMc3d["lightAmbient"] =  new THREE.AmbientLight(0xffffff, 0.8);
	appMc3d.main3d.add( appMc3d["lightAmbient"] );
	
	appMc3d["lightDirectional"] = new THREE.DirectionalLight( 0xffffff, 1.0);
	appMc3d["lightDirectional"].position.set( 10, 10, 10 );
	appMc3d["lightDirectional"].castShadow = true;

	appMc3d["lightDirectional"].shadow.camera.left = -20;
	appMc3d["lightDirectional"].shadow.camera.right = 20;
	appMc3d["lightDirectional"].shadow.camera.top = 20;
	appMc3d["lightDirectional"].shadow.camera.bottom = -20;	
	appMc3d["lightDirectional"].shadow.mapSize.width = 2048;
	appMc3d["lightDirectional"].shadow.mapSize.height = 2048;
	appMc3d["lightDirectional"].shadow.radius = 6;
				
	//- MATERIALS

	textureToLoad.forEach((c)=>{		
		if(c.name != "wood" && c.name != "wood_n"){
			moduleTexture.threeTextures[c.name].texture.magFilter = THREE.NearestFilter;
			moduleTexture.threeTextures[c.name].texture.wrapS = THREE.RepeatWrapping;
			moduleTexture.threeTextures[c.name].texture.wrapT = THREE.RepeatWrapping;
			moduleTexture.threeTextures[c.name].texture.flipY = false;
		}
	});
	
	for(let i = 1; i<4; i++){
		moduleTexture.threeTextures["wood"+i].texture.magFilter = THREE.NearestFilter;
		moduleTexture.threeTextures["wood"+i].texture.wrapS = THREE.RepeatWrapping;
		moduleTexture.threeTextures["wood"+i].texture.wrapT = THREE.RepeatWrapping;

		moduleTexture.threeTextures["wood_n"+i].texture.magFilter = THREE.NearestFilter;
		moduleTexture.threeTextures["wood_n"+i].texture.wrapS = THREE.RepeatWrapping;
		moduleTexture.threeTextures["wood_n"+i].texture.wrapT = THREE.RepeatWrapping;
	}
	moduleTexture.threeTextures["ground"].texture.repeat.set(40, 40);
	moduleTexture.threeTextures["ground_n"].texture.repeat.set(40, 40);	
	moduleTexture.threeTextures["wood1"].texture.repeat.set(1, 5);
	moduleTexture.threeTextures["wood_n1"].texture.repeat.set(1, 5);	
	moduleTexture.threeTextures["wood2"].texture.repeat.set(1, 3);	
	moduleTexture.threeTextures["wood_n2"].texture.repeat.set(1, 3);	
	moduleTexture.threeTextures["wood3"].texture.repeat.set(3, 5);	
	moduleTexture.threeTextures["wood_n3"].texture.repeat.set(3, 5);

	//- CUBE environment

	moduleTexture.threeTextures["env_hdr"].texture.flipY = true;
	moduleTexture.threeTextures["env_hdr"].texture.mapping = THREE.EquirectangularReflectionMapping;

	appMc3d.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
		generateMipmaps: true,
   	 	minFilter: THREE.LinearMipmapLinearFilter
   	 });

	console.log(appMc3d.cubeRenderTarget.texture);

	appMc3d.cubeCamera = new THREE.CubeCamera( 1, 1000, appMc3d.cubeRenderTarget );

	appMc3d.envMap = appMc3d.pmremGenerator.fromEquirectangular( moduleTexture.threeTextures["env_hdr"].texture ).texture;
	moduleTexture.threeTextures["env_hdr"].texture.dispose();
	appMc3d.pmremGenerator.dispose();

	appMc3d.cubeRenderTarget.texture

	window.scene3d.background = appMc3d.envMap;
	window.scene3d.environment = appMc3d.envMap;

	//- CUBE environment

	//- OBJS
			
	//- groupLevel
	
	appMc3d["groupLevel"] = new THREE.Group();
	appMc3d.main3d.add( appMc3d["groupLevel"] );		
							
		appMc3d["groupLevelCamera"] = new THREE.Group();
		appMc3d["groupLevel"].add( appMc3d["groupLevelCamera"] );
		
		appMc3d["groupLevelCamera"].add( appMc3d["lightDirectional"] );		
	//------------------------------------------------------------------------------------
	//- 2D WORLD
	
	//- mcMain
	
	appMc.mcMain = new PIXI.Container();
	appMc.mcMain.visible=false;
	window.stage.addChild(appMc.mcMain);
						
		appMc.mcUI = new PIXI.Container();
		appMc.mcMain.addChild(appMc.mcUI);

			//- mcJoystick							
			appMc.mcJoystick = new createContainer({p:appMc.mcUI, visible:true});	
				appMc.mcJoystickBg = new createSprite({p:appMc.mcJoystick, tex:"ui_joystick_bg"});	
				appMc.mcJoystickBar = new createSprite({p:appMc.mcJoystick, tex:"ui_joystick_bar"});		
				appMc.mcJoystickCursor = new createSprite({p:appMc.mcJoystick, tex:"hand", anchor:[0.1,0.1], visible:true});				
				appMc.mcJoystickCursor.a0 = RandomInteger(0,360);
				appMc.mcJoystickCursor.a1 = RandomInteger(0,360);

	
			//- mcBgOverlay
			appMc.mcBgOverlay = new createRect({
				p:appMc.mcUI, 
				x:-1280*.5,
				y:-1280*.5,
				color:0x000000,
				width:1280,
				height:1280,
				fill:1.0,
				alpha:0.0
			});			
	
	appMc.mcBgOverlay.interactive = true;				
	appMc.mcBgOverlay.on('pointerdown', StageDown);
	appMc.mcBgOverlay.on('pointermove', StageMove);
	appMc.mcBgOverlay.on('pointerup', StageUp);
	appMc.mcBgOverlay.on('pointerout', StageUp);
	appMc.mcBgOverlay.on('pointeroutside', StageUp);
	appMc.mcBgOverlay.on('touchendoutside', StageUp);

}

export default InitBasicObj;