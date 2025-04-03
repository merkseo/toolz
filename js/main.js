// Load header and footer components
function loadComponents() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

// Tool data structure
const tools = [
    // Image Tools
    { id: 1, name: 'Image to PNG Converter', category: 'image', icon: 'fa-image', link: 'tools/image-to-png.html' },
    { id: 2, name: 'Image to JPG Converter', category: 'image', icon: 'fa-image', link: 'tools/image-to-jpg.html' },
    { id: 3, name: 'Image Resizer', category: 'image', icon: 'fa-expand', link: 'tools/image-resizer.html' },
    // Add more tools here...
];

// Display tools in grid
function displayTools(category = 'all') {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';

    const filteredTools = category === 'all' 
        ? tools 
        : tools.filter(tool => tool.category === category);

    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'col-md-4 col-lg-3 mb-4';
        toolCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                    <i class="fas ${tool.icon} fa-3x mb-3 text-primary"></i>
                    <h5 class="card-title">${tool.name}</h5>
                    <a href="${tool.link}" class="btn btn-outline-primary">Use Tool</a>
                </div>
            </div>
        `;
        toolsGrid.appendChild(toolCard);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTools = tools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm)
        );
        displayTools('all', filteredTools);
    });
}

// Category filter functionality
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display tools for selected category
            displayTools(button.dataset.category);
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    displayTools();
    setupSearch();
    setupCategoryFilters();
}); 