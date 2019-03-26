import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';

class Carousel extends React.Component
{
    render()
    {
        const {className, interval, imageSrcArray} = this.props;

        return (
            <div className={`carousel slide carousel-fade ${Style.Carousel} ${className}`} data-ride="carousel">
                <div className={`carousel-inner ${Style.inner}`}>
                    {
                        imageSrcArray.map((imageSrc, i) =>
                        {
                            if (i === 0)
                            {
                                return (
                                    <div className={`carousel-item active ${Style.item}`}
                                         data-interval={interval}
                                         style={{background: `url('${imageSrc}')`}}
                                         key={imageSrc} />
                                );
                            }
                            else
                            {
                                return (
                                    <div className={`carousel-item ${Style.item}`}
                                         data-interval={interval}
                                         style={{background: `url('${imageSrc}')`}}
                                         key={imageSrc} />
                                );
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

Carousel.propTypes = {
    className: PropTypes.string,
    interval: PropTypes.number.isRequired,
    imageSrcArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;