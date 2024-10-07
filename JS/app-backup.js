// DOM Elements
const categoriesContainer = document.getElementById('categories');
const petsContainer = document.getElementById('pets-container');
const likedPetsContainer = document.getElementById('liked-pets');
// const loadingSpinner = document.getElementById('loading-spinner'); // Commented out spinner
const modal = document.getElementById('pet-details-modal');
const modalContent = document.getElementById('modal-content');
const sortPriceButton = document.getElementById('sort-price-btn');

// State
let displayedPets = [];
let likedPets = [];

// Show Loading Spinner
// function showLoadingSpinner() {
//     loadingSpinner.style.display = 'block';
// }

// Hide Loading Spinner
// function hideLoadingSpinner() {
//     loadingSpinner.style.display = 'none';
// }

// Fetch Categories from API
async function fetchCategories() {
    try {
        // showLoadingSpinner(); // Commented out spinner
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await response.json();
        displayCategories(data.categories.slice(0, 4)); // Display only first 4 categories
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        // hideLoadingSpinner(); // Commented out spinner
    }
}

// Display Categories
function displayCategories(categories) {
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.classList.add('category-btn');
        categoryButton.innerText = category.name;
        categoryButton.addEventListener('click', () => fetchPetsByCategory(category.name));
        categoriesContainer.appendChild(categoryButton);
    });
}

// Fetch Pets by Category
async function fetchPetsByCategory(categoryName) {
    try {
        // showLoadingSpinner(); // Commented out spinner
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
        const data = await response.json();
        displayedPets = data.pets;
        displayPets(displayedPets);
    } catch (error) {
        console.error(`Error fetching pets for category ${categoryName}:`, error);
    } finally {
        // hideLoadingSpinner(); // Commented out spinner
    }
}

// Fetch All Pets
async function fetchAllPets() {
    try {
        // showLoadingSpinner(); // Commented out spinner
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await response.json();
        displayedPets = data.pets;
        displayPets(displayedPets);
    } catch (error) {
        console.error('Error fetching all pets:', error);
    } finally {
        // hideLoadingSpinner(); // Commented out spinner
    }
}

// Display Pets
function displayPets(pets) {
    petsContainer.innerHTML = '';
    if (pets.length === 0) {
        petsContainer.innerHTML = '<p>No pets available in this category.</p>';
        return;
    }
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');

        // Handle missing data with placeholders
        const petName = pet.name || 'Unknown Name';
        const petBreed = pet.breed || 'Unknown Breed';
        const petBirthDate = pet.birthDate || 'Unknown Date';
        const petGender = pet.gender || 'Unknown Gender';
        const petPrice = pet.price ? `$${pet.price}` : 'No Price';

        petCard.innerHTML = `
            <img src="${pet.image || 'placeholder.jpg'}" alt="${petName}" />
            <h3>${petName}</h3>
            <p>Breed: ${petBreed}</p>
            <p>Birth Date: ${petBirthDate}</p>
            <p>Gender: ${petGender}</p>
            <p>Price: ${petPrice}</p>
            <button class="like-btn">Like</button>
            <button class="adopt-btn">Adopt</button>
            <button class="details-btn">Details</button>
        `;

        // Like button event listener
        petCard.querySelector('.like-btn').addEventListener('click', () => likePet(pet));

        // Adopt button event listener
        petCard.querySelector('.adopt-btn').addEventListener('click', (event) => adoptPet(event.target));

        // Details button event listener
        petCard.querySelector('.details-btn').addEventListener('click', () => showPetDetails(pet));

        petsContainer.appendChild(petCard);
    });
}

// Like Pet
function likePet(pet) {
    if (!likedPets.some(liked => liked.id === pet.id)) {
        likedPets.push(pet);
        displayLikedPets();
    }
}

// Display Liked Pets
function displayLikedPets() {
    likedPetsContainer.innerHTML = '';
    likedPets.forEach(pet => {
        const petThumbnail = document.createElement('img');
        petThumbnail.src = pet.image || 'placeholder.jpg';
        likedPetsContainer.appendChild(petThumbnail);
    });
}

// Adopt Pet with Countdown
function adoptPet(button) {
    let countdown = 3;
    button.disabled = true;
    button.innerText = 'Adopting...';

    const interval = setInterval(() => {
        button.innerText = `Adopting in ${countdown}...`;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval);
            button.innerText = 'Adopted';
        }
    }, 1000);
}

// Show Pet Details in Modal
function showPetDetails(pet) {
    modalContent.innerHTML = `
        <h2>${pet.name || 'Unknown Name'}</h2>
        <img src="${pet.image || 'placeholder.jpg'}" alt="${pet.name}" />
        <p>Breed: ${pet.breed || 'Unknown Breed'}</p>
        <p>Birth Date: ${pet.birthDate || 'Unknown Date'}</p>
        <p>Gender: ${pet.gender || 'Unknown Gender'}</p>
        <p>Price: ${pet.price ? `$${pet.price}` : 'No Price'}</p>
        <p>Description: ${pet.description || 'No Description'}</p>
        <button id="close-modal">Close</button>
    `;
    modal.style.display = 'block';

    // Close modal event listener
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Sort by Price
function sortByPrice() {
    if (displayedPets.length === 0) {
        console.log('No pets to sort.');
        return;
    }

    // Sort pets by price in descending order
    displayedPets.sort((a, b) => b.price - a.price);
    displayPets(displayedPets);
}

// Event listener for sorting pets by price
sortPriceButton.addEventListener('click', sortByPrice);

// Initialize App
fetchCategories();
fetchAllPets();
