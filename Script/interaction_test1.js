AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var lastIndex = -1;
        var COLORS = ['red', 'green', 'blue'];
        this.el.addEventListener('mouseup', function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute('material', 'color', COLORS[lastIndex]);
            console.log('I was clicked at: ', evt.detail.intersection.name);
        });
    }
});

// AFRAME.registerComponent('gaze-light-listener', {
// 	schema:{
// 		visible: {
// 			default:false
// 		}
// 	},

// 	init:function(){
// 		document.querySelector('#light_right_point').setAttribute('light', 'intensity:4');
// 		//this.setAttribute('light', 'intensity', 0);
// 		//
// 		//var spotlight = document.querySelector("#")
// 		this.el.addEventListener('mouseup', function(evt){
// 			console.log("Mouse enter");
// 			this.visible = true;
// 			document.querySelector('#light_right_point').setAttribute('light', 'intensity:4');
// 		});
// 		this.el.addEventListener('mouseleave', function(evt){
// 			this.visible = false;
// 			document.querySelector('#light_right_point').setAttribute('light', 'intensity:0');
// 		});
// 	},

// 	update:function(){
// 		if(this.visible == true){
// 			console.log("## light On ");
// 		}else{
// 			console.log("## light off");
// 		}
		
// 	}

// });



// change the code so that it will play different animations depends on where I look 
var prevData = "clip: idle; crossFadeDuration: .3";
var listenerAdded = false;
var scene = document.querySelector('a-scene');  
var playOnce = false; 
 

        
AFRAME.registerComponent('animation-control', {
  schema: {default: ''},
  init() {
     
    const bot = document.querySelector('#bot'); 
    var jumpBut = document.querySelector('#box');
    // var runBut = document.querySelector('#run');
    // var walkBut = document.querySelector('#walk');
    // var idleBut = document.querySelector('#idle');  
    var scene = document.querySelector('a-scene');
    
   
  
  	this.el.addEventListener('click', () => {
  		 // bot.setAttribute("animation-mixer",this.data); 
  		 // prevData = this.data;
      if (this.el != jumpBut){  
        bot.setAttribute("animation-mixer",this.data); 
        scene.removeEventListener('animation-loop', jumpTrans);
        prevData = this.data;
         
     }
        
     if (this.el == jumpBut) {
        
        bot.setAttribute("animation-mixer",this.data); 
        var jumpTrans = function () {
        	scene.removeEventListener('animation-loop',jumpTrans); 
        	bot.setAttribute("animation-mixer",prevData);console.log("scene ="+scene); console.log("fire")
        };  
        console.log("prev data from jump button = "+prevData); 
       setTimeout (function(){scene.addEventListener('animation-loop',jumpTrans);},500);     
     
     }
        
     
    }); 
      
      
      
  }
});
