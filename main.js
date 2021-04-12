const stopwatchsList = document.getElementById('counters');
const initialText = '1 ⇒ 00:00:00';

let centiseconds = 0;
let seconds = 0;
let minutes = 0;
let refInterval;
let launching = false;
let counterId = 1;

const initialStopwatch = document.createElement('p');
initialStopwatch.innerText = initialText;
initialStopwatch.id = 'counter' + counterId;
stopwatchsList.appendChild(initialStopwatch);
const resultTryFive = document.createElement('p');
resultTryFive.id = 'resultTryFive';
document.getElementsByTagName('main')[0].appendChild(resultTryFive);

const startProperly = () => {
	if (launching === false) {
		launching = true;
		refInterval = setInterval(() => {
			launchStopwatch();
		}, 10);
	}
};

const stopProperly = () => {
	if (launching === true) {
		launching = false;
		clearInterval(refInterval);
	}
};

const addStopwatch = () => {
	const newStopwatch = document.createElement('p');
	newStopwatch.innerText =
		String(counterId + 1) +
		document
			.getElementById('counter' + counterId)
			.innerText.slice(counterId.toString().length);
	counterId++;
	newStopwatch.id = 'counter' + counterId;
	stopwatchsList.appendChild(newStopwatch);
};

const launchStopwatch = () => {
	centiseconds++;
	if (centiseconds === 100) {
		centiseconds = 0;
		seconds++;
	}
	if (seconds === 60) {
		seconds = 0;
		minutes++;
	}
	document.getElementById('counter' + counterId).innerText =
		counterId +
		' ⇒ ' +
		(minutes < 10 ? '0' + minutes : minutes) +
		':' +
		(seconds < 10 ? '0' + seconds : seconds) +
		':' +
		(centiseconds < 10 ? '0' + centiseconds : centiseconds);
};

document.getElementById('start-pause').addEventListener('mousedown', () => {
	stopProperly();
});

document.getElementById('start-pause').addEventListener('mouseup', () => {
	startProperly();
});

document.getElementById('stop').addEventListener('click', () => {
	stopProperly();
});

document.getElementById('record').addEventListener('click', () => {
	addStopwatch();
});

document.getElementById('stop-record').addEventListener('click', () => {
	stopProperly();
	addStopwatch();
});

document.getElementById('reset').addEventListener('click', () => {
	//stopProperly();
	centiseconds = 0;
	seconds = 0;
	minutes = 0;
	counterId = 1;
	document.getElementById('counter' + counterId).innerText = initialText;
	while (stopwatchsList.childElementCount > 1) {
		stopwatchsList.removeChild(stopwatchsList.lastElementChild);
	}
	document.getElementById('resultTryFive').innerText = '';
});

document.getElementById('try-five').addEventListener('click', () => {
	const timer = document
		.getElementById('counter' + counterId)
		.innerText.split(' ⇒ ')[1];
	let [minutes, seconds, centiseconds] = timer.split(':');
	seconds = parseInt(seconds);
	centiseconds = parseInt(centiseconds);
	let diffSeconds = 0;
	let diffCentiseconds = Math.abs(500 - (seconds * 100 + centiseconds));
	while (diffCentiseconds >= 100) {
		diffCentiseconds -= 100;
		diffSeconds++;
	}
	const resultTryFive = document.getElementById('resultTryFive');
	if (seconds === 5 && centiseconds === 0) {
		resultTryFive.innerText = 'CHAMPION !';
	} else if (seconds >= 5) {
		resultTryFive.innerText = 'Le délai est écoulé !';
	} else if (diffSeconds === 0) {
		resultTryFive.innerText = `Il vous reste ${diffCentiseconds} centiseconde${
			diffCentiseconds > 1 ? 's' : ''
		}. Ayez l'œil !`;
	} else if (diffSeconds > 0) {
		resultTryFive.innerText = `Il vous reste ${diffSeconds} seconde${
			diffSeconds > 1 ? 's' : ''
		} et ${diffCentiseconds} centiseconde${
			diffCentiseconds > 1 ? 's' : ''
		}. Du nerf !`;
	}
});
