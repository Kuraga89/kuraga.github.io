(function(){
	var pins  = document.querySelector('.map__pins');
	var mapContainer = document.querySelector('.map');
	var mapPinMain = document.querySelector('.map__pin--main');
	var noticeForm = document.querySelector('.notice__form');
	var fieldsetNoticeForm = noticeForm.querySelectorAll('fieldset');

		//делаем поля формы неактивными
		var disableFieldsetForm = function() {
			for(var i=0; i < fieldsetNoticeForm.length; i++) {
				fieldsetNoticeForm[i].setAttribute('disabled', 'disabled');
			}
		};

		disableFieldsetForm ();

		//делаем поля формы активными
		var activateFieldsetForm = function() {
			for(var i=0; i < fieldsetNoticeForm.length; i++) {
				fieldsetNoticeForm[i].removeAttribute('disabled', 'disabled');
			}
			noticeForm.classList.remove('notice__form--disabled');
		};

		var activatedForm = function() {
			mapContainer.classList.remove('map--faded');
			activateFieldsetForm();
			//showAddressValue(PIN_DIAMETER, PIN_HEIGHT);
			window.showPins();
			window.showAdressValue();
			window.showCard();
		};


		mapPinMain.addEventListener('mousedown', function(evt) {
			evt.preventDefault();

			var startCoords = {
				x: evt.clientX,
				y: evt.clientY
			};

			var onMouseMove = function(moveEvt) {
				moveEvt.preventDefault();

				var shift = {
					x: startCoords.x - moveEvt.clientX,
					y: startCoords.y - moveEvt.clientY
				};

				startCoords = {
					x: moveEvt.clientX,
					y: moveEvt.clientY
				};

				/*if(moveEvt.clientX - pins.offsetWidth > 0) {
					mapPinMain.style.left = pins.offsetWidth + 'px';
				};*/

				console.log(pins.getBoundingClientRect());

				mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
				mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
			};

			var onMouseUp = function(upEvt) {
				upEvt.preventDefault();
				activatedForm();

				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);	
			};

			document.addEventListener('mousemove',onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});

	})();