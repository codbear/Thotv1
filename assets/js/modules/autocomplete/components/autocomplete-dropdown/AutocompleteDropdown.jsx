import React from "react";

import AutocompleteDropdownOption from "../autocomplete-dropdown-option/AutocompleteDropdownOption";

export default function AutocompleteDropdown({suggestedOptions, inputValue, onClick, focusIndex, onCreateNew}) {
    return (
        <ul className="autocomplete-dropdown bg-light">
            {suggestedOptions.map((option) => (
                <AutocompleteDropdownOption
                    value={option.name}
                    onClick={onClick}
                    key={option.id}
                    isFocused={suggestedOptions[focusIndex] === option}/>
            ))
            }
            {(onCreateNew) && (
                <li
                    className="autocomplete-option autocomplete-add text-dark"
                    onClick={() => onCreateNew(inputValue)}>
                    Ajouter "{inputValue}"
                </li>
            )}
        </ul>
    )
}