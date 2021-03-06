// Promise

let promise = (url_api) => {
   return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', url_api, true);
      xhttp.onreadystatechange = (()=> {
         if(xhttp.readyState === 4){
            (xhttp.status === 200)
               ? resolve(JSON.parse(xhttp.responseText))
               : reject(new Error('Error', url_api))
         }
      });
      xhttp.send()
   })
} 


// llamados

const API = 'https://rickandmortyapi.com/api/character/';

let cardContent = document.querySelector("#contenedorCards");


let figureImage = document.querySelector("#figure-img");

let tpl = document.createDocumentFragment();

let peticion = async (url) => {
   try{
      const data = await promise(url);
      // const nPersonajes = data.info.count;
      const nPersonajes = 50;

      for(let i=1; i<=nPersonajes; i++){
         let personaje = await promise(url+i); 

         // let elem = document.createElement()
         cardContent.innerHTML += ` 
         <div id="clase" class="clase">
         <div class="card-content ">  
         
         <figure id="figure-img" >
            <img src="${personaje.image}" alt="${personaje.name}">
            <figcaption class="name">${personaje.name}</figcaption>
         </figure>
   
         <div class="card-info" id="card-info">
            <div class="alive">
               <p class="cards-info-name">${personaje.name}</p>
               <div class="status">
                  <span class="status-color"></span>
                  <span class="status-color-api">${personaje.status}</span> <span> - ${personaje.species}</span>
               </div>
            </div>
            <div class="ubication-1">
               <p>Última ubicación conocida</p>
               <p>Citadel of Ricks</p>
            </div>
   
            <div class="ubication-1">
               <p>Visto por primera vez en</p>
               <p>The Rickshank Rickdemption</p>
            </div>
   
         </div>
      </div>
      </div>
      `;
      };

      const $status = document.querySelectorAll(".status");
      // console.log($colorStatus[0].textContent)
      console.log($status[0])
      $status.forEach(element => {
         const $statustext = element.querySelector(".status-color-api");
         const $statusColor =element.querySelector(".status-color");

         if($statustext.textContent === "Alive"){
            $statusColor.style.backgroundColor = "#73dd85";
         }

         if($statustext.textContent === "Dead"){
            $statusColor.style.backgroundColor = "#f33d3d";
         }

         if($statustext.textContent === "unknown"){
            $statusColor.style.backgroundColor = "#d1d1d1";
         }

      });

      const $clase = document.querySelectorAll("#clase");

      $clase.forEach(element => {
         element.addEventListener("click", ()=> {
            const $cardContent = element.querySelector(".card-content");
            const $cardInfo = element.querySelector(".card-info")
 
            $cardInfo.classList.toggle("card-info-show");
            element.classList.toggle("grandian-show");
         })
      });
      


   }catch(err){
      console.error(err);
   }
}

peticion(API);




   




