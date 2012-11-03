/*
	Keyboard-practice: generates random key sequences, learns and trains you 
	so that you can fix your problem keys.

*/
var jQ = jQuery;

// Matrix of KeyBoard Characters
var top_outer_left = ['`', '1', '2', '3', '4', '5', '6'];
var top_outer_right = ['7', '8', '9', '0', '-', '='];

var top_left = ['q', 'w', 'e', 'r', 't'];
var top_right = ['y', 'u', 'i', 'o', 'p']
var home_left = ['a', 's', 'd', 'f', 'g'];
var home_right = ['h', 'j', 'k', 'l', ';'];

var bottom_left = ['z', 'x', 'c', 'v', 'b'];
var bottom_right = ['n', 'm', ',', '.', '/'];


//logging for current run
var run = {
	problemKeys : []
};


function generateSequences(chars, count){
	var range = chars.length;
	var characters = [];
	while (count)
	{
		var rnd = Math.floor((Math.random() *10 ) % range);
		characters.push(chars[rnd]);
		count--;
	}
	return characters;

}

function displayCharacters(chars, boardID) {
	var board = jQ('#' + boardID);
	var characters = [];
	jQ(chars).each(function(index, item) {
			var $character  = jQ("<span>").attr("id", "span-" + index).attr("class", "char").text(item);
			if(!characters.length)
			{
				$character = $character.addClass("cursor");
			}
			characters.push($character);
		});
	board.append(characters);
}


// init ()
function init() {

}

// react to keypress
jQ(document).bind("keypress", function(evt){
		evt.preventDefault();
		var keyCode = evt.keyCode || evt.charCode;
		var charKeyboard =  String.fromCharCode(keyCode);
		var $spanCursor = jQ("#characters .char.cursor");
		var charCursor = $spanCursor.text()
		if (charCursor)
		{
			if (charCursor === charKeyboard)
			{
				$spanCursor.removeClass("cursor");
				if ($spanCursor.next().length)
				{
					$spanCursor.next().addClass("cursor");	
				}
				else
				{
					if (run.problemKeys.length)
					{
						console.log("Problem keys: " + run.problemKeys.join(', '));	
					}
					else
					{
						console.log("voila! No Mistakes :) ")
					}
					console.log("More instrumentation needed");
					
				}
				
			}
			else
			{
				$spanCursor.css({"background-color": "red", "color": "white" });
				if (jQ.inArray(charCursor, run.problemKeys) === -1)
				{
					run.problemKeys.push(charCursor);
				}
				
			}
		}
		else
		{
			// probably throw an error.
		}
});

displayCharacters(generateSequences(top_left.concat(home_left), 20), "characters");