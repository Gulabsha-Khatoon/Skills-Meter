document.addEventListener('DOMContentLoaded', () => {
    const skillForm = document.getElementById('skillForm');
    const skillsContainer = document.getElementById('skills-container');
    const addSkillBtn = document.getElementById('addSkill');
    const result = document.getElementById('result');
    const themeToggle = document.getElementById('themeToggle');
  
    // Dark Mode
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark');
    });
  
    // Add more skills
    addSkillBtn.addEventListener('click', () => {
      const div = document.createElement('div');
      div.classList.add('skill-input');
      div.innerHTML = `
        <input type="text" placeholder="Skill Name" required class="skill-name" />
        <input type="number" placeholder="Rating (1-10)" min="1" max="10" required class="skill-value" />
      `;
      skillsContainer.appendChild(div);
    });
  
    // Emoji based on score
    function getEmoji(val) {
      if (val <= 3) return '😐';
      else if (val <= 6) return '🙂';
      else if (val <= 8) return '💪';
      else return '🤩';
    }
  
    function getColor(val) {
      if (val <= 3) return '#e74c3c';  // red
      else if (val <= 6) return '#f39c12'; // orange
      else if (val <= 8) return '#27ae60'; // green
      else return '#2ecc71'; // bright green
    }
  
    function createBar(skill, value) {
      const percent = value * 10;
      const color = getColor(value);
      const emoji = getEmoji(value);
      return `
        <div class="skill-bar">
          <div class="skill-bar-fill" style="width:${percent}%; background-color:${color};">
            ${skill}: ${value}/10 ${emoji}
          </div>
        </div>
      `;
    }
  
    // Handle form submission
    skillForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('username').value;
      const skillNames = document.querySelectorAll('.skill-name');
      const skillValues = document.querySelectorAll('.skill-value');
  
      const skills = [];
      for (let i = 0; i < skillNames.length; i++) {
        const skill = skillNames[i].value.trim();
        const value = parseInt(skillValues[i].value);
        if (skill && value >= 1 && value <= 10) {
          skills.push({ skill, value });
        }
      }
  
      // Save to localStorage
      localStorage.setItem('skillData', JSON.stringify({ name, skills }));
  
      // Display
      result.innerHTML = `<h2>${name}'s Skill Meter</h2>`;
      skills.forEach(s => {
        result.innerHTML += createBar(s.skill, s.value);
      });
    });
  
    // Load saved data
    const saved = localStorage.getItem('skillData');
    if (saved) {
      const { name, skills } = JSON.parse(saved);
      result.innerHTML = `<h2>${name}'s Skill Meter</h2>`;
      skills.forEach(s => {
        result.innerHTML += createBar(s.skill, s.value);
      });
    }
  });
  