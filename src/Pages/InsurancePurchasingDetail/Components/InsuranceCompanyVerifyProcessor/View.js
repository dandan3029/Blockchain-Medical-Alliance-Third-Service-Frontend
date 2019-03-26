import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {View as Radio} from '../../../../Components/Radio';
import {Function as ModalFunction, Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';
import Api from '../../../../Api';
import NAMESPACE from '../../../../NAMESPACE';
import {getInsurancePurchasingInfoAction} from '../../Actions/Actions';
import {connect} from 'react-redux';

class InsuranceCompanyVerifyProcessor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentSelectedRadio: false,
            electronicInsurancePolicy: '',
            medicalRecord: '',
        };
        this.yesRadioRef = React.createRef();
        this.noRadioRef = React.createRef();
    }

    componentDidMount()
    {
        this.yesRadioRef.current.checked = false;
        this.noRadioRef.current.checked = true;
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {currentSelectedRadio} = this.state;
        if (prevState.currentSelectedRadio !== currentSelectedRadio)
        {
            if (currentSelectedRadio === true)
            {
                this.yesRadioRef.current.checked = true;
                this.noRadioRef.current.checked = false;
            }
            else
            {
                this.yesRadioRef.current.checked = false;
                this.noRadioRef.current.checked = true;
            }
        }
    }

    onRadioClick = isYes =>
    {
        return () =>
        {
            this.setState({
                currentSelectedRadio: isYes,
            });
        };
    };

    onViewElectronicInsurancePolicyButtonClick = async () =>
    {
        const {insurancePurchasingInfoId} = this.props;
        const electronicInsurancePolicyWrapper = await Api.sendGetElectronicInsurancePolicyRequestAsync(insurancePurchasingInfoId);
        if (electronicInsurancePolicyWrapper)
        {
            this.setState({
                electronicInsurancePolicy: electronicInsurancePolicyWrapper[NAMESPACE.INSURANCE_PURCHASING_DETAIL.INSURANCE_COMPANY_VERIFY.ELECTRONIC_INSURANCE_POLICY],
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.ELECTRONIC_INSURANCE_POLICY_MODAL);
            });
        }
    };

    onViewMedicalRecordButtonClick = async () =>
    {
        const {insurancePurchasingInfoId} = this.props;
        const medicalRecord = await Api.sendGetMedicalRecordRequestAsync(insurancePurchasingInfoId);
        if (medicalRecord)
        {
            this.setState({
                medicalRecord: medicalRecord[NAMESPACE.INSURANCE_PURCHASING_DETAIL.INSURANCE_COMPANY_VERIFY.MEDICAL_RECORD],
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.MEDICAL_RECORD_MODAL);
            });
        }
    };

    onConfirmButtonClick = async () =>
    {
        const {currentSelectedRadio} = this.state;
        const {insurancePurchasingInfoId, getInsurancePurchasingInfo} = this.props;
        const requestIsSuccessful = await Api.sendPostSubmitInsuranceCompanyVerifyResultRequestAsync(insurancePurchasingInfoId, currentSelectedRadio);
        if (requestIsSuccessful)
        {
            getInsurancePurchasingInfo(insurancePurchasingInfoId);
        }
    };

    render()
    {
        const {electronicInsurancePolicy, medicalRecord} = this.state;
        return [
            <div className={Style.InsuranceCompanyVerifyProcessor} key={Style.InsuranceCompanyVerifyProcessor}>
                <div className={Style.buttonsWrapper}>
                    <button className={`btn`} onClick={this.onViewElectronicInsurancePolicyButtonClick}>查看电子保单</button>
                    <button className={`btn`} onClick={this.onViewMedicalRecordButtonClick}>查看病历</button>
                </div>
                <div className={Style.selectorWrapper}>
                    <div className={Style.selectorLabel}>审核通过：</div>
                    <div className={Style.radioWrapper}>
                        <Radio label={'是'} onClick={this.onRadioClick(true)} radioRef={this.yesRadioRef} />
                        <Radio label={'否'} onClick={this.onRadioClick(false)} radioRef={this.noRadioRef} />
                    </div>
                </div>
                <div className={Style.confirmButtonWrapper}>
                    <button className={`btn btn-primary ${Style.confirmButton}`}
                            onClick={this.onConfirmButtonClick}>确定
                    </button>
                </div>
            </div>,
            <Modal id={MODAL_ID.ELECTRONIC_INSURANCE_POLICY_MODAL}
                   title={'电子保单'}
                   key={MODAL_ID.ELECTRONIC_INSURANCE_POLICY_MODAL}>
                {electronicInsurancePolicy}
            </Modal>,
            <Modal id={MODAL_ID.MEDICAL_RECORD_MODAL} title={'病历'} key={MODAL_ID.MEDICAL_RECORD_MODAL}>
                {medicalRecord}
            </Modal>,
        ];
    }
}

InsuranceCompanyVerifyProcessor.propTypes = {
    insurancePurchasingInfoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const mapDispatchToProps = {
    getInsurancePurchasingInfo: getInsurancePurchasingInfoAction,
};

export default connect(null, mapDispatchToProps)(InsuranceCompanyVerifyProcessor);