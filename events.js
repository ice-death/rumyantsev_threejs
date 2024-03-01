import * as THREE from 'three';
import appMc from './appMc.js';
import appMc3d from './appMc3d.js';
import {DistancePointToPoint} from './innerApi.js';

export const StageDown = (e) =>{			
	appMc.numGlobalClick++;
		
	if(appMc.pauseGlobal){
		appMc.pauseGlobal = false;
		try{ gsap.globalTimeline.resume() }catch(e){}
	}
	
	if(appMc.stateGame == 0){
		appMc.stateGame = 1;		
	
	}
	appMc.mouse.isDown = true;
	if(appMc.stateGame==1){		

		appMc.mouse.x = appMc.mouse.downX = e.data.getLocalPosition(appMc.mcUI).x;
		appMc.mouse.y = appMc.mouse.downY = e.data.getLocalPosition(appMc.mcUI).y;

		if(appMc.mcJoystickCursor.visible)appMc.mcJoystickCursor.visible = false;

		appMc.mcJoystick.visible = true;
		appMc.mcJoystick.alpha = 1;
		appMc.mcJoystick.x = appMc.mouse.x;
		appMc.mcJoystick.y = appMc.mouse.y;
		appMc.mcJoystickBar.x = 0;
		appMc.mcJoystickBar.y = 0;
		
		appMc3d.currentCamera.speedV = 0.01;		
		appMc.mouse.dY = 0;
		appMc.mouse.dX = 0;		
		
	}				
}
export const StageMove = (e) =>{
	if(appMc.stateGame==1 && appMc.mouse.isDown){	
		appMc.mouse.x = e.data.getLocalPosition(appMc.mcUI).x;
		appMc.mouse.y = e.data.getLocalPosition(appMc.mcUI).y;
		
		appMc.mouse.a = Math.atan2((appMc.mouse.y - appMc.mouse.downY), (appMc.mouse.x - appMc.mouse.downX));
		appMc.mouse.d = DistancePointToPoint(appMc.mouse.x, appMc.mouse.y, appMc.mouse.downX, appMc.mouse.downY);
		
		if(appMc.mouse.d > 100){ appMc.mouse.d = 100; }
		
		appMc.mcJoystickBar.x = appMc.mouse.d * Math.cos(appMc.mouse.a);
		appMc.mcJoystickBar.y = appMc.mouse.d * Math.sin(appMc.mouse.a);
		
		appMc.mouse.dX = DistancePointToPoint(appMc.mcJoystickBar.x, 0, 0, 0)/2000;		

		appMc.mouse.dY = DistancePointToPoint(appMc.mouse.x, appMc.mouse.y, appMc.mouse.downX, appMc.mouse.downY)/2000;
		if(appMc.mouse.dY > appMc3d.lvlSpeed)appMc.mouse.dY = appMc3d.lvlSpeed;
		if(appMc.mouse.y >appMc.mouse.downY)appMc.mouse.dY *= -1;		
		
		if(appMc.mouse.dX > appMc3d.lvlSpeed)appMc.mouse.dX = appMc3d.lvlSpeed;	
		if(appMc.mouse.x >appMc.mouse.downX)appMc.mouse.dX *= -1;
	}
}			
export const StageUp = (e) =>{
	
	appMc.mouse.isDown = false;
	appMc.mcJoystick.visible = false;
	appMc3d.currentCamera.speedV = 0.01;		
	appMc.mouse.dY = 0;
	appMc.mouse.dX = 0;
	
}

