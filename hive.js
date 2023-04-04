const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', (event) => {
  // If the user presses "Enter" or "Search"
  if (event.keyCode === 13 || event.key === 'Search') {
    const ingredient = searchBar.value.trim();

    // Fetch the list of cocktails that include the ingredient
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => response.json())
      .then(data => {
        // Clear the cocktail list before displaying the new list
        const cocktailList = document.querySelector('.cocktail-list');
        cocktailList.innerHTML = '';

        // Create a new card for each cocktail in the list
        data.drinks.forEach(cocktail => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <h2>${cocktail.strDrink}</h2>
            <p>${cocktail.strCategory}</p>
          `;
          cocktailList.appendChild(card);

          // Add an event listener to each card that displays the details for that cocktail
          card.addEventListener('click', () => {
            // Fetch the details for the selected cocktail
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`)
              .then(response => response.json())
              .then(data => {
                // Display the details for the selected cocktail
                // (same code as in the previous example)
              })
              .catch(error => console.log(error));
          });
        });
      })
      .catch(error => console.log(error));
  }
});
