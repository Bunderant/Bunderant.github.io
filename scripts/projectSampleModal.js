document.addEventListener("DOMContentLoaded", hideModal);
document.addEventListener("DOMContentLoaded", initializeModalListeners);

function initializeModalListeners() {

	var modalPanel = document.getElementById("modal-background");
	var triggerElements = document.getElementsByClassName("modal-trigger");

	for (let i = 0; i < triggerElements.length; i++)
	{
		triggerElements[i].onclick = function() {
			showModal();
			modalPanel.scrollTop = 0;

			let isAtTop = true;
			let gradient = document.getElementById("modal-scroll-gradient");
			gradient.style.display = 'none';

			modalPanel.onscroll = function() {
				isAtTop = modalPanel.scrollTop < 10;
				if (isAtTop && !(gradient.style.display === 'none')) {
					gradient.style.display = 'none';
				}
				else if (!isAtTop && (gradient.style.display === 'none')) {
					gradient.style.display = 'block';
				}
			}

			loadModal(this.getElementsByClassName("modal-content-source")[0].getAttribute('data-modal-src'));
		}
	}

	document.getElementById("modal-close-button").onclick = function() {
		hideModal();
	}
}

function enableBodyOverflow() {
	document.getElementsByTagName("body")[0].style.overflow = "auto";
}

function disableBodyOverflow() {
	document.getElementsByTagName("body")[0].style.overflow = "hidden";
}

function showModal() {
	var modalElements = document.getElementsByClassName("modal-toggle");
	disableBodyOverflow();
	for (let i = 0; i < modalElements.length; i++) {
		modalElements[i].style.display = "block";
	}
}

function hideModal() {
	var modalElements = document.getElementsByClassName("modal-toggle");
	for (let i = 0; i < modalElements.length; i++) {
		modalElements[i].style.display = "none";
	}
	enableBodyOverflow();
}

async function loadModal(url) {
	const contentDiv = document.getElementById("modal-panel");

	contentDiv.textContent="";
	contentDiv.insertAdjacentHTML('afterbegin', await fetchModalContent(url));

	contentDiv.dispatchEvent(new CustomEvent('modalContentLoaded'));
}

async function fetchModalContent(url) {
	const response = await fetch(new Request(url));
	return await response.text();
}
