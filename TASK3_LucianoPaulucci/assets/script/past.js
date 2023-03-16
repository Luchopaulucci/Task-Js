const eventosPast = document.getElementById("eventosPast");
const checkBox = document.getElementById("checkBox");
const input = document.querySelector('input')


let EventosPast = [];


input.addEventListener('input',superFiltro)

checkBox.addEventListener('change',superFiltro)


function superFiltro(){
    let primerFiltro = filtrarPorTexto(EventosPast,input.value)
  let segundoFiltro = filtrarPorCheckBox(primerFiltro)
  mostrarEventosPast(segundoFiltro)
}


filtroFecha(data.events)
mostrarEventosPast(EventosPast);
mostrarCategorias(EventosPast);


function mostrarCategorias(array) {
  let arrayCategoriasAll = array.map(EventosPast => EventosPast.category)
  
  let arrayCategorias = Array.from(arrayCategoriasAll)

  let categoriasPastHTML = ``;
  arrayCategorias.forEach(category => {
    categoriasPastHTML += `
    <div>
        <input type="checkbox" name="category" id="${category}" value="${category}"/>
        <label for="${category}">${category}</label>
    </div>
    `
  })
  checkBox.innerHTML = categoriasPastHTML;
}


 function mostrarEventosPast(array) {
   let cardEventos = ``;
   array.forEach(events => {
     cardEventos += `
     <div class="card" style="width: 18rem;">
       <img src="${events.image}" class="card-img-top" alt="" style="height: 10rem;">
         <div class="card-body">
           <h5 class="card-title">${events.name}</h5>
           <p class="card-text">${events.description}</p>
           <div class="btn-card">
             <p class="card-text flex">Price:$ ${events.price}</p>
             <a href="./details.html?id=${events._id}" class="btn boton">Go somewhere</a>
           </div>
       </div>
     </div>`
    })
  eventosPast.innerHTML = cardEventos;
  
  if(array.length == 0){
    eventosPast.innerHTML = `<h2">No hay coincidencias <br/> VUELVA A INTENTAR CON OTRA BUSQUEDA</h2>`
  }
}


function filtrarPorTexto(array,texto){
  let arrayFiltradoPorTexto = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltradoPorTexto
}


function filtrarPorCheckBox(array){
  let checkBoxs = document.querySelectorAll("input[type='checkbox']")

  let arrayCheck = Array.from(checkBoxs)

  let arrayCheckeados = arrayCheck.filter(check => check.checked)

  
  let arrayCheckeadosValues = arrayCheckeados.map(checkeados => checkeados.value)
  
  let arrayFiltradoPorCheckBox = array.filter(elemento => arrayCheckeadosValues.includes(elemento.category))

  if(arrayCheckeados.length > 0){
    return arrayFiltradoPorCheckBox
  }
  return array
}


function filtroFecha(array) {
  for(let i = 0 ; i < array.length; i++){
    if(array[i].date < data.currentDate){
      EventosPast.push(array[i]);
    }
  }
}