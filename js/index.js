const body = document.querySelector('body');
const footer = document.createElement('footer');
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement('p');
copyright.innerHTML = `© Saul Acosta ${thisYear}`;

footer.appendChild(copyright);

const skills = ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Responsive Design", "Web Development", "Code the Dream"];

const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;
  
  const messageSection = document.getElementById('messages');
  const messageList = messageSection.querySelector('ul');
  
  const newMessage = document.createElement('li');
  
  newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span> - Email: <a href="mailto:${usersEmail}">${usersEmail}</a></span>
    <span> - Message: ${usersMessage}</span>
  `;
  
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.type = 'button';
  
  removeButton.addEventListener('click', function() {
    const entry = this.parentNode;
    entry.remove();
  });
  
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  
  event.target.reset();
});

fetch('https://api.github.com/users/bcs337/repos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  })
  .then(repositories => {
    console.log('GitHub repositories:', repositories);
    displayRepositories(repositories);
  })
  .catch(error => {
    console.error('An error occurred while fetching repositories:', error);
    displayError();
  });

function displayRepositories(repositories) {
  const projectSection = document.getElementById('projects');
  const projectList = projectSection.querySelector('ul');
  
  projectList.innerHTML = '';
  
  for (let i = 0; i < repositories.length; i++) {
    const project = document.createElement('li');
    project.innerText = repositories[i].name;
    projectList.appendChild(project);
  }
}

function displayError() {
  const projectSection = document.getElementById('projects');
  const projectList = projectSection.querySelector('ul');
  
  projectList.innerHTML = '<li>Sorry, unable to load projects at this time.</li>';
}

// Marvel API configuration
const MARVEL_PUBLIC_KEY = '339e1842b552df3fdfb719066fca8583';
const MARVEL_BASE_URL = 'https://gateway.marvel.com/v1/public';

// Function to fetch Marvel characters
async function fetchMarvelCharacters() {
    try {
        console.log('Fetching Marvel characters...');
        
        // Fetch popular Marvel characters (limit to 20 for now)
        const response = await fetch(`${MARVEL_BASE_URL}/characters?apikey=${MARVEL_PUBLIC_KEY}&limit=20&orderBy=name`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Marvel API Response:', data);
        
        displayCharacters(data.data.results);
        
    } catch (error) {
        console.error('Error fetching Marvel data:', error);
        displayError('Unable to load Marvel characters. Please try again later.');
    }
}

// Function to display characters on the page
function displayCharacters(characters) {
    const contentSection = document.getElementById('content');
    const dataDisplay = document.getElementById('data-display');
    
    // Update the heading
    contentSection.querySelector('h2').textContent = 'Marvel Characters';
    
    // Clear loading message
    dataDisplay.innerHTML = '';
    
    // Create character cards
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        
        // Get character image (use standard_medium size)
        const imageUrl = `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`;
        
        // Create character description (limit length)
        const description = character.description || 'No description available.';
        const shortDescription = description.length > 150 
            ? description.substring(0, 150) + '...' 
            : description;
        
        characterCard.innerHTML = `
            <img src="${imageUrl}" alt="${character.name}" class="character-image">
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${shortDescription}</p>
                <div class="character-stats">
                    <span>Comics: ${character.comics.available}</span>
                    <span>Series: ${character.series.available}</span>
                </div>
            </div>
        `;
        
        dataDisplay.appendChild(characterCard);
    });
}

// Function to display error message
function displayError(message) {
    const contentSection = document.getElementById('content');
    const dataDisplay = document.getElementById('data-display');
    
    contentSection.querySelector('h2').textContent = 'Error';
    dataDisplay.innerHTML = `<p class="error-message">${message}</p>`;
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Marvel API project loaded!');
    fetchMarvelCharacters();
});