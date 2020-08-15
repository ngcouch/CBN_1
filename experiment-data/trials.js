
var introduction = {type: 'html-keyboard-response',
			stimulus: '<p>Welcome to the experiment. These are the instructions. Press space to continue.</p>',
			choices: [32]
		       }


    // Define a pair of probe and feedback trials
    var trial_pair = {
	timeline: [
	    {type: 'html-keyboard-response',
	     stimulus: function(){
		 X = jsPsych.timelineVariable('X', true)
		 Y = jsPsych.timelineVariable('Y', true)
		 relation = jsPsych.timelineVariable('relation', true)
		 return network_stim(X, Y, relation)
	     },
	     data: {label: "learning"},
	     choices: [70, 74],
	     // code the response as to whether it was correct
	     on_finish: function(data) {

		 var response = data.key_press
		 var valence = jsPsych.timelineVariable('valence', true)

		 if (response == 70 && valence==true) {

		     cum_response.push(true)
		     data.correct = true

		 }

		 else if (response == 74 && valence==false) {

		     cum_response.push(true)
		     data.correct = true

		 }

		 else {

		     cum_response.push(false)
		     data.correct = false

		 }
	     }
	    },
	     {type: 'html-keyboard-response',
	      stimulus: function() {
		  var X = jsPsych.timelineVariable('X', true)
		  var Y = jsPsych.timelineVariable('Y', true)
		  var relation = jsPsych.timelineVariable('relation', true)
		  var response = jsPsych.data.get().last(1).values()[0].correct
		  var valence = jsPsych.timelineVariable('valence', true)

		  return feedback_stim(X, Y, relation, response, valence)
	      },
	      data: {label: "feedback"},
	      trial_duration: function() {

		  if(jsPsych.data.get().last(1).values()[0].correct) {

		      return 500

		  }
		  else {

		      return 1500
		      
		  }

	      },
	      response_ends_trial: false,
	      choices: jsPsych.NO_KEYS
	     }
	    ]
    }	  

    // Set them up in a block
    var block = {
	timeline: [trial_pair],
	timeline_variables: network,
	randomize_order: true,

    }

// Loop over the blocks, only advancing to the test phase once criterion is reached
var learning = {
    timeline: [block],
    loop_function: function() {
	
	var last_three = cum_response.slice((cum_response.length-3), cum_response.length)
	var sum = last_three.reduce((a, b) => a+b, false)
	
	if (sum < network.length) {
	    
	    return true
	}
	
	else {
	    return false
	    
	}
    }}

var test_instructions = {
    type: 'html-keyboard-response',
    stimulus: '<p>These are the test instructions.</p>',
    choices: [32]
}   









var test_trial = {
    type: "html-keyboard-response",
    stimulus: function() {
	
	X = jsPsych.timelineVariable('X', true)
	Y = jsPsych.timelineVariable('Y', true)
	relation = jsPsych.timelineVariable('relation', true)
	return network_stim(X, Y, relation)
    },
    data: {label: "test"},
    choices: [70, 74],
    on_finish: function(data) {
	
	var response = data.key_press
	var valence = jsPsych.timelineVariable('valence', true)
	
	if (response == 70 && valence==true) {
	    
	    cum_response.push(true)
	    data.correct = true
	    
	}
	
	else if (response == 74 && valence==false) {
	    
	    cum_response.push(true)
	    data.correct = true
	    
	}
	
	else {
	    
	    cum_response.push(false)
	    data.correct = false
	    
	}
    }
}

var test = {
    timeline: [test_trial],
    timeline_variables: network,
    randomize_order: true
    
}
