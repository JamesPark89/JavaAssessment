
const photo = document.getElementById('photo');
const label = document.getElementById('label');
const ingredients = document.getElementById('ingredients');
const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener("click", getData);
//fetching API data function
async function getData(){
  const search = searchText.value;
  var data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=2b0ebcea&app_key=c49b82c2800324bd3157d984848f9aa1`)
  data = await data.json()
  var dishName = data.hits[0].recipe.label
  var dishImg = data.hits[0].recipe.image
  var dishIngredients = data.hits[0].recipe.ingredientLines;
  console.log(data.hits);

  const contents = document.getElementById('contents');

  var title = document.createElement('DIV');
  var x = document.createTextNode(dishName);
  title.appendChild(x); 
  contents.appendChild(title);
  
  var divIng = document.createElement('DIV');
  var y = document.createTextNode(dishIngredients);
  divIng.appendChild(y); 
  contents.appendChild(divIng);
  
  var img = new Image();
  img.src = dishImg;
  contents.appendChild(img);

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