const BASE_API_URL = "http://localhost:8000";
const API_DESIGNATIONS_URL = `${BASE_API_URL}/api/designations`;

document.addEventListener("DOMContentLoaded", () => {
    const goBackButton = document.getElementById("go-back-button");
});

document.addEventListener("DOMContentLoaded", () => {
    const designationContainer = document.getElementById("designation-list");

    // Fetch designations
    fetch(`${BASE_API_URL}/api/designations`)
        .then(response => response.json())
        .then(designations => {
            designations.forEach(designation => {
                designationContainer.innerHTML += createDesignationCard(designation);
            });
        });
});

function createDesignationCard(designation) {
    return `
        <div class="card">
            <h3>${designation.name}</h3>
            <p>${designation.description || 'No description available'}</p>
        </div>
    `;
}

function goBack() {
    window.location.href = "index.html"; // Redirect to the main page
}