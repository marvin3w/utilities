const digits = {
    '0': [
        '01110',
        '10001',
        '10011',
        '10101',
        '11001',
        '10001',
        '01110',
    ],
    '1': [
        '00100',
        '01100',
        '00100',
        '00100',
        '00100',
        '00100',
        '01110',
    ],
    '2': [
        '01110',
        '10001',
        '00001',
        '00010',
        '00100',
        '01000',
        '11111',
    ],
    '3': [
        '01110',
        '10001',
        '00001',
        '00110',
        '00001',
        '10001',
        '01110',
    ],
    '4': [
        '00010',
        '00110',
        '01010',
        '10010',
        '11111',
        '00010',
        '00010',
    ],
    '5': [
        '11111',
        '10000',
        '11110',
        '00001',
        '00001',
        '10001',
        '01110',
    ],
    '6': [
        '00110',
        '01000',
        '10000',
        '11110',
        '10001',
        '10001',
        '01110',
    ],
    '7': [
        '11111',
        '00001',
        '00010',
        '00100',
        '01000',
        '01000',
        '01000',
    ],
    '8': [
        '01110',
        '10001',
        '10001',
        '01110',
        '10001',
        '10001',
        '01110',
    ],
    '9': [
        '01110',
        '10001',
        '10001',
        '01111',
        '00001',
        '00010',
        '01100',
    ],
};

function createDigitElement(id) {
    const digitElement = document.createElement('div');
    digitElement.classList.add('digit');
    digitElement.id = id;
    for (let i = 0; i < 35; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        digitElement.appendChild(dot);
    }
    return digitElement;
}

function updateDigit(elementId, num) {
    const digitPattern = digits[num];
    const digitElement = document.getElementById(elementId);
    const dots = digitElement.children;
    for (let i = 0; i < dots.length; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        if (digitPattern[row][col] === '1') {
            dots[i].classList.add('on');
        } else {
            dots[i].classList.remove('on');
        }
    }
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    updateDigit('hour-tens', h[0]);
    updateDigit('hour-ones', h[1]);
    updateDigit('minute-tens', m[0]);
    updateDigit('minute-ones', m[1]);
    updateDigit('second-tens', s[0]);
    updateDigit('second-ones', s[1]);
}

function getCurrentTime() {
    const now = new Date();
    return {
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: String(now.getSeconds()).padStart(2, '0')
    };
}

let frozenTime;

function getFrozenTime() {
    if (!frozenTime) {
        frozenTime = getCurrentTime();
    }
    return frozenTime;
}

function resetFrozenTime() {
    frozenTime = null;
}

function turnOnRow(row) {
    const digits = document.querySelectorAll('.digit');
    digits.forEach(digit => {
        const dots = digit.querySelectorAll('.dot');
        for (let i = row * 5; i < (row + 1) * 5; i++) {
            dots[i].classList.add('on', 'animating');
        }
    });
}

function turnOffInactiveDots(row) {
    const time = getFrozenTime();
    const timeString = time.h + time.m + time.s;
    const digitElements = document.querySelectorAll('.digit');
    
    digitElements.forEach((digit, index) => {
        const dots = digit.querySelectorAll('.dot');
        const digitValue = timeString[index];
        const pattern = digits[digitValue];
        
        for (let i = row * 5; i < (row + 1) * 5; i++) {
            if (pattern[row][i % 5] === '0') {
                dots[i].classList.remove('on');
            }
        }
    });
}

function animateEntrance() {
    resetFrozenTime(); 

    for (let i = 0; i < 7; i++) {
        setTimeout(() => turnOnRow(i), i * 80);
    }

    setTimeout(() => {
        for (let i = 0; i < 7; i++) {
            setTimeout(() => turnOffInactiveDots(i), i * 80);
        }
    }, 7 * 100 + 200); 

    setTimeout(() => {
        resetFrozenTime();
        updateClock();
        setInterval(updateClock, 1000);
    }, 14 * 100 + 1000); 
}

function updateClock() {
    const time = getCurrentTime();
    const h = time.h;
    const m = time.m;
    const s = time.s;

    updateDigit('hour-tens', h[0]);
    updateDigit('hour-ones', h[1]);
    updateDigit('minute-tens', m[0]);
    updateDigit('minute-ones', m[1]);
    updateDigit('second-tens', s[0]);
    updateDigit('second-ones', s[1]);
}

document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.querySelector('.clock');
    clockElement.innerHTML = '';

    ['hour-tens', 'hour-ones', 'separator1', 'minute-tens', 'minute-ones', 'separator2', 'second-tens', 'second-ones'].forEach(id => {
        if (id.startsWith('separator')) {
            const sep = document.createElement('div');
            sep.classList.add('separator');
            sep.textContent = ':';
            clockElement.appendChild(sep);
        } else {
            const digitElement = createDigitElement(id);
            clockElement.appendChild(digitElement);
        }
    });

    animateEntrance();
});
