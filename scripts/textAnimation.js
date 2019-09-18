
document.addEventListener("DOMContentLoaded", initializeProjectTextAnimations);

function initializeProjectTextAnimations() {

	const projects = document.getElementById("projects").getElementsByClassName("grid-item");

	const delayBetweenProjects = 1000;
	const maxProjectDelay = 3000;
	const delayBetweenLetters = 100;
	let initialDelay = 0;

	for (let i = 0; i < projects.length; i++)
	{
		let letterDelay = 0;

		const letters = projects[i].getElementsByClassName("letter");
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