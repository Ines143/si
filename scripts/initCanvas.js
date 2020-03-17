// Script para cargar canvas en nuestra web

function  cargaCanvas(idCanvas){

  var c = document.getElementById(idCanvas);

  if(c && c.getContext){
    ctx = c.getContext('2d');
    if(ctx){
      return ctx;
    }
  }
  return FALSE;
}
//------------------------------------------------------------------
