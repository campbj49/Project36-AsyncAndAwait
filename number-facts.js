let baseURL = "http://numbersapi.com";

//First promise just to get a fact about 2,my favorite number
axios.get(`${baseURL}/2`)
  .then(n =>{
    document.getElementById("first-fact").innerText = n.data;
  })
  .catch(error => {
    console.log(`Error with request:( ${error}`);
  });

//Second promise for 2-5 and 16
axios.get(`${baseURL}/2..5,16`)
  .then(n=>{
    for(fact of Object.entries(n.data)){
      li = document.createElement("li");
      li.innerText = fact;
      document.getElementById("second-facts").appendChild(li);
    }
  })
  .catch(error => {
    console.log(`Error with request:( ${error}`);
  });

//Final promise for list of facts
for(let i=0; i<4; i++){
  axios.get(`${baseURL}/2`)
  .then(n=>{
    li = document.createElement("li");
    li.innerText = n.data;
    document.getElementById("third-list").appendChild(li);
  })
  .catch(error => {
    console.log(`Error with request:( ${error}`);
  });
}

//drawing a card from the card API
baseURL="https://deckofcardsapi.com/api/deck"

//draw a single fresh card
axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
  .then(d=>{
    return axios.get(`${baseURL}/${d.data.deck_id}/draw`);
  })
  .then(c=>{
    console.log("Single card drawn:")
    console.log(`${c.data.cards[0].value} of ${c.data.cards[0].suit}`);
  })
  .catch(error => {
    console.log(`Error with request:( ${error}`);
  });

//draw two cards from a fresh deck
axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
  .then(d=>{
    return axios.get(`${baseURL}/${d.data.deck_id}/draw?count=2`);
  })
  .then(c=>{
    console.log("Two cards drawn:");
    for(card of c.data.cards)
      console.log(`${card.value} of ${card.suit}`);
  })
  .catch(error => {
    console.log(`Error with request:( ${error}`);
  });


//handle draw card button function
let deck_id;

function handleCard(c){
    let newImg = document.createElement("img");
    console.log(c.data.cards);
    newImg.src = c.data.cards[0].image;
    newImg.style.transform = `rotate(${(Math.floor(Math.random() * 90))-45}deg)`;
    document.getElementById("face-up").appendChild(newImg);
}

function draw(){
  if (deck_id === undefined){
    axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
    .then(d=>{
      deck_id= d.data.deck_id;
      return axios.get(`${baseURL}/${deck_id}/draw`)
      .then(c=>{
        handleCard(c);
      })
      .catch(error => {
        console.log(`Error with request:( ${error}`);
      });
    })
  }

  else axios.get(`${baseURL}/${deck_id}/draw`)
    .then(c=>{
      handleCard(c);
    })
    .catch(error => {
      console.log(`Error with request:( ${error}`);
    });
}
