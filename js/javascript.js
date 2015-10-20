$(document).ready(function(){
	// Fade in 
	$('body').hide().fadeIn(2000);

    // Plugin intialization
    $('.modal-trigger').leanModal({
    	dismissible: false, // Modal can be dismissed by clicking outside of the modal
    	opacity: .7, // Opacity of modal background
    	in_duration: 300, // Transition in duration
    	out_duration: 200, // Transition out duration
    	ready: function() { },
    	complete: function() {
            askForNumParticipants(); } // Callback for Modal close
    	}
  	);

	function askForNumParticipants() {
		alert("Yay! Let's begin!");
	}

});