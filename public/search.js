
const photo = document.getElementById('photo');
const label = document.getElementById('label');
const ingredients = document.getElementById('ingredients');
const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');
const contents = document.getElementById('contents');
var favsaved = false;

searchButton.addEventListener("click", getData);

//fetching API data function
async function getData(){
  const search = searchText.value;
  const newResult = document.createElement('DIV');
  //reload the contents page
  removeAllChildNodes(contents);

  newResult.className = 'result';
  contents.appendChild(newResult);

  var newText = document.createElement('DIV');
  var x = document.createTextNode(`This is the result of searching by ${search}`);
  newText.appendChild(x);
  newText.className = 'newSearchText fs-3 fw-bold';
  newResult.appendChild(newText);
  
  //fetching the data

  var data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=2b0ebcea&app_key=c49b82c2800324bd3157d984848f9aa1`)
  data = await data.json()
  for(i=0;i < data.hits.length;i++){
  var dishName = data.hits[i].recipe.label
  var dishImg = data.hits[i].recipe.image
  var dishIngredients = data.hits[i].recipe.ingredientLines;
  console.log(data.hits[i]);

  //show the searching result
  var newDiv = document.createElement('DIV');
  newDiv.className = 'card border border-5 border-dark';

  var img = new Image();
  img.src = dishImg;
  img.className = 'card-img-top';
  newDiv.appendChild(img);

  var newSection = document.createElement('DIV');
  newSection.className = 'section';
  newDiv.appendChild(newSection);

  var newH5 = document.createElement('H5');
  var y = document.createTextNode(dishName);
  newH5.appendChild(y); 
  newSection.appendChild(newH5);
  
  var divIng = document.createElement('DIV');
  var z = document.createTextNode(dishIngredients);
  divIng.appendChild(z); 
  newSection.appendChild(divIng);
  newResult.appendChild(newDiv);
  createFavBtn(newDiv);
  }
}

// Execute a function when the user releases a Enter key on the keyboard
searchText.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if(event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchButton.click();
  }
});

//reset the searching result
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

//create favoutie button function
function createFavBtn(newDiv){
  var newBtn = document.createElement('Button');
  var x = document.createTextNode("Add to Favourite");
  newBtn.appendChild(x);
  newBtn.setAttribute("type","button");
  newBtn.className = "btn btn-primary"
  newBtn.id = "favBtn";
  newDiv.appendChild(newBtn);

  newBtn.setAttribute("onclick","saveFav(this)");
  
}
// favBtn.addEventListener('click',()=>{
//   console.log(favBtn.parentElement);
// });
async function saveFav(e){
  favsaved = true;
  var childNodes = e.parentElement.childNodes;
  var imgURL = childNodes[0].src;
  var dishName = childNodes[1].childNodes[0].innerText;
  var dishIng = childNodes[1].childNodes[1].innerText;
  var data = {imgURL, dishName, dishIng}
  console.log(data);
  const options = {
    method: 'POST', 
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  }
  const response = await fetch('http://localhost:3000/api', options )
}

//favorite function
