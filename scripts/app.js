/*TR - "startGame.html" ilk başlatıldığında ekranda bilgilendirme modalı açılır.*/
/*ENG - When "startGame.html" is initially launched, an information modal is displayed on the screen.*/

/*TR - Ekranda modal dışındaki bir yere tıklandığında bilgilendirme metnine ait modalı kapatır.*/
/*ENG - Clicking anywhere outside the modal closes the modal for the information message.*/
var informationModal = $("#informationModal");
$(window).click(function(event) {
    if (event.target == informationModal[0]) {
      informationModal.hide();
    }
});

/*TR - Bilgilendirme metnindeki buton ile onay verildiğinde local storage da "accepted" keyine "true" değeriyle bir nesne oluşturur. Ve bilgilendirme metnini kapatır. */
/*ENG - It creates an object with the value of "true" for the "accepted" key in local storage when the user clicks the button in the information message, and closes the message.*/
$("#approveBtn").on("click", function () {
	$("#informationModal").css("display", "none");
	$("#smallHoverSquare").mouseover(function () {
		$("#informationModal").css("display", "none");
	});
	playsound("clickAccept");
	localStorage.setItem("accepted", "true");
	setTimeout(function name() {
		window.location.reload();
	}, 2000);
});

/*TR - Eğer accepted key değeri true değilse, sayfa yüklendiğinde veya küçük siyah karenin mouseover etkinliğinde bilgilendirme modalı tekrar açılacaktır.*/
/*ENG - If the value of the accepted key is not true, the informative modal will be opened again on page load and in the mouseover event of the small black square.*/
const isItAccepted = localStorage.getItem("accepted");
if (!isItAccepted) {
	$(window).on("load", function () {
		$("#informationModal").css("display", "flex");
	});
	$("#smallHoverSquare").mouseover(function () {
		$("#informationModal").css("display", "flex");
	});
} else { /*TR - Eğer "accepted" keyinin değeri "true" ise, küçük siyah karenin mouseover etkinliğinde ana sayfa ekranına (oyuna başla ekranı) geçilecektir. Gerekli animasyonlar oynatıcak ve gizlenmiş bir kaç div görünür hale gelecektir.*/
/*ENG - If the value of the "accepted" key is "true", the main screen (start game screen) will be transitioned to in the mouseover event of the small black square. Necessary animations will be played and a few hidden divs will become visible.*/
	$("#smallHoverSquare").toggleClass("blink");
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

/*TR - Yüksek skor verisini döndüren fonksiyon*/
/*ENG - Function that returns the high score data.*/
function getHighScore() {
	return localStorage.getItem("highScore");
}

/*TR - Local storage dan çağırılan nesneleri getirir.*/
/*ENG - Retrieves the objects called from local storage.*/
var soundSetting = localStorage.getItem("sound");
var themeSetting = localStorage.getItem("theme");
var languageSetting = localStorage.getItem("language");

/*TR - Oyun başlarken kullanılacak değişkenler.*/
/*ENG - The variables to be used at the start of the game.*/
var started = false;
var score = 0;

/*TR - "Oyuna başla" yazan kareye basıca texti "oyun başlıyor" olarak değiştirir, ses çalar ve bir progress bar animasyonu gelir. 2400 milisaniye sonra oyunun başladığı kareyi açar "ayarlar" ve "nasıl oynanır?" butonlarının görünümünü ve fonksiyonlarını devre dışı bırakır.*/
/*ENG - It changes the text on the square that says "start game" to "game starting", plays a sound, and displays a progress bar animation. After 2400 milliseconds, it opens the square indicating that the game has started and disables the appearance and functions of the "settings" and "how to play?" buttons.*/
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
		$("#howToPlayBtn").toggleClass("menuButton");
		$("#howToPlayBtn").off("click");
		$("#settingsBtn").toggleClass("menuButton");
		$("#settingsBtn").off("click");
		$("#leftSide").toggleClass("opacity");
		if (!started) {
			startGame();
			started = true;
		}
	}, 2400);
});

/*TR - "Ayarlar" butonuna basınca ayarlar ekranını açar. Oyunun başlamaması "oyunu başlat" yazan karenin click fonksyionlarını devre dışı bırakır.*/
/*ENG - When the "settings" button is clicked, it opens the settings screen. It disables the click functions of the "start game" square that prevents the game from starting.*/
$("#settingsBtn").on("click", function () {
	$("#settingsModal").css("display", "flex");
	$("#bigClickSquare").off("click");
});

/*TR - Ayarları kaydeder ve 800 milisaniye sonra sayfayı yeniler. (Bazı fonksiyonların çalışması için gereklidir.)*/
/*ENG - Saves the settings and refreshes the page after 800 milliseconds. (This is necessary for some functions to work.)*/
$("#saveAndCloseBtn").click(function () {
	$("#settingsModal").css("display", "none");
	$("#bigClickSquare").off("click");
	setTimeout(function () {
		window.location.reload();	
	}, 800);
});

/*TR - Butonuna tıklanınca "nasıl oynanır?" ekranını açar.*/
/*ENG - When clicked, it opens the "how to play?" screen.*/
$("#howToPlayBtn").on("click", function() {
	$("#howToPlayModal").css("display", "flex");
});

/*TR - Tıklanınca "nasıl oynanır?" ekranını kapatır.*/
/*ENG - Closes the "how to play?" screen when clicked.*/
$("#okeyBtn").click(function () {
	$("#howToPlayModal").css("display", "none");
});

/*TR - Rastgele sayı değişkenleri*/
/*ENG - Random number variables*/
var randomNumber1;
var randomNumber2;

/*TR - "Oyunu başlat" yazan kareye tıklanınca çağırılan fonksiyon. Belirtilen idlere ait HTML textlerini yazar. "randomNumber1" oluşturulur ekranın sol kısmına yazılır. "randomNumber2" "??"" ile gizletilip HTML texti yazılır.*/
/*ENG - The function called when the square saying "start game" is clicked. It writes the HTML texts belonging to the specified ids. "randomNumber1" is generated and written on the left side of the screen. "randomNumber2" is hidden with "??"" and the HTML text is written.*/
function startGame() {
	$("#result").html("");
	if (languageSetting === "eng") {
		$("#symbol").html("and");
	} else {
		$("#symbol").html("ve");	
	}
	randomNumber1 = Math.floor((Math.random() * 100));
	$("#randomNumber1").html(randomNumber1);
	randomNumber2 = "??";
	$("#randomNumber2").html(randomNumber2);
}

/*TR - Calculate fonksiyonuna "up" parametresini taşır.*/
/*ENG - Pass the "up" parameter to the Calculate function.*/
$("#upBtn").click(function () {
	calculate("up");
});

/*TR - Calculate fonksiyonuna "down" parametresini taşır.*/
/*ENG - Pass the "down" parameter to the Calculate function.*/
$("#downBtn").click(function () {
	calculate("down");
});

/*TR - Cevap verildiğinde "up" ve "down" butonlarını gizler.*/
/*ENG - It hides the "up" and "down" buttons when the answer is given.*/
function hideButtons() {
	$("#upBtn").toggleClass("hide");
	$("#downBtn").toggleClass("hide");
}

/*TR - "randomNumber2" burada oluşturulur. Up ve down butonlarından gelen parametreler doğrultusunda. "randomNumber1" ve "randomNumber2" yi kıyaslar sonuca göre çağırılması gereken fonksiyonu çağırır.*/
/*ENG - The function generates "randomNumber2" here based on the parameters coming from the up and down buttons. It compares "randomNumber1" and "randomNumber2" and calls the function that needs to be called according to the result.*/
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

/*TR - Tur kazanılınca gerekli sesleri çalar ve animasyonları oluşturur. Skoru 1 arttırır. Skor yüksek skordan daha büyükse yeni yüksek skorun atama işlemlerini gerçekleştirir.*/
/*ENG - It plays the necessary sounds and creates animations when a round is won. It increments the score by 1. If the score is greater than the high score, it performs the assignment of the new high score.*/
function winProgress() {
	playsound("winGame");
	if (languageSetting === "eng") {
		$("#result").html("win");
	} else {
		$("#result").html("kazandın");	
	}
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

/*TR - Oyun kaybedilince gerekli sesleri çalar ve animasyonları oluşturur. "Tekrar" ve "çıkış" butonların gizliliğini kaldırır.*/
/*ENG - When the game is lost, it plays the necessary sounds and creates animations. It unhides the "restart" and "exit" buttons.*/
function loseProgress() {
	playsound("loseGame");
	if (languageSetting === "eng") {
		$("#result").html("lose");
	} else {
		$("#result").html("kaybettin");	
	}
	animateElement("#gameStartedSquare", "redColor");
	$("#restartBtn").toggleClass("hide");
	$("#exitBtn").toggleClass("hide");
}

/*TR - Oyun kaybedilince oyunu tekrar başlatan "startGame" fonksiyonunu çağırır. Skor verileri silinir, up ve down butonları tekrar gözükür. Çıkış ve tekrar butonlarını gizler.*/
/*ENG - When the game is lost, it calls the "startGame" function to restart the game. Score data is cleared, up and down buttons are shown again. Exit and restart buttons are hidden.*/
$("#restartBtn").click(function () {
	setTimeout(function () {
		startGame();
		score = "";
		$("#score").html(score);
		hideButtons();
		$("#restartBtn").toggleClass("hide");
		$("#exitBtn").toggleClass("hide");
	}, 500);
});

/*TR - Oyun kaybedilip "çıkış" butonuna tıklanınca ana menüye dönmeyi sağlar.*/
/*ENG - Enabling the player to return to the main menu by clicking on the "exit" button when the game is lost.*/
$("#exitBtn").click(function () {
	setTimeout(function () {
		window.location.reload();
	}, 500);
});

/*TR - Eşit gelme durumunda gerekli html textlerini yazar. Çok düşük bir ihtimalde olduğu için oyunu kazanmış sayar 10 skor eklenir ve "winProgress" fonksiyonunu çağırır.*/
/*ENG - In case of a tie, it writes the necessary HTML texts. Since it is a very low possibility, it counts as a win for the player and adds 10 points. Then it calls the "winProgress" function.*/
function equalProgress() {
	playsound("equalGame");
	if (languageSetting === "eng") {
		$("#result").html("equal");
	} else {
		$("#result").html("eşit");	
	}
	score += 9;
	setTimeout(function () {
		winProgress();
	}, 700);
}

/*TR - Yüksek skor verisini kaydeden fonksiyondur, ayarlardan yüksek skor verileri silinirken tekrar bu fonksiyon kullanılır. Fonksiyonu tekrar kullanırken ses çalmaması için "operation" parametresi ile yakalanır. Fonksiyon skor verileri silinirken çağırılmadıysa ses çalmaz. */
/*ENG - This function saves the high score data and is also used when deleting high score data from settings. The "operation" parameter is used to prevent playing sound when the function is called during high score data deletion. If the function is called for deleting the high score data, the sound will not play.*/
function setHighScore(scorePoint, operation) {
	if (operation !== "removedStats") {
		playsound("setHighScore");
	}
	localStorage.setItem("highScore", scorePoint);
}

/*TR - HTML elementinin id sine göre ikinci parametre ile gelen animasyonu ekler. Animasyonu görsel olarak oluşturur.*/
/*ENG - The function adds the animation specified in the second parameter to the HTML element with the given id. It creates the animation visually.*/
function animateElement(elementId, className) {
	$(elementId).toggleClass(className);
	setTimeout(function () {
		$(elementId).toggleClass(className);
	}, 500)
}

/*TR - Paramatre ile gelen ses dosyalarını çalan fonksiyon.*/
/*ENG - Function that plays the sound files received as a parameter.*/
function playsound(sound) {
	if (soundSetting != "off") {
		var audio = new Audio("../sources/sounds/" + sound + ".mp3");
		audio.play();
	}
}

/*TR - Sadece konsol kullanılarak parametre ile yakalanan local storage nesnelerini silen test amaçlı kullanılan fonksiyondur.*/
/*ENG - A function used for testing purposes that deletes the local storage objects captured with a parameter using only the console.*/
function removeLocalStorage(prm) {
	const doesItExist = localStorage.getItem(prm)
	if (doesItExist != null) {
		localStorage.removeItem(prm);
		console.log("The local storage object belonging to the '" + prm + "' key has been successfully removed.");
	} else {
		console.log("A local storage object belonging to the '" + prm + "' key could not be found.");
	}
}

/*TR - "Oyun başlıyor" yazısının altında oluşacak progress bar animasyonunu oynatır.*/
/*ENG - Starts the progress bar animation that will appear below the "game starting" text.*/
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

/*TR - Ayarlar sekmesindeki seçeneklere tıklandığında çağırılır. Seçeneklere stil eklemeleri yapar ve seçimleri local storage a kaydeder.*/
/*ENG - When an option in the settings tab is clicked, it is called. It adds style to the options and saves the selections to local storage.*/
$("#soundOn").on("click", function () {
	$(this).addClass("blueColor");
	$("#soundOff").removeClass("blueColor");
	localStorage.setItem("sound", "on");
});

$("#soundOff").on("click", function () {
	$(this).addClass("blueColor");
	$("#soundOn").removeClass("blueColor");
	localStorage.setItem("sound", "off");
});

$("#themeDark").on("click", function () {
	$(this).addClass("blueColor");
	$("#themeLight").removeClass("blueColor");
	localStorage.setItem("theme", "dark");
});

$("#themeLight").on("click", function () {
	$(this).addClass("blueColor");
	$("#themeDark").removeClass("blueColor");
	localStorage.setItem("theme", "light");
});

$("#languageTr").on("click", function () {
	$(this).addClass("blueColor");
	$("#languageEng").removeClass("blueColor");
	localStorage.setItem("language", "tr");
});

$("#languageEng").on("click", function () {
	$(this).addClass("blueColor");
	$("#languageTr").removeClass("blueColor");
	localStorage.setItem("language", "eng");
});

/*TR - Sayfa yüklendiğinde kayıt edilmiş ayarlara ait seçeneklere stil ekler. (Yazılar mavi olur.)*/
/*ENG - Add style to the saved options of the settings when the page is loaded. (The texts become blue.)*/
$(window).on("load", function () {
	if (soundSetting === "on") {
		$("#soundOn").toggleClass("blueColor");
	} else {
		$("#soundOff").toggleClass("blueColor");
	}

	if (themeSetting === "dark") {
		$("#themeDark").toggleClass("blueColor");
	} else {
		$("#themeLight").toggleClass("blueColor");
	}

	if (languageSetting === "tr") {
		$("#languageTr").toggleClass("blueColor");
		$(".tr").toggleClass("hide");
		$(".eng").toggleClass("hide");

	} else {
		$("#languageEng").toggleClass("blueColor");
	}

	if (getHighScore() === "") {
		$("#removeStatRow").toggleClass("hide");
	}

	if (themeSetting === "dark") {
		$(":root").css({
			"--primary":"#161616",
			"--secondary":"#d9d9d9"
		});
	}
});

/*TR - İlk başlatıldığında ses ayarlarına ait seçeneklere stil ekler. (Yazı mavi olur.)*/
/*ENG - Add style to the sound settings options when first launched. (Text appears in blue.)*/
if(soundSetting == undefined) {
	$("#soundOn").toggleClass("blueColor");
	$("#soundOff").toggleClass("blueColor");
}

/*TR - Yüksek skor verilerini sil seçeneğine tıklanınca sil ve iptal et seçeneklerini gösterir.*/
/*ENG - When the delete high scores option is clicked, it shows the delete and cancel options.*/
$("#removeStat").on("click", function () {
	$("#removeApprove").toggleClass("hide");
	$("#removeDecline").toggleClass("hide");
});

/*TR - İptal seçeneğine tıklanınca seçenekleri kapatır.*/
/*ENG - When clicked on the cancel option, it closes the options.*/
$("#removeDecline").on("click", function () {
	$("#removeApprove").toggleClass("hide");
	$("#removeDecline").toggleClass("hide");
});

/*TR - Sil seçeneğine tıklanınca skor verilerini local storage dan siler.*/
/*ENG - When the delete option is clicked, it deletes the score data from local storage.*/
$("#removeApprove").on("click", function () {
	setHighScore("", "removedStat");
	$("#removeApprove").toggleClass("hide");
	$("#removeDecline").toggleClass("hide");
});