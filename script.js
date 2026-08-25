const API_URL = 'https://salary-management-app-xxxx.vercel.app/api/employees';

// 1. Navigation Controller
function showSection(sectionId) {
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('slip-section').classList.add('hidden');
    document.getElementById('list-section').classList.add('hidden');

    document.getElementById(sectionId).classList.remove('hidden');

    if (sectionId === 'list-section') {
        renderEmployeeList();
    }
}

// 2. Real-Time Calculations Engine
function calculateTotals() {
    const basicPay = parseFloat(document.getElementById('basicPay').value) || 0;
    const houseRent = parseFloat(document.getElementById('houseRent').value) || 0;
    const conveyance = parseFloat(document.getElementById('conveyance').value) || 0;
    const medical = parseFloat(document.getElementById('medical').value) || 0;
    const computer = parseFloat(document.getElementById('computerAllowance').value) || 0;
    const election = parseFloat(document.getElementById('electionAllowance').value) || 0;
    const adhoc = parseFloat(document.getElementById('adhocRelief').value) || 0;

    const grossPay = basicPay + houseRent + conveyance + medical + computer + election + adhoc;

    const gpfDeduction = parseFloat(document.getElementById('gpfDeduction').value) || 0;
    const benevolent = parseFloat(document.getElementById('benevolentFund').value) || 0;
    const incomeTax = parseFloat(document.getElementById('incomeTax').value) || 0;

    const totalDeductions = gpfDeduction + benevolent + incomeTax;
    const netPay = grossPay - totalDeductions;

    document.getElementById('previewGross').innerText = grossPay.toLocaleString('en-PK', { minimumFractionDigits: 2 });
    document.getElementById('previewDeductions').innerText = totalDeductions.toLocaleString('en-PK', { minimumFractionDigits: 2 });
    document.getElementById('previewNet').innerText = netPay.toLocaleString('en-PK', { minimumFractionDigits: 2 });

    return { grossPay, totalDeductions, netPay };
}

// 3. Form Submit Handler (Sends POST Request to MongoDB)
async function handleFormSubmit(event) {
    event.preventDefault();

    const totals = calculateTotals();
    const personnelNumber = document.getElementById('personnelNumber').value;

    const employeeData = {
        personnelNumber: personnelNumber,
        name: document.getElementById('name').value,
        fatherName: document.getElementById('fatherName').value,
        cnic: document.getElementById('cnic').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        entryDate: document.getElementById('entryDate').value,
        designation: document.getElementById('designation').value,
        bps: parseFloat(document.getElementById('bps').value) || 0,
        payStage: parseFloat(document.getElementById('payStage').value) || 0,
        ddoCode: document.getElementById('ddoCode').value,
        gpfAccNo: document.getElementById('gpfAccNo').value,
        gpfBalance: parseFloat(document.getElementById('gpfBalance').value) || 0,
        basicPay: parseFloat(document.getElementById('basicPay').value) || 0,
        houseRent: parseFloat(document.getElementById('houseRent').value) || 0,
        conveyance: parseFloat(document.getElementById('conveyance').value) || 0,
        medical: parseFloat(document.getElementById('medical').value) || 0,
        computerAllowance: parseFloat(document.getElementById('computerAllowance').value) || 0,
        electionAllowance: parseFloat(document.getElementById('electionAllowance').value) || 0,
        adhocRelief: parseFloat(document.getElementById('adhocRelief').value) || 0,
        gpfDeduction: parseFloat(document.getElementById('gpfDeduction').value) || 0,
        benevolentFund: parseFloat(document.getElementById('benevolentFund').value) || 0,
        incomeTax: parseFloat(document.getElementById('incomeTax').value) || 0,
        grossPay: totals.grossPay,
        totalDeductions: totals.totalDeductions,
        netPay: totals.netPay,
        accountNumber: document.getElementById('accountNumber').value,
        bankDetails: document.getElementById('bankDetails').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });

        if (response.ok) {
            alert('Employee record successfully saved to MongoDB!');
            viewEmployeeSlip(personnelNumber);
        } else {
            const errData = await response.json();
            alert('Error saving record: ' + errData.error);
        }
    } catch (err) {
        alert('Failed to connect to backend server: ' + err.message);
    }
}

// 4. View Printable Slip (Fetches single employee from MongoDB)
async function viewEmployeeSlip(personnelNumber) {
    try {
        const response = await fetch(`${API_URL}/${personnelNumber}`);
        if (!response.ok) return alert('Employee not found in database!');

        const emp = await response.json();

        document.getElementById('viewPersonnelNumber').innerText = emp.personnelNumber || '-';
        document.getElementById('viewName').innerText = emp.name || '-';
        document.getElementById('viewFatherName').innerText = emp.fatherName || '-';
        document.getElementById('viewCnic').innerText = emp.cnic || '-';
        document.getElementById('viewDob').innerText = emp.dateOfBirth || '-';
        document.getElementById('viewEntryDate').innerText = emp.entryDate || '-';
        document.getElementById('viewDesignation').innerText = emp.designation || '-';
        document.getElementById('viewBps').innerText = emp.bps || '-';
        document.getElementById('viewDdoCode').innerText = emp.ddoCode || '-';
        document.getElementById('viewGpfAccNo').innerText = emp.gpfAccNo || '-';

        document.getElementById('viewBasicPay').innerText = (emp.basicPay || 0).toLocaleString();
        document.getElementById('viewHouseRent').innerText = (emp.houseRent || 0).toLocaleString();
        document.getElementById('viewConveyance').innerText = (emp.conveyance || 0).toLocaleString();
        document.getElementById('viewMedical').innerText = (emp.medical || 0).toLocaleString();
        document.getElementById('viewComputer').innerText = (emp.computerAllowance || 0).toLocaleString();
        document.getElementById('viewElection').innerText = (emp.electionAllowance || 0).toLocaleString();
        document.getElementById('viewAdhoc').innerText = (emp.adhocRelief || 0).toLocaleString();

        document.getElementById('viewGpfDeduction').innerText = (emp.gpfDeduction || 0).toLocaleString();
        document.getElementById('viewBenevolentFund').innerText = (emp.benevolentFund || 0).toLocaleString();
        document.getElementById('viewIncomeTax').innerText = (emp.incomeTax || 0).toLocaleString();

        document.getElementById('viewGrossPay').innerText = (emp.grossPay || 0).toLocaleString();
        document.getElementById('viewTotalDeductions').innerText = (emp.totalDeductions || 0).toLocaleString();
        document.getElementById('viewNetPay').innerText = (emp.netPay || 0).toLocaleString();

        document.getElementById('viewAccNo').innerText = emp.accountNumber || '-';
        document.getElementById('viewBankDetails').innerText = emp.bankDetails || '-';
        document.getElementById('viewEmail').innerText = emp.email || '-';
        document.getElementById('viewAddress').innerText = emp.address || '-';

        showSection('slip-section');
    } catch (err) {
        alert('Error fetching employee details: ' + err.message);
    }
}

// 5. Render Master Table List (Fetches all records from MongoDB)
async function renderEmployeeList() {
    const tbody = document.getElementById('employee-table-body');
    tbody.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        const employees = await response.json();

        if (employees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No employee records found in MongoDB.</td></tr>';
            return;
        }

        employees.forEach(emp => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emp.personnelNumber}</td>
                <td>${emp.name}</td>
                <td>${emp.designation || '-'}</td>
                <td>${emp.bps || '-'}</td>
                <td>Rs. ${(emp.grossPay || 0).toLocaleString()}</td>
                <td>Rs. ${(emp.netPay || 0).toLocaleString()}</td>
                <td class="no-print">
                    <button class="btn btn-print btn-action" onclick="viewEmployeeSlip('${emp.personnelNumber}')">Print Slip</button>
                    <button class="btn btn-clear btn-action" onclick="editEmployee('${emp.personnelNumber}')">Edit</button>
                    <button class="btn btn-action" style="background:#e74c3c; color:white;" onclick="deleteEmployee('${emp.personnelNumber}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red;">Failed to connect to server: ${err.message}</td></tr>`;
    }
}

// 6. Edit Employee (Loads data from MongoDB back into form)
async function editEmployee(personnelNumber) {
    try {
        const response = await fetch(`${API_URL}/${personnelNumber}`);
        const emp = await response.json();

        document.getElementById('personnelNumber').value = emp.personnelNumber;
        document.getElementById('name').value = emp.name;
        document.getElementById('fatherName').value = emp.fatherName || '';
        document.getElementById('cnic').value = emp.cnic;
        document.getElementById('dateOfBirth').value = emp.dateOfBirth || '';
        document.getElementById('entryDate').value = emp.entryDate || '';
        document.getElementById('designation').value = emp.designation || '';
        document.getElementById('bps').value = emp.bps || '';
        document.getElementById('payStage').value = emp.payStage || '';
        document.getElementById('ddoCode').value = emp.ddoCode || '';
        document.getElementById('gpfAccNo').value = emp.gpfAccNo || '';
        document.getElementById('gpfBalance').value = emp.gpfBalance || '';
        document.getElementById('basicPay').value = emp.basicPay || 0;
        document.getElementById('houseRent').value = emp.houseRent || 0;
        document.getElementById('conveyance').value = emp.conveyance || 0;
        document.getElementById('medical').value = emp.medical || 0;
        document.getElementById('computerAllowance').value = emp.computerAllowance || 0;
        document.getElementById('electionAllowance').value = emp.electionAllowance || 0;
        document.getElementById('adhocRelief').value = emp.adhocRelief || 0;
        document.getElementById('gpfDeduction').value = emp.gpfDeduction || 0;
        document.getElementById('benevolentFund').value = emp.benevolentFund || 0;
        document.getElementById('incomeTax').value = emp.incomeTax || 0;
        document.getElementById('accountNumber').value = emp.accountNumber || '';
        document.getElementById('bankDetails').value = emp.bankDetails || '';
        document.getElementById('email').value = emp.email || '';
        document.getElementById('address').value = emp.address || '';

        calculateTotals();
        showSection('form-section');
    } catch (err) {
        alert('Error loading record for editing: ' + err.message);
    }
}

// 7. Delete Record from MongoDB
async function deleteEmployee(personnelNumber) {
    if (confirm('Are you sure you want to delete this record permanently from MongoDB?')) {
        try {
            const response = await fetch(`${API_URL}/${personnelNumber}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Record deleted successfully!');
                renderEmployeeList();
            } else {
                alert('Failed to delete record.');
            }
        } catch (err) {
            alert('Error deleting record: ' + err.message);
        }
    }
}

// 8. Clear Form Fields
function clearForm() {
    document.getElementById('employee-form').reset();
    calculateTotals();
}