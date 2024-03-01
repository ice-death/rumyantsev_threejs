import * as THREE from 'three';
import appMc from './appMc.js';
import appMc3d from './appMc3d.js';
import {moduleTexture} from './texture.js';
import {	
	RandomInteger
}	from './innerApi.js';
let i, j, objTemp;

//-------------------------------

export const worldCreate=()=>{
	let i, j, objTemp, objTempExtra, material, geometry ;	

	appMc3d.currentCamera.angle = 1.6;
	appMc3d.currentCamera.speedV = 0;
	appMc3d.currentCamera.speedToA = 0;	
	appMc3d.currentCamera.speedA = 0;
	appMc3d.currentCamera.to_z = appMc3d.currentCamera.position.z;
	appMc3d.currentCamera.to_x = appMc3d.currentCamera.position.x;

	appMc3d["mcWorld3D"].speedV = 0;
	appMc3d["mcWorld3D"].speedA = 0;
	appMc3d["mcWorld3D"].speedToA = 0;
	appMc3d["mcWorld3D"].to_z = appMc3d["mcWorld3D"].position.z;
	appMc3d["mcWorld3D"].to_x = appMc3d["mcWorld3D"].position.x;

	appMc3d["mcWorld3D"]["Plane"].material = new THREE.MeshStandardMaterial({
		map:moduleTexture.threeTextures["ground"].texture,
		normalMap:moduleTexture.threeTextures["ground_n"].texture,
	    envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.2,
		metalness: 0.5,
		color:0xffffff		
	});	
	appMc3d["mcWorld3D"]["Plane"].castShadow = true;
	appMc3d["mcWorld3D"]["Plane"].receiveShadow = true;

	geometry = new THREE.BoxGeometry(0.1,0.1,0.1);	
	material = new THREE.MeshPhongMaterial({color:0xffff00});

	geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	appMc3d["mcWorld3DHelper"] = new THREE.Mesh(geometry, material);
	appMc3d["mcWorld3D"].add(appMc3d["mcWorld3DHelper"]);
	appMc3d["mcWorld3DHelper"].visible = false;

	const radius = 2.5,
	tubeRadius = 1.25,
	radialSegments = 32,
	tubeSegments = 64;

	geometry =  new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments);

	material = new THREE.MeshStandardMaterial({
	    envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.2,
		metalness: 1,
		color:0xff6666		
	});			

	appMc3d["mcDoughnut"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoughnut"].position.set(0,5.0,-10);
	appMc3d["mcWorld3D"].add(appMc3d["mcDoughnut"]);
	appMc3d["mcDoughnut"].castShadow = true;
	appMc3d["mcDoughnut"].receiveShadow = true;


	let shape = new THREE.Shape();
	shape.moveTo(0,0);
	shape.lineTo(-0.5,0.5);
	shape.lineTo(-0.25,0.5);
	shape.lineTo(-0.25,1.5);
	shape.lineTo(0.25,1.5);
	shape.lineTo(0.25,0.5);
	shape.lineTo(0.5,0.5);
	shape.lineTo(0,0);

	let  extrudeSettings = {
		steps: 3,
		depth: 0.1,
		bevelEnabled: true,
		bevelThickness: 0.05,
		bevelSize: 0.05,
		bevelOffset: 0,
		bevelSegments: 1		
	};

	geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

	material = new THREE.MeshStandardMaterial({
	    envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.0,
		metalness: 1,
		color:0xffff00		
	});	
	appMc3d['mcArr'] = new THREE.Mesh(geometry, material);
	appMc3d["mcWorld3D"].add(appMc3d['mcArr']);
	appMc3d['mcArr'].rotation.z = 0.5*Math.PI;
	appMc3d['mcArr'].position.set(1,4,8);
	appMc3d['mcArr'].scale.set(4,4,4);
	appMc3d['mcArr'].a0 = RandomInteger(0,360);
	appMc3d['mcArr'].castShadow = true;
	appMc3d['mcArr'].receiveShadow = true;

	doorCreate();
}
export const doorCreate=()=>{
	let material, geometry;
	appMc3d["mcDoor"] = new THREE.Group();
	appMc3d["mcWorld3D"].add(appMc3d["mcDoor"]);
	appMc3d["mcDoor"].rotation.y = 0.5*Math.PI;

	material = new THREE.MeshStandardMaterial({
		map:moduleTexture.threeTextures["wood1"].texture,
		normalMap:moduleTexture.threeTextures["wood_n1"].texture,
	    envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.2,
		metalness: 0.5,
		color:0x333333	
	});	
	geometry = new THREE.BoxGeometry(0.5,8.0,0.5);
	appMc3d["mcDoor"]["leftRamka"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"].add(appMc3d["mcDoor"]["leftRamka"]);
	appMc3d["mcDoor"]["leftRamka"].position.set(-(appMc3d.doorWidth/50-0.25), 4.0, 0.0);
	
	appMc3d["mcDoor"]["rightRamka"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"].add(appMc3d["mcDoor"]["rightRamka"]);
	appMc3d["mcDoor"]["rightRamka"].position.set((appMc3d.doorWidth/50-0.25), 4.0, 0.0);

	material = new THREE.MeshStandardMaterial({
		map:moduleTexture.threeTextures["wood2"].texture,
		normalMap:moduleTexture.threeTextures["wood_n2"].texture,
	    envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.2,
		metalness: 0.5,
		color:0x333333	
	});	

	geometry = new THREE.BoxGeometry(0.5,(appMc3d.doorWidth/25-1),0.5);
	appMc3d["mcDoor"]["topRamka"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"]["topRamka"].rotation.z = 0.5*Math.PI;
	appMc3d["mcDoor"].add(appMc3d["mcDoor"]["topRamka"]);
	appMc3d["mcDoor"]["topRamka"].position.set(0,(appMc3d.doorHeight/25-0.25), 0.0);
	appMc3d["mcDoor"]["topRamka"].scale.y = appMc3d.doorWidth/100;

	appMc3d["mcDoor"]["body"] = new THREE.Group();
	appMc3d["mcDoor"].add(appMc3d["mcDoor"]["body"]);
	appMc3d["mcDoor"]["body"].position.set(-1.5,0,0);

	material = new THREE.MeshStandardMaterial({
		map:moduleTexture.threeTextures["wood3"].texture,
		normalMap:moduleTexture.threeTextures["wood_n3"].texture,
	    envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.2,
		metalness: 0.5,
		color:0x444444			
	});	
	geometry = new THREE.BoxGeometry(3.0,7.5,0.2);
	appMc3d["mcDoor"]["bodyBox"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"]["bodyBox"].position.y = 3.75;
	appMc3d["mcDoor"]["body"].add(appMc3d["mcDoor"]["bodyBox"]);
	appMc3d["mcDoor"]["bodyBox"].position.x = 1.5;

	appMc3d["mcDoor"]["ruchka"] = new THREE.Group();
	appMc3d["mcDoor"]["body"].add(appMc3d["mcDoor"]["ruchka"]);
	appMc3d["mcDoor"]["ruchka"].position.set(1.0,4.0,0.175);
	appMc3d["mcDoor"]["ruchka"].scale.set(-0.12,0.12,0.12);

	geometry = new THREE.BoxGeometry(1,1,1);
	material = new THREE.MeshStandardMaterial({
		envMap: appMc3d.cubeRenderTarget.texture,
		roughness: 0.1,
		metalness: 1.0,
		color:0xaaaaaa	
	});	
	appMc3d["mcDoor"]["ruchka1"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"]["ruchka"].add(appMc3d["mcDoor"]["ruchka1"]);

	appMc3d["mcDoor"]["ruchka2"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"]["ruchka"].add(appMc3d["mcDoor"]["ruchka2"]);
	appMc3d["mcDoor"]["ruchka2"].scale.set(6.0,1,0.3);
	appMc3d["mcDoor"]["ruchka2"].position.set(2.5,0,0.5);

	appMc3d["mcDoor"]["ruchka3"] = new THREE.Mesh(geometry, material);
	appMc3d["mcDoor"]["ruchka"].add(appMc3d["mcDoor"]["ruchka3"]);
	appMc3d["mcDoor"]["ruchka3"].scale.set(2,2,0.1);
	appMc3d["mcDoor"]["ruchka3"].position.z = -0.45;

	appMc3d["mcDoor"]["ruchkaFront"] = appMc3d["mcDoor"]["ruchka"].clone();
	appMc3d["mcDoor"]["body"].add(appMc3d["mcDoor"]["ruchkaFront"]);
	appMc3d["mcDoor"]["ruchkaFront"].scale.z *= -1;
	appMc3d["mcDoor"]["ruchkaFront"].position.z = -0.175;

	appMc3d["mcDoor"]["ruchka"].position.x = (appMc3d.doorWidth/25-1.3);
	appMc3d["mcDoor"]["ruchkaFront"].position.x = (appMc3d.doorWidth/25-1.3);

	appMc3d["mcDoor"].children.forEach((c)=>{
		if(c.children.length>0){
			c.children.forEach((p)=>{
				if(p.children.length>0){
					p.children.forEach((k)=>{
						k.castShadow = true;
						k.receiveShadow = true;
					});
				}
				p.castShadow = true;
				p.receiveShadow = true;
			});
		}
		c.castShadow = true;
		c.receiveShadow = true;
	});

	appMc3d["mcDoor"].open = function(){
		TweenLite.killTweensOf(appMc3d["mcDoor"]["body"].rotation);
		gsap.to(appMc3d["mcDoor"]["body"].rotation, 0.5, {delay:0.0, overwrite:"none", y:0.5*Math.PI, ease:Sine.easeInOut});
	}
	appMc3d["mcDoor"].close = function(){
		TweenLite.killTweensOf(appMc3d["mcDoor"]["body"].rotation);
		gsap.to(appMc3d["mcDoor"]["body"].rotation, 0.5, {delay:0.0, overwrite:"none", y:0.0*Math.PI, ease:Sine.easeInOut});
	}
}
export const guiCreate=()=>{

	const guiDiv = document.createElement("div");
	guiDiv.id = "gui";
	const currentDiv = document.getElementById("main");
	document.body.insertBefore(guiDiv, currentDiv.nextSibling);

	let doorWidth = document.createElement("input");
	doorWidth.type = "range";
	doorWidth.name = "doorWidth";
	doorWidth.min = 40;
	doorWidth.max = 250;
	doorWidth.step = 1;
	doorWidth.value = 100;
	doorWidth.className = "door";
	doorWidth.addClassName = "gui_el";

	let doorWidthInfo = document.createElement("input");
	doorWidthInfo.type = "number";
	doorWidthInfo.name = "doorWidthInfo";
	doorWidthInfo.minlength = "1";
 	doorWidthInfo.maxlength = "4";
  	doorWidthInfo.size = "4";
  	doorWidthInfo.className = "door_info";
  	doorWidthInfo.value = appMc3d.doorWidth;

  	let doorWidthLabel = document.createElement("span");
  	doorWidthLabel.innerHTML = "Ширина двери (см):";
  	doorWidthLabel.name = "doorWidthLabel";
  	doorWidthLabel.className = "door_label";



	guiDiv.appendChild(doorWidthLabel);
	guiDiv.appendChild(doorWidthInfo);		
	guiDiv.appendChild(doorWidth);

	let doorHeight = document.createElement("input");
	doorHeight.type = "range";
	doorHeight.name = "doorHeight";
	doorHeight.min = 40;
	doorHeight.max = 350;
	doorHeight.step = 1;
	doorHeight.value = 200;
	doorHeight.className = "door";
	doorHeight.addClassName = "gui_el";

	let doorHeightInfo = document.createElement("input");
	doorHeightInfo.type = "number";
	doorHeightInfo.name = "doorHeightInfo";
	doorHeightInfo.minlength = "1";
 	doorHeightInfo.maxlength = "4";
  	doorHeightInfo.size = "4";
  	doorHeightInfo.className = "door_info";
  	doorHeightInfo.value = appMc3d.doorHeight;

  	let doorHeightLabel = document.createElement("span");
  	doorHeightLabel.innerHTML = "Высота двери (см):";
 	doorHeightLabel.name = "doorHeightLabel";
  	doorHeightLabel.className = "door_label";

  	guiDiv.appendChild(doorHeightLabel);
	guiDiv.appendChild(doorHeightInfo);
	guiDiv.appendChild(doorHeight);

	let doorOpen = document.createElement("input");
	doorOpen.type = "checkbox";
	doorOpen.checked = false;
	doorOpen.name = "doorOpen";	
  	doorOpen.className = "door_open";

  	let doorOpenLabel = document.createElement("span");
  	doorOpenLabel.innerHTML = "Дверь открыта";
 	doorOpenLabel.name = "doorOpenLabel";
  	doorOpenLabel.className = "door_label";

  	guiDiv.appendChild(doorOpenLabel);
  	guiDiv.appendChild(doorOpen);

  	doorHeightInfo.onchange = function(){
  		if(this.value <40)this.value = 40;
  		if(this.value >350)this.value = 350;
		appMc3d.doorHeight = this.value;

	}
	doorHeightInfo.addEventListener("input", doorHeightInfoChange);

	doorHeight.onchange = function(){	
		appMc3d.doorHeight = this.value;
	}
	doorHeight.addEventListener("input", doorHeightChange);

	function doorHeightChange(){	
		doorHeightInfo.value = this.value;
		doorChange(appMc3d.doorWidth, this.value);
	}
	function doorHeightInfoChange(){	
		if(this.value <40){
			doorChange(appMc3d.doorWidth, 40);
			doorHeight.value = 40;
		}
		else if(this.value >350){
			doorChange(appMc3d.doorWidth, 350);
			doorHeight.value = 350;
		}
		else{
			doorHeight.value = this.value;
			doorChange(appMc3d.doorWidth, this.value);
		}
	}

  	doorWidthInfo.onchange = function(){
  		if(this.value <40)this.value = 40;
  		if(this.value >250)this.value = 250;
		appMc3d.doorWidth = this.value;

	}
	doorWidthInfo.addEventListener("input", doorWidthInfoChange);

	doorWidth.onchange = function(){	
		appMc3d.doorWidth = this.value;
	}
	doorWidth.addEventListener("input", doorWidthChange);

	function doorWidthChange(){	
		doorWidthInfo.value = this.value;
		doorChange(this.value, appMc3d.doorHeight);
	}
	
	function doorWidthInfoChange(){	
		if(this.value <40){
			doorChange(40, appMc3d.doorHeight);
			doorWidth.value = 40;
		}
		else if(this.value >250){
			doorChange(250, appMc3d.doorHeight);
			doorWidth.value = 250;
		}
		else{
			doorWidth.value = this.value;
			doorChange(this.value, appMc3d.doorHeight);
		}
	}

  	doorOpen.onclick = function(){
  		if(doorOpen.checked){
  			appMc3d["mcDoor"].open();
  		}
  		else{
  			appMc3d["mcDoor"].close();
  		}
  	}
}
export const doorChange=(_w, _h)=>{

	appMc3d["mcDoor"]["leftRamka"].geometry = new THREE.BoxGeometry(0.5,(_h/25),0.5);
	appMc3d["mcDoor"]["leftRamka"].position.set(-(_w/50-0.25), (_h/25)*0.5, 0.0);

	appMc3d["mcDoor"]["rightRamka"].position.set((_w/50-0.25), (_h/25)*0.5, 0.0);
	appMc3d["mcDoor"]["rightRamka"].geometry = new THREE.BoxGeometry(0.5,(_h/25),0.5);
	
	appMc3d["mcDoor"]["topRamka"].geometry = new THREE.BoxGeometry(0.5,(_w/25-1),0.5);
	appMc3d["mcDoor"]["topRamka"].position.set(0,(_h/25-0.25), 0.0);
	
	appMc3d["mcDoor"]["bodyBox"].geometry = new THREE.BoxGeometry((_w/25-1.0),(_h/25-0.5),0.2);
	appMc3d["mcDoor"]["bodyBox"].position.x = (_w/25-1.0)*0.5;
	appMc3d["mcDoor"]["bodyBox"].position.y = (_h/25-0.5)*0.5;
	
	appMc3d["mcDoor"]["body"].position.x = -(_w/25-1.0)*0.5;
	
	appMc3d["mcDoor"]["ruchka"].position.x = (_w/25-1.3);
	appMc3d["mcDoor"]["ruchka"].position.y = (_h/25-0.5)*0.5;
	
	appMc3d["mcDoor"]["ruchkaFront"].position.x = (_w/25-1.3);
	appMc3d["mcDoor"]["ruchkaFront"].position.y = (_h/25-0.5)*0.5;

	moduleTexture.threeTextures["wood1"].texture.repeat.set(1, Math.floor(_h/40));
	moduleTexture.threeTextures["wood_n1"].texture.repeat.set(1, Math.floor(_h/40));

	moduleTexture.threeTextures["wood3"].texture.repeat.set(Math.floor(_w/33),Math.floor(_h/40));
	moduleTexture.threeTextures["wood_n3"].texture.repeat.set(Math.floor(_w/33),Math.floor(_h/40));

	moduleTexture.threeTextures["wood2"].texture.repeat.set(1, Math.floor(_w/33));
	moduleTexture.threeTextures["wood_n2"].texture.repeat.set(1, Math.floor(_w/33));

}
