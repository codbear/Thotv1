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
            if (e.keyCode === 40) {
                e.preventDefault();
                this.focusIndex++;
                this.focusAutocompleteOption();
            } else if (e.keyCode === 38) {
                e.preventDefault();
                this.focusIndex--;
                this.focusAutocompleteOption();
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (this.focusIndex > -1 && this.focusIndex <= this.autocompleteOptions.length) {
                    this.autocompleteOptions[this.focusIndex].click();
                }
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

        for (let key in this.datas) {
            if (this.datas.hasOwnProperty(key) && key.toLowerCase().indexOf(inputValue) !== -1) {
                let entry = {
                    id: this.datas[key],
                    name: key
                };
                this.matchingEntries.push(entry);
            }
        }

        for (let i = 0; i < this.matchingEntries.length; i++) {
            let entry = this.matchingEntries[i];
            let $autocompleteOption = document.createElement('li');
            $autocompleteOption.classList.add('autocomplete-option', 'text-dark');
            $autocompleteOption.setAttribute('data-ressourceId', entry.id);
            $autocompleteOption.textContent = entry.name;
            $autocompleteOption.addEventListener('click', (e) => {
                this.$input.value = entry.name;
                this.resetDropdown();
            }, {once: true});
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