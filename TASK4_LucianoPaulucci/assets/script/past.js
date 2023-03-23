const eventosPast = document.getElementById("eventosPast");
const checkBox = document.getElementById("checkBox");
const input = document.querySelector('input')


let EventosPasados = []
let datos = []
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resultado => resultado.json())
    .then(data => {
      datos = data

      filtroFecha(data.events)
      mostrarEventosPast(EventosPasados)
      mostrarCategorias(EventosPasados)

      input.addEventListener('input',superFiltro)
      checkBox.addEventListener('change',superFiltro)
      
      return data
    })


function superFiltro(){
    let primerFiltro = filtrarPorTexto(EventosPasados,input.value)
  let segundoFiltro = filtrarPorCheckBox(primerFiltro)
  mostrarEventosPast(segundoFiltro)
}


function mostrarCategorias(array) {
  let arrayCategoriasAll = array.map(EventosPast => EventosPast.category)

  let arrayFiltrado = new Set(arrayCategoriasAll)
  
  let arrayCategorias = Array.from(arrayFiltrado)

  let categoriasPastHTML = ``;
  arrayCategorias.forEach(category => {
    categoriasPastHTML += `
    <div>
        <input class="form-check-input" type="checkbox" name="category" id="${category}" value="${category}"/>
        <label class="form-check-label" for="${category}">${category}</label>
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
    eventosPast.innerHTML = `<h2"> not found <br/> TRY AGAIN </h2>`
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
    if(array[i].date < datos.currentDate){
      EventosPasados.push(array[i]);
    }
  }
}