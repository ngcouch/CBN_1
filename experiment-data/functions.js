function network_stim(A, B, relation = "causes") {

    return "<p>"+ A + " <b>" + relation + " </b>" + B + "</p>";


}

function feedback_stim(A, B, relation, response, valence) {


    var sentence = "</p>"
    sentence += network_stim(A, B, relation)
    sentence += " is " + valence
    sentence += ".</p>"
    
    if (response) {

	return "<p><big>Correct!</big></p>" + sentence

    }

    else {

	return	"<p><big>Incorrect!</big></p>" + sentence

    }

}
