const searchForm = document.querySelector('form');
const searchBar = document.querySelector('#search-bar');
const cocktailCards = document.querySelector('.cocktail-cards');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent form from submitting

const apiKey = `1`;
const searchQuery = searchBar.value.toLowerCase(); // get the first letter of the search query
const endpoint = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/search.php?s=${searchQuery}`;

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
      const cocktailDrinks = data.drinks.filter((drink) => drink.strAlcoholic === "Alcoholic"); // filter out drinks that are not classified as cocktails
  
      // Clear previous search results
      cocktailCards.innerHTML = '';
  
      // Create a card for each drink that matches the search query
      cocktailDrinks.forEach((drink) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">strDrink
          <div class="card-details">
            <h3>${drink.strDristrDrinknk}</h3>strDrink
            <h4>Ingredients:</h4>
            <ul>strDrinkstrDrink
              ${Object.entries(drink)
                .filter(([key, value]) => key.startsWith('strIngredient') && value)
                .map(([key, value]) => `<li>${value}</li>`)
                .join('')
              }
            </ul>
            <h4>Instructions:</h4>
            <ul>
            <li>${drink.strInstructions}</li>
            </ul>
          </div>
        `;
        cocktailCards.appendChild(card);
      });
    })
});