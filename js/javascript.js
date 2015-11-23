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
            askForSettings(); } // Callback for Modal close
    	}
  	);

    var numParticipants;
    var numLayers;

	function askForSettings() {
        // Set up new page
        $('.main-content').fadeOut("slow", function() {
            setColors("#b71c1c", "#e57373");
            $('#cont-btn').hide();
            $('.pre-content').fadeIn("slow");
        });

        $('#num_participants, #num_layers').change(function() {
            numParticipants = $('#num_participants').val();
            numLayers = $('#num_layers').val();

            if (numParticipants > 2 && numLayers >= 1 && numLayers <= 10) {
                if ((numParticipants % 1 == 0) && (numLayers % 1 == 0)) {
                    $('#cont-btn').delay(200).fadeIn(1000);
                } else {
                    $('#cont-btn').fadeOut(100);
                }
            } else {
                $('#cont-btn').fadeOut(100);
            }
        });

        $('#cont-btn').click(function() {
            gatherQuestions();
        });
	}

    var questions = [];
    var participant = 1;
    function gatherQuestions() {
        $('.pre-content').fadeOut("slow", function() {
            setColors("#9c27b0", "#ce93d8");
            for (i = parseInt(numLayers) + 1; i <= 10; i++) {
                str = ".q" + i.toString();
                $(str).hide();
            }

            for (j = 0; j < parseInt(numLayers); j++) {
                questions.push([]);
            }

            $('.pre-ask-content').fadeIn(2000);
            $('.greeting').mouseover(function() {
                $('.pre-ask-content').fadeOut(500, function() {
                    $('.ask-content').show("slow");
                });
            });
        });

        $('#next-btn').click(function() {
            var empty = false;

            // Check that no layers are empty
            for (k = 1; k <= parseInt(numLayers); k++) {
                str = "#question" + k.toString();
                if ($(str).val() == 0) {
                    empty = true;
                    break;
                }
            }

            // Ask each player to input and store questions
            if (empty == false) {
                for (m = 1; m <= parseInt(numLayers); m++) {
                    str = "#question" + m.toString();
                    question = $(str).val();
                    questions[m - 1].push(question);
                }

                participant++;

                // Questions all entered
                if (participant > numParticipants) {
                    answerQuestions();
                } else {    // Reset fields
                    $('.ask-content').hide();

                    $('.greeting').text("Hello, Participant " + participant.toString() + ".");
                    $('.pre-ask-content').fadeIn(2000);
                    $('.greeting').mouseover(function() {
                        $('.pre-ask-content').fadeOut(500, function() {
                            for (n = 1; n <= parseInt(numLayers); n++) {
                                str = "#question" + n.toString();
                                $(str).val("");
                            }

                            $('.ask-content').show("slow");
                        });
                    });
                }

            }

        });
    }

    function answerQuestions() {
        $('.ask-content').fadeOut("slow", function() {
            setColors("#01579b", "#81d4fa");

            currLayer = 1, currQuestion = 0;
            currQuestions = [];

            $('.preface').text("Layer " + currLayer.toString() + ".");
            $('.pre-game-content').fadeIn(2000, function() {
                currQuestions = shuffleArray(questions[currLayer - 1]);

                $('.pre-game-content').fadeOut(500, function() {
                    $('.question').text(currQuestions[currQuestion]);
                    $('.game-content').fadeIn("slow");

                });
            });


            $('#done-btn').click(function() {
                $('.game-content').fadeOut("slow", function() {
                    currQuestion++;

                    if (currQuestion == parseInt(numParticipants)) {
                        currLayer++;
                        currQuestion = 0;
                    }

                    if (currLayer > parseInt(numLayers)) {
                        endGame();
                    } else {
                        if (currQuestion == 0) {
                            $('.preface').text("Layer " + currLayer.toString() + ".");
                            $('.pre-game-content').fadeIn(2000, function() {
                                currQuestions = shuffleArray(questions[currLayer - 1]);

                                $('.pre-game-content').fadeOut(500, function() {
                                    $('.question').text(currQuestions[currQuestion]);
                                    $('.game-content').fadeIn("slow");

                                });
                            }); 
                        } else {
                            $('.question').text(currQuestions[currQuestion]);
                            $('.game-content').fadeIn("slow");
                        }
                    }
                });             



            });

        });
    }

    function endGame() {
        $('.game-content').fadeOut("slow", function() {
            setColors("#4caf50", "#c8e6c9");

            $('.end-content').fadeIn(2000);

        });
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    function setColors(color1, color2) {
        var str1 = '-webkit-linear-gradient(' + color1 + ', ' + color2 + ') fixed';
        var str2 = '-o-linear-gradient(' + color1 + ', ' + color2 + ') fixed';
        var str3 = '-moz-linear-gradient(' + color1 + ', ' + color2 + ') fixed';
        var str4 = 'linear-gradient(' + color1 + ', ' + color2 + ') fixed';

        console.log(str1);
        $('html').css({
            background: str1,
            background: str2,
            background: str3,
            background: str4
        }); 
    }
});