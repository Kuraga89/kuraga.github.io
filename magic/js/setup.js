'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

var randomValue = function(arr) {
	var rand = Math.floor(Math.random() * arr.length);
	return arr[rand];
}

var createWizard = function(names, surnames, coats, eyes) {
	var wizards = [];
	for(var i = 0; i < 4; i++){
		var element = {};
		element.name = randomValue(names) + ' ' +randomValue(surnames);
		element.coatColor = randomValue(coats);
		element.eyesColor = randomValue(eyes);
		wizards[i] = element;
	};
	return wizards;
}

var wizardsList = createWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

	var renderWizards = function(wizard) {
		var wizardElement = similarWizardTemplate.cloneNode(true);

		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

		return wizardElement;
	};

	var fragment = document.createDocumentFragment();

	for(var i = 0; i < wizardsList.length; i++) {
		fragment.appendChild(renderWizards(wizardsList[i]));
	}

	similarListElement.appendChild(fragment);
	userDialog.querySelector('.setup-similar').classList.remove('hidden'); 
