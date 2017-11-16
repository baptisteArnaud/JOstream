var dragged = null;

function start_drag(objet,event)
{
  dragged = objet;
}

function drag_onmousemove(event)  
{
  if( dragged ) 
  {

    var x = event.clientX;
    var y = event.clientY;
    document.getElementById("results").id = x;
    document.getElementById("results2").id = y;

    if((0<x<233) && (0<y<730)) {document.getElementById("boite").className= "box2"; }
    else if((1303<x<1536) && (0<y<730)) {document.getElementById("boite").className= "box";}
    else if((0<x<1536) && (0<y<730)) {document.getElementById("boite").className= "box3";}
    else if((0<x<1536) && (0<y<504)) {document.getElementById("boite").className= "box4";}

    dragged.style.position = 'absolute';
    /*dragged.style.left = x -1303+ 'px';
    dragged.style.top = y + 'px';*/
  }
}

function drag_onmouseup(event)  
{
  dragged = null; 
}

function addEvent(obj,event,fct)
{
  if( obj.attachEvent)
     obj.attachEvent('on' + event,fct);
  else
     obj.addEventListener(event,fct,true);
}

addEvent(document,'mousemove',drag_onmousemove);
addEvent(document,'mouseup',drag_onmouseup);
/*
function position(obj,obj2,obj3,obj4,video)
{
	switch (boite) {
  case "haut":
  	obj.style.display = 'none';
  	obj2.style.display = 'none';
  	obj3.style.display = 'none';
  	obj4.style.display = 'block';
    [break;]

  case "bas":
  	obj.style.display = 'none';
  	obj2.style.display = 'none';
  	obj3.style.display = 'block';
  	obj4.style.display = 'none';
    [break;]

  case "droite":
  	obj.style.display = 'none';
  	obj2.style.display = 'block';
  	obj3.style.display = 'none';
  	obj4.style.display = 'none';
    [break;]

  case "gauche":
  	obj.style.display = 'block';
  	obj2.style.display = 'none';
  	obj3.style.display = 'none';
  	obj4.style.display = 'none';
    [break;]

  [default:
  	obj.style.display = 'block';
  	obj2.style.display = 'none';
  	obj3.style.display = 'none';
  	obj4.style.display = 'none';
    [break;]]
}
}*/