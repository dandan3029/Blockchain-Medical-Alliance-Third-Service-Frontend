import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Function as ModalFunction, SmallModal} from '../../../../Components/Modal';
import NAMESPACE from '../../../../NAMESPACE';
import {MODAL_ID} from '../../../../Constant';
import {View as ModalTriggeringButton} from '../../../../Components/ModalTriggeringButton';
import Api from '../../../../Api';
import {getInsurancePurchasingInfoAction} from '../../Actions/Actions';
import {connect} from 'react-redux';

class PayConfirmProcessor extends React.Component
{
    onModalConfirm = async () =>
    {
        const {insurancePurchasingInfo, getInsurancePurchasingInfo} = this.props;
        const {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
        } = insurancePurchasingInfo;
        const requestIsSuccessful = await Api.sendPostSubmitPayConfirmationRequestAsync(insurancePurchasingInfoId);
        if (requestIsSuccessful)
        {
            getInsurancePurchasingInfo(insurancePurchasingInfoId);
            ModalFunction.hideModal(MODAL_ID.PAY_CONFIRM_MODAL);
        }
    };

    render()
    {
        const {insurancePurchasingInfo} = this.props;
        const {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.NAME]: name,
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_TYPE]: insuranceType,
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PRICE]: insurancePrice,
        } = insurancePurchasingInfo;
        return [
            <div className={Style.PayConfirmProcessor} key={Style.PayConfirmProcessor}>
                <ModalTriggeringButton modalId={MODAL_ID.PAY_CONFIRM_MODAL}
                                       className={`btn btn-lg btn-primary ${Style.confirmPayButton}`}>确认投保人已支付保费</ModalTriggeringButton>
            </div>,
            <SmallModal id={MODAL_ID.PAY_CONFIRM_MODAL}
                        title={'确认投保人已支付保费'}
                        onConfirmButtonClick={this.onModalConfirm}
                        key={MODAL_ID.PAY_CONFIRM_MODAL}>
                确认投保人 {name} 已支付保险 {insuranceType} 的 {insurancePrice} 元保费？
            </SmallModal>,
        ];
    }
}

PayConfirmProcessor.propTypes = {
    insurancePurchasingInfo: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    getInsurancePurchasingInfo: getInsurancePurchasingInfoAction,
};

export default connect(null, mapDispatchToProps)(PayConfirmProcessor);