// GitHub Auto-Merge Content Script

console.log("GitHub Auto-Merge extension loaded.");

const BUTTON_TEXTS = {
    MERGE: "Merge pull request",
    CONFIRM: "Confirm merge",
    DELETE: "Delete branch"
};

let mergeClicked = false;
let confirmClicked = false;

function findButtonByText(text) {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
        if (btn.innerText.includes(text)) {
            if (btn.offsetParent !== null) {
                return btn;
            }
        }
    }
    return null;
}

// Check if enabled before running logic
function isEnabled(callback) {
    chrome.storage.sync.get(['autoMergeEnabled'], (result) => {
        // Default to true if not set
        callback(result.autoMergeEnabled !== false);
    });
}

const observer = new MutationObserver((mutations) => {
    isEnabled((enabled) => {
        if (!enabled) return;

        if (mergeClicked && !confirmClicked) {
            const confirmBtn = findButtonByText(BUTTON_TEXTS.CONFIRM);
            if (confirmBtn) {
                console.log("Auto-clicking 'Confirm merge'...");
                confirmBtn.click();
                confirmClicked = true;
            }
        }

        if (confirmClicked) {
            const deleteBtn = findButtonByText(BUTTON_TEXTS.DELETE);
            if (deleteBtn) {
                console.log("Auto-clicking 'Delete branch'...");
                deleteBtn.click();
                // Optional: disconnect or reset
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

document.addEventListener('click', (e) => {
    isEnabled((enabled) => {
        if (!enabled) return;

        const target = e.target;
        const btn = target.closest('button');
        if (btn && btn.innerText.includes(BUTTON_TEXTS.MERGE)) {
            console.log("User clicked 'Merge pull request'. Arming auto-clicker.");
            mergeClicked = true;
            confirmClicked = false;
        }
    });
});
