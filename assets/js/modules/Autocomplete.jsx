import React, {useRef, useState} from 'react';
import PropTypes from "prop-types";

export default function Autocomplete({options, placeholder, required, onMatch, createNew}) {
    const [suggestions, setSuggestions] = useState({all: [], matching: null});
    const [inputValue, setInputValue] = useState('');
    const [focusIndex, setFocusIndex] = useState(-1);

    const handleChange = (event) => {
        const [matchingOptions, perfectlyMatchingOptions] = filterMatchingOptions(event.target.value, options);
        setSuggestions({all: matchingOptions, matching: perfectlyMatchingOptions[0]});
        setInputValue(event.target.value);
        onMatch(perfectlyMatchingOptions[0]);
    }

    const handleClick = (event, optionValue) => {
        const [matchingOptions, perfectlyMatchingOptions] = filterMatchingOptions(optionValue, options);
        setSuggestions({all: matchingOptions, matching: perfectlyMatchingOptions[0]});
        setInputValue(optionValue);
        onMatch(perfectlyMatchingOptions[0]);
    }

    function filterMatchingOptions(needle, options) {
        needle = needle.toLowerCase();
        const matchingOptions = options.filter(option => option.name.toLowerCase().indexOf(needle) !== -1);
        const perfectlyMatchingOptions = matchingOptions.filter((option) => option.name.toLowerCase() === needle);

        return [matchingOptions, perfectlyMatchingOptions];
    }

    const handleKeyDown = (event) => {
        let newFocusIndex = focusIndex;

        switch (event.keyCode) {
            case 40:
                newFocusIndex++;
                break;
            case 38:
                newFocusIndex--;
                break;
        }

        if (newFocusIndex >= suggestions.all.length) {
            newFocusIndex = 0;
        } else if (newFocusIndex < 0) {
            newFocusIndex = suggestions.all.length - 1;
        }

        if (event.keyCode === 13) {

            if (focusIndex < 0) {
                newFocusIndex = 0
            }

            handleClick(null, suggestions.all[newFocusIndex].name);
        }

        setFocusIndex(newFocusIndex);
    }

    return (
        <div className="autocomplete">
            <input
                type="text"
                placeholder={placeholder}
                className="form-control"
                value={inputValue}
                required={required}
                onChange={handleChange}
                onKeyDown={handleKeyDown}/>
            {(inputValue !== '' && !suggestions.matching) && (
                <AutocompleteDropdown
                    suggestedOptions={suggestions.all}
                    inputValue={inputValue}
                    onClick={handleClick}
                    focusIndex={focusIndex}
                    createNew={createNew}/>
            )}
        </div>
    )
}

Autocomplete.defaultProps = {
    placeholder: '',
    required: false,
}

Autocomplete.propTypes = {
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
}


function AutocompleteDropdown({suggestedOptions, inputValue, onClick, focusIndex, createNew}) {
    return (
        <ul className="autocomplete-dropdown bg-light">
            {suggestedOptions.map((option) => (
                <AutocompleteOption
                    value={option.name}
                    onClick={onClick}
                    key={option.id}
                    isFocused={suggestedOptions[focusIndex] === option}/>
            ))
            }
            <li
                className="autocomplete-option autocomplete-add text-dark"
                onClick={() => createNew(inputValue)}>
                Ajouter "{inputValue}"
            </li>
        </ul>
    )
}

function AutocompleteOption({value, onClick, isFocused}) {
    const autocompleteOption = useRef(null);
    let className = 'autocomplete-option text-dark';

    if (isFocused) className += ' autocomplete-active';

    return (
        <li
            className={className}
            onClick={(event) => onClick(event, value)}>
            {value}
        </li>
    )
}
