import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import Function from '../../Function';

class Radio extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: `radio_${Function.randomString()}`,
        };
    }


    render()
    {
        const {className, label, onClick, radioRef} = this.props;
        const {id} = this.state;
        return (
            <div className={`custom-control custom-radio ${Style.Radio}`} onClick={onClick}>
                <input type="radio"
                       id={id}
                       className={`custom-control-input ${className}`}
                       ref={radioRef} />
                <label className="custom-control-label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}

Radio.propTypes = {
    className: PropTypes.string,
    label: PropTypes.node,
    radioRef: PropTypes.object,
    onClick: PropTypes.func,
};


export default Radio;