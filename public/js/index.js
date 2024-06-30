// reminder: lets add a playback function (start again from the beginning)
// reminder: lets add a stats hud including word currentWordIndex out of the max max word currentWordIndex in the 
// idea: lets add a settings pop-up window
//vital functions need: string splitter into array, current word index 
//setInterval()

//DIGITAL CLOCK

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function clock() {
    const date = new Date();
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    const dayOfWeek = weekdays[date.getDay()];
    const month = monthList[date.getMonth()];
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    document.getElementById('hours').textContent = h;
    document.getElementById('minutes').textContent = m;
    document.getElementById('seconds').textContent = s;
    document.getElementById('weekday').textContent = `${dayOfWeek},`;
    document.getElementById('month').textContent = month;
    document.getElementById('today').textContent = dayOfMonth;
    document.getElementById('year').textContent = year;
}

setInterval(clock, 1000);

//MARQUEE
const marquees = document.querySelectorAll(".marquee");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    marqueeAnimation();
}
function marqueeAnimation() {
    marquees.forEach((marquee) => {
        marquee.setAttribute("data-animated", true);

        const marqueeContent = document.querySelector(".marquee-content");
        const marqueeArr = Array.from(marqueeContent.children);

        marqueeArr.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            marqueeContent.appendChild(duplicatedItem);
            //console.log(duplicatedItem);
        });
    });
}
//rsvp
const rsvpDisplay = document.getElementById("rsvpDisplay");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpTextArea = document.getElementById("rsvpTextArea");
//rsvp settings
const rsvpSettingsButton = document.getElementById("rsvpSettingsButton");
const rsvpSettingsModal = document.getElementById("rsvpSettingsModal");
const rsvpSettingsForm = document.getElementById("rsvpSettingsForm")
const exitModal = document.getElementById("exitModal");
//options panel
const wpminput = document.getElementById("wpm");
//edit panel
const cut = document.getElementById("cut");
const copy = document.getElementById("copy");
const paste = document.getElementById("paste");
const button = document.getElementById("save");
//control panel 
const beginning = document.getElementById("beginning");
const back = document.getElementById("back");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const forward = document.getElementById("forward");
const end = document.getElementById("end");
//stats panel
const wordCount = document.getElementById("wordCount");
const characters = document.getElementById("characters");
const maxCharacters = document.getElementById("maxCharacters");
//prevent form refresh default on submit
rsvpForm.addEventListener("submit", e => {
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.open("get", "php.php");
    request.onload = function() {      
    }
    request.send(new FormData(rsvpForm));
})
//vars
let currentWordIndex = 0; 

//let textArrayLengthArray = [];
//let textArrayCharactersLength = [];
//let containsPeriod = [];

let textArray = rsvpTextArea.value.split(/\s+/);
wordCount.innerText = textArray.length;
let textArrayLength = textArray.length;

let characterCount = rsvpTextArea.value.split("").length;
characters.innerText = characterCount;

rsvpTextArea.setAttribute("maxlength", 2000);
maxCharacters.innerText = rsvpTextArea.getAttribute("maxlength");

function updateStats() {
    textArray = rsvpTextArea.value.split(/\s+/);
    wordCount.innerText = textArray.length;

    characterCount = rsvpTextArea.value.split("").length;
    characters.innerText = characterCount;

    //for (let i = 0; i < textArrayLength; i++) {
    //    textArrayLengthArray.push(i)
    //    textArrayCharactersLength.push(textArray[i].length);
    //    containsPeriod.push(textArray[i].includes("."));
    //}
    //console.log(textArray);
    //console.log(textArrayLengthArray);
    //console.log(textArrayCharactersLength);
    //console.log(containsPeriod);
}

//RSVP TEXT AREA
rsvpTextArea.oninput = () => {
    updateStats();
}
//WPM CALCULATOR

function updateDisplay() {
    let currentWord = textArray[currentWordIndex];
    rsvpDisplay.innerText = currentWord;


}
updateDisplay();
//RSVP READER
let rsvpReader;
//RSVP Settings
rsvpSettingsButton.addEventListener("click", () => {
    rsvpSettingsModal.showModal();
})
exitModal.addEventListener("click", () => {
    rsvpSettingsModal.close();
})
//RSVP CONTROL PANEL
cut.addEventListener("click", () => {
    rsvpTextArea.select();
    document.execCommand("cut");
})
copy.addEventListener("click", () => {
    rsvpTextArea.select();
    document.execCommand("copy");
})
paste.addEventListener("click", () => {
    rsvpTextArea.select();
    navigator.clipboard.readText().then(copyText => {
        rsvpTextArea.value = copyText;
    })
})
beginning.addEventListener("click", () => {
    clearInterval(rsvpReader);
    currentWordIndex = 0;
    updateDisplay();
});
back.addEventListener("click", () => {
    clearInterval(rsvpReader);
    if(currentWordIndex > 0) {
        currentWordIndex--;
        updateDisplay();
    }
})
play.addEventListener("click", () => {
    if(currentWordIndex >= textArrayLength - 2) {
        currentWordIndex = 0;
    }
    rsvpReader = setInterval(() => {
        currentWordIndex++;
        updateDisplay();
        if(currentWordIndex > textArrayLength - 2) {
                clearInterval(rsvpReader);
        }
        console.log(currentWordIndex);
    }, 180);
    //fix wpm variable and live update wpm 
})

pause.addEventListener("click", () => { 
    clearInterval(rsvpReader);
})
forward.addEventListener("click", () => {
    clearInterval(rsvpReader);
    if(currentWordIndex < textArrayLength - 1) {
            currentWordIndex++;
            updateDisplay();
        }
})
end.addEventListener("click", () => {
    clearInterval(rsvpReader);  
    currentWordIndex = textArrayLength - 1;
    updateDisplay();
})
//TEST TEST TEST UNIVERSAL CONSTANTS
const universalconstants = document.getElementById("universalconstants");

fetch("js/universalconstants.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(constant => {
            universalconstants.innerText = constant.name;

            console.log(constant)
        });
    });
//KEYBOARD SHORTCUTS
import KeyboardShortcuts from './shortcuts.js';

function handleArrowLeft() {
    if(currentWordIndex > 0) {
        currentWordIndex--;
        updateDisplay();
    }
    console.log(currentWordIndex);
}
function handleArrowRight() {
    if(currentWordIndex < textArray.length - 1) {
        currentWordIndex++;
        updateDisplay();
        console.log(currentWordIndex);
    }
}
function handleShiftSpace() {
console.log('hello')
}
KeyboardShortcuts.init();

KeyboardShortcuts.addShortcut('Shift+ArrowLeft', handleArrowLeft);
KeyboardShortcuts.addShortcut('Shift+ArrowRight', handleArrowRight);
KeyboardShortcuts.addShortcut('Ctrl+Space', handleShiftSpace);
 