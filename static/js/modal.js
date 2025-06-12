// --- MODAL HANDLING LIKE THE REFERENCE PAGE ---

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        modal.classList.add('show');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        document.body.style.overflow = ''; // Restore scrolling
        modal.classList.remove('show');
    }
}

function toggleBuyCoffeeModal() {
    const modal = document.getElementById('contactModal');
    if (modal.classList.contains('show')) {
        hideModal('contactModal');
    } else {
        showModal('contactModal');
        // Reset form and payment state
        const form = document.getElementById('paymentForm');
        const spinner = document.getElementById('paymentSpinner');
        const payButton = document.getElementById('payButton');
        if (form) {
            form.reset();
            spinner.classList.add('hidden');
            payButton.disabled = false;
        }
    }
}

function toggleProjectsModal() {
    const modal = document.getElementById('projectsModal');
    if (modal.classList.contains('show')) {
        hideModal('projectsModal');
    } else {
        showModal('projectsModal');
        loadProjects();
    }
}

function closeProjectsModal() {
    hideModal('projectsModal');
}

function closeBuyCoffeeModal() {
    hideModal('contactModal');
    const form = document.getElementById('paymentForm');
    if (form) form.reset();
}

function loadProjects() {
    const currentProjectsBody = document.getElementById('currentProjectsBody');
    if (typeof currentProjects !== 'undefined' && currentProjects && currentProjects.length > 0) {
        currentProjectsBody.innerHTML = currentProjects.map(project => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800">${project.name}</h3>
                    <p class="text-gray-600 mt-2">${project.description}</p>
                    <div class="mt-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                   ${project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                                     project.status === 'Planning' ? 'bg-blue-100 text-blue-800' : 
                                     'bg-green-100 text-green-800'}">
                            ${project.status}
                        </span>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${project.tech.map(tech => `
                            <span class="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Make functions available globally
window.toggleProjectsModal = toggleProjectsModal;
window.toggleBuyCoffeeModal = toggleBuyCoffeeModal;
window.closeProjectsModal = closeProjectsModal;
window.closeBuyCoffeeModal = closeBuyCoffeeModal;
window.showModal = showModal;
window.hideModal = hideModal;

// Close modals when clicking outside
// (use event delegation for both modals)
document.addEventListener('click', (event) => {
    const contactModal = document.getElementById('contactModal');
    const projectsModal = document.getElementById('projectsModal');
    if (event.target === contactModal) {
        hideModal('contactModal');
    }
    if (event.target === projectsModal) {
        hideModal('projectsModal');
    }
});
