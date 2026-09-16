  
function showPage(pageId) {
    const plannerPage = document.getElementById("plannerPage");
    const resourcesPage = document.getElementById("resourcesPage");

    if (pageId === "plannerPage") {
        plannerPage.style.display = "block";
        resourcesPage.style.display = "none";
    } else if (pageId === "resourcesPage") {
        plannerPage.style.display = "none";
        resourcesPage.style.display = "block";
    }
}

  
const quotes = [
    "The secret of getting ahead is getting started. ✨",
    "Focus on progress, not perfection. 🎯",
    "Small daily improvements over time lead to stunning results. 🚀",
    "Your future self will thank you for the hard work today. 📖"
];

function displayRandomQuote() {
    const quoteElement = document.getElementById("motivationQuote");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    if (quoteElement) {
        quoteElement.textContent = quotes[randomIndex];
    }
}

 
function setStudentName() {
    const nameInput = document.getElementById("studentNameInput");
    const greeting = document.getElementById("studentGreeting");

    if (nameInput && nameInput.value.trim() !== "") {
        greeting.textContent = `Welcome, ${nameInput.value.trim()}! Let's conquer today's schedule 🌟`;
        nameInput.value = "";
    } else {
        alert("Please enter your name!");
    }
}
 
let totalHours = 0;
let hasReached15Hours = false;  

function addCourses() {
    const courseNameInput = document.getElementById("courseName");
    const courseHoursInput = document.getElementById("courseHours");
    const tableBody = document.getElementById("coursesTableBody");
    const totalHoursCell = document.getElementById("totalHoursCell");

    const name = courseNameInput.value.trim();
    const hours = parseInt(courseHoursInput.value);

    if (name === "" || isNaN(hours) || hours <= 0) {
        alert("Please enter a valid course name and study hours!");
        return;
    }

    // Add Row to Table
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${hours} Hours</td>
        <td><button type="button" class="btn-danger" onclick="deleteRow(this, ${hours})">Delete</button></td>
    `;
    tableBody.appendChild(row);

   
    totalHours += hours;
    totalHoursCell.textContent = `${totalHours} Hours`;
 
    courseNameInput.value = "";
    courseHoursInput.value = "";

   
    check15HoursAchievement();
} 

function deleteRow(button, hours) {
    const row = button.parentElement.parentElement;
    row.remove();

    totalHours -= hours;
    if (totalHours < 0) totalHours = 0;
    
    document.getElementById("totalHoursCell").textContent = `${totalHours} Hours`;

     
    if (totalHours < 15) {
        hasReached15Hours = false;
    }
}

// Clear All Courses
function clearAllCourses() {
    const tableBody = document.getElementById("coursesTableBody");
    tableBody.innerHTML = "";
    totalHours = 0;
    hasReached15Hours = false;
    document.getElementById("totalHoursCell").textContent = "0 Hours";
}
 
function check15HoursAchievement() {
    if (totalHours >= 15 && !hasReached15Hours) {
        hasReached15Hours = true; 
        const modal = document.getElementById("achievementModal");
        if (modal) {
            modal.style.display = "flex";    
        }
    }
}
 
function closeAchievementModal() {
    const modal = document.getElementById("achievementModal");
    if (modal) {
        modal.style.display = "none";
    }
}

 
function checkPerformance() {
    const gradeResult = document.getElementById("gradeResult");
    const badgeContainer = document.getElementById("badgeContainer");

    if (totalHours >= 15) {
        gradeResult.textContent = "Outstanding effort! You have a dedicated high-level study plan! 🎉";
        badgeContainer.textContent = "🏆 Master Scholar Badge";
    } else if (totalHours >= 7) {
        gradeResult.textContent = "Great job! A steady and balanced study plan 🎯";
        badgeContainer.textContent = "⭐ Consistent Learner Badge";
    } else if (totalHours > 0) {
        gradeResult.textContent = "Good start! Consider adding a few more hours 💡";
        badgeContainer.textContent = "🌱 Starter Badge";
    } else {
        gradeResult.textContent = "Please add some courses first to evaluate your schedule!";
        badgeContainer.textContent = "";
    }
}

function runSessionsLoop() {
    const sessionsContainer = document.getElementById("sessionsContanier");
    sessionsContainer.innerHTML = "<h3>Generated Focus Sessions:</h3>";

    if (totalHours === 0) {
        sessionsContainer.innerHTML += "<p>Add courses first to break them down into sessions.</p>";
        return;
    }

    const sessionLength = 2;  
    let sessionCount = Math.ceil(totalHours / sessionLength);

    let ul = document.createElement("ul");
    for (let i = 1; i <= sessionCount; i++) {
        let li = document.createElement("li");
        li.textContent = `Focus Session #${i}: ${sessionLength} Hours (Pomodoro Technique)`;
        ul.appendChild(li);
    }
    sessionsContainer.appendChild(ul);
}
 
window.onload = function() {
    displayRandomQuote();
};