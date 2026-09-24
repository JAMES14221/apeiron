/**
 * Aperio Spotlight Search (macOS Spotlight Style)
 * Supports:
 * - Shortcut Cmd+K / Ctrl+K, "/" key, or clicking Search button/icon
 * - Fuzzy-like text filter across pages, research tracks, explorations, and actions
 * - Arrow keys (Up / Down) navigation + Enter to select
 * - ESC or backdrop click to close
 */
(function() {
    const searchData = [
        {
            title: "Home",
            category: "Pages",
            desc: "Return to the Aperio Research home and introduction",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
            url: "index.html"
        },
        {
            title: "About",
            category: "Pages",
            desc: "Learn about our mission, philosophy, and student community",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
            url: "about.html"
        },
        {
            title: "Exploration",
            category: "Pages",
            desc: "Acanthus Sanctuary: 3D gameplay walkthrough and Scholar's Codex",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
            url: "explorations.html"
        },
        {
            title: "Connect",
            category: "Pages",
            desc: "Open research vacancies, member recruiting, and collaborative networking",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>`,
            url: "connect.html"
        },
        {
            title: "Apply Research",
            category: "Actions",
            desc: "Submit your manuscript or proposal to Aperio (Google Form)",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`,
            url: "https://forms.gle/F9evDGJCJm1P4XRz5",
            external: true
        },
        {
            title: "Featured Explorations Carousel",
            category: "Actions",
            desc: "Browse visual slides of research methodologies and frameworks",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
            url: "index.html#carousel"
        },
        {
            title: "Computer Science & AI",
            category: "Research Tracks",
            desc: "Machine learning, neural networks, systems security, and computational science",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
            url: "index.html#tracks"
        },
        {
            title: "Biomedical & Life Sciences",
            category: "Research Tracks",
            desc: "Molecular genetics, neurology, public health, biotechnology, and cellular biology",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
            url: "index.html#tracks"
        },
        {
            title: "Environmental & Earth Sciences",
            category: "Research Tracks",
            desc: "Climate dynamics, sustainable ecosystems, oceanography, and ecological systems",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
            url: "index.html#tracks"
        },
        {
            title: "Social & Behavioral Sciences",
            category: "Research Tracks",
            desc: "Cognitive psychology, education paradigms, sociology, anthropology, and human behavior",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
            url: "index.html#tracks"
        },
        {
            title: "Economics & Quantitative Analysis",
            category: "Research Tracks",
            desc: "Behavioral finance, econometric modeling, market dynamics, and policy evaluation",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
            url: "index.html#tracks"
        },
        {
            title: "Physics & Engineering",
            category: "Research Tracks",
            desc: "Theoretical astrophysics, quantum mechanics, material science, robotics, and aerospace",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
            url: "index.html#tracks"
        },
        {
            title: "How It Works & Submission Workflow",
            category: "Actions",
            desc: "View the 3-step peer review and publication journey",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
            url: "index.html#workflow"
        }
    ];

    function injectSpotlightDOM() {
        if (document.getElementById('spotlight-overlay')) return;

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const shortcutKey = isMac ? '⌘K' : 'Ctrl+K';

        const modalHTML = `
            <div id="spotlight-overlay" class="spotlight-overlay">
                <div class="spotlight-modal" role="dialog" aria-modal="true" aria-label="Spotlight Search">
                    <div class="spotlight-header">
                        <span class="spotlight-search-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </span>
                        <input type="text" id="spotlight-input" placeholder="Search Aperio or type a command..." autocomplete="off" spellcheck="false">
                        <span class="spotlight-shortcut-badge">ESC</span>
                    </div>
                    
                    <div class="spotlight-results" id="spotlight-results">
                    </div>

                    <div class="spotlight-footer">
                        <div class="spotlight-tips">
                            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
                            <span><kbd>↵</kbd> to open</span>
                            <span><kbd>esc</kbd> to close</span>
                        </div>
                        <div class="spotlight-branding">
                            Aperio Spotlight
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const searchIcons = document.querySelectorAll('.search-icon, .nav-search-btn');
        searchIcons.forEach(btn => {
            btn.setAttribute('title', `Search (${shortcutKey})`);
        });
    }

    injectSpotlightDOM();

    const overlay = document.getElementById('spotlight-overlay');
    const input = document.getElementById('spotlight-input');
    const resultsContainer = document.getElementById('spotlight-results');
    let selectedIndex = 0;
    let filteredItems = [];
    let isKeyboardNav = false;

    function openSpotlight() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        input.value = '';
        renderResults('');
        setTimeout(() => input.focus(), 50);
    }

    function closeSpotlight() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        input.value = '';
    }

    function renderResults(query) {
        const cleanQuery = query.trim().toLowerCase();
        
        if (!cleanQuery) {
            filteredItems = searchData;
        } else {
            filteredItems = searchData.filter(item => {
                return item.title.toLowerCase().includes(cleanQuery) ||
                       item.category.toLowerCase().includes(cleanQuery) ||
                       item.desc.toLowerCase().includes(cleanQuery);
            });
        }

        selectedIndex = 0;

        if (filteredItems.length === 0) {
            resultsContainer.innerHTML = `
                <div class="spotlight-empty">
                    <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
                    <span class="spotlight-empty-sub">Try searching for tracks, team members, or submission info.</span>
                </div>
            `;
            return;
        }

        const groups = {};
        filteredItems.forEach((item, index) => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push({ item, globalIndex: index });
        });

        let html = '';
        for (const [category, items] of Object.entries(groups)) {
            html += `<div class="spotlight-group-title">${category}</div>`;
            items.forEach(({ item, globalIndex }) => {
                const isSelected = globalIndex === selectedIndex ? 'selected' : '';
                html += `
                    <div class="spotlight-item ${isSelected}" data-index="${globalIndex}">
                        <div class="spotlight-item-icon">${item.icon}</div>
                        <div class="spotlight-item-content">
                            <div class="spotlight-item-title">${highlightMatch(item.title, cleanQuery)}</div>
                            <div class="spotlight-item-desc">${highlightMatch(item.desc, cleanQuery)}</div>
                        </div>
                        <div class="spotlight-item-action">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </div>
                `;
            });
        }

        resultsContainer.innerHTML = html;

        const itemEls = resultsContainer.querySelectorAll('.spotlight-item');
        itemEls.forEach(el => {
            el.addEventListener('click', () => {
                const idx = parseInt(el.getAttribute('data-index'), 10);
                selectItem(idx);
            });
            el.addEventListener('mouseenter', () => {
                if (isKeyboardNav) return;
                const idx = parseInt(el.getAttribute('data-index'), 10);
                updateSelected(idx);
            });
        });

        resultsContainer.addEventListener('mousemove', () => {
            isKeyboardNav = false;
        });
    }

    function updateSelected(newIndex) {
        if (filteredItems.length === 0) return;
        if (newIndex < 0) newIndex = filteredItems.length - 1;
        if (newIndex >= filteredItems.length) newIndex = 0;
        selectedIndex = newIndex;

        const allItems = resultsContainer.querySelectorAll('.spotlight-item');
        allItems.forEach(el => {
            const idx = parseInt(el.getAttribute('data-index'), 10);
            if (idx === selectedIndex) {
                el.classList.add('selected');
                el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                el.classList.remove('selected');
            }
        });
    }

    function selectItem(index) {
        const item = filteredItems[index];
        if (!item) return;
        closeSpotlight();

        if (item.external) {
            window.open(item.url, '_blank');
        } else {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const targetParts = item.url.split('#');
            const targetPage = targetParts[0];
            const targetHash = targetParts[1];

            if (targetPage === currentPath || (targetPage === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
                if (targetHash) {
                    const el = document.getElementById(targetHash);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        return;
                    }
                }
            }
            window.location.href = item.url;
        }
    }

    function highlightMatch(text, query) {
        if (!query) return escapeHtml(text);
        const idx = text.toLowerCase().indexOf(query);
        if (idx === -1) return escapeHtml(text);
        return escapeHtml(text.substring(0, idx)) +
               `<mark>${escapeHtml(text.substring(idx, idx + query.length))}</mark>` +
               escapeHtml(text.substring(idx + query.length));
    }

    function escapeHtml(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    input.addEventListener('input', (e) => {
        renderResults(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            isKeyboardNav = true;
            updateSelected(selectedIndex + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            isKeyboardNav = true;
            updateSelected(selectedIndex - 1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            selectItem(selectedIndex);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeSpotlight();
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeSpotlight();
        }
    });

    window.addEventListener('keydown', (e) => {
        const isSpace = e.key === ' ' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

        if (isSpace && !overlay.classList.contains('active')) {
            e.preventDefault();
            openSpotlight();
        } else if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeSpotlight();
        }
    });

    document.addEventListener('click', (e) => {
        const searchBtn = e.target.closest('.search-icon, .nav-search-btn');
        if (searchBtn) {
            e.preventDefault();
            openSpotlight();
        }
    });

    window.openSpotlight = openSpotlight;
    window.closeSpotlight = closeSpotlight;
})();