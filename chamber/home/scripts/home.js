// Navigation and Dates
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#primaryNav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Course Data (Portfolio)
const courses = [
    { subject: 'CSE', number: 110, credits: 2, completed: true },
    { subject: 'WDD', number: 130, credits: 2, completed: true },
    { subject: 'CSE', number: 111, credits: 2, completed: true },
    { subject: 'CSE', number: 210, credits: 2, completed: false },
    { subject: 'WDD', number: 131, credits: 2, completed: true },
    { subject: 'WDD', number: 231, credits: 2, completed: false }
];

function displayCourses(filter = 'All') {
    const container = document.querySelector('#courseList');
    container.innerHTML = '';
    const filtered = filter === 'All' ? courses : courses.filter(c => c.subject === filter);
    
    filtered.forEach(c => {
        const div = document.createElement('div');
        div.className = `course-item ${c.completed ? 'completed' : ''}`;
        div.textContent = `${c.completed ? '✔ ' : ''}${c.subject} ${c.number}`;
        container.appendChild(div);
    });
    
    const total = filtered.reduce((acc, c) => acc + c.credits, 0);
    document.querySelector('#totalCredits').textContent = total;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
        e.target.classList.add('active-filter');
        displayCourses(e.target.dataset.filter);
    });
});

// Weather API (Chamber)
const lat = -34.70, lon = -58.39, key = 'adfc6e872caf14d61510ca11d8fd639c';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

async function getWeatherData() {
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        document.querySelector('#current-temp').textContent = Math.round(data.main.temp);
        document.querySelector('#weather-desc').textContent = data.weather[0].description;
        document.querySelector('#weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        const fRes = await fetch(forecastUrl);
        const fData = await fRes.json();
        const forecastContainer = document.querySelector('#forecast-info');
        const daily = fData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);
        forecastContainer.innerHTML = daily.map(d => `<p>${new Date(d.dt_txt).toDateString()}: ${Math.round(d.main.temp)}°C</p>`).join('');
    } catch (e) { console.error(e); }
}

// Spotlights (Chamber)
async function getSpotlights() {
    try {
        const res = await fetch('chamber/data/members.json');
        const members = await res.json();
        const eligible = members.filter(m => m.membershipLevel >= 2);
        const random = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
        const container = document.querySelector('#spotlight-container');
        container.innerHTML = random.map(m => `
            <div class="spotlight-card">
                <h3>${m.names}</h3>
                <img src="${m.image}" alt="${m.names}" width="80">
                <p>${m.phone}</p>
                <a href="${m.website}" target="_blank">Visit Site</a>
            </div>
        `).join('');
    } catch (e) { console.error(e); }
}

// Init
displayCourses();
getWeatherData();
getSpotlights();