import React from 'react';
import Style from './Style.module.scss';
import {View as HorizontalStageProgressIndicator} from '../../Components/HorizontalStageProgressIndicator';
import {View as StageTextIndicator} from '../../Components/StageTextIndicator';
import {DIRECT_PAYMENT_STAGE_ID, DIRECT_PAYMENT_STAGE_ID_TO_TEXT} from '../../Constant';
import {browserHistory, withRouter} from 'react-router';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../Config';
// import {View as InsuranceCompanyVerifyProcessor} from './Components/InsuranceCompanyVerifyProcessor';
import {getDirectPaymentInfoAction} from './Actions/Actions';
import {connect} from 'react-redux';
import NAMESPACE from '../../NAMESPACE';
// import {View as PayConfirmProcessor} from './Components/PayConfirmProcessor';

class DirectPaymentDetail extends React.Component
{
    componentDidMount()
    {
        const {directPaymentInfoId} = this.props.location.query;
        if (directPaymentInfoId === undefined)
        {
            browserHistory.push(PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_DIRECT_PAYMENT_PROCESS]);
        }
        else
        {
            const {getDirectPaymentInfo} = this.props;
            getDirectPaymentInfo(directPaymentInfoId);
        }
    }


    render()
    {
        const stageTextArray = [...DIRECT_PAYMENT_STAGE_ID_TO_TEXT];
        // const {insurancePurchasingInfo} = this.props;
        const {directPaymentInfo} = this.props;
        /*const {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_STAGE]: stageNumber,
        } = insurancePurchasingInfo;*/
        const {
            [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.DIRECT_PAYMENT_INFO_ID]: directPaymentInfoId,
            [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.DIRECT_PAYMENT_STAGE]: stageNumber,
        } = directPaymentInfo;
        return (
            <div className={Style.DirectPaymentDetail}>
                <div className={Style.stageProgressIndicatorWrapper}>
                    <HorizontalStageProgressIndicator currentStageNumber={stageNumber}
                                                        maxStageNumber={stageTextArray.length - 1} />
                </div>
                <div className={Style.title}>进度详情</div>
                <div className={Style.stageTextIndicatorWrapper}>
                    <StageTextIndicator currentStageNumber={stageNumber}
                                        stageTextArray={stageTextArray} />
                </div>
                {/* <div className={Style.stageProcessorWrapper}>
                    {
                        (() =>
                        {
                            switch (stageNumber)
                            {
                                case INSURANCE_PURCHASING_STAGE_ID.INSURANCE_COMPANY_VERIFY:
                                {
                                    return <InsuranceCompanyVerifyProcessor insurancePurchasingInfoId={insurancePurchasingInfoId} />;
                                }
                                case INSURANCE_PURCHASING_STAGE_ID.PAY:
                                {
                                    return <PayConfirmProcessor insurancePurchasingInfo={insurancePurchasingInfo} />;
                                }
                                default:
                                {
                                    return null;
                                }
                            }
                        })()
                    }
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    // const {InsurancePurchasingDetail: {insurancePurchasingInfo}} = state;
    const {DirectPaymentDetail: {directPaymentInfo}} = state;
    return {
        directPaymentInfo,
    };
};

const mapDispatchToProps = {
    //getInsurancePurchasingInfo: getInsurancePurchasingInfoAction,
    getDirectPaymentInfo: getDirectPaymentInfoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DirectPaymentDetail));