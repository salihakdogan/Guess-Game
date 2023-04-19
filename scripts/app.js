//If the user approves the informative text, the modal will be closed. A true-valued object will be created for the accepted key in local storage.
$("#modalButton").on("click", function () {
	$("#modal").css("display", "none");
	$("#smallHoverSquare").mouseover(function () {
		$("#modal").css("display", "none");
	});
	playsound("clickAccept");
	localStorage.setItem("accepted", "true");
	setTimeout(function name() {
		window.location.reload();
	}, 2000);
});

//Closes the modal belonging to the information message when clicked anywhere on the screen
$(window).on("click", function () {
	$("#modal").css("display", "none");
})

//If the value of the accepted key is not true, the informative modal will be opened again on page load and in the mouseover event of screen1Square.
const isItAccepted = localStorage.getItem("accepted");
if (!isItAccepted) {
	$(window).on("load", function () {
		$("#modal").css("display", "block");
	});
	$("#smallHoverSquare").mouseover(function () {
		$("#modal").css("display", "block");
	});
} else { //If the accepted key is true, the second screen will be transitioned to in the mouseover event of screen1Square.
	$("#smallHoverSquare").one("mouseover", function () {
		$(this).animate({
			width: "16rem",
			height: "16rem"
		}, 300);
		setTimeout(function () {
			$("#smallHoverSquare").toggleClass("hide");
			$("#bigClickSquare").toggleClass("hide");
			$("#leftSide").toggleClass("hide");
			$("#rightSide").toggleClass("hide");
			$("#leftSide").toggleClass("opacity");
			$("#highScore").html(getHighScore());
		}, 500);
	});
}

/* game starting here */
var started = false;
var score = 0;

function setHighScore(scorePoint) {
	playsound("setHighScore");
	localStorage.setItem("highScore", scorePoint);
}

function getHighScore() {
	return localStorage.getItem("highScore");
}

$("#bigClickSquare").one("click", function () {
	$("#startGameText").toggleClass("hide");
	$("#gameStartingText").toggleClass("hide");
	$(".progressBar").toggleClass("hide");
	setProgressBar(1.2);
	playsound("startingGame");
	setTimeout(function () {
		$("#bigClickSquare").toggleClass("hide");
		$("#gameStartedSquare").toggleClass("hide");
		$("#rightSide").toggleClass("opacity");
		$("#leftSide").toggleClass("opacity");
		if (!started) {
			startGame();
			started = true;
		}
	}, 2400);
});

var randomNumber1;
var randomNumber2;

function startGame() {
	$("#result").html("");
	$("#symbol").html("and");
	randomNumber1 = Math.floor((Math.random() * 100));
	$("#randomNumber1").html(randomNumber1);
	randomNumber2 = "??";
	$("#randomNumber2").html(randomNumber2);
}

$("#up").click(function () {
	calculate("up");
});

$("#down").click(function () {
	calculate("down");
});

$("#restart").click(function () {
	setTimeout(function () {
		startGame();
		score = "";
		$("#score").html(score);
		hideButtons();
		$("#restart").toggleClass("hide");
	}, 500);
});

function hideButtons() {
	$("#up").toggleClass("hide");
	$("#down").toggleClass("hide");
}

function winProgress() {
	playsound("winGame");
	$("#result").html("win");
	animateElement("#gameStartedSquare", "greenColor");
	score++;
	setTimeout(function () {
		startGame();
		$("#score").html(score);
		animateElement("#scoreContainer", "greenColor");
		hideButtons();
		if (score > getHighScore()) {
			setHighScore(score);
			$("#highScore").html(getHighScore());
			animateElement("#highScoreContainer", "blueColor");
		}
	}, 2000);
}

function loseProgress() {
	playsound("loseGame");
	$("#result").html("lose");
	animateElement("#gameStartedSquare", "redColor");
	$("#restart").toggleClass("hide");
}

function equalProgress() {
	$("#result").html("equal");
	score += 9;
	setTimeout(function () {
		winProgress();
	}, 700);
}

function calculate(selectedButton) {
	randomNumber2 = Math.floor((Math.random() * 100));
	$("#randomNumber2").html(randomNumber2);
	hideButtons();
	if (randomNumber1 > randomNumber2) {
		$("#symbol").html(">");
		if (selectedButton === "up") {
			loseProgress();
		} else {
			winProgress();
		}
	} else if (randomNumber1 < randomNumber2) {
		$("#symbol").html("<");
		if (selectedButton === "up") {
			winProgress();
		} else {
			loseProgress();
		}
	} else {
		$("#symbol").html("=");
		equalProgress();
	}
}

function animateElement(elementId, className) {
	$(elementId).toggleClass(className);
	setTimeout(function () {
		$(elementId).toggleClass(className);
	}, 500)
}

//A function that takes audio files as parameters and plays
function playsound(sound) {
	var audio = new Audio("/sources/sounds/" + sound + ".mp3");
	audio.play();
}

//A function that deletes a local storage object captured by a parameter for testing purposes
function removeLocalStorage(prm) {
	const doesItExist = localStorage.getItem(prm)
	if (doesItExist != null) {
		localStorage.removeItem(prm);
		console.log("The local storage object belonging to the '" + prm + "' key has been successfully deleted.");
	} else {
		console.log("A local storage object belonging to the '" + prm + "' key could not be found.");
	}
}

function setProgressBar(duration) {
	var progressBarPercent = $(".progressBarPercent");
	var width = 0;
	var increment = 100 / (duration * 1000 / 10);
	var intervalId = setInterval(function () {
		width += increment;
		progressBarPercent.width(width + "%");

		if (width >= 100) {
			clearInterval(intervalId);
		}
	}, 10);
}