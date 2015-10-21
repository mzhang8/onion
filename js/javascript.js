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
        // Set up new page
        setColors("#b71c1c", "#e57373");
        $('.main-content').fadeOut("normal", function() {
            $(this).empty();

            //$(this).attr('align', 'left'); 

            d = document.createElement('div');
            $(d).addClass('input-field col s6');
            $(d).append('<input id="num_participants" type="number" style="color: white; font-size: 20px">');
            $(d).append('<label for="num_participants">Number of participants (1 - &infin;)</label>');

            d2 = document.createElement('div');
            $(d2).addClass('input-field col s6');
            $(d2).append('<input id="num_layers" type="number" min="1" max="10" style="color: white; font-size: 20px">');
            $(d2).append('<label for="num_layers">Number of layers (1 - 10)</label>');

            forms = document.createElement('form');
            $(forms).addClass('col s12');

            row = document.createElement('div');
            $(row).addClass('row');

            $(row).append(d);
            $(row).append(d2);
            $(forms).append(row);


            $(this).append("<h2 class='flow-text'>Choose:</h2><br>");
            $(this).append(forms);
            $(this).append("<br><br>");
            $(this).fadeIn("slow", function() {
                $('.main-content').append('<a class="waves-effect waves-light btn-large red lighten-1" id="cont-btn">Continue</a>');
                $('#cont-btn').hide();

                $('#num_participants').change(function() {
                    var numParticipants = $('#num_participants').val();
                    var numLayers = $('#num_layers').val();
                    if (numParticipants >= 1 && numLayers >= 1 && numLayers <= 10) {
                        $('#cont-btn').show("slow");
                    } else {
                        $('#cont-btn').fadeOut(100);
                    }
                });

                $('#num_layers').change(function() {
                    var numParticipants = $('#num_participants').val();
                    var numLayers = $('#num_layers').val();
                    if (numParticipants >= 1 && numLayers >= 1 && numLayers <= 10) {
                        $('#cont-btn').show("slow");
                    } else {
                        $('#cont-btn').fadeOut(100);
                    }
                });

            });
        });


        // Name and participants 

	}

    function askForLayers() {

    }

    function gatherQuestions() {

    }

    function answerQuestions() {

    }

    function endGame() {

    }

    function setColors(color1, color2) {
        var str1 = '-webkit-linear-gradient(' + color1 + ', ' + color2 + ')';
        var str2 = '-o-linear-gradient(' + color1 + ', ' + color2 + ')';
        var str3 = '-moz-linear-gradient(' + color1 + ', ' + color2 + ')';
        var str4 = 'linear-gradient(' + color1 + ', ' + color2 + ')';

        console.log(str1);
        $('html').css({
            background: str1,
            background: str2,
            background: str3,
            background: str4
        }); 
    }

});