var cronometro;

function detenerse(){
	clearInterval(cronometro);
}


function carga(){
	contador_t = 0;
	t = document.getElementById("time-crono");
  cronometro = setInterval(function(){
															t.innerHTML = contador_t;
  														contador_t++;
	}
	,1000);
}

function gameover_visible(){
	document.getElementById("game_over").style.display = "block";
}

function gameover_invisible(){
	document.getElementById("game_over").style.display = "none";
}

function on() {
  document.getElementById("overlay").style.display = "block";
	parpadeo_on = setInterval(gameover_visible,10);
	parpadeo_off = setInterval(gameover_invisible,2000);
  detenerse();
	borrar();
	escribeScore();
	document.removeEventListener("keydown", pressKey, false);
	document.removeEventListener("keyup", releaseKey, false);

}

function off() {
  document.getElementById("overlay").style.display = "none";
	clearInterval(parpadeo_on);
	clearTimeout(parpadeo_off);
	document.addEventListener("keydown", pressKey, false);
	document.addEventListener("keyup", releaseKey, false);
	init();
}
