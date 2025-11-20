document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusIndicator = document.getElementById('statusIndicator');

    // Load saved state
    chrome.storage.sync.get(['autoMergeEnabled'], (result) => {
        const enabled = result.autoMergeEnabled !== false; // Default to true
        toggleSwitch.checked = enabled;
        updateStatus(enabled);
    });

    // Listen for changes
    toggleSwitch.addEventListener('change', () => {
        const enabled = toggleSwitch.checked;
        chrome.storage.sync.set({ autoMergeEnabled: enabled }, () => {
            updateStatus(enabled);
        });
    });

    function updateStatus(enabled) {
        if (enabled) {
            statusIndicator.textContent = "SYSTEM: ACTIVE";
            statusIndicator.style.backgroundColor = "#ffffff";
            statusIndicator.style.color = "#000000";
        } else {
            statusIndicator.textContent = "SYSTEM: IDLE";
            statusIndicator.style.backgroundColor = "#000000";
            statusIndicator.style.color = "#ffffff";
        }
    }
});
