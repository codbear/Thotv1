class Autocomplete {

    constructor(inputElement, datas) {
        this.$input = inputElement;
        this.$container = inputElement.parentNode;
        this.datas = datas;

        this.matchingEntries = [];
        this.autocompleteOptions = [];

        this.$input.addEventListener("input", (e) => {
            this.focusIndex = -1;
            let inputValue = this.$input.value.toLowerCase();
            this.resetDropdown();
            this.setupDropdown(inputValue);
        })

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.handleInputKeydownBound = this.handleInputKeydown.bind(this);

        this.$input.addEventListener('keydown', this.handleInputKeydownBound);
    }

    handleInputKeydown(e) {
        this.selectAutocompleteOptions();
        if (this.autocompleteOptions.length > 0) {
            switch (e.keyCode) {
                case 40:
                    e.preventDefault();
                    this.focusIndex++;
                    this.focusAutocompleteOption();
                    break;
                case 38:
                    e.preventDefault();
                    this.focusIndex--;
                    this.focusAutocompleteOption();
                    break;
                case 13:
                    e.preventDefault();
                    if (this.focusIndex > -1 && this.focusIndex <= this.autocompleteOptions.length) {
                        this.autocompleteOptions[this.focusIndex].click();
                    }
                    break;
            }
        }
    }

    selectAutocompleteOptions() {
        if (document.querySelector('.autocomplete-option')) {
            this.autocompleteOptions = Array.from(document.querySelectorAll('.autocomplete-option'));
        }
    }

    focusAutocompleteOption() {
        this.resetFocus();
        if (this.focusIndex >= this.autocompleteOptions.length) {
            this.focusIndex = 0;
        } else if (this.focusIndex < 0) {
            this.focusIndex = this.autocompleteOptions.length - 1;
        }
        this.autocompleteOptions[this.focusIndex].classList.add('autocomplete-active');
    }

    resetFocus() {
        this.autocompleteOptions.forEach($option => $option.classList.remove('autocomplete-active'));
    }

    setupDropdown(inputValue) {
        const $dropdown = document.createElement("ul");
        $dropdown.classList.add("autocomplete-dropdown", "bg-light");
        this.$input.parentNode.appendChild($dropdown);
        this.matchingEntries = this.datas.filter(entry => entry.name.toLowerCase().indexOf(inputValue) !== -1);

        for (let i = 0; i < this.matchingEntries.length; i++) {
            let entry = this.matchingEntries[i];
            let $autocompleteOption = document.createElement('li');
            $autocompleteOption.classList.add('autocomplete-option', 'text-dark');
            $autocompleteOption.setAttribute('data-ressourceId', entry.id);
            $autocompleteOption.textContent = entry.name;
            $autocompleteOption.addEventListener('click', (e) => {
                this.$input.value = entry.name;
                this.$input.dataset.ressourceId = entry.id;
                this.resetDropdown();
            }, {once: true});
            //todo: créer un fragment qui contient les li et l'ajouter au dom après la boucle
            $dropdown.appendChild($autocompleteOption);
        }
    }

    resetDropdown() {
        let $dropdown = this.$container.querySelector('.autocomplete-dropdown');
        if ($dropdown) this.$container.removeChild($dropdown);
        this.matchingEntries = [];
    }
}

export default Autocomplete;