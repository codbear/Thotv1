import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import filterMatchingOptions from "../services/filterMatchingOptions";

import {AutocompleteDropdown} from "../modules/autocomplete-dropdown";

import '../styles/autocomplete.scss';

export default function Autocomplete(props) {
    const {options, label, name, value, placeholder, required, disabled, onMatch, onChange, onCreateNew, isInvalid} = props
    const [suggestions, setSuggestions] = useState({all: [], matching: null});
    const [inputValue, setInputValue] = useState(value || '');
    const [focusIndex, setFocusIndex] = useState(-1);
    const [dropdownStatus, setDropdownStatus] = useState('hidden');

    const handleChange = (event) => {
        const [matchingOptions, perfectlyMatchingOptions] = filterMatchingOptions(event.target.value, options);
        setSuggestions({all: matchingOptions, matching: perfectlyMatchingOptions[0]});
        setInputValue(event.target.value);
        setDropdownStatus('visible');
        onChange(event.target.value);
        if (perfectlyMatchingOptions[0]) {
            setDropdownStatus('hidden');
            onMatch(perfectlyMatchingOptions[0]);
        }
    }

    const setInputValueWithChosenOption = (optionValue) => {
        const [matchingOptions, perfectlyMatchingOptions] = filterMatchingOptions(optionValue, options);
        setSuggestions({all: matchingOptions, matching: perfectlyMatchingOptions[0]});
        setInputValue(optionValue);
        setDropdownStatus('hidden');
        onMatch(perfectlyMatchingOptions[0]);
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

            setInputValueWithChosenOption(null, suggestions.all[newFocusIndex].name);
        }

        setFocusIndex(newFocusIndex);
    }

    let className = 'form-control';
    if (isInvalid) className += ' is-invalid';

    useEffect(() => {
        if (inputValue !== '' && !suggestions.matching && !value) {
            setDropdownStatus('visible');
        }
    }, [inputValue, suggestions.matching, dropdownStatus]);

    return (
        <div className="autocomplete">
            {(label) && (<label htmlFor={name}>{label}</label>)}
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                className={className}
                value={inputValue}
                required={required}
                disabled={disabled}
                onChange={handleChange}
                onKeyDown={handleKeyDown}/>
            {(dropdownStatus === 'visible') && (
                <AutocompleteDropdown
                    suggestedOptions={suggestions.all}
                    inputValue={inputValue}
                    onClick={setInputValueWithChosenOption}
                    focusIndex={focusIndex}
                    onCreateNew={onCreateNew}/>
            )}
        </div>
    )
}

Autocomplete.defaultProps = {
    placeholder: '',
    name: '',
    value: undefined,
    required: false,
    disabled: false,
    onChange: () => {
    },
}

Autocomplete.propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
}