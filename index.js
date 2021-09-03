var search = 'beef';

async function getData(){
  var data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=2b0ebcea&app_key=c49b82c2800324bd3157d984848f9aa1`)
  data = await data.json()

  var dishName = data.hits[0].recipe.label
  var dishImg = data.hits[0].recipe.image
  var ingredients = data.hits[0].recipe.ingredientLines;
  console.log(data)
  console.log(dishName)
  console.log(dishImg)
  console.log(ingredients)
}  



getData();