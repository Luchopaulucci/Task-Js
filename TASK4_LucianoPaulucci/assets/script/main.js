const eventosIndex = document.getElementById("eventosIndex");
const checkBox = document.getElementById("checkBox");
const input = document.querySelector('input')

let datos = []
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resultado => resultado.json())
    .then(data => {
      datos = data.events
      mostrarEventos(data.events)
      mostrarCategorias(data.events)

      input.addEventListener('input',superFiltro)
      checkBox.addEventListener('change',superFiltro)
      
      return data
    })

function superFiltro(){
  let primerFiltro = filtrarPorTexto(datos,input.value)
  let segundoFiltro = filtrarPorCheckBox(primerFiltro)
  mostrarEventos(segundoFiltro)
}


function mostrarCategorias(array) {
  let arrayCategoriasAll = array.map(events => events.category)
  
  let setCategorias = new Set(arrayCategoriasAll)
  
  let arrayCategorias = Array.from(setCategorias)

  let categoriasHTML = ``;
  arrayCategorias.forEach(category => {
    categoriasHTML += `
    <div>
        <input class="form-check-input" type="checkbox" name="category" id="${category}" value="${category}"/>
        <label class="form-check-label" for="${category}">${category}</label>
    </div>
    `
  })
  checkBox.innerHTML = categoriasHTML;
}


function mostrarEventos(array) {
  let cardEventos = ``;
  array.forEach(events => {
    cardEventos += `
    <div class="card" style="width: 18rem;">
      <img src="${events.image}" class="card-img-top" alt="Evento Imagen" style="height: 10rem;">
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
  eventosIndex.innerHTML = cardEventos;

  if(array.length === 0){
    eventosIndex.innerHTML = `<h2">No hay coincidencias <br/> VUELVA A INTENTAR CON OTRA BUSQUEDA</h2>`
  }
}


function filtrarPorTexto(array,texto){
  let arrayFiltrado = array.filter(events => events.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}


function filtrarPorCheckBox(array){
  let checkBoxs = document.querySelectorAll("input[type='checkbox']")

  let arrayCheck = Array.from(checkBoxs)

  let arrayCheckeados = arrayCheck.filter(check => check.checked)

  let arrayCheckeadosValues = arrayCheckeados.map(checkeados => checkeados.value)
  
  let arrayFiltrado = array.filter(elemento => arrayCheckeadosValues.includes(elemento.category))

  if(arrayCheckeados.length > 0){
    return arrayFiltrado
  }
  return array
}