// componet to allow the thumbnail to give a room prview to the player 

/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var that = this;

   	this.displaySelectedRoom();

    el.addEventListener(data.on, function () {
      // Fade out image.
      //data.target.emit('set-image-fade');
      // Wait for fade to complete.
      //setTimeout(function () {
        // Set image.
        //data.target.setAttribute('material', 'src', data.src);
        console.log("Room preview : " + data.src);
        that.displaySelectedRoom();
        //data.target.querySelector("#" + data.src).setAttribute('visibile', true);
        // var targetRoom = data.target.querySelector("#room-" + data.src);
        // console.log("Debug :" + targetRoom.getAttribute('visible'));
        // targetRoom.setAttribute('visible', true);
        //data.target.setAttribute('visibile', true);

      
    });
  },

  // DISPLAY THE ROOM PREVIEW 
  displaySelectedRoom:function(){
  	var data = this.data;
  	var target = this.data.target;

  	console.log (" the target :" + target.id);
  	// select all the elements that contains 'room' under the target
  	var rooms = target.querySelectorAll('[id*="room"]');
  	console.log("Total room: " + rooms.length);
  	for(var i=0; i< rooms.length; i++){
  		rooms[i].setAttribute('visible', false);
  	}

  	var targetRoom = target.querySelector("#room-" + data.src);
     //console.log("Debug :" + targetRoom.getAttribute('visible'));
    targetRoom.setAttribute('visible', true);

  },


  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    // var data = this.data;
    // var targetEl = this.data.target;

    // // Only set up once.
    // if (targetEl.dataset.setImageFadeSetup) { return; }
    // targetEl.dataset.setImageFadeSetup = true;

    // // Create animation.
    // targetEl.setAttribute('animation__fade', {
    //   property: 'material.color',
    //   startEvents: 'set-image-fade',
    //   dir: 'alternate',
    //   dur: data.dur,
    //   from: '#FFF',
    //   to: '#000'
    // });
  }
});