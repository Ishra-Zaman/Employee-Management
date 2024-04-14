let BASE_API_URL = "http://localhost:8000";
if(window.location.host !== "127.0.0.1:5500" || window.location.host !== "localhost") {
    BASE_API_URL = "https://employee-management-5rk2.onrender.com"
}

document.addEventListener("DOMContentLoaded", () => {
    const employeeContainer = document.getElementById("employee-list");

    fetch(`${BASE_API_URL}/api/employees`)
        .then(response => response.json())
        .then(employees => {
            if(employees.length === 0) {
                employeeContainer.innerHTML = displayLoadingIndicator();
            } else {
                employees.forEach(employee => {
                    employeeContainer.innerHTML += createEmployeeCard(employee);
                });
            }            
        })
        .catch((err) => {
            console.log('Error: ', err.message)
            if(err.message) {
                employeeContainer.innerHTML = displayLoadingIndicator();
            }
        });
});

function createEmployeeCard(employee) {
    return `
    <div class="card" style="width: calc(33.33% - 30px); margin-top: 20px; margin-bottom: 20px; margin-left: 15px; margin-right: 15px; height: 350px;">
            <div class="card-body">
                <h4 class="card-title">${employee.first_name} ${employee.last_name}</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Address: ${employee.address || 'No address available'}</li>
                <li class="list-group-item">Email Address: ${employee.email_address}</li>
                <li class="list-group-item">Phone Number: ${employee.phone || 'No phone number available'}</li>
                <li class="list-group-item">Salary: ${employee.salary}</li>
                <li class="list-group-item">Designation: ${employee.designation_id}</li>
            </ul>
            <div class="card-body">
            <a href="edit-employee.html?id=${employee.id}" class="btn btn-primary btn-sm"><i class="fas fa-pencil"></i></a>
            <button class="btn btn-danger btn-sm delete-button" data-id="${employee.id}"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
}

const employeeContainer = document.getElementById("employee-list");

employeeContainer.addEventListener("click", (e) => {
    const targetButton = e.target;
    const employeeId = targetButton.getAttribute("data-id");

    if (targetButton.classList.contains("delete-button")) {
        if (confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(employeeId);
        }
    }
});

function deleteEmployee(employeeId) {
    fetch(`${BASE_API_URL}/api/employees/${employeeId}`, {
        method: "DELETE"
    })
    .then(() => {
        window.location.reload();
    })
    .catch(error => {
        console.error(error);
    });
}




