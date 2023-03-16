const eventosDisponibles = data.events.filter( events => events._id ) 
console.log(eventosDisponibles);

const eventoNuevo = eventosDisponibles.map( events => {  
let aux = {}
    aux._id = events._id
    aux.image = events.image
    aux.name = events.name
    aux.date = events.date
    aux.description = events.description
    aux.category = events.category
    aux.place = events.place
    aux.capacity = events.capacity
    return aux
})
console.log(eventoNuevo);

const queryString = document.location.search  

const params = new URLSearchParams(queryString) 

const id = params.get("id")

const evento = eventoNuevo.find(event => event._id == id) 
console.log(evento);

const containerCards = document.getElementById("detailHTML")

detailHTML.innerHTML = `
<div class="card" >
    <div class="row card-detail">
        <div class="col-5 img-card">
            <img src="${evento.image}" class="img-fluid " alt="Imagen de evento">
        </div>
        <div class="col-6  card-text">
            <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">Description: ${evento.description}</p>
            <p class="card-text col-4">Category: ${evento.category}</p>
            <p class="card-text col-6">Place: ${evento.place}</p>
            <p class="card-text">Capacity: ${evento.capacity}</p>
            </div>
        </div>
    </div>
</div>`


