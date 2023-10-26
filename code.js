const contenedor = document.querySelector('.contenedor') //crea una variable que se liga a la clase de html
// Definicion de medidas
const altoTablero = 300
const anchoTablero = 570
const altoBloque = 20
const anchoBloque = 100

//Definicion de la posicion usuario
const posicionInicialUsuario = [230,10]
let posicionActualUsuario = posicionInicialUsuario
//Definir posicion de la bola
const posicionInicialBola = [270,40]
let posicionActualBola = posicionInicialBola
//Definicion particularidad de la bola
let xDireccionBola = 2
let yDireccionBola = 2
let diametro = 20
//Definir timer
let timerId
// Definicion de la clase bloque
class Bloque{
	constructor(ejeX, ejeY){
		this.bottomLeft = [ejeX, ejeY]
		this.bottomRight = [ejeX + anchoBloque, ejeY]
		this.topLeft = [ejeX, ejeY + altoBloque]
		this.topRight = [ejeX + anchoBloque, ejeY + altoBloque]
	}
}

// Definicion de todos los bloques
const bloques = [
	new Bloque(10, 250),
	new Bloque(120, 250),
	new Bloque(230, 250),
	new Bloque(340, 250),
	new Bloque(450, 250),
	new Bloque(10, 220),
	new Bloque(120, 220),
	new Bloque(230, 220),
	new Bloque(340, 220),
	new Bloque(450, 220),
	new Bloque(10, 190),
	new Bloque(120, 190),
	new Bloque(230, 190),
	new Bloque(340, 190),
	new Bloque(450, 190)
]
//Funcion añadir bloques
function addBloques(){
	for(let i = 0; i < bloques.length; i++){
		const bloque = document.createElement('div') // con esto creamos una etiqueta div en el html
		bloque.classList.add('bloque') // le estamos poniendo la clase .bloque que hicimos en css al la const bloque que acabamos de crear
		bloque.style.left = bloques[i].bottomLeft[0] + 'px' // definimos su posicion left en base a los que tenemos en cada bloque px son pixeles concatenados
		bloque.style.bottom = bloques[i].bottomLeft[1] + 'px' // definimos su posicion botom en base a los que tenemos en cada bloque px son pixeles concatenados
		contenedor.appendChild(bloque) // añade el elemento bloque a la constante contenedor que esta ligada a la clase contenedor de html
	}
}
addBloques() // llamada de funcion que añade los bloques

//definir usuario
function dibujarUsuario(){
	usuario.style.left = posicionActualUsuario[0] + 'px'
	usuario.style.bottom = posicionActualUsuario[1] + 'px'
}
//Añadir usuario
const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUsuario()

//Mover al usuario por el tablero
function moverUsuario(e){
	switch(e.key){
			case 'ArrowLeft': //si pulsamos hacia la izquierda
				if(posicionActualUsuario[0] > 0){ //Si la posicion actual en 0 (eje x) no es mayor que 0 significa que esta en el limite, por lo que no se movera mas
					posicionActualUsuario[0] -= 10 //restamos 10 a la posicion actual para que se mueva a la izquierda
					dibujarUsuario()			//Se redibuja al usuario
				}
				break
			case 'ArrowRight':// si pulsamos hacia la derecha
				if(posicionActualUsuario[0] < (anchoTablero - anchoBloque)){//Si la posicion actual en 0 (eje x) es menor que todo el ancho del tablero menos el ancho del tamaño de nuestro bloque de usuario
					posicionActualUsuario[0] += 10   //se le suma posicion en el eje x
					dibujarUsuario()                //Se redibuja al usuario
				}	
	}

}

//Añadir un evento listener para el documento
document.addEventListener('keydown', moverUsuario)

//funcion para dibujar la bola
function dibujarBola(){
	bola.style.left = posicionActualBola[0] + 'px'
	bola.style.bottom = posicionActualBola[1] + 'px'
}

//definir la bola
const bola = document.createElement('div')
bola.classList.add('bola') // le añades la clase css
contenedor.appendChild(bola)// para añadirle la constante bola al contenedor que esta ligado al html
dibujarBola()

//funcion para mover la bola
function moverBola(){
	posicionActualBola[0] += xDireccionBola
	posicionActualBola[1] += yDireccionBola
	dibujarBola()
	revisarColisiones()
	gameOver()
}

timerId = setInterval(moverBola,20)//setInterval funcion que ejecuta una funcion cada numero de tiempo definido 20milisegundos


function revisarColisiones(){
	//colisiones con los bloques
	for(let i = 0; i < bloques.length; i++){
		if( (posicionActualBola[0] > bloques[i].bottomLeft[0] && posicionActualBola[0] < bloques[i].bottomRight[0]) &&
			((posicionActualBola[1] + diametro) > bloques[i].bottomLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1])
		){
				const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
				todosLosBloques[i].classList.remove('bloque')
				bloques.splice(i,1)
				cambiarDireccion()
		}
	}



	//colisiones con las paredes
	if(
		posicionActualBola[0] >= (anchoTablero - diametro) ||
		posicionActualBola[1] >= (altoTablero - diametro) ||
		posicionActualBola[0] <= 0 ||
		posicionActualBola[1] <=	0
	 ){
		cambiarDireccion()
	}

	//colision con el usuario
	if((posicionActualBola[0] > posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque) &&
	(posicionActualBola[1] > posicionActualUsuario[1] && posicionActualBola[1] < posicionActualUsuario[1] + altoBloque)
	){
		cambiarDireccion()
	}



}
//funcion para cambiar de direccion la bola
function cambiarDireccion(){
	if(xDireccionBola == 2 && yDireccionBola == 2){
		yDireccionBola = -2
		return
	}
	if(xDireccionBola == 2 && yDireccionBola == -2){
		xDireccionBola = -2
		return
	}
	if(xDireccionBola == -2 && yDireccionBola == -2){
		yDireccionBola = 2
		return
	}
	if(xDireccionBola == -2 && yDireccionBola == 2){
		xDireccionBola = 2
		return
	}

}

function gameOver(){
	if(posicionActualBola[1] <= 0){
		clearInterval(timerId)
		document.removeEventListener('keydown', moverUsuario) // quitar el event listener para ya no poder movernos
	}
}
