const BASE_API_URL = "http://localhost:8000";
const DESIGNATION_API_URL = `${BASE_API_URL}/api/designations`;

const urlParams = new URLSearchParams(window.location.search);
const designationId = urlParams.get("id");

async function populateDesignationById() {
    try {
        const response = await fetch(`${DESIGNATION_API_URL}/${designationId}`);
        const designation = await response.json();
        console.log('designation', designation);
        if(designation?.id) {
            const designationNameField = document.getElementById('designation-name');
            const designationDescriptionField = document.getElementById('designation-description');
            const designationStatusField = document.getElementById('designation-status');
            designationNameField.value = designation?.name;
            designationDescriptionField.value = designation?.description;
            designationStatusField.value = designation?.status;
        }
    } catch(erro) {
        console.log(`Error: Unable to fetch designation due to following error: ${err.message}`)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateDesignationById();
    const submitButton = document.getElementById("designation-submit-button");
    if (submitButton) {
        submitButton.addEventListener("click", updateDesignation);
    } else {
        console.error("Submit button not found");
    }
});

function updateDesignation() {
    const name = document.getElementById("designation-name").value;
    const description = document.getElementById("designation-description").value;
    const status = document.getElementById('designation-status').value;

    const updateDesignation = {
        name: name,
        description: description,
        status: status
    };

    fetch(`${BASE_API_URL}/api/designations/${designationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDesignation),
    }).then(() => {
        window.location.href = "designations.html"; // Redirect to the main page
    }).catch(error => {
        console.error(error);
        // Handle errors here
    });
}

function goBack() {
    window.location.href = "index.html"; // Redirect to the main page
}