function displayPets(pets) {
  const petContainer = document.querySelector("#pets-container .grid");
  petContainer.innerHTML = ""; // Clear existing pet cards

  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.className = "bg-white shadow-lg rounded-lg p-4"; // Card styling
    petCard.innerHTML = `
            <figure class="px-4 pt-4">
                <img src="${pet.image}" alt="${
      pet.pet_name
    }" class="rounded-lg object-cover w-full h-48" />
            </figure>
            <div class="card-body p-4">
                <h2 class="card-title text-2xl font-bold text-black mb-2">${
                  pet.pet_name
                }</h2>
                <div class="flex items-center mb-2 text-gray-600">
                    <img src="./images/breed.png" alt="Breed Icon" class="mr-2">
                    <span>Breed: ${pet.breed || "N/A"}</span>
                </div>
                <div class="flex items-center mb-2 text-gray-600">
                    <img src="./images/birth.png" alt="Calendar Icon" class="mr-2">
                    <span>Birth: ${pet.date_of_birth || "Unknown"}</span>
                </div>
                <div class="flex items-center mb-2 text-gray-600">
                    <img src="./images/gender.png" alt="Gender Icon" class="mr-2">
                    <span>Gender: ${pet.gender}</span>
                </div>
                <div class="flex items-center mb-2 text-gray-600">
                    <img src="./images/price.png" alt="Price Icon" class="mr-2">
                    <span>Price: $${
                      pet.price !== null ? pet.price : "N/A"
                    }</span>
                </div>
                <div class="card-actions justify-between mt-4">
                    <div class="flex space-x-4">
                        <button class="flex items-center border border-[#0E7A81] text-[#0E7A81] rounded-lg px-4 py-2">
                            <img src="./images/like.png" alt="Like Icon" class="mr-2"> Like
                        </button>
                        <button class="border border-[#0E7A81] text-[#0E7A81] rounded-lg px-4 py-2">Adopt</button>
                        <button class="border border-[#0E7A81] text-[#0E7A81] rounded-lg px-4 py-2">Details</button>
                    </div>
                </div>
            </div>
        `;
    petContainer.appendChild(petCard);
  });
}

async function fetchAllPets() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    return data.pets; // Return the pets data
  } catch (error) {
    console.error("Error fetching all pets:", error);
  }
}

async function fetchPetsByCategory(categoryName) {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
    );
    const data = await response.json();
    const pets = data.data.slice(0, 3); // Get only the first 3 pets

    const petContainer = document.querySelector("#pets-container .grid");
    petContainer.innerHTML = ""; // Clear existing pet cards

    pets.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.className = "bg-white shadow-lg rounded-lg p-4"; // Card styling
      petCard.innerHTML = `
                <figure class="px-4 pt-4">
                    <img src="${pet.image}" alt="${
        pet.pet_name
      }" class="rounded-lg object-cover w-full h-48" />
                </figure>
                <div class="card-body p-4">
                    <h2 class="card-title text-2xl font-bold text-black mb-2">${
                      pet.pet_name
                    }</h2>
                    <div class="flex items-center mb-2 text-gray-600">
                        <img src="./images/breed.png" alt="Breed Icon" class="mr-2">
                        <span>Breed: ${pet.breed || "N/A"}</span>
                    </div>
                    <div class="flex items-center mb-2 text-gray-600">
                        <img src="./images/birth.png" alt="Calendar Icon" class="mr-2">
                        <span>Birth: ${pet.date_of_birth || "Unknown"}</span>
                    </div>
                    <div class="flex items-center mb-2 text-gray-600">
                        <img src="./images/gender.png" alt="Gender Icon" class="mr-2">
                        <span>Gender: ${pet.gender}</span>
                    </div>
                    <div class="flex items-center mb-2 text-gray-600">
                        <img src="./images/price.png" alt="Price Icon" class="mr-2">
                        <span>Price: $${
                          pet.price !== null ? pet.price : "N/A"
                        }</span>
                    </div>
                    <div class="card-actions justify-between mt-4">
                        <div class="flex space-x-4">
                            <button class="flex items-center border border-[#0E7A81] text-[#0E7A81] rounded-lg px-4 py-2">
                                <img src="./images/like.png" alt="Like Icon" class="mr-2"> Like
                            </button>
                            <button class="border border-[#0E7A81] text-[#0E7A81] rounded-lg px-4 py-2">Adopt</button>
                            <button class="border border-[#0E7A81] text-[#0E7A81] rounded-lg px-4 py-2">Details</button>
                        </div>
                    </div>
                </div>
            `;
      petContainer.appendChild(petCard);
    });
  } catch (error) {
    console.error("Error fetching pets by category:", error);
  }
}

async function fetchCategories() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();

    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = ""; // Clear existing categories

    data.categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className =
        "category-card border border-gray-200 rounded-full p-6 bg-white shadow-md hover:shadow-lg hover:bg-[#e6f1f2] hover:border-[#0E7A811A] transition-all";
      categoryDiv.id = `category-${category.category.toLowerCase()}`;

      categoryDiv.innerHTML = `
                <a href="#" class="flex flex-row items-center justify-center" data-category="${category.category.toLowerCase()}">
                    <img src="${category.category_icon}" alt="${
        category.category
      }" class="w-16 h-16 object-cover rounded-full mb-3">
                    <span class="text-lg font-semibold text-gray-800">${
                      category.category
                    }</span>
                </a>
            `;

      categoryDiv.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        const categoryName = e.target.dataset.category;
        fetchPetsByCategory(categoryName);
      });

      categoriesContainer.appendChild(categoryDiv);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Fetch pets and categories when the page loads
window.onload = async () => {
  await fetchCategories();
  const pets = await fetchAllPets();
  displayPets(pets);
};
