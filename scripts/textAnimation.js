document.addEventListener("DOMContentLoaded", initializeTileLinkTextAnimations);

function initializeTileLinkTextAnimations() {
	const animatedTextElements = document.getElementsByClassName("animated-text");

	const delayBetweenLinks = 500;
	const maxLinkDelay = 2000;

	let initialDelay = 0;
	for (let i = 0; i < animatedTextElements.length; i++) {
		addAnimationDelayToLetters(animatedTextElements[i], initialDelay);
		initialDelay += delayBetweenLinks;
		initialDelay = initialDelay % maxLinkDelay;
	}
}

function addAnimationDelayToLetters(textElement, initialDelay) {

	let generatedHtml = "";
	const words = textElement.textContent.split(' ');

	const delayBetweenLetters = 50;
	let letterDelay = 0;

	for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
		const word = words[wordIndex];
		generatedHtml += "<span class=\"word\">";
		
		for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
			generatedHtml += `<span class="letter" style="animation-delay: ${initialDelay + letterDelay}ms">` + word[letterIndex] + "</span>";
			letterDelay += delayBetweenLetters;
		}
		generatedHtml += "</span>";

		if (wordIndex != words.length) {
			generatedHtml += ' ';
			letterDelay += delayBetweenLetters; // Accounts for spaces in animation timing
		}
	}

	textElement.innerHTML = generatedHtml;
}