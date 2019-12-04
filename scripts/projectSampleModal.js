document.addEventListener("DOMContentLoaded", initializeModalListeners);

function initializeModalListeners() {
	var modal = document.getElementById("modal-background");
	var videoDisplay = document.getElementById("modal-splash");

	var triggerElements = document.getElementsByClassName("modal-trigger");
	for (let i = 0; i < triggerElements.length; i++)
	{
		triggerElements[i].onclick = function() {
			disableBodyOverflow()
			modal.style.display = "block";
			videoDisplay.src = this.getElementsByTagName("source")[0].getAttribute("data-modal-src");
			modal.scrollTop = 0;

			let isAtTop = true;
			let gradient = document.getElementById("modal-scroll-gradient");
			gradient.style.display = 'none';

			modal.onscroll = function() {
				isAtTop = modal.scrollTop < 10;
				if (isAtTop && !(gradient.style.display === 'none')) {
					console.log("setting to none");
					gradient.style.display = 'none';
				}
				else if (!isAtTop && (gradient.style.display === 'none')) {
					console.log("setting to block");
					gradient.style.display = 'block';
				}
			}
		}
	}

	document.getElementById("modal-close-button").onclick = function() {
		modal.style.display = "none";
		enableBodyOverflow();
	}
}

function enableBodyOverflow() {
	document.getElementsByTagName("body")[0].style.overflow = "auto";
}

function disableBodyOverflow() {
	document.getElementsByTagName("body")[0].style.overflow = "hidden";
}
