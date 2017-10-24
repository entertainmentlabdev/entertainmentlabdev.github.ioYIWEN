// game control -- the entire scene 
var JF = [];
var JF_NUM = 10; // total number of jelly fishes in the scene 
var JFPrefab = 'template="src: #jellyfishTemplate"';  
          


window.onload = function(e){
	//var that = this;
	console.log("Window Loaded start jellyfish");
	SpawnJellyfish(JF_NUM);
	
}

function RandomPoistions(){
	var posx = Math.floor(Math.random() * 6) - 3;
	var posy = Math.floor(Math.random() * 3) + 1;
	var posz = Math.floor(Math.random() * 6) - 3;

	var result = posx + " " + posy + " " + posz;
	return result;

}

function JellyfishMovement(jf){
  	var angleSpeed = .02;
  	var el = jf;
  	var body = el.body;
  	var speed = 2;

  	//console.log("point id" + el.getAttribute('class') );
  	//var body = this.el.components['physics-body'];
  	var pointPos = new CANNON.Vec3().copy(el.getAttribute('position'));
  	var originPos = new CANNON.Vec3().copy(document.querySelector('#player').getAttribute('position'));

  	var upVec = new CANNON.Vec3(0, 1, 0);
  	var desVec = new CANNON.Vec3((pointPos.x - originPos.x), (pointPos.y - originPos.y), (pointPos.z - originPos.z));
  	//desVec.y = 0;
  	var dir = upVec.cross(desVec);
  	dir.normalize();
  	//console.log("check dir: " +dir);
	
} 

// all Util functions 
function SpawnJellyfish(num){
		var sceneEl = document.querySelector('a-scene');
		var fishtank = document.querySelector('#jellytank');
		//console.log("check fish tank: " + fishtank.id);
		var totalNum = num;
		
		for(var i = 0; i < num; i++){
			var curRamPos = RandomPoistions();
			var tempjelly = document.createElement('a-entity');
			SetMultipleAttributes(tempjelly, 
								{'id': 'childJelly',
          					    'class':'jellyfish',
          						'jellyfish-component':'index:0',
          						'dynamic-body' : 'mass:1',
          						'json-model':'src: #jelly_json',
          						'scale' :'.1 .1 .1',
          						'event-set__1':'_event: mousedown; scale: .1 .1 .1',
					            'event-set__2':'_event: mouseup; scale: .12 .12 .12',
					            'event-set__3':'_event: mouseenter; scale: .15 .15 .15',
					            'event-set__4':'_event: mouseleave; scale: .1 .1 .1', 
								'position': curRamPos,});
			
			tempjelly.setAttribute('jellyfish-component', 'index', i);
			fishtank.appendChild(tempjelly);


			//tempElement.setAttribute( 'template','src:#jellyfish');
			// TODO how to make sure that dynamically added content is loaded 
			//var tempjelly = document.createElement('a-entity');
			
			//tempjelly.index = index;
			// SetMultipleAttributes(tempjelly, 
			// 				{'template':'src:#jellyfishTemplate', 
			// 				'position': curRamPos});
			//fishtank.appendChild(tempjelly);
			//tempjelly.setAttribute('jellyfish-component', 'index', i);		
		}
		
}



AFRAME.registerComponent('jellyfish-component', {
  schema: {
  	index: {type:'number'},
  	isCaught:{type: "boolean", default: false}, 
  	isDetected:{type: "boolean", default: false},
  	rotateCenter:{type:'number'},
  	force:{type:'number', default:10},
  	isBodyLoaded:{type:'boolean', default:false},

  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var that = this;
    
    el.addEventListener('mouseenter', function () {
   	 	//console.log("Hi~ Im JellyFish No." + data.index);
   	 	data.isDetected = true;
    });

    el.addEventListener('mouseleave', function () {
   	 	//console.log("Hi~ Im JellyFish No." + data.index);
   	 	data.isDetected = false;
    });

    el.addEventListener('click', function(){

    	//that.rotateAroundCenter(el);
    	if(data.isBodyLoaded){
    		console.log("Hi~ Im JellyFish No." + data.index);
    		JellyfishMovement(el);
    		
    	}
    	
    });

    el.addEventListener('body-loaded', function(that){
    	data.isBodyLoaded = true;

    	console.log("#################### body loaded ##############" + el.body);
    });
 

  },

  tick: function(){
  	var data = this.data;
  	var el = this.el;
  	//console.log("check jelly fish and update");
  	
  	if(data.isBodyLoaded == true && el.body != undefined){
  		this.rotateAroundCenter();
  	}
  	
  },

  rotateAroundCenter:function(){
  	var angleSpeed = .02;
  	var el = this.el;
  	var body = el.body;
  	var speed = 0.2;
  	var data = this.data;
  	if(!data.isDetected && !data.isCaught && body != undefined){
  		var pointPos = new CANNON.Vec3().copy(el.getAttribute('position'));
  		var originPos = new CANNON.Vec3().copy(document.querySelector('#player').getAttribute('position'));

  		var upVec = new CANNON.Vec3(0, 1, 0);
  		var desVec = new CANNON.Vec3((pointPos.x - originPos.x), (pointPos.y - originPos.y), (pointPos.z - originPos.z));
  		//desVec.y = 0;
  		var dir = upVec.cross(desVec);
  		dir.normalize();
  		var impluse = dir.scale(speed);
  		//body.applyImpulse(impluse, pointPos);
  		body.velocity.set(impluse.x, impluse.y, impluse.z);
  	}else{
  		console.log("## no body ");
  		body.velocity.set(0, 0, 0);
  	}


  	//console.log("point id" + el.getAttribute('class') );
  	//var body = this.el.components['physics-body'];
  	
  	//body.velocity.set(dir);
 
 //  	if(!data.isCaught && !data.isDetected){
 //  		//console.log('jelly fish move around');
 //  		angle = angleSpeed * Math.PI / 180.0;
 //  		var finalPos = new CANNON.Vec3(0, 0, 0);
 //  		finalPos.set(
 //  			Math.cos(angle) * (pointPos.x-originPos.x) - Math.sin(angle) * (pointPos.z-originPos.z) + originPos.x,
 //  		 	0,
 //  			Math.sin(angle) * (pointPos.x-originPos.x) + Math.cos(angle) * (pointPos.z-originPos.z) + originPos.z);
  		
 //  		var curPos = new CANNON.Vec3().copy(pointPos);

 //  		var dir = new CANNON.Vec3(finalPos - curPos);
 //  		console.log('finalPos :' + finalPos);
 //  		dir.normalize ();
 //  		//body.velocity.set(dir.x, dir.y, dir.z);
 //  		el.setAttribute('position', finalPos);
	// }else{
	// 	console.log('body is not loaded');
	// }

  },

  turbulance:function(){

  },

  capture:function(){

  },

  detected:function(){

  }


});


// util position struct/class? 
function MyUtil(){
	
}

function SetMultipleAttributes(el, attrs) {
	for(var key in attrs) {
	el.setAttribute(key, attrs[key]);
	}
};



