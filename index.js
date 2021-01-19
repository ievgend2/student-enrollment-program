const studentData = document.getElementById("student_data");
const coursesData = document.getElementById("courses_data");
const addCourseForm = document.getElementById("addCourseForm")
const addStudentForm = document.getElementById("addStudentForm")
const addCourseBtn = document.getElementById("addCourseBtn");
// const addStudentBtn = document.getElementById("addStudentBtn");
// const register = document.getElementById("register");
const editInfoBtn = document.getElementById("editInfoBtn");
const modalSelect = document.getElementById("modalSelect");
const modalSelectStudent = document.getElementById("modalSelectStudent");
const saveButton = document.getElementById("save_button");
const studentsButton = document.getElementById('students');
const coursesButton = document.getElementById('courses');
const student_name = document.getElementById("student_name");
const student_last_name = document.getElementById("student_last_name");
const student_status = document.getElementById("student_status");
const editInfoButton = document.getElementById("save_edit_button");

let coursesMax = 4;
let studentsMax = 3;

class Student {
    constructor(name, last_name, id, status, courses) {
        this.name = name,
            this.last_name = last_name,
            this.id = id,
            this.status = status,
            this.courses = [],
            this.count = 0
    }
}

class Courses {
    constructor(name, duration, id, students) {
        this.name = name,
            this.duration = duration,
            this.id = id,
            this.students = [],
            this.count = 0
    }
}

let students = [];
let courses = [];
let currentStudentId;
let currentCourseId;

//----------------- GET STUDENT INFO -------------------
async function getStudentApi() {
    const response = await fetch(`https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json`)

    const body = await response.json()
    students = body.map((student) => new Student(student.name, student.last_name, student.id, student.status, student.courses))
    // console.log(students)
}
//----------------- DISPLAY STUDENT INFO -------------------
function postStudentData(students) {
    studentData.innerHTML = "";
    // console.log(students)
    for (i = 0; i < students.length; i++) {

        let newCard = document.createElement("div");
        let cardContent = document.createElement("p");
        newCard.classList.add("col-6")

        const card = ` 
        <div class="card mb-5" style="width: 18rem;">
            <div class="card-body">
            <div class="d-inline">
                <h5 class="card-title">${students[i].name} ${students[i].last_name} <span class="${students[i].status}"></span></h5>                </div>
                <p class="card-text">${students[i].courses.map(course => course.name)}</p>
                <p class="card-text">${students[i].courses.map(course => course.duration)}</p>
                <button id = "addCourseBtn" data-studentid="${students[i].id}" type="button" class="btn btn-dark addCourseBtn" data-toggle="modal"
              data-target="#addCourseModal">Add Course</button>
              <button id = "editInfoBtn" data-studentid="${students[i].id}" type="button" class="btn btn-dark editInfoBtn" data-toggle="modal"
              data-target="#editInfoModal">Edit Info</button>
            </div>
          </div>`
        cardContent.innerHTML = card;
        // const ul = document.getElementById("ul");
        // const li = document.createElement("li")
        // li.innerHTML = `${students[i].courses.map(course => course.name)} ${students[i].courses.map(course => course.duration)}`
        // ul.appendChild(li)
        newCard.appendChild(cardContent);
        studentData.appendChild(newCard);
    }

    let addCourseActions = document.querySelectorAll('.addCourseBtn');
    addCourseActions.forEach(addCourseBtn => addCourseBtn.addEventListener('click', () => {
        currentStudentId = addCourseBtn.attributes["data-studentid"].value;
        // let studentId = addCourseBtn.attributes["data-studentid"].value;
        // console.log(`student ID: ${currentStudentId}`)
    }));
    let editInfoActions = document.querySelectorAll('.editInfoBtn');
    editInfoActions.forEach(editInfoBtn => editInfoBtn.addEventListener('click', () => {
        currentStudentId = editInfoBtn.attributes["data-studentid"].value;
    }));
}

function editInfo() {
    let editName = document.getElementById("edit_form_name").value;
    let editLastName = document.getElementById("edit_form_last_name").value;
    let editStudent = students.filter(student => student.id === parseInt(currentStudentId))[0];
    editStudent.name = editName;
    editStudent.last_name = editLastName;
    postStudentData(students);
}

//----------------- GET Course INFO -------------------
async function getCourseApi() {
    const response = await fetch(`https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json`)
    // console.log(response);
    const body = await response.json()
    // console.log(body);
    courses = body.map((course) => new Courses(course.name, course.duration, course.id, course.students))

    // console.log(courses);
}

function postCoursesData(courses) {
    coursesData.innerHTML = "";
    // console.log(courses)
    for (i = 0; i < courses.length; i++) {

        let newCardCourse = document.createElement("div");
        let cardContentCourse = document.createElement("p");
        const card = `
         <div class="card mb-5" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${courses[i].name} </h5>
                <p class="card-text">${courses[i].students.map(student => student.name)}</p>
              <p class="card-text">${courses[i].duration}</p>
              <button id = "addStudenBtn" data-courseid="${courses[i].id}" type="submit" class="btn btn-dark addStudentBtn" data-toggle="modal"
              data-target="#addStudentModal">Add Student</button>
            </div>
          </div>`
        cardContentCourse.innerHTML = card;
        // cardContentCourse.innerHTML = `${courses[i].name} ${courses[i].duration}`;
        newCardCourse.appendChild(cardContentCourse);
        coursesData.appendChild(newCardCourse);
    }
    let addStudentActions = document.querySelectorAll('.addStudentBtn');
    let studentCount = 0;
    addStudentActions.forEach(addStudentBtn => addStudentBtn.addEventListener('click', () => {

        currentCourseId = addStudentBtn.attributes["data-courseid"].value;
        // let studentId = addCourseBtn.attributes["data-studentid"].value;
        // console.log(`course ID: ${currentCourseId}`)
    }));
}

function hideStudents() {
    studentData.setAttribute('style', 'display:none!important');
    // studentData.style.display = "none!important";
    coursesData.style.display = "flex";
}

function hideCources() {
    coursesData.setAttribute('style', 'display:none!important');
    // coursesData.style.display = "none!important";
    studentData.style.display = "flex";
}

//-----------------  BUTTONS -------------------

studentsButton.addEventListener('click', (event) => {
    hideCources();
    postStudentData(students);
    createCourseSelection()
});

coursesButton.addEventListener('click', (event) => {
    hideStudents();
    postCoursesData(courses);
    createStudentsSelection()
});

// ------------------- POST Request ----------------
async function addStudent() {
    let formName = document.getElementById("form_name").value;
    let formlast_name = document.getElementById("form_last_name").value;

    const response = await fetch('https://student-challenge-api.herokuapp.com/students', {
        method: 'post',
        body: JSON.stringify({
            name: formName,
            last_name: formlast_name
        }),
        headers: { "Content-Type": "application/json" }
    })
    const body = await response.json()
    // console.log(body)
    let newStudent = new Student(body.student.name, body.student.last_name, body.student.id, body.student.status)
    students.push(newStudent);
    postStudentData(students);

}
function createCourseSelection() {
    for (var i = 0; i < courses.length; i++) {
        var optn = courses[i].name
        let courseID = courses[i].id
        let selectOption = document.createElement("option");
        selectOption.setAttribute("courseID", `${courses[i].id}`)
        selectOption.textContent = optn;
        selectOption.value = courseID;
        modalSelect.appendChild(selectOption);

    }
}
function createStudentsSelection() {
    for (var i = 0; i < students.length; i++) {
        var optn = `${students[i].name} ${students[i].last_name}`
        let studentID = students[i].id
        let selectOption = document.createElement("option");
        selectOption.setAttribute("studentID", `${students[i].id}`)
        selectOption.textContent = optn;
        selectOption.value = studentID;
        modalSelectStudent.appendChild(selectOption);
    }
}

saveButton.onclick = function () { addStudent() };
editInfoButton.onclick = function () { editInfo() }
addCourseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const courseID = event.target.courseID.value
    // console.log(`course id: ${courseID}`);
    let currentStudent = students.filter(student => student.id === parseInt(currentStudentId))[0];
    let currentCourse = courses.filter(course => course.id === parseInt(courseID))[0];
    if (currentCourse.count >= studentsMax) {
        alert("Course is full")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentStudent.count >= coursesMax) {
        alert("Student reached maximum course limit")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentCourse.students.filter(student => student.id === parseInt(currentStudentId)).length > 0) {
        alert("This student already registered for this course!")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentCourse.students.filter(student => student.id === parseInt(currentStudentId)).length > 0) {
        alert("This student already registered for this course!")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentStudent.status == false) {
        alert("Student`s status is inactive. Registration is DENIED")
        $(event.target).closest('.modal').modal('hide')
    }

    else {
        currentCourse.count++;
        currentStudent.count++;
        currentCourse.students.push(currentStudent);
        currentStudent.courses.push(currentCourse);
        postCoursesData(courses);
        postStudentData(students)
        $(event.target).closest('.modal').modal('hide')
    }
});

addStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let studentID = event.target.studentID.value
    // console.log(event)
    let currentStudent = students.filter(student => student.id === parseInt(studentID))[0];
    let currentCourse = courses.filter(course => course.id === parseInt(currentCourseId))[0];
    // console.log(currentCourse.count)
    // if (currentCourse.count >= studentsMax || currentStudent.count >= coursesMax || currentStudent.courses.filter(course => course.id === parseInt(currentCourseId)).length > 0) {
    if (currentCourse.count >= studentsMax) {
        alert("Course is full")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentStudent.count >= coursesMax) {
        alert("Student reached maximum course limit")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentStudent.courses.filter(course => course.id === parseInt(currentCourseId)).length > 0) {
        alert("This student already registered for this course!")
        $(event.target).closest('.modal').modal('hide')
    }
    else if (currentStudent.status == false) {
        alert("Student`s status is inactive. Registration is DENIED")
        $(event.target).closest('.modal').modal('hide')
    }
    else {
        currentCourse.count++;
        currentStudent.count++;
        currentCourse.students.push(currentStudent);
        currentStudent.courses.push(currentCourse);
        postCoursesData(courses);
        postStudentData(students)
        $(event.target).closest('.modal').modal('hide')
    }
});
getStudentApi();
getCourseApi();




































































