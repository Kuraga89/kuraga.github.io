(function(){
	var similarListElement = document.querySelector('.setup-similar-list');
	var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

	var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
	var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
	var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 
	'rgb(101, 137, 164)', 
	'rgb(146, 100, 161)', 
	'rgb(56, 159, 117)', 
	'rgb(215, 210, 55)', 
	'rgb(0, 0, 0)'];
	var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

	var createWizard = function(names, surnames, coats, eyes) {
		var wizards = [];
		for(var i = 0; i < 4; i++){
			var element = {};
			element.name = window.util.randomValue(names) + ' ' + window.util.randomValue(surnames);
			element.coatColor = window.util.randomValue(coats);
			element.eyesColor = window.util.randomValue(eyes);
			wizards[i] = element;
		};
		return wizards;
	}

	var wizardsList = createWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

	var renderWizards = function(wizard) {
		var wizardElement = similarWizardTemplate.cloneNode(true);

		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

		return wizardElement;
	};

	var showWizards = function() {

		window.backend.load(function(wizards) {
			var fragment = document.createDocumentFragment();

			for(var i = 0; i < 4; i++) {
				fragment.appendChild(renderWizards(wizards[i]));
			};
			similarListElement.appendChild(fragment);
			window.setup.querySelector('.setup-similar').classList.remove('hidden'); 			
		});		

		// отправляем данные из формы на сервер
		var form = document.querySelector('.setup-wizard-form');
		form.addEventListener('submit', function(evt) {
			window.backend.save(new FormData(form), function(response) {
				window.setup.classList.add('hidden');
			});
			evt.preventDefault();
		});
	};

	showWizards();

	
})();