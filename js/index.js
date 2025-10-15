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
  })
  .catch(error => {
    console.error('An error occurred while fetching repositories:', error);
  });