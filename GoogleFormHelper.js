// Prompt user for countdown time
var countdownTime = prompt("How many minutes do you want to serve this website?");
var countdownSeconds = countdownTime * 60;

// Create countdown timer element
var timerElement = document.createElement('div');
timerElement.id = 'countdown-timer';
document.body.appendChild(timerElement);

// Add inline CSS styles
timerElement.style.position = 'fixed';
timerElement.style.top = '10px';
timerElement.style.right = '10px';
timerElement.style.fontSize = '16px';
timerElement.style.backgroundColor = '#fff';
timerElement.style.padding = '10px';
timerElement.style.border = '1px solid #ddd';
timerElement.style.borderRadius = '5px';
timerElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
timerElement.style.zIndex = '9999';

// Create audio element
var audio = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_c668156e64.mp3');

// Update timer every second
var countdownInterval = setInterval(function () {
    var minutes = Math.floor(countdownSeconds / 60);
    var seconds = countdownSeconds % 60;

    // Update timer display
    timerElement.innerHTML = 'Time Remaining: ' + minutes + 'm ' + seconds + 's';

    // Check if the countdown is less than 3 minutes
    if (countdownSeconds <= 60) {
        // Play a sound
        audio.play();

        // Adjust font size and padding dynamically
        var fontSize = 16 + Math.sin(countdownSeconds * 0.1) * 4; // Adjust the multiplier for speed
        var padding = 10 + Math.sin(countdownSeconds * 0.1) * 5; // Adjust the multiplier for speed

        timerElement.style.fontSize = fontSize + 'px';
        timerElement.style.padding = padding + 'px';
    }

    // Check if the countdown reached 0
    if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);

        // Stop the audio
        audio.pause();
        audio.currentTime = 0;

        // Remove the timer element
        document.body.removeChild(timerElement);
    }

    // Decrease countdown seconds
    countdownSeconds--;
}, 1000);
