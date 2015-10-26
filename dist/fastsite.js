"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FastSite = (function () {
	function FastSite() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, FastSite);

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

	_createClass(FastSite, [{
		key: '_bindEvents',
		value: function _bindEvents() {
			var _this = this;

			window.onresize = function () {
				_this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			};
		}
	}, {
		key: '_loadScripts',
		value: function _loadScripts() {
			var _this2 = this;

			this.scripts = document.querySelectorAll('script[data-src]');

			var i,
			    count = this.scripts.length;

			var _loop = function () {
				var script = _this2.scripts[i];

				script.onload = function () {
					_this2.log('SCRIPT: success load: ' + script.src);
				};

				script.onerror = function () {
					_this2.log('SCRIPT: failed load: ' + script.src);
				};

				script.src = script.dataset.src;
			};

			for (i = 0; i < count; i++) {
				_loop();
			}
		}
	}, {
		key: '_loadImages',
		value: function _loadImages() {
			var _this3 = this;

			this.images = document.querySelectorAll('img[data-src]');

			var i,
			    count = this.images.length;

			var _loop2 = function () {
				var image = _this3.images[i];

				image.style.opacity = 0;
				image.style.transition = 'opacity ' + _this3.options.duration + 'ms ease-in';

				image.onload = function () {
					_this3.log('IMG: success load: ' + image.src);

					image.style.opacity = 1;
				};

				image.onerror = function () {
					_this3.log('IMG: failed load: ' + image.src);
				};

				if (!_this3.options.onScroll) {
					image.src = image.dataset.src;
				}
			};

			for (i = 0; i < count; i++) {
				_loop2();
			}

			if (this.options.onScroll) {
				window.onscroll = function () {
					var i,
					    count = _this3.images.length;

					for (i = 0; i < count; i++) {
						var image = _this3.images[i];

						if (!image.src) {
							var imageTop = image.getBoundingClientRect().top;

							if (_this3.windowHeight > imageTop) {
								image.src = image.dataset.src;
							}
						}
					}
				};

				window.onscroll();
			}
		}
	}, {
		key: 'log',
		value: function log(data) {
			if (this.options.debug) console.log(data);
		}
	}]);

	return FastSite;
})();

window.$fast = new FastSite({
	debug: window.location.hash === '#debug'
});