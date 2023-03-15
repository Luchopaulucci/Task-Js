const queryString = location.search  

const params = new URLSearchParams(queryString) 

const id = params.get("id")

const evento = data.find(event => event._id === _id) 

const containerCards = document.getElementById("detailHTML") 


const div = document.queryselector(".container")
div.innerHTML = `
<div class="card" >
    <div class="row">
        <div class="col-5 img-card">
            <img src="${events.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-5  card-text">
            <div class="card-body">
            <h5>${events.name}</h5>
            <p>${events.capacity}</p>
            </div>
        </div>
    </div>
</div>`