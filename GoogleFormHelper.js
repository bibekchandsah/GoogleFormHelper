// ==UserScript==
// @name         Google Forms Helper
// @namespace    https://github.com
// @version      0.1
// @description  Aids to solve google forms
// @author       masturbator
// @match        https://docs.google.com/forms/*
// @icon         https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const searchURL = "https://google.com/search?q=";
    const container = document.querySelectorAll(".geS5n");

    container.forEach((element, index) => {
        let questionContainer = element.querySelector(".z12JJ");
        let answersContainer = element.querySelectorAll(".nWQGrd");
        let options = "";
        let question = questionContainer.textContent;


        answersContainer?.forEach((points) => {
            options += points.textContent + " \n";
        });

        let spanElement = document.createElement("span");

        spanElement.innerHTML = `
    <a href='${searchURL + question + options}' class="searchText" style="text-decoration:none;font-weight:bold;cursor:pointer;">SEARCH</a>
    &nbsp;&nbsp;&nbsp;
    <a class="copyText" style="text-decoration:none;font-weight:bold;cursor:pointer;transition:.3s">COPY</a>
    `;

    questionContainer.appendChild(spanElement);

    let copyButton = questionContainer.querySelector(".copyText");

    copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(question + "\n" + options);
        copyButton.innerText = "Copied";

        setTimeout(function(){
            copyButton.innerText = "Copy";
        },5000);
    });

    let anotherSpan = document.createElement("span");
    anotherSpan.innerHTML += `<br><div class="chatAnswer" style="border-radius:8px;padding:8px;background-color:#a29bfe">
                    <p style="font-weight:bold;">GoogleAI Answer:</p>
                    <hr style="border: 1px solid black">
                    <p id="chatGPTAnswer">
                    Waiting for answer...
                    </p>
                    </span>
                    <br>
                    </div>`;
    element.appendChild(anotherSpan);
});


    var a = document.querySelectorAll(".geS5n");

    a.forEach((element)=>{
        let questionContainer = element.querySelector(".z12JJ");
        let answersContainer = element.querySelectorAll(".nWQGrd");
        let options = "";
        let question = questionContainer.textContent;


        answersContainer?.forEach((points) => {
            options += points.textContent + " \n";
        });

        fetch("https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyCWvB0JMPgfzpdK9e3UtfDvSoTzrtDZ7ns", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: {
                    text: "Which of the following option is correct for this question?\n" + question.replace("COPY", "").replace("SEARCH", "") + "\n" + options,
                },
            }),
        })
            .then(response => response.json())
            .then(data => {
            element.querySelector("#chatGPTAnswer").innerText = data.candidates[0].output;
        })
            .catch(error => {
            element.querySelector("#chatGPTAnswer").innerText = "Failed to fetch answer.";
        });
    })


    // Prompt user for countdown timer
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
timerElement.style.cursor = 'pointer'; // Set cursor to pointer

// Create audio element
var audio = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_c668156e64.mp3');

// Flags to track the play/pause state
var isPlaying = false;
var isMusicPlaying = false;

// Event listener for timer click
timerElement.addEventListener('click', function () {
    // Check if the countdown is less than or equal to 60 seconds (alert time)
    if (countdownSeconds <= 60) {
        if (isPlaying) {
            // Pause the audio
            audio.pause();
        } else {
            // Play the audio
            audio.play();
        }

        // Toggle the play/pause state
        isPlaying = !isPlaying;
    }
});

// Update timer every second
var countdownInterval = setInterval(function () {
    var minutes = Math.floor(countdownSeconds / 60);
    var seconds = countdownSeconds % 60;

    // Update timer display
    timerElement.innerHTML = 'Time Remaining: ' + minutes + 'm ' + seconds + 's';

    // Check if the countdown is less than or equal to 60 seconds (alert time)
    if (countdownSeconds <= 60) {
        // Check if the music should play automatically
        if (!isMusicPlaying) {
            // Play the audio
            audio.play();

            // Set the flag to true
            isMusicPlaying = true;
        }

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


})();
