'use strict';

///datas
let timelineArray = [
	{
		year: 2018,
		description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.'
	},
	{
		year: 2017,
		description: 'A mother personally challenges the local authorities to solve her daughters murder when they fail to catch the culprit.'
	},
	{
		year: 2015,
		description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max. '
	},
	{
		year: 2012,
		description: 'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.'
	},
	{
		year: 2011,
		description: 'After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.'
	},
	{
		year: 2007,
		description: 'With their warning about Lord Voldemorts return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts.'
	},
	{
		year: 2006,
		description: 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.'
	},
	{
		year: 2004,
		description: 'Evan Treborn suffers blackouts during significant events of his life. As he grows up, he finds a way to remember these lost memories and a supernatural way to alter his life by reading his journal.'
	},
	{
		year: 2001,
		description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'
	}
]

/// variables
let currentYear = new Date().getFullYear();

/// DOM-elements
let timelineBox = document.querySelector('.timeline__box');
let selectedDate = document.querySelector('.js-date');
let selectedDateDescription = document.querySelector('.js-sub');
let gradientHover = document.querySelector('.js-hover');

/// classes
let datesClass = 'timeline__dates';
let selectedYearClass = 'timeline__dates--active';
let showGradientClass = 'timelapse';

/// inits
generateTimeline(timelineArray);

/// dinamic DOM-elements
let timelineItems = timelineBox.children;
let center = Math.round((timelineItems.length - 1) / 2);
let selectedDataIndex;



initTimeline();









/// functions
function createATimelineItem(data) {
	let item = document.createElement('div');
	item.classList.add(datesClass);

	if (data.year === currentYear) {
		item.innerHTML = 'Today';
	} else {
		item.innerHTML = data.year;
	}

	item.dataset.year = data.year;
	item.dataset.description = data.description;
	if (screen.width >= 768) {
		item.addEventListener('click', function () {
			for (let i = 0; i < timelineItems.length; i++) {
				timelineItems[i].classList.remove(selectedYearClass);
			}
			this.classList.add(selectedYearClass);
			setSelectedDate(this);
			arangeTimelineItemsAround(center - getNodeIndex(this) + 2);
		})
	}
	timelineBox.appendChild(item);
}


function generateTimeline(data) {
	for (let i = 0; i < data.length; i++) {
		createATimelineItem(data[i]);
	}
}

function arangeTimelineItemsAround(pos) {
	let position;
	if (!pos) {
		position = 0
	} else {
		position = pos
	};
	let i;
	let offsetAngle = 14.5;
	let translate = -22.8;
	
	if (window.screen.width < 767.98 || document.body.clientWidth < 767.98) {
		translate = -52.8;
	}
	for (i = 0; i < timelineItems.length; i++) {
		let rotateAngle = offsetAngle * (i + position);
		timelineItems[i].setAttribute('style', "transform : rotate(" + rotateAngle + "deg) translate(0," + translate + "vw) rotate( -87deg)")
	}
}

function initTimeline() {
	arangeTimelineItemsAround(2);
	timelineItems[center].classList.add(selectedYearClass);
	selectedDataIndex = getNodeIndex(timelineBox.querySelector('.' + selectedYearClass));
	setSelectedDate(timelineItems[selectedDataIndex]);
}



function setSelectedDate(item) {
	fillGradientLine();
	setTimeout(function () {
		selectedDate.innerHTML = item.dataset.year;
		selectedDateDescription.innerHTML = item.dataset.description
	}, 3000);
}

function fillGradientLine() {
	gradientHover.classList.remove(showGradientClass);
	setTimeout(function () {
		gradientHover.classList.add(showGradientClass);
	}, 500)
}

// events
if (screen.width < 768 || screen.width > 992) {
	if (timelineBox.addEventListener) {
		if ('onwheel' in document) {
			timelineBox.addEventListener("wheel", function () {
				throttle(stopWindiwScroll(), 900);
				throttle(scrollTimeline(), 500)
			});
		} else if ('onmousewheel' in document) {
			timelineBox.addEventListener("mousewheel", throttle(scrollTimeline, 9000));
		} else {
			timelineBox.addEventListener("MozMousePixelScroll", throttle(scrollTimeline, 90000));
		}
	} else {
		timelineBox.attachEvent("onmousewheel", throttle(scrollTimeline, 9000));
	}
}

function stopWindiwScroll(e) {
	e = e || window.event;
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

function scrollTimeline(e) {
	e = e || window.event;

	let currentDataIndex = getNodeIndex(timelineBox.querySelector('.timeline__dates--active'));

	let delta = e.deltaY || e.detail || e.wheelDelta;

	for (let i = 0; i < timelineItems.length; i++) {
		timelineItems[i].classList.remove(selectedYearClass);
	}

	if (delta >= 0) {
		currentDataIndex++;
		if (!timelineItems[currentDataIndex]) {
			currentDataIndex = timelineItems.length - 1;
		}
	} else if (delta < 0) {
		currentDataIndex--;
		if (!timelineItems[currentDataIndex]) {
			currentDataIndex = 0;
		}
	}
	timelineItems[currentDataIndex].classList.add(selectedYearClass)
	arangeTimelineItemsAround(center - currentDataIndex + 2);
	setTimeout(setSelectedDate(timelineItems[currentDataIndex]), 1000);
}


/// helpers
function getNodeIndex(el) {
	return Array.prototype.indexOf.call(el.parentNode.children, el);
}

function throttle(callback, limit) {
	let wait = false;
	return function () {
		if (!wait) {
			callback.call();
			wait = true;
			setTimeout(function () {
				wait = false;
			}, limit)
		}
	}
}