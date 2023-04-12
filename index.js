const searchForm = document.querySelector('form');
const searchBar = document.querySelector('#search-bar');
const cocktailCards = document.querySelector('.cocktail-cards');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent form from submitting

  const apiKey = `1`;
  const searchQuery = searchBar.value.toLowerCase(); // get the drinks of the search query
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/search.php?s=${searchQuery}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      if (data.drinks) {
        const cocktailDrinks = data.drinks.filter((drink) => drink.strAlcoholic === "Alcoholic"); // filter out drinks that are not classified as alchoholic

        // Clear previous search results
        cocktailCards.innerHTML = '';

        // Create a card for each drink that matches the search query
        cocktailDrinks.forEach((drink) => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <div class="card-details">
              <h3>${drink.strDrink}</h3>
              <div class="main-details">
              <h4>Ingredients:</h4>
              <ol>
                ${Object.entries(drink)
                  .filter(([key, value]) => key.startsWith('strIngredient') && value)
                  .map(([key, value]) => `<li>${value}</li>`)
                  .join('')
                }
              </ol>
              <h4>Instructions:</h4>
              <ul>
              <li>${drink.strInstructions}</li>
              </ul>
              </div>
            </div>
          `;
          cocktailCards.appendChild(card);
        });
         // Scroll to the search results
           window.scrollTo({
           top: document.getElementById('drinks').offsetTop,
              behavior: 'smooth'
           });
      } 
      else {
        // Clear previous search results
        cocktailCards.innerHTML = '';
        // Show error message
        alert('Sorry, we do not have that drink right now. Our team is working on adding new drinks to our database. Please try again later. ');
      }
    });
});
