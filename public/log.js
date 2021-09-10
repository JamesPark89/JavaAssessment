const favorite = document.getElementById('favorite');
const favPage = document.getElementById('favPage');
getFav();
async function getFav(){
  console.log("yeah")
  const response = await fetch('http://localhost:3000/api')
  const data = await response.json()
  console.log(data)
   for (item of data){
    var newDiv = document.createElement('DIV');
    newDiv.className = 'card border border-5 border-dark';
  
    const image = document.createElement('img');
    image.src = item.imgURL;
    newDiv.append(image);
   
    var newSection = document.createElement('DIV');
    newSection.className = 'section';
    newDiv.appendChild(newSection);
  
    const favdish = document.createElement('h5');
    favdish.textContent = item.dishName;
    newSection.append(favdish);
    
    const ingredients = document.createElement('p');
    ingredients.textContent = item.dishIng;
    newSection.append(ingredients);

    favPage.append(newDiv);
  }
}