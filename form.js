//Select the form and input fields
const form = document.getElementById('foodForm');
const foodNameInput = document.getElementById('foodName');
const descriptionInput = document.getElementById('description');
const imageURLInput = document.getElementById('imageURL');
const rankInput = document.getElementById('rank');

//Function to add a new food card
function addFoodCard(foodName, description, imageURL, rank) {
    const foodCardsContainer = document.getElementById('foodCards');
    
    //Create food card elements
    const foodCard = document.createElement('div');
    foodCard.classList.add('food-card');

    //Create and append image element
    const image = document.createElement('img');
    image.src = imageURL;
    image.alt = foodName;
    foodCard.appendChild(image);

    //Create and append paragraph elements for food details
    const nameParagraph = document.createElement('p');
    nameParagraph.innerHTML = `<strong class="food-name">${foodName}</strong>`;
    foodCard.appendChild(nameParagraph);

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = `Description: ${description}`;
    foodCard.appendChild(descriptionParagraph);

    const rankParagraph = document.createElement('p');
    rankParagraph.textContent = `Rank: ${rank}`;
    rankParagraph.classList.add('rank'); //Add class for easier retrieval of ranks
    foodCard.appendChild(rankParagraph);

    //Create and append delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        foodCard.remove();
    });
    foodCard.appendChild(deleteButton);

    //Append food card to container
    foodCardsContainer.appendChild(foodCard);
}

//Function to validate form inputs
function validateForm() {
    const foodName = foodNameInput.value.trim();
    const description = descriptionInput.value.trim();
    const imageURL = imageURLInput.value.trim();
    const rank = parseInt(rankInput.value.trim(), 10);

    //Validate input fields
    if (foodName === '') {
        alert('Please enter a food name.');
        return false;
    }

    if (description === '') {
        alert('Please enter a description.');
        return false;
    }

    if (imageURL === '') {
        alert('Please enter an image URL.');
        return false;
    }

    if (isNaN(rank) || rank <= 0) {
        alert('Please enter a valid rank.');
        return false;
    }

    //Check if the rank already exists
    const existingRanks = Array.from(document.querySelectorAll('.rank')).map(rankElement =>parseInt(rankElement.textContent.trim().split(" ")[1]));
    console.log('Existing Ranks:', existingRanks);
    console.log('Input Rank:', rank);
    if (existingRanks.includes(rank)) {
        alert(`A food with rank ${rank} already exists. Please choose a different rank.`);
        return false;
    }

    return true;
}

//Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        const foodName = foodNameInput.value.trim();
        const description = descriptionInput.value.trim();
        const imageURL = imageURLInput.value.trim();
        const rank = parseInt(rankInput.value.trim());

        addFoodCard(foodName, description, imageURL, rank);

        //Clear input fields
        foodNameInput.value = '';
        descriptionInput.value = '';
        imageURLInput.value = '';
        rankInput.value = '';
    }
});
