const internships = [
    { id: 1, title: "Web Developer Intern", description: "Create responsive websites and web apps using HTML, CSS, JavaScript, and modern frameworks." },
    { id: 2, title: "Marketing Intern", description: "Social media and outreach." },
    { id: 3, title: "Data Analyst Intern", description: "Analyze datasets to find trends and insights using SQL, Excel, Python, or visualization tools." },
    { id: 4, title: "Software Developer Intern", description: "Assist in building and testing software applications, using languages like Java, Python, or C++." },
    { id: 5, title: "Mobile App Development Intern", description: "Design and develop mobile applications for Android or iOS using Kotlin, Java, Swift, or Flutter." },
    { id: 6, title: "Cybersecurity Intern", description: "Help monitor networks, identify vulnerabilities, and implement security measures." },
    { id: 7, title: "Machine Learning Intern", description: "Work on AI models for prediction, classification, or automation using Python and ML libraries." },
    { id: 8, title: "Network Engineering Intern", description: "Support the configuration and maintenance of network systems and troubleshoot connectivity issues." },
    { id: 9, title: "Embedded Systems Intern", description: "Work on programming microcontrollers and developing systems that integrate with hardware." },
    { id: 10, title: "DevOps Intern", description: "Learn about automation, containerization, and deployment using tools like Docker and Jenkins." },
    { id: 11, title: "IT Support Intern", description: "Provide technical assistance, resolve software/hardware issues, and maintain IT infrastructure." },
    { id: 12, title: "Database Management Intern", description: "Help manage, optimize, and query data using MySQL, PostgreSQL, or MongoDB." },
    { id: 13, title: "UI/UX Design Intern", description: "Create user-friendly designs and wireframes with tools like Figma, Adobe XD, and basic front-end coding." },
    { id: 14, title: "Game Development Intern", description: "Design and develop video games using engines like Unity or Unreal, with a focus on logic and user experience." },
    { id: 15, title: "Blockchain Developer Intern", description: "Assist in building decentralized apps and smart contracts using Ethereum and Solidity." }
];

let studentName = "";
let selectedInternship = null;
const applications = [];

function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'flex';
    if (id === 'studentDashboard') {
        displayNotifications();
    }
}

function nextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
}

function prevStep(currentStepId, prevStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(prevStepId).classList.add('active');
}

function loginStudent() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username.trim() !== "" && password.trim() !== "") {
        showSection('studentDashboard');
        displayInternships();
        displayNotifications();
    } else {
        alert('Please enter both username and password.');
    }
}

function loginAdmin() {
    const code = document.getElementById('adminCode').value;
    if (code === 'admin123') {
        showSection('adminDashboard');
        displaySubmissions();
    } else {
        alert("Invalid admin code");
    }
}

function displayInternships() {
    const list = document.getElementById('internshipList');
    list.innerHTML = '';
    internships.forEach(intn => {
        const div = document.createElement('div');
        div.className = 'internship';
        div.innerHTML = `
            <h3>${intn.title}</h3>
            <p>${intn.description}</p>
            <button onclick="applyInternship(${intn.id})">Apply</button>
        `;
        list.appendChild(div);
    });
}

function applyInternship(id) {
    selectedInternship = internships.find(i => i.id === id);
    showSection('applicationForm');
}

function submitApplication() {
    const resume = document.getElementById('resumeLink').value;
    const letter = document.getElementById('coverLetter').value;

    if (resume.trim() === '' || letter.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    applications.push({
        student: studentName,
        internship: selectedInternship.title,
        resume,
        letter,
        status: 'Pending'
    });

    alert('Application submitted successfully!');
    showSection('studentDashboard');
    displayNotifications();
}

function displaySubmissions() {
    const subs = document.getElementById('submissions');
    subs.innerHTML = '';
    applications.forEach((app, idx) => {
        const div = document.createElement('div');
        div.className = 'student-submission';
        div.innerHTML = `
            <h4>${app.student} - ${app.internship}</h4>
            <p><strong>Resume:</strong> <a href="${app.resume}" target="_blank">View</a></p>
            <p><strong>Cover Letter:</strong> ${app.letter}</p>
            <p><strong>Status:</strong> ${app.status}</p>
            <div class="admin-buttons">
                <button onclick="updateStatus(${idx}, 'Accepted')">Accept</button>
                <button onclick="updateStatus(${idx}, 'Rejected')">Reject</button>
                <button onclick="editApplication(${idx})">Edit</button>
                <button onclick="deleteApplication(${idx})">Delete</button>
            </div>
        `;
        subs.appendChild(div);
    });
}

function updateStatus(index, status) {
    applications[index].status = status;
    displaySubmissions();
    if (applications[index].student === studentName) {
        displayNotifications();
    }
}

function editApplication(index) {
    const app = applications[index];
    const newResume = prompt("Update resume link:", app.resume);
    const newLetter = prompt("Update cover letter:", app.letter);

    if (newResume !== null && newLetter !== null) {
        applications[index].resume = newResume;
        applications[index].letter = newLetter;
        alert("Application updated.");
        displaySubmissions();
        if (applications[index].student === studentName) {
            displayNotifications();
        }
    }
}

function deleteApplication(index) {
    if (confirm("Are you sure you want to delete this application?")) {
        const removed = applications.splice(index, 1)[0];
        alert(`Application for ${removed.internship} by ${removed.student} deleted.`);
        displaySubmissions();
        if (removed.student === studentName) {
            displayNotifications();
        }
    }
}

function displayNotifications() {
    const container = document.getElementById('studentNotifications');
    container.innerHTML = '';
    const userApps = applications.filter(app => app.student === studentName);
    if (userApps.length === 0) {
        container.innerHTML = '<p>No applications yet.</p>';
    } else {
        userApps.forEach(app => {
            const div = document.createElement('div');
            div.className = 'notification';
            div.innerHTML = `<strong>${app.internship}</strong>: Your application is <em>${app.status}</em>.`;
            container.appendChild(div);
        });
    }
} 