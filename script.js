const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
let editingRow = null;

// Load student data from localStorage when the page loads
window.onload = function() {
    let students = [];
    try {
        students = JSON.parse(localStorage.getItem('students')) || [];
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
    }

    students.forEach(student => {
        addStudentToTable(student);
    });
};

// Handle form submission
studentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const emailId = document.getElementById('emailId').value;
    const mobileNo = document.getElementById('mobileNo').value;

    const studentData = { studentName, studentId, emailId, mobileNo };

    if (editingRow) {
        // Edit existing row
        editingRow.cells[0].innerHTML = studentName;
        editingRow.cells[1].innerHTML = studentId;
        editingRow.cells[2].innerHTML = emailId;
        editingRow.cells[3].innerHTML = mobileNo;

        // Update student in localStorage
        updateStudentInStorage(editingRow.rowIndex - 1, studentData);

        editingRow = null; // Reset editing row
    } else {
        // Add new row for a new student
        addStudentToTable(studentData);
        saveStudentToStorage(studentData);
    }

    // Reset form
    studentForm.reset();
});

// Add student to the table
function addStudentToTable(student) {
    const newRow = studentTable.insertRow();
    newRow.innerHTML = `
        <td>${student.studentName}</td>
        <td>${student.studentId}</td>
        <td>${student.emailId}</td>
        <td>${student.mobileNo}</td>
        <td>
            <button class="actions-btn edit-btn" onclick="editStudent(this)">Edit</button>
            <button class="actions-btn delete-btn" onclick="deleteStudent(this)">Delete</button>
        </td>
    `;
}

// Save student data to localStorage
function saveStudentToStorage(student) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

// Update student in localStorage
function updateStudentInStorage(index, student) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students[index] = student;
    localStorage.setItem('students', JSON.stringify(students));
}

// Edit student
function editStudent(button) {
    const row = button.parentNode.parentNode;
    document.getElementById('studentName').value = row.cells[0].innerHTML;
    document.getElementById('studentId').value = row.cells[1].innerHTML;
    document.getElementById('emailId').value = row.cells[2].innerHTML;
    document.getElementById('mobileNo').value = row.cells[3].innerHTML;
    editingRow = row; 
}

// Delete student and remove from localStorage
function deleteStudent(button) {
    const row = button.parentNode.parentNode;
    const rowIndex = row.rowIndex - 1;
    studentTable.deleteRow(rowIndex);

    // Remove the student from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(rowIndex, 1); 
    localStorage.setItem('students', JSON.stringify(students));
}