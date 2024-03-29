let BASE_API_URL = "http://localhost:8000";
if(window.location.host !== "127.0.0.1:5500" || window.location.host !== "localhost") {
    BASE_API_URL = "https://employee-management-5rk2.onrender.com"
}

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("designation-submit-button");
    if (submitButton) {
        submitButton.addEventListener("click", createDesignation);
    } else {
        console.error("Submit button not found");
    }
});

function createDesignation() {
    const name = document.getElementById("designation-name").value;
    const description = document.getElementById("designation-description").value;

    const newDesignation = {
        name: name,
        description: description
    };

    fetch(`${BASE_API_URL}/api/designations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDesignation),
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