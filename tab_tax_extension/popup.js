document.addEventListener('DOMContentLoaded', () => {
  const siteInput = document.getElementById('siteInput');
  const addBtn = document.getElementById('addBtn');
  const siteList = document.getElementById('siteList');
  const taxAllTabsCheckbox = document.getElementById('taxAllTabs');

  // Load sites and settings
  chrome.storage.sync.get(['blockedSites', 'taxAllNewTabs'], (result) => {
    const sites = result.blockedSites || [];
    sites.forEach(site => addSiteToUI(site));

    if (taxAllTabsCheckbox) {
      taxAllTabsCheckbox.checked = !!result.taxAllNewTabs;
    }
  });

  if (taxAllTabsCheckbox) {
    taxAllTabsCheckbox.addEventListener('change', () => {
      chrome.storage.sync.set({ taxAllNewTabs: taxAllTabsCheckbox.checked });
    });
  }

  addBtn.addEventListener('click', () => {
    const site = siteInput.value.trim();
    if (site) {
      chrome.storage.sync.get(['blockedSites'], (result) => {
        const sites = result.blockedSites || [];
        if (!sites.includes(site)) {
          sites.push(site);
          chrome.storage.sync.set({ blockedSites: sites }, () => {
            addSiteToUI(site);
            siteInput.value = '';
          });
        }
      });
    }
  });

  function addSiteToUI(site) {
    const li = document.createElement('li');
    li.textContent = site;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = 'Remove';
    deleteBtn.addEventListener('click', () => {
      chrome.storage.sync.get(['blockedSites'], (result) => {
        const sites = result.blockedSites || [];
        const newSites = sites.filter(s => s !== site);
        chrome.storage.sync.set({ blockedSites: newSites }, () => {
          li.remove();
        });
      });
    });
    li.appendChild(deleteBtn);
    siteList.appendChild(li);
  }
});
