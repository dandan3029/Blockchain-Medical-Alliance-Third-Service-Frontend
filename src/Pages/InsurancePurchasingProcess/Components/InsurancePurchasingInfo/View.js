import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {INSURANCE_PURCHASING_STAGE_ID, INSURANCE_PURCHASING_STAGE_ID_TO_TEXT} from '../../../../Constant';
import {browserHistory, withRouter} from 'react-router';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../../../Config';
import {TOOLTIP_POSITION, View as ToolTip} from '../../../../Components/Tooltip';
import {SuccessAlert, WarningAlert} from '../../../../Components/Alerts';
import {View as ClickCopy} from '../../../../Components/ClickCopy';

class InsurancePurchasingInfo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.rowRef = React.createRef();
    }

    componentDidMount()
    {
        const {query: {insurancePurchasingInfoId: insurancePurchasingInfoIdInQuery}} = this.props.location;
        const {insurancePurchasingInfoId} = this.props;
        if (insurancePurchasingInfoId === insurancePurchasingInfoIdInQuery || insurancePurchasingInfoId === parseInt(insurancePurchasingInfoIdInQuery, 10))
        {
            this.rowRef.current.scrollIntoView();
            this.rowRef.current.classList.add(Style.active);
        }
    }


    onInsuranceInfoClick = () =>
    {
        const {insurancePurchasingInfoId} = this.props;
        browserHistory.push(`${PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.INSURANCE_COMPANY_INSURANCE_PURCHASING_DETAIL]}?insurancePurchasingInfoId=${insurancePurchasingInfoId}`);
    };

    render()
    {
        const {
            name,
            age,
            isMale,
            healthState,
            publicKey,
            insuranceType,
            insurancePurchasingTime,
            insurancePeriod,
            insurancePrice,
            insurancePurchasingStage,
            responsiblePersonName,
        } = this.props;
        return (
            <tr className={`${Style.InsuranceInfo}`}
                onClick={this.onInsuranceInfoClick}
                ref={this.rowRef}>
                <th scope="row">{name}</th>
                <td>{age} 岁</td>
                <td>{isMale ? '男' : '女'}</td>
                <td>{healthState}</td>
                <td>
                    <ClickCopy copyText={publicKey} onCopySuccess={
                        () =>
                        {
                            SuccessAlert.pop('公钥复制成功');
                        }} onCopyError={
                        () =>
                        {
                            WarningAlert.pop('公钥复制失败');
                        }}>
                        <ToolTip placement={TOOLTIP_POSITION.TOP} title={'点击复制公钥'}>
                            <div className={Style.publicKey}>{publicKey}</div>
                        </ToolTip>
                    </ClickCopy>
                </td>
                <td>{insuranceType}</td>
                <td>{insurancePurchasingTime}</td>
                <td>{insurancePeriod}</td>
                <td>{insurancePrice} 元</td>
                <td>{INSURANCE_PURCHASING_STAGE_ID_TO_TEXT[insurancePurchasingStage]}</td>
                <td>{responsiblePersonName}</td>
            </tr>
        );
    }
}

InsurancePurchasingInfo.propTypes = {
    insurancePurchasingInfoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isMale: PropTypes.oneOf([0, 1]).isRequired,
    healthState: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
    insuranceType: PropTypes.string.isRequired,
    insurancePurchasingTime: PropTypes.string.isRequired,
    insurancePeriod: PropTypes.string.isRequired,
    insurancePrice: PropTypes.number.isRequired,
    insurancePurchasingStage: PropTypes.oneOf(Object.values(INSURANCE_PURCHASING_STAGE_ID)).isRequired,
    responsiblePersonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    responsiblePersonName: PropTypes.string.isRequired,
};

export default withRouter(InsurancePurchasingInfo);