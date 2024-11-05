function getTimeStamp() {
    const now = new Date();
    return now.toLocaleTimeString() + " - " + now.toLocaleDateString();
}

// Logging function
function logMessage(message) {
    const timeStampedMessage = `<p>${getTimeStamp()}: ${message}</p>`;
    document.body.innerHTML += timeStampedMessage;
    console.log(getTimeStamp() + ": " + message);
}

// Tab-switching events
window.onblur = function() {
    logMessage("Tab switched or window left");
};

window.onfocus = function() {
    logMessage("Returned to the tab");
};

// Request for camera and microphone access
async function requestCameraAndMicrophone() {
    try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        logMessage("Camera and microphone access granted successfully");
    } catch (error) {
        logMessage("Camera and microphone access denied or failed");
    }
}

// Request for notifications permission
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            logMessage(`Notifications permission: ${permission}`);
        });
    } else {
        logMessage("Notifications not supported");
    }
}

// Check fullscreen mode status
function checkFullScreenStatus() {
    if (document.fullscreenElement) {
        logMessage("Browser is in fullscreen mode");
    } else {
        logMessage("Browser exited fullscreen mode");
    }
}

// Event listener for fullscreen mode changes
document.addEventListener("fullscreenchange", checkFullScreenStatus);

// Initial requests
requestCameraAndMicrophone();
requestNotificationPermission();
checkFullScreenStatus();

// Optional: Automatically test fullscreen mode after a short delay
setTimeout(() => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            logMessage("Fullscreen mode manually activated");
        }).catch((err) => {
            logMessage("Fullscreen mode could not be activated");
        });
    }
}, 2000);

