const tablaStatic = document.getElementById("tablaStatic");
const tablaUpcoming = document.getElementById("tablaUpcoming");
const tablaPast = document.getElementById("tablaPast");

let datos = [];
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resultado) => resultado.json())
  .then((data) => {
    datos = data.events;

    mostrarTablaStatic(datos);
    mostrarTablaUpcoming(datos);
    mostrarTablaPast(datos);
  });

function mostrarTablaStatic(array) {
  let arrayMasAsistencias = array[0];
  let arrayMinAsistencias = array[0];
  let arrayMaxCapacity = array[0];

  for (let i = 0; i < array.length; i++) {
    if (
      (array[i].assistance / array[i].capacity) * 100 >
      ((arrayMasAsistencias.assistance / arrayMasAsistencias.capacity) * 100)
    ) {
      arrayMasAsistencias = array[i];
    }
    if (
      (array[i].assistance / array[i].capacity) * 100 <
      (arrayMinAsistencias.assistance / arrayMinAsistencias.capacity) * 100
    ) {
      arrayMinAsistencias = array[i];
    }
    if (array[i].capacity > arrayMaxCapacity.capacity) {
      arrayMaxCapacity = array[i];
    }
  }

  let porcentajeMas = ((arrayMasAsistencias.assistance / arrayMasAsistencias.capacity) * 100).toFixed(2);
  let porcentajeMin = ((arrayMinAsistencias.assistance / arrayMinAsistencias.capacity) * 100).toFixed(2);
  let capacityMax = arrayMaxCapacity.capacity;

  let tablaEstatica = `
            <tr class="tabla-contenido">
              <td>${arrayMasAsistencias.name} : (${porcentajeMas}%)</td>
              <td>${arrayMinAsistencias.name} : (${porcentajeMin}%)</td>
              <td>${arrayMaxCapacity.name} : ${capacityMax}</td>
            </tr>
    `;
  tablaStatic.innerHTML = tablaEstatica;
}

function mostrarTablaUpcoming(array) {
  const EventosUpcoming = [];
  for (let i = 0; i < array.length; i++) {  //METE SOLO LOS EVENTOS UPCOMING A UN ARRAY
    if (array[i].date > "2023-03-10") {
      EventosUpcoming.push(array[i]);
    }
  }


  const categoriasAll = [];
  for (let i = 0; i < EventosUpcoming.length; i++) {  //METE LAS CATEGORIAS DE LOS EVENTOS UPCOMING
    if (EventosUpcoming[i].category != false) {
      categoriasAll.push(EventosUpcoming[i].category);
    }
  }
  let set = new Set(categoriasAll);
  let categorias = Array.from(set); //SELECCION UN ARRAY CON LAS CATEGORIAS SIN REPETIR 


  let arrayEventos = []
  for (const category of categorias) {  //METE LOS EVENTOS DE CADA CATEGORIA A UN ARRAY EN GRUPOS CON SUS RESPECTIVA CATEGORIA
    let FiltrarEventos = EventosUpcoming.filter(evento => evento.category == category);
    arrayEventos.push(FiltrarEventos)
  }
  console.log(arrayEventos);


  const precio = {}
  arrayEventos.flat().forEach(evento => { //AGARRA EL ARRAY DONDE ESTAN AGRUPADOS POR SU CATEGORIA Y LO QUE HACE ES SUMAR EN CADA CATEGORIA EL PRECIO DEL EVENTO Y DEJARLO SOLO EN UN ARRAY
    if (precio[evento.category]) {
      precio[evento.category] += (evento.price*evento.estimate);
    } else {
      precio[evento.category] = (evento.price*evento.estimate);
    }
  });

  const porcentajeEstimado = {}
  arrayEventos.flat().forEach(evento => { //AGARRA EL ARRAY DONDE ESTAN AGRUPADOS POR SU CATEGORIA Y LO QUE HACE ES SUMAR EN CADA CATEGORIA ESTIMADO DEL EVENTO Y DEJARLO SOLO EN UN ARRAY
    if (porcentajeEstimado[evento.category]) {
      porcentajeEstimado[evento.category] += evento.estimate;
    } else {
      porcentajeEstimado[evento.category] = evento.estimate;
    }
  });

  const porcentajeCapacidad = {}
  arrayEventos.flat().forEach(evento => { //AGARRA EL ARRAY DONDE ESTAN AGRUPADOS POR SU CATEGORIA Y LO QUE HACE ES SUMAR EN CADA CATEGORIA CAPACIDAD DEL EVENTO Y DEJARLO SOLO EN UN ARRAY
    if (porcentajeCapacidad[evento.category]) {
      porcentajeCapacidad[evento.category] += evento.capacity;
    } else {
      porcentajeCapacidad[evento.category] = evento.capacity;
    }
  });

  let porcentajeAttendance = {}
  for (const category of categorias) {  //SACA EL PORCENTAJE TOTAL DE ASISTENCIAS DEL EVENTO
    let estimado = porcentajeEstimado[category]
    let capacidad = porcentajeCapacidad[category]
    let porcentaje = ((estimado*100)/capacidad).toFixed(2)
    porcentajeAttendance[category] = porcentaje  
  }

  let tablaProximos = ``

  for (const category of categorias) {
    tablaProximos += `
        <tr class="tabla-contenido">
          <td>${category}</td>
          <td>${precio[category]}</td>
          <td>${porcentajeAttendance[category]}</td>
        </tr>
    `
    tablaUpcoming.innerHTML = tablaProximos;
  }
}

function mostrarTablaPast(array) {
  const EventosPast = [];
  for (let i = 0; i < array.length; i++) {  //METE SOLO LOS EVENTOS PAST A UN ARRAY
    if (array[i].date < "2023-03-10") {
      EventosPast.push(array[i]);
    }
  }


  const categoriasAll = [];
  for (let i = 0; i < EventosPast.length; i++) {  //METE LAS CATEGORIAS DE LOS EVENTOS PAST
    if (EventosPast[i].category != false) {
      categoriasAll.push(EventosPast[i].category);
    }
  }
  let set = new Set(categoriasAll);
  let categorias = Array.from(set); //SELECCION UN ARRAY CON LAS CATEGORIAS SIN REPETIR 


  let arrayEventos = []
  for (const category of categorias) {  //METE LOS EVENTOS DE CADA CATEGORIA A UN ARRAY EN GRUPOS CON SUS RESPECTIVA CATEGORIA
    let FiltrarEventos = EventosPast.filter(evento => evento.category == category);
    arrayEventos.push(FiltrarEventos)
  }


  const precio = {}
  arrayEventos.flat().forEach(evento => { //AGARRA EL ARRAY DONDE ESTAN AGRUPADOS POR SU CATEGORIA Y LO QUE HACE ES SUMAR EN CADA CATEGORIA EL PRECIO DEL EVENTO Y DEJARLO SOLO EN UN ARRAY
    if (precio[evento.category]) {
      precio[evento.category] += (evento.price*evento.assistance);
    } else {
      precio[evento.category] = (evento.price*evento.assistance);
    }
  });
  console.log(precio);

  const porcentajeEstimado = {}
  arrayEventos.flat().forEach(evento => { //AGARRA EL ARRAY DONDE ESTAN AGRUPADOS POR SU CATEGORIA Y LO QUE HACE ES SUMAR EN CADA CATEGORIA ASISTENCIAS DEL EVENTO Y DEJARLO SOLO EN UN ARRAY
    if (porcentajeEstimado[evento.category]) {
      porcentajeEstimado[evento.category] += evento.assistance;
    } else {
      porcentajeEstimado[evento.category] = evento.assistance;
    }
  });

  const porcentajeCapacidad = {}
  arrayEventos.flat().forEach(evento => { //AGARRA EL ARRAY DONDE ESTAN AGRUPADOS POR SU CATEGORIA Y LO QUE HACE ES SUMAR EN CADA CATEGORIA CAPACIDAD DEL EVENTO Y DEJARLO SOLO EN UN ARRAY
    if (porcentajeCapacidad[evento.category]) {
      porcentajeCapacidad[evento.category] += evento.capacity;
    } else {
      porcentajeCapacidad[evento.category] = evento.capacity;
    }
  });

  let porcentajeAttendance = {}
  for (const category of categorias) {  //SACA EL PORCENTAJE TOTAL DE ASISTENCIAS DEL EVENTO
    let estimado = porcentajeEstimado[category]
    let capacidad = porcentajeCapacidad[category]
    let porcentaje = ((estimado*100)/capacidad).toFixed(2)
    porcentajeAttendance[category] = porcentaje  
  }

  tablaPasados = ``

  for (const category of categorias) {
    tablaPasados += `
        <tr class="tabla-contenido">
          <td>${category}</td>
          <td>${precio[category]}</td>
          <td>${porcentajeAttendance[category]}</td>
        </tr>
    `
    tablaPast.innerHTML = tablaPasados;
    
  }



}
