window.addWordAndLetterClassesToText = addWordAndLetterClassesToText;
document.addEventListener("DOMContentLoaded", initializeProjectTextAnimations);

function initializeProjectTextAnimations() {

	addWordAndLetterClassesToText("shipped", "h2");

	const shippedProjects = document.getElementById("shipped").getElementsByClassName("grid-item");

	const delayBetweenProjects = 500;
	const maxProjectDelay = 2000;
	const delayBetweenLetters = 50;
	let initialDelay = 0;

	for (let i = 0; i < shippedProjects.length; i++)
	{
		let letterDelay = 0;

		const letters = shippedProjects[i].getElementsByClassName("letter");
		for (let letterIndex = 0; letterIndex < letters.length; letterIndex++)
		{
			const letter = letters[letterIndex];
			letter.setAttribute("style", "animation-delay: " + (initialDelay + letterDelay) + "ms");
			letterDelay += delayBetweenLetters;
		}

		initialDelay += delayBetweenProjects;
		initialDelay = initialDelay % maxProjectDelay;
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