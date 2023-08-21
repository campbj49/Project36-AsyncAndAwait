//First promise just to get a fact about 2,my favorite number
async function numberFacts(){
  let baseURL = "http://numbersapi.com";
  let message = await axios.get(`${baseURL}/2`);
    document.getElementById("first-fact").innerText = message.data;

  //Second promise for 2-5 and 16
  message = await axios.get(`${baseURL}/2..5,16`);
  for(fact of Object.entries(message.data)){
    li = document.createElement("li");
    li.innerText = fact;
    document.getElementById("second-facts").appendChild(li);
  }

  //Final promise for list of facts
  for(let i=0; i<4; i++){
    message = await axios.get(`${baseURL}/2`);
    li = document.createElement("li");
    li.innerText = message.data;
    document.getElementById("third-list").appendChild(li);
  }
}
numberFacts();

//drawing a card from the card API
async function makeDecks(){
  baseURL="https://deckofcardsapi.com/api/deck"
  //draw a single fresh card
  let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
  let message = await axios.get(`${baseURL}/${deck.data.deck_id}/draw`);
  console.log("Single card drawn:")
  console.log(`${message.data.cards[0].value} of ${message.data.cards[0].suit}`);
  
  //draw two cards from a fresh deck
  deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
  message = await axios.get(`${baseURL}/${deck.data.deck_id}/draw?count=2`);
  console.log("Two cards drawn:")
  console.log(`${message.data.cards[0].value} of ${message.data.cards[0].suit}`);
  console.log(`${message.data.cards[0].value} of ${message.data.cards[1].suit}`);
  }
  makeDecks();



//handle draw card button function
let deck_id;
async function draw(){
  if (deck_id === undefined){
    deck_id = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
    .then(d=>{
      return d.data.deck_id;
    })
  }

  axios.get(`${baseURL}/${deck_id}/draw`)
    .then(c=>{
      let newImg = document.createElement("img");
      console.log(c.data.cards);
      newImg.src = c.data.cards[0].image;
      newImg.style.transform = `rotate(${(Math.floor(Math.random() * 90))-45}deg)`;
      document.getElementById("face-up").appendChild(newImg);
    })
    .catch(error => {
      console.log(`Error with request:( ${error}`);
    });
}