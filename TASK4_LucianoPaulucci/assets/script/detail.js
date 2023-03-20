let datos = [];

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    datos = data.events;
    console.log(datos);

    crearEntidad(datos);
  })
  .catch((error) => console.log(error));

const containerCards = document.getElementById("detailHTML");

function crearEntidad(array) {
  const eventosDisponibles = datos.filter(events => events._id);
  console.log("Esto es el eventosDsiponibles " + eventosDisponibles);

  const eventoNuevo = eventosDisponibles.map((events) => {
    let aux = {};
    aux._id = events._id;
    aux.image = events.image;
    aux.name = events.name;
    aux.date = events.date;
    aux.description = events.description;
    aux.category = events.category;
    aux.place = events.place;
    aux.capacity = events.capacity;
    return aux;
  });
  console.log("Esto es el eventoNuevo " + eventoNuevo);

  const queryString = document.location.search;
  console.log("Esto es el queryString " + queryString);

  const params = new URLSearchParams(queryString);
  console.log("Esto es el params " + params);

  const id = params.get("id");
  console.log("Esto es el id " + id);

  const evento = eventoNuevo.find((event) => event._id == id);
  console.log("Esto es el evento " + evento);
  let cardDetails = ``
  cardDetails += `
      <div class="card card-general" >
          <div class="row card-detail">
              <img src="${evento.image}" class="col-5 img-fluid img-card"alt="Imagen de evento">
              <div class="col-6 card-detail card-text">
                  <div class="card-body card-detail">
                  <h5 class="card-title">${evento.name}</h5>
                  <p class="card-text">Description: ${evento.description}</p>
                  <p class="card-text col-4">Category: ${evento.category}</p>
                  <p class="card-text col-6">Place: ${evento.place}</p>
                  <p class="card-text">Capacity: ${evento.capacity}</p>
                  </div>
              </div>
          </div>
      </div>`;

  detailHTML.innerHTML = cardDetails;
}
