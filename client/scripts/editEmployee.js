const BASE_API_URL = "http://localhost:8000";
const DESIGNATIONS_API_URL = `${BASE_API_URL}/api/designations`;
const EMPLOYEE_API_URL = `${BASE_API_URL}/api/employees`;

function getEmployeeIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");

}
async function populateDesignations() {
    try {
        const designationSelect = document.getElementById('designation_id');
        const response = await fetch(DESIGNATIONS_API_URL);
        const designations = await response.json();
        if (designations.length > 0) {
            designations.forEach((designation) => {
                designationSelect.innerHTML += createSelectOptions(designation);
            });
        }
    } catch (err) {
        console.log(`Error: Unable to fetch designations due to following error: ${err.message}`);
    }
}

async function populateEmployeeById(employeeId) {
    try {
        const response = await fetch(`${EMPLOYEE_API_URL}/${employeeId}`);
        const employee = await response.json();
        console.log('employee', employee);
        if (employee?.id) {
            const employeeFirstNameField = document.getElementById('first_name');
            const employeeLastNameField = document.getElementById('last_name');
            const employeeAddressField = document.getElementById('address');
            const employeeEmailAddressField = document.getElementById('email_address');
            const employeePhoneField = document.getElementById('phone');
            const employeeSalaryField = document.getElementById('salary');

            employeeFirstNameField.value = employee?.first_name;
            employeeLastNameField.value = employee?.last_name;
            employeeAddressField.value = employee?.address;
            employeeEmailAddressField.value = employee?.email_address;
            employeePhoneField.value = employee?.phone;
            employeeSalaryField.value = employee?.salary;

            await populateDesignations();
            

            document.getElementById('designation_id').value = employee.designation_id;
        }
    } catch (error) {
        console.log(`Error: Unable to fetch employee due to the following error: ${error.message}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const employeeId = getEmployeeIdFromUrl();
    if (employeeId) {
        populateEmployeeById(employeeId);
        const submitBtn = document.getElementById('employee-submit-button');
        submitBtn.addEventListener("click", () => updateEmployee(employeeId));
    } else {
        console.error("Employee ID not found in the URL");
    }
});

function updateEmployee(employeeId) {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const address = document.getElementById('address').value;
    const email_address = document.getElementById('email_address').value;
    const phone = document.getElementById('phone').value;
    const salary = document.getElementById('salary').value;
    const designation_id = document.getElementById('designation_id').value; 

    const updateEmployee = {
        first_name: first_name,
        last_name: last_name,
        address: address,
        email_address: email_address,
        phone: phone,
        salary: salary,
        designation_id: designation_id 
    };

    fetch(`${BASE_API_URL}/api/employees/${employeeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateEmployee),
    }).then(() => {
        window.location.href = "employees.html"; // Redirect to the main page
    }).catch(error => {
        console.error(error);
    });
}

function createSelectOptions(designation) {
    return `<option value="${designation.id}">${designation.name}</option>`;
}
