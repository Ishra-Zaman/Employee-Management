const BASE_API_URL = "http://localhost:8000";

// Function to create a designation card
function createDesignationCard(designation) {
    return `
        <div class="card" data-id="${designation.id}">
            <div class="card-body">
                <h3 class="editable" contenteditable="false">${designation.name}</h3>
                <p class="editable" contenteditable="false">${designation.description || 'No description available'}</p>
            </div>
            <div style="position: absolute; top: 10px; right: 10px;">
                <button class="btn btn-danger btn-sm delete-button" data-id="${designation.id}"><i class="fas fa-trash"></i></button>
                <button class="btn btn-primary btn-sm edit-button" data-id="${designation.id}"><i class="fas fa-pencil"></i></button>
                <button class="btn btn-success btn-sm save-button" data-id="${designation.id}"><i class="fa-solid fa-floppy-disk"></i></button>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const designationContainer = document.getElementById("designation-list");

    // Fetch designations
    fetch(`${BASE_API_URL}/api/designations`)
        .then(response => response.json())
        .then(designations => {
            if(designations.length === 0) {
                designationContainer.innerHTML = displayLoadingIndicator();
            } else {
                // Populate the designation list
                designations.forEach(designation => {
                    designationContainer.innerHTML += createDesignationCard(designation);
                });
            }            
        })
        .catch((err) => {
            console.log('Error: ', err.message)
            if(err.message) {
                designationContainer.innerHTML = displayLoadingIndicator();
            }
        });

    // Add event listeners for buttons
    designationContainer.addEventListener("click", (e) => {
        const targetButton = e.target;
        const designationId = targetButton.getAttribute("data-id");

        if (targetButton.classList.contains("delete-button")) {
            if (confirm("Are you sure you want to delete this designation?")) {
                deleteDesignation(designationId);
            }
        } else if (targetButton.classList.contains("edit-button")) {
            // Implement edit functionality
            // For example, show input fields to edit designation name and description
            editDesignation(designationId);
        } else if (targetButton.classList.contains("save-button")) {
            // Implement save functionality
            // For example, send updated designation data to the server and update the UI
            saveDesignation(designationId);
        }
    });
});

// Function to delete a designation
function deleteDesignation(designationId) {
    fetch(`${BASE_API_URL}/api/designations/${designationId}`, {
        method: "DELETE"
    })
    .then(() => {
        window.location.reload();
    })
    .catch(error => {
        console.error(error);
    });
}

// Function to edit a designation
function editDesignation(designationId) {
    // Implement edit functionality
    // For example, show input fields to edit designation name and description
    const designationCard = document.querySelector(`.card[data-id="${designationId}"]`);
    // Check if the card is found
    if (designationCard) {
        const editableFields = designationCard.querySelectorAll('.editable');
        editableFields.forEach(field => {
            field.contentEditable = "true";
            field.style.border = "1px solid #ccc";
            field.style.width = "550px"; 
        });
    }
}

// Work on save functionality later
// Function to save a designation
// function saveDesignation(designationId) {
//     // Implement save functionality
//     // For example, send updated designation data to the server and update the UI
//     const designationCard = document.querySelector(`.card[data-id="${designationId}"]`);
//     if (designationCard) {
//         const editableFields = designationCard.querySelectorAll('.editable');
//         editableFields.forEach(field => {
//             field.contentEditable = "false";
//             field.style.border = "none";
//         });
//         // Call function to update the designation on the server
//         // updateDesignation(designationId, updatedData);
//     }
// }

