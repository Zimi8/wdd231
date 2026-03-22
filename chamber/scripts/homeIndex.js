const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#primaryNav');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const lat = -34.70;
const lon = -58.39;
const key = 'adfc6e872caf14d61510ca11d8fd639c';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

async function getWeatherData() {
    try {
        const res = await fetch(weatherUrl);
        if (res.ok) {
            const data = await res.json();
            document.querySelector('#current-temp').textContent = Math.round(data.main.temp);
            document.querySelector('#weather-desc').textContent = data.weather[0].description;
            document.querySelector('#weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.querySelector('#weather-icon').alt = data.weather[0].description;
        }

        const fRes = await fetch(forecastUrl);
        if (fRes.ok) {
            const fData = await fRes.json();
            const forecastContainer = document.querySelector('#forecast-info');
            const daily = fData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);
            
            forecastContainer.innerHTML = daily.map(d => {
                const dateObj = new Date(d.dt_txt);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
                return `<p><strong>${dayName}:</strong> ${Math.round(d.main.temp)}&deg;C</p>`;
            }).join('');
        }
    } catch (e) { 
        console.error(e); 
    }
}

async function getSpotlights() {
    try {
        const res = await fetch('data/members.json');
        if (res.ok) {
            const members = await res.json();
            const eligible = members.filter(m => m.membershipLevel >= 2);
            const randomMembers = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
            const container = document.querySelector('#spotlight-container');
            
            container.innerHTML = randomMembers.map(m => `
                <div class="spotlight-item">
                    <h3>${m.names}</h3>
                    <img src="${m.image}" alt="${m.names} logo">
                    <p><strong>Phone:</strong> ${m.phone}</p>
                    <p><strong>Address:</strong> ${m.address}</p>
                    <p><strong>Level:</strong> ${m.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
                    <a href="${m.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                </div>
            `).join('');
        }
    } catch (e) { 
        console.error(e); 
    }
}

getWeatherData();
getSpotlights();