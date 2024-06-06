"use strict"


// let coursesData = [];

// function GrabCourseDataFromAPI() {
//     fetch("http://localhost:8081/api/courses")
//         .then((response) => response.json())
//         .then((data) => {
//         coursesData = data;
//         console.log(data);
//         populateCoursesDropdown(data);
//         })
//         .catch((error) => {
//           console.error('Error fetching course data', error);
//         });
// }

// function populateCoursesDropdown(data){
//     const dropdownCourse = document.getElementById("courseNameOptions");
//     const fragment = document.createDocumentFragment();

//     data.forEach(item => {
//         const option = document.createElement("option");
//         option.value = item.courseName;
//         option.text = `${item.courseName}`;
//         fragment.appendChild(option);
//     });
//     dropdownCourse.appendChild(fragment);

// }

// function courseDetails(courseName){
// const selectedCourse = coursesData.find(course => course.courseName === courseName);
// const courseDetails = document.getElementById("courseDetails");

// if(selectedCourse){
//     courseDetails.innerHTML = `
//     <h2>${selectedCourse.courseName}</h2>
//     <p>Course Number: ${selectedCourse.courseNum}</p>
//     <p>Department: ${selectedCourse.dept}</p>
//     <a href="details.html"><button id=showDetails>Show Details</button></a>
    
//     `;
// }else {
//     courseDetails.innerHTML = "<p>No course details available.</p>"
// }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("courseNameOptions").addEventListener("change", (event) => {
//         const selectedCourseName = event.target.value;
//         courseDetails(selectedCourseName);
//     });

// GrabCourseDataFromAPI();

// })

"use strict";

let coursesData = [];

function GrabCourseDataFromAPI() {
    fetch("http://localhost:8081/api/courses")
        .then(response => response.json())
        .then(data => {
            coursesData = data;
            console.log(data);
            populateCoursesTable(data);
        })
        .catch(error => {
            console.error('Error fetching course data', error);
        });
}

function populateCoursesTable(data) {
    const tableBody = document.getElementById("coursesTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Clear any existing data

    data.forEach(item => {
        const row = document.createElement("tr");

        const courseNameCell = document.createElement("td");
        courseNameCell.textContent = item.courseName;
        row.appendChild(courseNameCell);

        const courseNumberCell = document.createElement("td");
        courseNumberCell.textContent = item.courseNum;
        row.appendChild(courseNumberCell);

        const departmentCell = document.createElement("td");
        departmentCell.textContent = item.dept;
        row.appendChild(departmentCell);

        const detailsCell = document.createElement("td");
        const anchor = document.createElement("a");
        anchor.href = `details.html?courseid=${item.id}`;
        anchor.textContent = "Show details";
        detailsCell.appendChild(anchor);
        row.appendChild(detailsCell);

        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    GrabCourseDataFromAPI();
});



function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displayCourseDetails(course) {
    const courseDetailsElement = document.getElementById("courseDetails");
    courseDetailsElement.innerHTML = //this is to change the text - innerHTML
    ` 
        <h2>${course.courseName}</h2>
        <p>Course Number: ${course.courseNum}</p>
        <p>Department: ${course.dept}</p>
        <p>Instructor: ${course.instructor}</p>
        <p>Start Date: ${course.startDate}</p>
        <p>Duration: ${course.duration} days</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const courseId = getQueryParameter('courseid');
    if (courseId) {
        fetch(`http://localhost:8081/api/courses/${courseId}`)
            .then(response => response.json())
            .then(course => {
                displayCourseDetails(course);
            })
            .catch(error => {
                console.error('Error fetching course details', error);
            });
    } else {
        document.getElementById("courseDetails").innerHTML = "<p>No course ID provided.</p>";
    }
});