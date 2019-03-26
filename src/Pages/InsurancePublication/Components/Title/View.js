import React from 'react';
import Style from './Style.module.scss';

class Title extends React.Component
{
    render()
    {
        const {children} = this.props;
        return (
            <div className={Style.Title}>
                {children}
            </div>
        );
    }
}

export default Title;