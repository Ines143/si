

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var video_canvas = document.getElementById("video_canvas");
  var elId;
  var teclado={};
  var disparos = [];
  var disparar = false;

  //---------------- Objeto Bala ----------------
  function Bala(x, y) {
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 2;
  }


  //---------------- Objeto Raqueta ----------------
  var raqueta = {width: 15, height: 20, rightButton: false, leftButton: false, x:((c.width-15)/2), y:((c.height-23)), dx:1 };  // Modificar paddX si modificamos raqueta.width

  //---------------- Objeto UFO ----------------
  var ufo_big1 = {width: 25, height: 12, x: 50, y: 10, dx:0.7};
  var ufo_big2 = {width: 25, height: 12, x: 250, y: 5, dx:0.7};
  var ufo_big3 = {width: 25, height: 12, x: 100, y: 20, dx:0.7};

  var ufo_med1 = {width: 25, height: 16, x: 40, y: 12, dx:0.7};
  var ufo_med2 = {width: 25, height: 16, x: 270, y: 17, dx:0.7};
  var ufo_med3 = {width: 25, height: 16, x: 130, y: 21, dx:0.7};

  //-----------

// //---------------- Variables Ladrillos ----------------
//   var brickRowCount = 3;
//   var brickColumnCount = 8;
//   var brickWidth = 20;
//   var brickHeight = 7;
//   var brickPadding = 10;  // Padding es para que no se toquen entre ladrillos
//   var brickOffsetTop = 7;  // Offsets son para que no se toquen con los bordes
//   var brickOffsetLeft = 30;
//
//       //---------------- Matriz ladrillos ----------------
//         var bricks = []; // Contenedor donde iran los ladrillos.
//
//         for(cont=0; cont<brickColumnCount; cont++) {  // Se recorre el array multidimensional y se va rellenando con los brickS
//           bricks[cont] = [];
//             for(r=0; r<brickRowCount; r++) {
//               bricks[cont][r] = { x: 0, y: 0, status:1}; // El status nos dirá, si es 1, que hay que dibujarlo,
//               bricks.fillStyle= "red";                                            // y si es 0, habrá sido tocado  (y habrá que ponerlo a 0) y no se dibuja
//             }
//           }


  //---------------- Variable del Score ----------------
    var score =0;

//---------------- Eventos teclado ----------------
//  document.addEventListener("keydown", teclado, false);
//  document.addEventListener("keyup", releaseKey, false);

function agregareventoteclado(){

  agregarEvento(document,"keydown",function(e){
    teclado[e.keyCode]=true;
  });
  agregarEvento(document,"keyup",function(e){
    teclado[e.keyCode]=false;
  });

  function agregarEvento(elemento,nombreEvento,funcion){
    if(elemento.addEventListener){
      elemento.addEventListener(nombreEvento,funcion,false);
    }
    else if(elemento.attachEvent){
      elemento.attachEvent(nombreEvento,funcion);
    }
  }

}


//-----------------------------------------------
//-----------------------------------------------

//---------------- FUNCIONES ------------------------------------------------------------------------------------------------------


//-----------------------------------------------
//---------------- OVNI -------------------------

var sources = {
  ufo1 : '../imagenes/ufo1.png',
  ufo2 : '../imagenes/ufo2.png',
  raq  : '../imagenes/nave.png',
};


function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
}


function animate_raqueta(){

  if(teclado[37]){
    raqueta.x -= 6;
    if(raqueta.x < 0){
      raqueta.x = 0;
    }
  }
  if(teclado[39]){
    var limite = c.width-raqueta.width;
    raqueta.x += 6;
    if(raqueta.x > limite){
      raqueta.x = limite;
    }
  }
  if(teclado[32]){
    disparar = true;
  }
}

function animate_ufo(){

          loadImages(sources, function(images){

            ctx.clearRect(0, 0, c.width, c.height);
            ctx.beginPath();
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(images.raq, raqueta.x, raqueta.y, raqueta.width, raqueta.height);

            ctx.drawImage(images.ufo1, ufo_big1.x, ufo_big1.y, ufo_big1.width, ufo_big1.height);
            ctx.drawImage(images.ufo1, ufo_big2.x, ufo_big2.y, ufo_big2.width, ufo_big2.height);
            ctx.drawImage(images.ufo1, ufo_big3.x, ufo_big3.y, ufo_big3.width, ufo_big3.height);

            ctx.drawImage(images.ufo2, ufo_med1.x, ufo_med1.y, ufo_med1.width, ufo_med1.height);
            ctx.drawImage(images.ufo2, ufo_med2.x, ufo_med2.y, ufo_med2.width, ufo_med2.height);
            ctx.drawImage(images.ufo2, ufo_med3.x, ufo_med3.y, ufo_med3.width, ufo_med3.height);
          });

          if(disparar == true){
            // ctx.fillStyle="white";
            // ctx.fillRect(raqueta.x + 20, raqueta.y - 10, 10 , 30);
            disparos.push(new Bala( (this.raqueta.x + 7.5), (this.raqueta.y - 1) ) );
            disparar = false;
          }

          for(var i=0; i<disparos.length; i++){

            ctx.fillStyle="white";
            ctx.fillRect(disparos[i].x, disparos[i].y, disparos[i].width , disparos[i].height);
          }

          ufo_big1.x += ufo_big1.dx;
          ufo_big2.x += ufo_big2.dx;
          ufo_big3.x += ufo_big3.dx;

          ufo_med1.x += ufo_med1.dx;
          ufo_med2.x += ufo_med2.dx;
          ufo_med3.x += ufo_med3.dx;

          elId = requestAnimationFrame(animate_ufo);
}

function rebotes_ufo(){

  if(ufo_big1.x + ufo_big1.dx > c.width-ufo_big1.width || ufo_big1.x + ufo_big1.dx < 1) {  // Rebote paredes
    ufo_big1.dx = -ufo_big1.dx;
  }else if(ufo_big2.x + ufo_big2.dx > c.width-ufo_big2.width || ufo_big2.x + ufo_big2.dx < 1) {  // Rebote paredes
    ufo_big2.dx = -ufo_big2.dx;
  }else if(ufo_big3.x + ufo_big3.dx > c.width-ufo_big3.width || ufo_big3.x + ufo_big3.dx < 1) {  // Rebote paredes
    ufo_big3.dx = -ufo_big3.dx;

  }else if(ufo_med1.x + ufo_med1.dx > c.width-ufo_med1.width || ufo_med1.x + ufo_med1.dx < 1) {  // Rebote paredes
    ufo_med1.dx = -ufo_med1.dx;
  }else if(ufo_med2.x + ufo_med2.dx > c.width-ufo_med2.width || ufo_med2.x + ufo_med2.dx < 1) {  // Rebote paredes
    ufo_med2.dx = -ufo_med2.dx;
  }else if(ufo_med3.x + ufo_med3.dx > c.width-ufo_med3.width || ufo_med3.x + ufo_med3.dx < 1) {  // Rebote paredes
    ufo_med3.dx = -ufo_med3.dx;
  }
}

//---------------------------------------------------
//---------------- DISPAROS -------------------------

function moverDisparos(){

  for(var i in disparos){
    var disparo = disparos[i];
    disparo.y -= 2;

    if(disparo.y < 0) {
        disparos.splice(i, 1);
    }
  }
}


  // function dibujarDisparos(){
  //   ctx.save();
  //   ctx.fillStyle="white";
  //   for(var i in disparos){
  //     var disparo = disparos[i];
  //     ctx.fillRect(disparo.x, disparo.y, disparo.width , disparo.height);
  //   }
  //   ctx.restore();
  // }



//---------------- BALL -------------------------
  //
  // function ball(){
  //
  //   ctx.beginPath();
  //   ctx.arc(ufo.x, bola.y, bola.radio, 0, Math.PI*2);
  //   ctx.fillStyle = '#FFFFFF';
  //   ctx.fill();
  //   ctx.closePath();
  // }

  function animateBall(){



     rebotes_ufo();
     animate_raqueta();

     moverDisparos();

     agregareventoteclado();

    // ball();
    // padd();
    // collisionDetection();
    // drawBricks();
    // marcador_pantalla();
    // rebotes();
    // animate_ufo();
    //escribeScore();
    //coloreafondo();

  }

//-----------------------------------------------
//
//
// function rebotes() {
//
//       if(bola.x + bola.dx > c.width-bola.radio || bola.x + bola.dx < bola.radio) {  // Rebote paredes
//         bola.dx = -bola.dx;
//       }
//
//       if(bola.y + bola.dy < bola.radio) {                           // Rebote techo-padd
//           bola.dy = -bola.dy;
//       }else if( bola.y + bola.dy > c.height - (bola.radio) ) {
//
//         if( ( bola.x > raqueta.paddX - bola.radio ) && ( bola.x < raqueta.paddX + raqueta.width) ) {
//             bola.dy = -bola.dy;
//         }else {
//             on();
//             clearInterval(interval);
//         }
//        }
//
//       bola.x += bola.dx;
//       bola.y += bola.dy;
//
// }

//-----------------------------------------------
//----------------- PADDLE ----------------------
//
// function padd() {
//
//     ctx.beginPath();
//     ctx.rect(raqueta.paddX, c.height-raqueta.height, raqueta.width, raqueta.height);
//     ctx.fillStyle = "#ffffff";
//     ctx.fill();
//
//     if(raqueta.rightButton && raqueta.paddX < c.width-raqueta.width) {
//         raqueta.paddX += 7;
//     }
//     else if(raqueta.leftButton && raqueta.paddX > 0) {
//         raqueta.paddX -= 7;
//     }
//
// }


//-----------------------------------------------
//----------------- LADRILLOS ----------------------
//
// // PARA DIBUJAR LOS LADRILLOS DE DICHA MATRIZ.
// // Se recorre la matriz y se va dibujando uno a uno los ladrillos que contiene.
// function drawBricks() {
//     for(cont=0; cont<brickColumnCount; cont++) {
//         for(r=0; r<brickRowCount; r++) {
//           if(bricks[cont][r].status==1){
//             var brickX = (cont*(brickWidth+brickPadding))+brickOffsetLeft;
//             var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
//             bricks[cont][r].x = brickX;
//             bricks[cont][r].y = brickY;
//             ctx.beginPath();
//             ctx.rect(brickX, brickY, brickWidth, brickHeight);
//             ctx.fill();
//             ctx.closePath();
//           }
//         }
//     }
// }
//
//
// //-----------------------------------------------
// //--------- DETECCION DE COLISIONES -------------
//
// function collisionDetection() {
//     for(cont=0; cont<brickColumnCount; cont++) {
//         for(r=0; r<brickRowCount; r++) {
//             var b = bricks[cont][r]; //guardamos los ladrillos en una variable mas comoda.
//             // Condiciones para que la bola toque el ladrillo:
//             //Detectamos si el centro de la bola está entre el inicio del ladrillo  y el centro+ancho del ladrillo.
//             //es decir, toca al brick en el eje X
//             //Análogamente en la Y
//             if(b.status==1){
//             if(bola.x > b.x && bola.x < b.x+brickWidth && bola.y > b.y && bola.y < b.y+brickHeight) {
//                   bola.dy = -bola.dy;
//                   b.status=0;
//                   score++;
//
//                 // Una vez el score sea igual al numero de ladrillos, es que se han roto todos, entonces has ganado.
//                 if(score == brickRowCount*brickColumnCount) {
//                         on();
//                   }
//               }
//         }
//     }
//   }
// }

//-----------------------------------------------
//---------------- MARCADOR ---------------------


function marcador_pantalla(){
	s = document.getElementById("marcador");
	s.innerHTML = score;
}


function escribeScore(){ // con esto pretendia manejar el valor de score para usarlo en la pagina html y mostrarlo.
  puntos = document.getElementById("score-pantalla");
  puntos.innerHTML = score;
}

//-----------------------------------------------
//---------------- MOVEMENT ---------------------





//-----------------------------------------------
//---------------- INIT ---------------------
function init(){

  elId = requestAnimationFrame(animate_ufo);

  var interval = setInterval(animateBall,10);
  var d = document.getElementById("canvascanvas");
  var d_nested = document.getElementById("press_start");
  var throwawayNode = d.removeChild(d_nested);

}
//-----------------------------------------------
//---------------- INIT ---------------------
function jugar(){
  var grd = ctx.createRadialGradient(75,50,5,90,60,100);
  grd.addColorStop(0,"transparent");
  grd.addColorStop(1,"black");

// Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,1000,500);

}
//-----------------------------------------------
function borrar(){
  ctx.beginPath();
  ctx.rect(0, 0, c.width, c.height);
  ctx.fillStyle = "#000000";
  ctx.fill();
}


//------------------

//-----------------------------------------------
