let BASE_API_URL = "http://localhost:8000";
if(window.location.host !== "127.0.0.1:5500" || window.location.host !== "localhost") {
    BASE_API_URL = "https://employee-management-5rk2.onrender.com"
}

document.addEventListener("DOMContentLoaded", () => {
    const designationContainer = document.getElementById("designation-list");
    const searchInput = document.querySelector('.form-control');

    fetch(`${BASE_API_URL}/api/designations`)
        .then(response => response.json())
        .then(designations => {
            if(designations.length === 0) {
                designationContainer.innerHTML = displayLoadingIndicator();
            } else {
                displayDesignations(designations);
            }            
        })
        .catch((err) => {
            console.log('Error: ', err.message)
            if(err.message) {
                designationContainer.innerHTML = displayLoadingIndicator();
            }
        });

    searchInput.addEventListener('input', (event) => {
        const searchQuery = event.target.value.trim().toLowerCase();
        fetch(`${BASE_API_URL}/api/designations`)
            .then(response => response.json())
            .then(designations => {
                const filteredDesignations = designations.filter(designation => {
                    return designation.name.toLowerCase().includes(searchQuery);
                });
                displayDesignations(filteredDesignations);
            })
            .catch((err) => {
                console.log('Error: ', err.message)
            });
    });
});

function displayDesignations(designations) {
    const designationContainer = document.getElementById("designation-list");
    designationContainer.innerHTML = ""; 
    designations.forEach(designation => {
        designationContainer.innerHTML += createDesignationCard(designation);
    });
}

function createDesignationCard(designation) {
    return `
        <div class="card" data-id="${designation.id}">
            <div class="card-body">
                <h3>${designation.name}</h3>
                <p>${designation.description || 'No description available'}</p>
                <p>${designation.status}</p>
            </div>
            <div style="position: absolute; top: 10px; right: 10px;">
                <a href="edit-designation.html?id=${designation.id}" class="btn btn-primary btn-sm"><i class="fas fa-pencil"></i></a>
                <button type="button" class="btn btn-danger btn-sm delete-button" data-id="${designation.id}"><i class="fas fa-trash"></i></button>                
            </div>
        </div>
    `;
}

    designationContainer.addEventListener("click", (e) => {
        const targetButton = e.target;
        const designationId = targetButton.getAttribute("data-id");

        if (targetButton.classList.contains("delete-button")) {
            if (confirm("Are you sure you want to delete this designation?")) {
                deleteDesignation(designationId);
            }
        }
    });

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



            

        