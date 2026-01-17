// Sample data structure for presentations
const presentations = [
    {
        id: 1,
        date: "2026-01-20",
        title: "Quantum Chromodynamics and the Proton Spin Crisis",
        presenter: "Dr. Sarah Johnson",
        authors: "Smith, J., et al.",
        journal: "Physical Review Letters",
        year: 2025,
        abstract: "Recent advances in understanding the proton spin structure through lattice QCD calculations and experimental measurements.",
        status: "upcoming"
    },
    {
        id: 2,
        date: "2026-01-27",
        title: "Nuclear Structure in Neutron-Rich Isotopes Near the Drip Line",
        presenter: "Michael Chen",
        authors: "Anderson, K., et al.",
        journal: "Nature Physics",
        year: 2025,
        abstract: "Experimental investigation of exotic nuclear structures in neutron-rich isotopes approaching the neutron drip line.",
        status: "upcoming"
    },
    {
        id: 3,
        date: "2026-01-13",
        title: "Heavy-Ion Collisions and the Quark-Gluon Plasma",
        presenter: "Prof. Emily Rodriguez",
        authors: "Johnson, M., et al.",
        journal: "Physical Review C",
        year: 2025,
        abstract: "Analysis of collective flow and jet quenching in ultra-relativistic heavy-ion collisions at RHIC and LHC energies.",
        status: "past"
    },
    {
        id: 4,
        date: "2026-01-06",
        title: "Nuclear Reactions for Astrophysics: The r-process",
        presenter: "Dr. James Wilson",
        authors: "Lee, S., et al.",
        journal: "The Astrophysical Journal",
        year: 2024,
        abstract: "Theoretical calculations of nuclear reaction rates relevant to rapid neutron capture process nucleosynthesis.",
        status: "past"
    },
    {
        id: 5,
        date: "2025-12-16",
        title: "Chiral Effective Field Theory in Nuclear Physics",
        presenter: "Dr. Amanda Martinez",
        authors: "Brown, T., et al.",
        journal: "Reviews of Modern Physics",
        year: 2024,
        abstract: "Systematic approach to nuclear forces and currents using chiral effective field theory.",
        status: "past"
    }
];

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function isUpcoming(dateString) {
    return new Date(dateString) > new Date();
}

// Home page functionality
function loadHomePage() {
    const nextPresentation = presentations
        .filter(p => isUpcoming(p.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    const nextCard = document.getElementById('next-presentation');
    if (nextCard && nextPresentation) {
        nextCard.innerHTML = `
            <div class="date">${formatDate(nextPresentation.date)}</div>
            <h3 class="paper-title">${nextPresentation.title}</h3>
            <p class="presenter">Presenter: <span>${nextPresentation.presenter}</span></p>
            <p class="paper-info">Journal: <span>${nextPresentation.journal}</span> | Year: <span>${nextPresentation.year}</span></p>
            <p class="abstract">${nextPresentation.abstract}</p>
        `;
    }

    const recentList = document.getElementById('recent-presentations');
    if (recentList) {
        const recentPresentations = presentations
            .filter(p => !isUpcoming(p.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        recentList.innerHTML = recentPresentations.map(p => `
            <div class="presentation-card">
                <div class="date">${formatDate(p.date)}</div>
                <h3 class="paper-title">${p.title}</h3>
                <p class="presenter">Presenter: <span>${p.presenter}</span></p>
                <p class="paper-info">Journal: <span>${p.journal}</span> | Year: <span>${p.year}</span></p>
            </div>
        `).join('');
    }
}

// Schedule page functionality
function loadSchedulePage() {
    const scheduleList = document.getElementById('schedule-list');
    if (!scheduleList) return;

    const upcomingPresentations = presentations
        .filter(p => isUpcoming(p.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcomingPresentations.length === 0) {
        scheduleList.innerHTML = `
            <div class="presentation-card">
                <p>No upcoming presentations scheduled at this time. Check back soon!</p>
            </div>
        `;
        return;
    }

    scheduleList.innerHTML = upcomingPresentations.map((p, index) => `
        <div class="schedule-item ${index === 0 ? 'upcoming' : ''}">
            <div class="date">${formatDate(p.date)}</div>
            <h3 class="paper-title">${p.title}</h3>
            <p class="presenter">Presenter: <span>${p.presenter}</span></p>
            <p class="paper-info">
                <strong>Authors:</strong> ${p.authors}<br>
                <strong>Journal:</strong> ${p.journal} (${p.year})
            </p>
            <p class="abstract">${p.abstract}</p>
        </div>
    `).join('');
}

// Archive page functionality
function loadArchivePage() {
    const archiveList = document.getElementById('archive-list');
    const searchInput = document.getElementById('search-archive');
    const yearFilter = document.getElementById('year-filter');

    if (!archiveList) return;

    const pastPresentations = presentations
        .filter(p => !isUpcoming(p.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Populate year filter
    if (yearFilter) {
        const years = [...new Set(pastPresentations.map(p => p.year))].sort((a, b) => b - a);
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    function displayArchive(filteredPresentations) {
        if (filteredPresentations.length === 0) {
            archiveList.innerHTML = `
                <div class="presentation-card">
                    <p>No presentations found matching your criteria.</p>
                </div>
            `;
            return;
        }

        archiveList.innerHTML = filteredPresentations.map(p => `
            <div class="archive-item">
                <div class="date">${formatDate(p.date)}</div>
                <h3 class="paper-title">${p.title}</h3>
                <p class="presenter">Presenter: <span>${p.presenter}</span></p>
                <p class="paper-info">
                    <strong>Authors:</strong> ${p.authors}<br>
                    <strong>Journal:</strong> ${p.journal} (${p.year})
                </p>
                <p class="abstract">${p.abstract}</p>
            </div>
        `).join('');
    }

    function filterPresentations() {
        let filtered = [...pastPresentations];

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.presenter.toLowerCase().includes(searchTerm) ||
                p.authors.toLowerCase().includes(searchTerm)
            );
        }

        const selectedYear = yearFilter ? yearFilter.value : '';
        if (selectedYear) {
            filtered = filtered.filter(p => p.year.toString() === selectedYear);
        }

        displayArchive(filtered);
    }

    // Initial display
    displayArchive(pastPresentations);

    // Add event listeners for filtering
    if (searchInput) {
        searchInput.addEventListener('input', filterPresentations);
    }

    if (yearFilter) {
        yearFilter.addEventListener('change', filterPresentations);
    }
}

// Initialize appropriate page functionality
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        loadHomePage();
    } else if (currentPage === 'schedule.html') {
        loadSchedulePage();
    } else if (currentPage === 'archive.html') {
        loadArchivePage();
    }
});
