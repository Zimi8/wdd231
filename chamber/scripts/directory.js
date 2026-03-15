
const menuBtn = document.getElementById('menuBtn');
const primaryNav = document.getElementById('primaryNav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', primaryNav.classList.contains('open'));
});


document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;


const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const directoryContainer = document.getElementById('directory-container');

gridBtn.addEventListener('click', () => {
    directoryContainer.classList.add('grid-view');
    directoryContainer.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.add('list-view');
    directoryContainer.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

//render render the thing
async function getMembers() {
    try {

        const response = await fetch('scripts/member.json'); 
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displayMembers = (members) => {

    directoryContainer.innerHTML = '';
    
    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');
        

        card.innerHTML = `
            <img src="${member.image}" alt="${member.names} Logo" loading="lazy">
            <h3>${member.names}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="website"><a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace('https://', '').replace('www.', '')}</a></p>
        `;
        

        directoryContainer.appendChild(card);
    });
}
//call the members!
getMembers();