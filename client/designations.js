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
            if(designations.length === 0) {
                designationContainer.innerHTML = displayLoadingIndicator();
            } else {
                designations.forEach(designation => {
                    designationContainer.innerHTML += createDesignationCard(designation);
                });
            }            
        }).catch((err) => {
            console.log('Error: ', err.message)
            if(err.message) {
                designationContainer.innerHTML = displayLoadingIndicator();
            }
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

function displayLoadingIndicator() {
    return `
        <div class="d-flex justify-content-center w-100">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `
}

function goBack() {
    window.location.href = "index.html"; // Redirect to the main page
}