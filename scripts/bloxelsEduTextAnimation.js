document.addEventListener("DOMContentLoaded", initializeSplashTextAnimations);

function initializeSplashTextAnimations() {
	const delayBetweenLetters = 50;

	addWordAndLetterClassesToText('splash', 'h1');

	let letterDelay = 0;
	const letters = document.getElementById("splash").getElementsByClassName("letter");
	for (let letterIndex = 0; letterIndex < letters.length; letterIndex++)
	{
		const letter = letters[letterIndex];
		letter.setAttribute("style", "animation-delay: " + letterDelay + "ms");
		letterDelay += delayBetweenLetters;
	}
}

function addWordAndLetterClassesToText(rootContainerId, textElementTypeName) {

	const container = document.getElementById(rootContainerId);
	const elements = container.getElementsByTagName(textElementTypeName);

	const startWordSpan = "<span class='word'>";
	const startLetterSpan = "<span class='letter'>"
	const endSpan = "</span>";

	for (let i = 0; i < elements.length; i++) {
		const textElement = elements[i];
		var words = textElement.textContent.split(' ');

		var generatedHtml = "";
		for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
			var word = words[wordIndex];
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
	}
}