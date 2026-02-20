(function () {
    // Avoid double injection
    if (document.getElementById('tab-tax-overlay')) return;

    const currentHost = window.location.hostname;

    function checkBlocking() {
        if (document.getElementById('tab-tax-overlay')) return;

        chrome.storage.sync.get(['blockedSites', 'taxAllNewTabs'], (result) => {
            const blockedSites = result.blockedSites || [];
            const taxAllNewTabs = !!result.taxAllNewTabs;

            // Simple substring match for now (e.g., "youtube.com" matches "www.youtube.com")
            const isBlockedSite = blockedSites.some(site => currentHost.includes(site));

            if (taxAllNewTabs || isBlockedSite) {
                initTabTax();
            }
        });
    }

    checkBlocking();

    // Re-check periodically for SPA navigation (e.g. Youtube)
    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            checkBlocking();
        }
    }, 1000);

    function initTabTax() {
        // Wait for body to be ready if it's not
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initDistractionTax);
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'tab-tax-overlay';

        const container = document.createElement('div');
        container.id = 'tab-tax-game-container';
        overlay.appendChild(container);

        // Add "TAB TAX" branding to bottom
        const branding = document.createElement('div');
        branding.className = 'tab-tax-branding';
        branding.textContent = 'TAB TAX';
        overlay.appendChild(branding);

        document.body.appendChild(overlay);

        // Prevent scrolling on the main page
        document.body.style.overflow = 'hidden';

        // Start a game
        if (window.DT_GameManager) {
            window.DT_GameManager.startRandomGame(container, () => {
                // On Win
                const overlayElement = document.getElementById('tab-tax-overlay');
                if (overlayElement) {
                    document.body.removeChild(overlayElement);
                }
                document.body.style.overflow = '';
            });
        } else {
            container.textContent = "Error loading game engine. Reload the page.";
        }
    }
})();
