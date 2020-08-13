import React from "react";

export default function AutocompleteDropdownOption({value, onClick, isFocused}) {
    let className = 'autocomplete-option text-dark';

    if (isFocused) className += ' autocomplete-active';

    return (
        <li
            className={className}
            onClick={(event) => onClick(value, event)}>
            {value}
        </li>
    )
}