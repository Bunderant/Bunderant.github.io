document.addEventListener("DOMContentLoaded", hideModal);
document.addEventListener("DOMContentLoaded", initializeModalListeners);

var dict = {};

function initializeModalListeners() {

	var modalPanel = document.getElementById("modal-background");
	var triggerElements = document.getElementsByClassName("modal-trigger");
	dict = {};

	for (let i = 0; i < triggerElements.length; i++) {
		const element = triggerElements[i];

		if (element.classList.contains("coming-soon")) {
			continue;
		}

		dict["#" + element.id] = function () {
			showModal();
			modalPanel.scrollTop = 0;

			let gradient = document.getElementById("modal-scroll-gradient");
			gradient.style.opacity = 0;

			modalPanel.onscroll = function () {
				gradient.style.opacity = Math.min(modalPanel.scrollTop / 10.0, 1);
			}

			loadModal(element.getElementsByClassName("modal-content-source")[0].getAttribute('data-modal-src'));
		};

		element.onclick = function () {
			window.location.hash = element.id;
		};
	}

	// Modal opening/closing is controlled exclusively through hash changes
	window.onhashchange = function () {
		if (dict.hasOwnProperty(location.hash)) {
			dict[location.hash]();
		}
		else {
			hideModal();
		}
	};

	document.getElementById("modal-close-button").onclick = function () {
		// If the modal was linked to directly, push state and close the modal manually rather than going "back"
		// in history. Then, hitting "back" will actually reopen the modal. 
		if (history.length > 0 && history.state == "direct-modal-link") {
			var url = String(location);
			history.pushState(null, null, url.substring(0, url.indexOf('#')));
			hideModal();
		}
		else {
			history.back()
		}
	}

	// Open the modal immediately if it was linked to directly
	if (dict.hasOwnProperty(location.hash)) {
		history.replaceState("direct-modal-link", "", location.url);
		dict[location.hash]();
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
	for (let i = 0; i < modalElements.length; i++) {
		modalElements[i].style.display = "block";
	}
	disableBodyOverflow();
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

	contentDiv.textContent = "";
	contentDiv.insertAdjacentHTML('afterbegin', await fetchModalContent(url));

	contentDiv.dispatchEvent(new CustomEvent('modalContentLoaded'));
}

async function fetchModalContent(url) {
	const response = await fetch(new Request(url));
	return await response.text();
}
