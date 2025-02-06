"use strict";  //rosali Johansson, Mittuniversitetet 2025-02-06

//array for course data from fetch
let courses = []

//eventlistener for search field
document.querySelector("#search").addEventListener("input", filterData);

//for sorting fields in alphabetical order
 let alphabeticalOrder = true;


window.onload = function () {
    getData()
};

//fetch course data
async function getData() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("fel vid anslutning till data")
        }
        courses = await response.json();
        printCourses(courses) //run function printCourses
    } catch (error) {
        console.error("error: ", error);
    };
};

//filter course information through search field value
function filterData() {
    const searchPhrase = document.querySelector("#search").value;
    const filteredData =
        courses.filter(course => //search by code name or course name, no matter uppercase or lowercase
            course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            course.code.toLowerCase().includes(searchPhrase.toLowerCase())
        );
    printCourses(filteredData) //print the filtered data
};

//function for printing out course information to website
function printCourses(data) {
    const tbodyEl = document.querySelector("tbody");
    tbodyEl.innerHTML = "";
    data.forEach(data => {
        tbodyEl.innerHTML += `<tr><td id="courseCode">${data.code}</td><td id="courseName">${data.coursename}</td><td id="courseProgression">${data.progression}</td></tr>`
    })

    // sort coursename in alpabethical order on click
    let namnEl = document.getElementById("namn");
    namnEl.addEventListener("click", sortName)
   // sort coursecode in alpabethical order on click
    let kurskodEl = document.getElementById("kurskod");
    kurskodEl.addEventListener("click", sortCode)
   // sort progression in alpabethical order on click
    let progressionEl = document.getElementById("progression");
    progressionEl.addEventListener("click", sortProgression)
};

//function for sorting name alphabetically, and toggle to backwards order
function sortName() {
    courses.sort((a, b) => {
        if (alphabeticalOrder) { 
            return a.coursename > b.coursename ? 1 : -1;
        } else { //toggle to opposite order
            return a.coursename < b.coursename ? 1 : -1;
        }
    });
    alphabeticalOrder = !alphabeticalOrder;
    printCourses(courses)
};

//function for sorting coursecode alphabetically, and toggle to backwards order
function sortCode() {
    courses.sort((a, b) => {
        if (alphabeticalOrder) {
            return a.code> b.code ? 1 : -1;
        } else {//toggle to opposite order
            return a.code < b.code ? 1 : -1;
        }
    });
    alphabeticalOrder = !alphabeticalOrder;
    printCourses(courses)
};
 
  //function for sorting progression alphabetically, and toggle to backwards order
function sortProgression() {
    courses.sort((a, b) => {
        if (alphabeticalOrder) {
            return a.progression > b.progression ? 1 : -1;
        } else {//toggle to opposite order
            return a.progression < b.progression ? 1 : -1;
        }
    });
    alphabeticalOrder = !alphabeticalOrder;
    printCourses(courses)
};




