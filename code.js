function getTimeStamp() {
    const now = new Date();
    return now.toLocaleTimeString() + " - " + now.toLocaleDateString();
}

// Funktion zum Protokollieren
function logMessage(message) {
    const timeStampedMessage = `<p>${getTimeStamp()}: ${message}</p>`;
    document.body.innerHTML += timeStampedMessage;
    console.log(getTimeStamp() + ": " + message);
}

// Tab-Switching Events
window.onblur = function() {
    logMessage("Tab gewechselt oder Fenster verlassen");
};

window.onfocus = function() {
    logMessage("Zurück im Tab");
};

// Anfrage für Kamera und Mikrofon
async function requestCameraAndMicrophone() {
    try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        logMessage("Kamera- und Mikrofonzugriff erfolgreich gewährt");
    } catch (error) {
        logMessage("Kamera- und Mikrofonzugriff verweigert oder fehlgeschlagen");
    }
}

// Anfrage für Benachrichtigungen
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            logMessage(`Benachrichtigungen-Berechtigung: ${permission}`);
        });
    } else {
        logMessage("Benachrichtigungen nicht unterstützt");
    }
}

// Überprüfung des Vollbildmodus
function checkFullScreenStatus() {
    if (document.fullscreenElement) {
        logMessage("Browser ist im Vollbildmodus");
    } else {
        logMessage("Browser hat den Vollbildmodus verlassen");
    }
}

// Ereignislistener für den Wechsel des Vollbildmodus
document.addEventListener("fullscreenchange", checkFullScreenStatus);

// Initiale Anfragen stellen
requestCameraAndMicrophone();
requestNotificationPermission();
checkFullScreenStatus();

// Optional: Automatisches Testen des Vollbildmodus nach einer kurzen Verzögerung
setTimeout(() => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            logMessage("Vollbildmodus manuell aktiviert");
        }).catch((err) => {
            logMessage("Vollbildmodus konnte nicht aktiviert werden");
        });
    }
}, 2000);
