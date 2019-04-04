import React from 'react';
import Style from './Style.module.scss';
import {View as HorizontalStageProgressIndicator} from '../../Components/HorizontalStageProgressIndicator';
import {View as StageTextIndicator} from '../../Components/StageTextIndicator';
import {INSURANCE_PURCHASING_STAGE_ID, INSURANCE_PURCHASING_STAGE_ID_TO_TEXT} from '../../Constant';
import {browserHistory, withRouter} from 'react-router';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../Config';
import {View as InsuranceCompanyVerifyProcessor} from './Components/InsuranceCompanyVerifyProcessor';
import {getInsurancePurchasingInfoAction} from './Actions/Actions';
import {connect} from 'react-redux';
import NAMESPACE from '../../NAMESPACE';
import {View as PayConfirmProcessor} from './Components/PayConfirmProcessor';

class InsurancePurchasingDetail extends React.Component
{
    componentDidMount()
    {
        const {insurancePurchasingInfoId} = this.props.location.query;
        if (insurancePurchasingInfoId === undefined)
        {
            browserHistory.push(PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_PROCESS]);
        }
        else
        {
            const {getInsurancePurchasingInfo} = this.props;
            getInsurancePurchasingInfo(insurancePurchasingInfoId);
        }
    }


    render()
    {
        const stageTextArray = [...INSURANCE_PURCHASING_STAGE_ID_TO_TEXT];
        const {insurancePurchasingInfo} = this.props;
        const {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_STAGE]: stageNumber,
        } = insurancePurchasingInfo;
        return (
            <div className={Style.InsurancePurchasingDetail}>
                <div className={Style.stageProgressIndicatorWrapper}>
                    <HorizontalStageProgressIndicator currentStageNumber={stageNumber}
                                                        maxStageNumber={stageTextArray.length - 1} />
                </div>
                <div className={Style.title}>进度详情</div>
                <div className={Style.stageTextIndicatorWrapper}>
                    <StageTextIndicator currentStageNumber={stageNumber}
                                        stageTextArray={stageTextArray} />
                </div>
                <div className={Style.stageProcessorWrapper}>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {InsurancePurchasingDetail: {insurancePurchasingInfo}} = state;
    return {
        insurancePurchasingInfo,
    };
};

const mapDispatchToProps = {
    getInsurancePurchasingInfo: getInsurancePurchasingInfoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InsurancePurchasingDetail));