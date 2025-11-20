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
            statusIndicator.classList.remove('disabled');
        } else {
            statusIndicator.classList.add('disabled');
        }
    }
});
