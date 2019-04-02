import React from 'react';
import Style from './Style.module.scss';
import {View as CarouselContainer} from '../../ComponentContainers/CarouselContainer';
import {View as InsuranceSelector} from './Components/InsuranceSelector';
import {View as Insurance} from '../../Components/Insurance';
import Function from '../../Function';
import {Link} from 'react-router';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../Config';
import Api from '../../Api';
import NAMESPACE from '../../NAMESPACE';

class InsuranceList extends React.Component
{
    constructor(props)
    {
        super(props);
        // 网络接口预留
        this.state = {
            insuranceList: [],
        };
    }

    componentDidMount()
    {

        Api.sendGetInsuranceListRequestAsync()
            .then(insuranceListWrapper =>
            {
                if (insuranceListWrapper)
                {
                    const insuranceList = insuranceListWrapper[NAMESPACE.INSURANCE_LIST.LIST.INSURANCE];
                    this.setState({
                        insuranceList,
                    });
                }
            });
    }

    render()
    {
        const {insuranceList} = this.state;
        return (
            <div className={Style.InsuranceList}>
                <CarouselContainer shouldShowInsurancePublicationButton={true} className={Style.carousel} />
                <div className={Style.contentWrapper}>
                    <InsuranceSelector />
                    <div className={Style.listWrapper}>
                        {
                            insuranceList.map((insurance, i) =>
                            {
                                const {insuranceId, insuranceSource, insuranceDuration, insurancePrice} = insurance;
                                return (
                                    <div className={Style.insuranceWrapper} key={i}>
                                        <Link onlyActiveOnIndex={false}
                                                to={`${PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_DETAIL]}?insuranceId=${insuranceId}`}>
                                            <Insurance {...{
                                                insuranceSource,
                                                insuranceDuration,
                                                insurancePrice,
                                            }} />
                                        </Link>
                                    </div>);
                            })
                        }
                        {
                            Function.repeatNode(<div className={Style.insuranceWrapper} />, 6)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default InsuranceList;