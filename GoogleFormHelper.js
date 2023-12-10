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


    const formBlockHolderName = ".Qr7Oae";
    const questionHolderParentName = ".z12JJ";
    const questionHolderName = ".M7eMe";
    const optionsHolderName = ".nWQGrd.zwllIb";

    const searchEngine = "https://google.com/search?q=";

    const formBlockContainer = document.querySelectorAll(formBlockHolderName);

    formBlockContainer.forEach((element, index) => {
        attatchMenu(element);
        attatchAiBox(element);
        findAnswer(element);
    });

    function findAnswer(element) {
        fetch("https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyCWvB0JMPgfzpdK9e3UtfDvSoTzrtDZ7ns", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: {
                    text: "Which of the following option is correct for this question?\n" +
                    getQuestionWithOptions(element),
                },
            }),
        })
            .then(response => response.json())
            .then(data => {
            element.querySelector("#chatGPTAnswer").innerText = data?.candidates[0].output;
            autoClickAnswers(element, data?.candidates[0].output);
        })
            .catch(error => {
            element.querySelector("#chatGPTAnswer").innerText = "😢 Failed to fetch answer. ";
        });
    }

    function autoClickAnswers(destinationElement, answer) {
        const optionsHolder = destinationElement.querySelectorAll(optionsHolderName);
        optionsHolder?.forEach((element, index) => {

            if (answer.includes(element.textContent)) {
                element.querySelector(".Od2TWd.hYsg7c").click();
            }
        })
    }

    function attatchMenu(destinationElement) {
        const optionHolder = destinationElement.querySelectorAll(optionsHolderName);

        const searchButton = document.createElement("a");
        searchButton.setAttribute("target", "_blank");

        const copyButton = document.createElement("a");
        copyButton.setAttribute("target", "_blank");

        searchButton.textContent = "SEARCH";
        copyButton.textContent = "COPY";

        const searchButtonStyle = {
            color: "red",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "0px",
        };

        const copyButtonStyle = {
            color: "blue",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "10px",
            cursor: "pointer"
        };

        Object.assign(searchButton.style, searchButtonStyle);
        Object.assign(copyButton.style, copyButtonStyle);

        searchButton.href = searchEngine + encodeURIComponent(getQuestionWithOptions(destinationElement));

        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(getQuestionWithOptions(destinationElement));

            copyButton.textContent = "COPIED";

            setTimeout(() => {
                copyButton.textContent = "COPY";
            }, 1000);
        });

        destinationElement.appendChild(searchButton);
        destinationElement.appendChild(copyButton);
    }

    function attatchAiBox(destinationElement) {
        const chatAnswerDiv = document.createElement('div');

        const boldTextParagraph = document.createElement('p');
        boldTextParagraph.innerText = "👻 AI Answer:";

        const chatAnswerDivStyle = {
            backgroundColor: "rgba(139, 97, 238, 0.683)",
            padding: "5px 10px",
            borderRadius: "5px",
            marginBottom: "20px"
        };

        const boldTextParagraphStyle = {
            fontWeight: "bolder",
            padding: 0,
            margin: 0,
            color: "rgb(255, 255, 255)"
        };

        const hrElement = document.createElement('hr');
        hrElement.style.border = '1px solid white';

        const textContentParagraph = document.createElement('p');
        textContentParagraph.innerText = 'Waiting for AI to respond... 🤓';
        textContentParagraph.setAttribute("id", "chatGPTAnswer");

        const textContentParagraphStyle = {
            padding: 0,
            margin: 0,
            color: "black",
        };

        const br = document.createElement("br");
        const cr = document.createElement("br");

        Object.assign(chatAnswerDiv.style, chatAnswerDivStyle);
        Object.assign(boldTextParagraph.style, boldTextParagraphStyle);
        Object.assign(textContentParagraph.style, textContentParagraph);

        chatAnswerDiv.appendChild(boldTextParagraph);
        chatAnswerDiv.appendChild(hrElement);
        chatAnswerDiv.appendChild(textContentParagraph);
        chatAnswerDiv.prepend(br);
        chatAnswerDiv.appendChild(cr);

        destinationElement.appendChild(chatAnswerDiv);
    }

    function getQuestionWithOptions(destinationElement) {
        const questionContent = destinationElement.querySelector(questionHolderName)?.textContent;
        const optionHolders = destinationElement.querySelectorAll(optionsHolderName);

        let optionContent = "";

        optionHolders?.forEach((element, index) => {
            optionContent += element.textContent + "\n ";
        });

        let finalContent = questionContent + '\n' + (optionContent || "");

        return finalContent;
    }




    function b(element, color) {
        element.style.border = "2px solid " + color;
    }





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
