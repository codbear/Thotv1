import React from "react";

import './styles/loader.scss';

export default function Loader(props) {
    const {visible, light} = props;
    let wrapperClassName = 'loader-wrapper';
    let loaderClassName = 'loader';

    if (!visible) {
        wrapperClassName += ' hidden';
    }

    if (light) {
        loaderClassName += ' loader-light';
    }

    return (
        <div className={wrapperClassName}>
            <span className={loaderClassName}>

            </span>
        </div>
    )
}