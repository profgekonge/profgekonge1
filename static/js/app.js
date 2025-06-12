// Projects data
const currentProjects = [
    {
        name: "AI Research Assistant",
        description: "Developing an AI-powered research assistant to help with academic paper analysis",
        status: "In Progress",
        tech: ["Python", "TensorFlow", "NLP"]
    },
    {
        name: "Smart Health Monitor",
        description: "IoT-based health monitoring system for remote patient care",
        status: "Planning",
        tech: ["IoT", "React", "Node.js"]
    }
];

// Loading event listeners and initializing cursor effects
document.addEventListener('DOMContentLoaded', () => {
    initializeCursorEffect();
    initializeFloatingCode();
    initializeTypingEffect();
});

// Projects Loading
function loadProjects() {
    const currentProjectsBody = document.getElementById('currentProjectsBody');
    const deployedProjectsBody = document.getElementById('deployedProjectsBody');
    
    if (currentProjects && currentProjects.length > 0) {
        currentProjectsBody.innerHTML = currentProjects.map(project => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800">${project.name}</h3>
                    <p class="text-gray-600 mt-2">${project.description}</p>
                    <div class="mt-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                   ${project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                                   project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                   'bg-gray-100 text-gray-800'}">
                            ${project.status}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    if (deployedProjects && deployedProjects.length > 0) {
        deployedProjectsBody.innerHTML = deployedProjects.map(project => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800">${project.name}</h3>
                    <p class="text-gray-600 mt-2">${project.description}</p>
                    <a href="${project.link}" target="_blank" 
                       class="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-full 
                              hover:bg-blue-600 transition-colors duration-200">
                        View Project
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// View Switching
function switchView(view) {
    const currentTable = document.querySelector('.project-table:nth-child(1)');
    const deployedTable = document.querySelector('.project-table:nth-child(2)');
    const controls = document.querySelectorAll('.table-control');
    
    controls.forEach(control => control.classList.remove('active'));
    event.target.classList.add('active');
    
    switch(view) {
        case 'current':
            currentTable.style.display = 'block';
            deployedTable.style.display = 'none';
            break;
        case 'deployed':
            currentTable.style.display = 'none';
            deployedTable.style.display = 'block';
            break;
        default:
            currentTable.style.display = 'block';
            deployedTable.style.display = 'block';
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const contactModal = document.getElementById('contactModal');
    const projectsModal = document.getElementById('projectsModal');
    if (event.target === contactModal) {
        closeBuyCoffeeModal();
    }
    if (event.target === projectsModal) {
        closeProjectsModal();
    }
};

// Dynamic Effects
function initializeCursorEffect() {
    const cursor = document.getElementById('cursor-gradient');
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${lastX}px, ${lastY}px)`;
        
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(updateCursor);
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    function updateCursor() {
        isMoving = false;
    }
}

function initializeFloatingCode() {
    const container = document.getElementById('floatingCode');
    const codeSnippets = [
        '{ code: "creativity" }',
        'function innovate() { }',
        'while(learning) { grow(); }',
        'import { passion } from "life"',
        'git commit -m "✨ magic"',
        'const future = await dreams()',
        'npm install success',
        'class Innovation extends Future',
        'do { create() } while (inspired)',
        'export default Excellence'
    ];    function createCodeElement() {
        const code = document.createElement('div');
        code.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        code.className = 'code-element';
        
        // Random horizontal position but start from bottom
        code.style.left = Math.random() * 80 + 10 + '%'; // Keep away from edges
        code.style.bottom = '0'; // Start at the bottom
        container.appendChild(code);

        // Longer duration for full screen traversal
        const duration = 25000 + Math.random() * 5000; // 25-30 seconds
        code.style.animationDuration = `${duration}ms`;
        
        // Remove element after animation
        setTimeout(() => {
            code.remove();
            createCodeElement();
        }, duration);
    }

    // Create initial code elements with staggered timing
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createCodeElement();
        }, i * 1000); // Stagger the creation by 1 second each
    }
}

function initializeTypingEffect() {
    const roles = [
        "Full Stack Developer",
        "AI Enthusiast",
        "Creative Problem Solver",
        "Tech Innovator"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;
    const element = document.getElementById('dynamicText');

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, pauseDuration);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
    }

    type();
}
