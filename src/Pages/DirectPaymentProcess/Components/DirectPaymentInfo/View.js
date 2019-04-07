import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {DIRECT_PAYMENT_STAGE_ID, DIRECT_PAYMENT_STAGE_ID_TO_TEXT} from '../../../../Constant';
import {browserHistory} from 'react-router';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../../../Config';
import {TOOLTIP_POSITION, View as ToolTip} from '../../../../Components/Tooltip';
import {View as ClickCopy} from '../../../../Components/ClickCopy';
import {SuccessAlert, WarningAlert} from '../../../../Components/Alerts';

class DirectPaymentInfo extends React.Component
{
    stopPropagation = e =>
    {
        e.stopPropagation();
        e.cancelBubble = true;
    };

    onDiagnosticResultButtonClick = e =>
    {
        this.stopPropagation(e);
        this.props.onDiagnosticResultButtonClick(e);
    };

    onMedicalDescriptionButtonClick = e =>
    {
        this.stopPropagation(e);
        this.props.onMedicalDescriptionButtonClick(e);
    };

    onInsurancePurchasingInfoButtonClick = e =>
    {
        this.stopPropagation(e);
        const {insurancePurchasingInfoId} = this.props;
        browserHistory.push(`${PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.INSURANCE_COMPANY_INSURANCE_PURCHASING_PROCESS]}?insurancePurchasingInfoId=${insurancePurchasingInfoId}`);
    };

    onDirectPaymentInfoClick = () =>
    {
        const {directPaymentInfoId} = this.props;
        browserHistory.push(`${PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.INSURANCE_COMPANY_DIRECT_PAYMENT_DETAIL]}?directPaymentInfoId=${directPaymentInfoId}`);
    };

    render()
    {
        const {
            // name,
            // age,
            // isMale,
            // healthState,
            insuranceCompany,
            hospital,
            publicKey,
            directPaymentMoneyAmount,
            directPaymentStage,
        } = this.props;
        return (
            <tr className={`${Style.DirectPaymentInfo}`}
                onClick={this.onDirectPaymentInfoClick}>
                <th scope="row">{insuranceCompany}</th>
                <td>{hospital}</td>
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
                <td>{directPaymentMoneyAmount} 元</td>
                <td>
                    <button onClick={this.onDiagnosticResultButtonClick}>查看</button>
                </td>
                <td>
                    <button onClick={this.onMedicalDescriptionButtonClick}>查看</button>
                </td>
                <td>
                    <button onClick={this.onInsurancePurchasingInfoButtonClick}>查看</button>
                </td>
                <td>{DIRECT_PAYMENT_STAGE_ID_TO_TEXT[directPaymentStage]}</td>
            </tr>
        );
    }
}

DirectPaymentInfo.propTypes = {
    directPaymentInfoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // name: PropTypes.string.isRequired,
    // age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    // isMale: PropTypes.oneOf([0, 1]).isRequired,
    // healthState: PropTypes.string.isRequired,
    insuranceCompany: PropTypes.string.isRequired,
    hospital: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
    directPaymentMoneyAmount: PropTypes.number.isRequired,
    insurancePurchasingInfoId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    directPaymentStage: PropTypes.oneOf(Object.values(DIRECT_PAYMENT_STAGE_ID)).isRequired,
    onDiagnosticResultButtonClick: PropTypes.func.isRequired,
    onMedicalDescriptionButtonClick: PropTypes.func.isRequired,
};

export default DirectPaymentInfo;