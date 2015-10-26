"use strict";

class FastSite {
	constructor (options = {}) {
		var defaults = {
			debug: false,
			onScroll: true,
			duration: 200
		};

		this.options = Object.assign(defaults, options);

		this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		this._bindEvents();
		this._loadScripts();
		this._loadImages();
	}

	_bindEvents () {
		window.onresize = () => {
			this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		}
	}

	_loadScripts () {
		this.scripts = document.querySelectorAll('script[data-src]');

		var i, count = this.scripts.length;

		for (i = 0; i < count; i++) {
			let script = this.scripts[ i ];

			script.onload = () => {
				this.log(`SCRIPT: success load: ${script.src}`);
			};

			script.onerror = () => {
				this.log(`SCRIPT: failed load: ${script.src}`);
			};

			script.src = script.dataset.src;
		}
	}

	_loadImages () {
		this.images = document.querySelectorAll('img[data-src]');

		var i, count = this.images.length;

		for (i = 0; i < count; i++) {
			let image = this.images[ i ];

			image.style.opacity = 0;
			image.style.transition = `opacity ${this.options.duration}ms ease-in`;

			image.onload = () => {
				this.log(`IMG: success load: ${image.src}`);

				image.style.opacity = 1;
			};

			image.onerror = () => {
				this.log(`IMG: failed load: ${image.src}`);
			};

			if (!this.options.onScroll) {
				image.src = image.dataset.src;
			}
		}

		if (this.options.onScroll) {
			window.onscroll = () => {
				var i, count = this.images.length;

				for (i = 0; i < count; i++) {
					let image = this.images[ i ];

					if (!image.src) {
						let imageTop = image.getBoundingClientRect().top;

						if (this.windowHeight > imageTop) {
							image.src = image.dataset.src;
						}
					}
				}
			};

			window.onscroll();
		}
	}

	log (data) {
		if (this.options.debug) console.log(data);
	}
}

window.$fast = new FastSite({
	debug: window.location.hash === '#debug'
});