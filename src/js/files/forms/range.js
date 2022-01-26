// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const storageSlider = document.getElementById('storageSlider');
	const trafficSlider = document.querySelector('#trafficSlider');
	const result = document.getElementById('calculatorResult');
	const storagePrice = document.getElementById('storagePrice');
	const trafficPrice = document.getElementById('trafficPrice');

	if (storageSlider) {
		noUiSlider.create(storageSlider, {
			start: 5, // [0,200000]
			connect: [true, false],
			step: 1,
			range: {
				'min': [1],
				'max': [10]
			},
			tooltips: [
				wNumb({
					decimals: 0,
					suffix: ' Tb',
				})
			],
		});
	}

	if (trafficSlider) {
		noUiSlider.create(trafficSlider, {
			start: 3, // [0,200000]
			connect: [true, false],
			step: 1,
			range: {
				'min': [1],
				'max': [10]
			},
			tooltips: [
				wNumb({
					decimals: 0,
					suffix: ' Gdps',
				})
			],
		});
	}

	storageSlider.noUiSlider.on('update', function (values) {
		if (trafficSlider) {
			let trafficSliderValue = trafficSlider.noUiSlider.get();

			result.innerHTML = (Number(values * storagePrice.innerHTML + trafficSliderValue * trafficPrice.innerHTML)).toFixed(2);

			if (Number(values) >= 10) {
				document.querySelector('.total-result').classList.add('_request');
			} else if (trafficSliderValue < 10) {
				document.querySelector('.total-result').classList.remove('_request');
			}
		} else {
			result.innerHTML = (values * storagePrice.innerHTML).toFixed(2);

			if (Number(values) >= 10) {
				document.querySelector('.total-result').classList.add('_request');
			}
		}
	})

	trafficSlider.noUiSlider.on('update', function (values) {
		if (storageSlider) {
			let storageSliderValue = storageSlider.noUiSlider.get();

			result.innerHTML = (Number(values * trafficPrice.innerHTML + storageSliderValue * storagePrice.innerHTML)).toFixed(2);

			if (Number(values) >= 10) {
				document.querySelector('.total-result').classList.add('_request');
			} else if (storageSliderValue < 10) {
				document.querySelector('.total-result').classList.remove('_request');
			}
		} else {
			result.innerHTML = (values * trafficPrice.innerHTML).toFixed(2);

			if (Number(values) >= 10) {
				document.querySelector('.total-result').classList.add('_request');
			}
		}
	})
}
rangeInit();
