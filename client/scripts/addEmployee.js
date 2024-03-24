let BASE_API_URL = "http://localhost:8000";
if(window.location.host !== "127.0.0.1:5500" || window.location.host !== "localhost") {
    BASE_API_URL = "https://employee-management-5rk2.onrender.com"
}
const DESIGNATIONS_API_URL = `${BASE_API_URL}/api/designations`
const EMPLOYEE_API_URL = `${BASE_API_URL}/api/employees`

async function populateDesignations() {
    try {
        const designationSelect = document.getElementById('designation_id');
        const response = await fetch(DESIGNATIONS_API_URL);
        const designations = await response.json();
        if(designations.length > 0) {
            designations.forEach((designation) => {
                designationSelect.innerHTML += createSelectOptions(designation);
            })
        }
    } catch(err) {
        console.log(`Error: Unable to fetch designations due to following error: ${err.message}`)
    }
}

async function createEmployee() {
    const employeeFormData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email_address: document.getElementById('email_address').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        salary: document.getElementById('salary').value,
        designation_id: document.getElementById('designation_id').value
    }
    const payload = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeFormData)
    }
    
    try {
        const response = await fetch(EMPLOYEE_API_URL, payload);
        const employee = await response.json();
        if(employee.id) {
            window.location.href = "employees.html"
        }
    } catch(err) {
        console.log(`Error: Unable to fetch designations due to following error: ${err.message}`)
    }
}


document.addEventListener("DOMContentLoaded", () => {
    populateDesignations()
    const submitBtn = document.getElementById('employee-submit-button');
    submitBtn.addEventListener("click", createEmployee);
});

function createSelectOptions(designation) {
    return `
        <option value="${designation.id}">${designation.name}</option>
    `
}