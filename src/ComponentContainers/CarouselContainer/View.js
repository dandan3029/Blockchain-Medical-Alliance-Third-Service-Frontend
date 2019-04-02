import React from 'react';
import PropTypes from 'prop-types';
import {View as Carousel} from '../../Components/Carousel';
import Style from './Style.module.scss';
import {Link} from 'react-router';
import {CAROUSEL_IMAGE, PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../Config';

class CarouselContainer extends React.Component
{
    render()
    {
        const {className, shouldShowInsurancePublicationButton} = this.props;
        return (
            <div className={Style.CarouselContainer}>
                <Carousel interval={10 * 1000} imageSrcArray={CAROUSEL_IMAGE} className={className} />
                {
                    shouldShowInsurancePublicationButton ?
                        <Link onlyActiveOnIndex={false}
                                to={PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PUBLICATION]}>
                            <button className={Style.insurancePublicationButton}>
                                发布保险
                            </button>
                        </Link> : null
                }
            </div>
        );
    }
}

CarouselContainer.propTypes = {
    className: PropTypes.string,
    shouldShowInsurancePublicationButton: PropTypes.bool.isRequired,
};

export default CarouselContainer;