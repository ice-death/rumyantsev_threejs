import * as THREE from 'three';
import appMc from './appMc.js';
import appMc3d from './appMc3d.js';
import {
		RandomInteger,
}	from './innerApi.js';
import AppResize from './appresize.js';

let tmDebug = 0;
let toRAD=Math.PI/180;
export const StageEF = () => {
	appObj = window.appObj;
	
	appObj.time_current = performance.now();				
	if(appObj.time_current - appObj.time_old > 25){
		if(!appMc.pauseGlobal){
			appObj.time_old = appObj.time_current;
			// 33 - 30 fps
			// 16 - 60 fps
			
			var i,j,k,d,a;
			let heroPos;
			let objTemp, objTempHero;
			var objTempExtra;
			let _a = 0;
			
			tmDebug ++;
			
			appMc3d["mcDoughnut"].rotation.y += 0.01;

			objTemp = appMc.mcJoystickCursor;
			objTemp.a0 <360?objTemp.a0+=5:objTemp.a0 -=360;
			objTemp.a1 <360?objTemp.a1+=5:objTemp.a1 -=360;
			objTemp.x = 50*Math.cos(objTemp.a0*toRAD);
			objTemp.y = 50*Math.sin(objTemp.a1*toRAD);

			appMc3d['mcArr'].a0 < 360?appMc3d['mcArr'].a0 +=5:appMc3d['mcArr'].a0 -=360;
			appMc3d['mcArr'].position.x = 1+1*Math.cos(appMc3d['mcArr'].a0*toRAD);

			objTempHero = appMc3d.currentCamera;
		
			if(appMc.mouse.dY >=0){
			 	if(appMc.mouse.dX >= 0){
			 		_a = appMc.mouse.dX*0.8;
			 	}
			 	else{
			 		_a = -appMc.mouse.dX*0.8;
			 	}
			}
			else{
			 	if(appMc.mouse.dX >= 0){
			 		_a = -appMc.mouse.dX*0.8;
			 	}
			 	else{
			 		_a = +appMc.mouse.dX*0.8;
			 	}
			}

			appMc3d.currentCamera.angle -= appMc.mouse.dX*1.0;	
			if(appMc3d.currentCamera.angle < -3.78){
				appMc3d.currentCamera.angle = 2.5;
			}
			if(appMc3d.currentCamera.angle > 8.78){
				appMc3d.currentCamera.angle = 2.5;
			}
			
			objTemp = appMc3d["mcWorld3DHelper"];

			objTemp.position.x = 0 - Math.sin(objTempHero.angle)*50;	
			objTemp.position.z = 0 + Math.cos(objTempHero.angle)*50; 
			objTemp.rotation.y = -objTempHero.rotation.y;

			appMc3d["mcWorld3DHelper"].position.y = -2;

			objTempHero.speedV = appMc.mouse.dY - _a;
			objTempHero.speedToA += appMc.mouse.dX*0.4;	
			objTempHero.speedA = objTempHero.speedToA - 0.85*(objTempHero.speedToA - objTempHero.speedA);

			objTempHero.to_z += objTempHero.speedV * objTemp.position.z*0.1;
			objTempHero.to_x += objTempHero.speedV * objTemp.position.x*0.1;			

			objTempHero.position.z = objTempHero.to_z - 0.85*(objTempHero.to_z - objTempHero.position.z);
			objTempHero.position.x = objTempHero.to_x - 0.85*(objTempHero.to_x - objTempHero.position.x);

			while(objTempHero.rotation.y > 2*Math.PI){ objTempHero.rotation.y -= 2*Math.PI; }
			while(objTempHero.rotation.y < 0){ objTempHero.rotation.y += 2*Math.PI; }

			var _axis = appMc3d["mcWorld3DHelper"].position;	

			objTempHero.lookAt(new THREE.Vector3(appMc3d["mcWorld3DHelper"].position.x, -4.5, appMc3d["mcWorld3DHelper"].position.z));
			objTempHero.vLook = [appMc3d["mcWorld3DHelper"].position.x, -4.5, appMc3d["mcWorld3DHelper"].position.z];
			objTempHero.gLook = [appMc3d["mcWorld3DHelper"].position.x, -4.5, appMc3d["mcWorld3DHelper"].position.z];

			objTempHero.vX = objTempHero.gX = objTempHero.position.x;
			objTempHero.vZ = objTempHero.gZ = objTempHero.position.z;				

		}
		
		//- 3D RENDER		

		//- Environment
		appMc3d.cubeCamera.update( window.renderer3d, window.scene3d );
		//- Environment
		
		window.renderer3d.render( window.scene3d, appMc3d.currentCamera );
		
		//- PIXI RENDER
		
		window.renderer.render(window.stage);
				
		//- RESIZE
		let objTemp; 
		objTemp = appObj;
		
		objTemp.tm_resize++;
		if(objTemp.tm_resize == 10){
			objTemp.tm_resize = 0;
			
			if(objTemp.mainWidth != Math.ceil(window.innerWidth) || objTemp.mainHeight != Math.ceil(window.innerHeight)){
				AppResize();
			}
		}
	}
	
	//- RAF
	window.requestAnimationFrame(StageEF);

}

