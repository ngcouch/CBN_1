function network_stim(A, B, relation = "causes") {

    return "<p>"+ A + " " + relation + " " + B + "</p>";


}

function feedback_stim(A, B, relation, response, valence) {

    if (response) {

	return "<p><big>Correct!</big></p>"

    }

    else {

	return	"<p><big>Incorrect!</big></p>"

    }

}
