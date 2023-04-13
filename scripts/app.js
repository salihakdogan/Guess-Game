//If the user approves the informative text, the modal will be closed. A true-valued object will be created for the accepted key in local storage.
$("#modalButton").on("click", function() {
	$("#modal").css("display","none");
	playsound("clickAccept");
	localStorage.setItem("accepted", "true");
	setTimeout( function name() {
		window.location.reload();
	},2000);
});

//Closes the modal belonging to the information message when clicked anywhere on the screen
$(window).on("click", function() {
	$("#modal").css("display","none");
})

//If the value of the accepted key is not true, the informative modal will be opened again on page load and in the mouseover event of screen1Square.
const isItAccepted = localStorage.getItem("accepted");
if (!isItAccepted) {
	$(window).on("load", function () {
		$("#modal").css("display","block");
	});
	$("#screen1Square").mouseover(function () {
		$("#modal").css("display","block");
	});
} else { //If the accepted key is true, the second screen will be transitioned to in the mouseover event of screen1Square.
	$("#screen1Square").mouseover(function () {
		$(this).animate({
			width: "16rem",
			height: "16rem"
		}, 300);
		setTimeout(function () {
			$("#screen1").addClass("hide");
			$("#screen2").addClass("show");
			$("#screen2 .left").addClass("opacity");
		}, 700);
	});
}

$(".hover").hover(function () {
	$(this).toggleClass("border");
});


var started = false;
var score = 0;

$(".middle").click(function () {
	started = true;
	$("#screen2").removeClass("show")
	$("#screen2").addClass("hide");
	$("#screen3").addClass("show");
	$("#screen3 .right").addClass("opacity");

});

const randomNumber1 = Math.floor((Math.random() * 100));
$("#randomNumber1").html(randomNumber1);


$("#up").click(function() {
	calculate("up");
});

$("#down").click(function() {
	calculate("down");
});

function calculate(params) {
	const randomNumber2 = Math.floor((Math.random() * 100));
	$("#randomNumber2").html(randomNumber2);

	$("#up").addClass("hide");
	$("#down").addClass("hide");

	if (randomNumber1 > randomNumber2) {
		$("#symbol").html(">");
		if (params === "up") {
			$("#result").html("lose");
			startOver();

		} else {
			$("#result").html("win");
			$("#up").toggleClass("hide");
			$("#down").toggleClass("hide");
			score++;
		}

	} else {
		$("#symbol").html("<");
		if (params === "up") {
			$("#result").html("win");	
			$("#up").toggleClass("hide");
			$("#down").toggleClass("hide");
			score++;

		} else {
			$("#result").html("lose");
			startOver();
		}
	}
	$("#score").html(score);
}

function startOver() {
	score = 0;
	started = false;
}











































//A function that takes audio files as parameters and plays
function playsound(sound) {
	var audio = new Audio("/sources/sounds/" + sound + ".mp3");
	audio.play();
}

//A function that deletes a local storage object captured by a parameter for testing purposes
function removeLocalStorage(prm) {
	const doesItExist = localStorage.getItem(prm)
	if (doesItExist != null)
	{
		localStorage.removeItem(prm);
		console.log("The local storage object belonging to the '" + prm + "' key has been successfully deleted.");
	} else {
		console.log("A local storage object belonging to the '" + prm + "' key could not be found.");
	}
}