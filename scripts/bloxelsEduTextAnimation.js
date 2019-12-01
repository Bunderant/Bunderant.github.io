document.addEventListener("DOMContentLoaded", initializeSplashTextAnimations);

function initializeSplashTextAnimations() {
	const delayBetweenLetters = 50;

	let letterDelay = 0;
	const letters = document.getElementById("splash").getElementsByClassName("letter");
	for (let letterIndex = 0; letterIndex < letters.length; letterIndex++)
	{
		const letter = letters[letterIndex];
		letter.setAttribute("style", "animation-delay: " + letterDelay + "ms");
		letterDelay += delayBetweenLetters;
	}
}