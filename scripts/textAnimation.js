document.addEventListener("DOMContentLoaded", animateText);

function animateText() {
	initializeTileLinkTextAnimations();
}

async function initializeTileLinkTextAnimations() {

	const animatedTextElements = document.getElementsByClassName("animated-text");

	const delayBetweenLinks = 500;
	const maxLinkDelay = 2000;
	const delayBetweenLetters = 50;
	let initialDelay = 0;

	for (let i = 0; i < animatedTextElements.length; i++)
	{
		let textElement = animatedTextElements[i];
		await addWordAndLetterClassesToText(textElement);

		let letterDelay = 0;
		const letters = textElement.getElementsByClassName("letter");
		for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
			const letter = letters[letterIndex];
			letter.setAttribute("style", "animation-delay: " + (initialDelay + letterDelay) + "ms");
			letterDelay += delayBetweenLetters;
		}

		initialDelay += delayBetweenLinks;
		initialDelay = initialDelay % maxLinkDelay;
	}
}

function addWordAndLetterClassesToText(textElement) {
	const startWordSpan = "<span class='word'>";
	const startLetterSpan = "<span class='letter'>"
	const endSpan = "</span>";

	const words = textElement.textContent.split(' ');

	let generatedHtml = "";
	for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
		const word = words[wordIndex];
		generatedHtml += startWordSpan;
		for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
			generatedHtml += startLetterSpan + word[letterIndex] + endSpan;
		}
		generatedHtml += endSpan;

		if (wordIndex != words.length) {
			generatedHtml += ' ';
		}
	}

	textElement.innerHTML = generatedHtml;

	return Promise.resolve(textElement);
}