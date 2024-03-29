//variables
let main =document.querySelector('.default')
let poster =document.querySelector('.poster')
let details = document.querySelector('.details')
let title = document.querySelector('h2')
let description = document.querySelector('.desc')
let time =document.querySelector('.time')
let showTime =document.querySelector('.showtime')
let runTime = document.querySelector('.runtime')
let tickets = document.querySelector('.tickets')
const btn = document.querySelector('button')


//Fetching data from our db.json
function fetchData() {
  fetch(" https://json-data-89ks.onrender.com/films")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)   
        //calling the functions hee o that am able to create & display  output on the markup
        displaydefault(data) 
        buildMovieNames(data)
        
    });
    
}
fetchData();


function buildMovieNames(data) {
  let menu = document.querySelector("ul");
    for (let i = 0; i < data.length; i++) {
        let movie = document.createElement("li");
        movie.className = "movielist"
        const element = data[i].title;        
        movie.innerText = element                
    menu.appendChild(movie)
    movie.addEventListener('click',() =>{
        let atickets = data[i].capacity - data[i].tickets_sold
        poster.innerHTML= `  <img src="${data[i].poster}" alt="">`
        title.innerText= data[i].title
        description.innerText= data[i].description,
        runTime.innerHTML= `Run time<br>${data[i].runtime} min`,
        tickets.innerHTML=`Available tickets<br>(${atickets})`
        showTime.innerHTML =`Show time<br>${data[i].showtime}`;
        btn.innerHTML = 'Buy Ticket';
        main.append(poster);
        details.appendChild(btn,description,title);
        time.append(showTime, runTime, tickets);
        if(atickets>0){
        btn. style.background ='#1F91E8'
        }else if(atickets <=0){
            btn.style.background = 'none';
        }
        btn.addEventListener('click',()=>{
            // console.log('I have been clicked')
        tickets.innerHTML = `Available tickets<br>(${--atickets})`
        btn.classList.add('clicked');
        // Remove the class after a short delay to allow the scaling transition
        setTimeout(function () {
           btn.classList.remove('clicked');
        }, 300);
        //Accounting for tickets that equates  zero and below 
        if(atickets <=0){
        tickets.innerHTML = `Available tickets<br>(${0})`
        }
        if(atickets === 0){
            btn.style.background = 'none';
            btn.innerHTML=`
        <img src="./assets/soldout.png" alt="">
        `
        }
        
        })
    })
    
    }
}

// Fetching the firstMovie in the db.json that acts as a placeholder when the page first loads
function displaydefault(data){
    let atickets = data[0].capacity - data[0].tickets_sold
    poster.innerHTML= `  <img src="${data[0].poster}" alt="">`
    title.innerText= data[0].title;
    description.innerText= data[0].description;
    runTime.innerHTML= `Run time<br>${data[0].runtime} min`;
    tickets.innerHTML=`Available tickets<br>(${atickets})`;
    showTime.innerHTML =`Show time<br>${data[0].showtime}`;
    btn.innerHTML = 'Buy Ticket';
    main.append(poster);
    details.appendChild( btn,description,title);
    time.append(showTime, runTime, tickets);
    btn.addEventListener('click',()=>{
       // console.log('I have been clicked')
        tickets.innerHTML = `Available tickets<br>(${--atickets})`
        btn.classList.add('clicked');

        // Remove the class after a short delay to allow the scaling transition
        setTimeout(function () {
           btn.classList.remove('clicked');
        }, 300);
        //Accounting for tickets that equates  zero and below 
        if(atickets <=0){
        tickets.innerHTML = `Available tickets<br>(${0})`
        }
        if(atickets === 0){
            btn.style.background = 'none';
            btn.innerHTML=`
        <img src="./assets/soldout.png" alt="">
        `
        }
    })
    
}

// loop throught the data to display all the names
// hardcode htms tags for the movie poster
// addeventlistener to display the specific movie poster when clicked 
// Check wheather the tickets are sold out:-
// If so display a sold out text on the button and persist
