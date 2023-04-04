  const searchForm = document.querySelector('form');
  const searchBar = document.querySelector('#search-bar');
  const cocktailCards = document.querySelector('.cocktail-cards');

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent form from submitting

    const letter = searchBar.value.charAt(0).toLowerCase(); // get the first letter of the search query

    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await response.json();

      const drinks = data.drinks; // an array of objects representing drinks that match the search query

      // Clear previous search results
      cocktailCards.innerHTML = '';

      // Create a card for each drink that matches the search query
      drinks.forEach((drink) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
          <h3>${drink.strDrink}</h3>
          <p>${drink.strInstructions}</p>
        `;
        cocktailCards.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  });
