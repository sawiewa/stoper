const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopWatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const infoBtn = document.querySelector('.fas');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');
const colorBtn = document.querySelector('.fa-paintbrush');
const colorOne = document.querySelector('.one');
const colorTwo = document.querySelector('.two');
const colorThree = document.querySelector('.three');
const colorFour = document.querySelector('.four');
const colorsSet = document.querySelector('.colors');
let root = document.documentElement;

let countTime;
let minutes = 0;
let seconsd = 0;
let timeArr = []; //tablica która będzie zawierac czasy zatrzymania

//funkcja do sratowania licznika
const handleStart = () => {
	clearInterval(countTime); //czyscimy interwał, inaczej kazde przycisniecie przyspieszałoby stoper

	countTime = setInterval(() => {
		if (seconsd < 9) {
			seconsd++; //sekundy rosną co 1
			stopWatch.textContent = `${minutes}:0${seconsd}`;
		} else if (seconsd >= 9 && seconsd < 59) {
			seconsd++;
			stopWatch.textContent = `${minutes}:${seconsd}`; //usuniete 0 zeby sekundy jak wskocza od 10 wyswietlaly sie w tym miejscu
		} else {
			minutes++;
			seconsd = 0; //zerujemy sekundy ponieważ przeszła pełna minuta
			stopWatch.textContent = `${minutes}:00`;
		}
	}, 200); //co ile ma sie zmienic w milisekundach
};

const handlePause = () => {
	clearInterval(countTime); //czysci interwał
};

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopWatch.textContent}`;
	if (stopWatch.textContent !== '0:00') {
		time.style.visibility = 'visible';
		timeArr.push(stopWatch.textContent); //wrzucamy  do tablicy czas jaki był przy zatrzymaniu
	}

	clearStuff(); //wywołujemy tutaj tez funcję zeby wyzerować sekundy, minuty, wyswietlany czas i interwał
};

const handleReset = () => {
	timeArr = []; //czyscimy tablice, tutaj nie w funkcji clearstuff bo tam nie chcemy tego czyscic
	time.style.visibility = 'hidden';
	clearStuff(); //wywołujemy tutaj tez funcję zeby wyzerować sekundy, minuty, wyswietlany czas i interwał, czyli resetuje
};

const clearStuff = () => {
	clearInterval(countTime);
	minutes = 0;
	seconsd = 0;
	stopWatch.textContent = '0:00';
	timeList.textContent = ''; //funkcja która czyści wszystkie elementy
};

const showHistory = () => {
	timeList.textContent = ''; //jakby nie była czyszczona ta lista to każde kliknięcię by podwajało liste historii
	let num = 1;
	timeArr.forEach((time) => {
		const newTime = document.createElement('li');
		newTime.innerHTML = `Pomiar nr ${num} <span>${time}</span>`;
		timeList.appendChild(newTime);
		num++;
	});
};

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}
	modalShadow.classList.toggle('modal-animation');
};

const ChangeColor = () => {};

const showColorSettings = () => {
	colorsSet.classList.toggle('show-color');
};

colorBtn.addEventListener('click', showColorSettings);
startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener('click', showHistory);
infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', (e) =>
	e.target === modalShadow ? showModal() : false
); // nasłuchujemy na modal Shadow czyli sprawdzamy czy kliknieto na tło, jak tak to wywołujemy funckje showModal która zamyka popup modal, w przeciwnym wypadku false- czyli nic nie robimy
colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgba(250, 20, 6)');
});
colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(6, 22, 250)');
});
colorThree.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(83, 250, 6)');
});
colorFour.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(234, 6, 250)');
});
