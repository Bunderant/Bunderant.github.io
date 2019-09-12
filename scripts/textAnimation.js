
document.addEventListener("DOMContentLoaded", beginProjectTextAnimations);

async function beginProjectTextAnimations()
{
	const projects = document.getElementById("projects").getElementsByClassName("grid-item");

	for (let i = 0; i < projects.length; i++) {

		await sleep(1000);

		const letters = projects[i].getElementsByClassName("letter");
		wavePulse(letters);
	}
}

async function wavePulse(blockElements) {

	for (let i = 0; i < blockElements.length; i++) {

		await sleep(100);

		const element = blockElements[i];

		// keyframes padded out to create time between waves in the looping animation
		element.animate(
			[
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 2px)' },
				{ transform: 'translate(0, -4px)' },
				{ transform: 'translate(0, 2px)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
				{ transform: 'translate(0, 0)' },
			],
			{
				easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
				duration: 3000,
				iterations: Infinity
			}
		);
	};
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}