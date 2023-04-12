//When the user clicks on button approve terms and conditions, close the modal
$(".accept").on("click", function() {
	$("#modal").css("display","none");
	playsound("clickAccept");
	localStorage.setItem("accepted", "true");
});

//Closes the modal belonging to the information message when clicked anywhere on the screen
$(window).on("click", function() {
	$("#modal").css("display","none");
})

//Opens the modal when the page is loaded if accepted key is not allowed
const isItAccepted = localStorage.getItem("accepted");
if (!isItAccepted) {
	$(window).on("load", function () {
		$("#modal").css("display","block");
	});
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