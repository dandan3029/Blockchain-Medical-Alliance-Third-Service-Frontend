import React from 'react';
import Style from './Style.module.scss';
import {View as DirectPaymentProcessSelector} from './Components/DirectPaymentProcessSelector';
import DirectPaymentInfo from './Components/DirectPaymentInfo/View';
import Function from '../../Function';
import {connect} from 'react-redux';
import NAMESPACE from '../../NAMESPACE';
import {DIRECT_PAYMENT_STAGE_ID, MODAL_ID} from '../../Constant';
import {View as DiagnosticResultModal} from './Components/DiagnosticResultModal';
import {Function as ModalFunction} from '../../Components/Modal';
import {View as MedicalDescriptionModal} from './Components/MedicalDescriptionModal';
import Api from '../../Api';

class DirectPaymentProcess extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            directPaymentInfoList: [],
            currentActiveDiagnosticResultInModal: '',
            currentActiveMedicalDescriptionInModal: '',
        };
    }

    componentDidMount()
    {
        const {email} = this.props;
        Api.sendGetDirectPaymentInfoListRequestAsync(email)
            .then(directPaymentInfoListWrapper =>
            {
                if (directPaymentInfoListWrapper)
                {
                    this.setState({
                        directPaymentInfoList: directPaymentInfoListWrapper[NAMESPACE.DIRECT_PAYMENT_PROCESS.LIST.DIRECT_PAYMENT_INFO],
                    });
                }
            });
        /*const directPaymentInfoList = [];
        for (let i = 0; i < 30; i++)
        {
            directPaymentInfoList.push({
                // name: '罗小黑',
                // age: Math.round(Math.random() * 80 + 1),
                // isMale: 0,
                // healthState: '健康',
                directPaymentInfoId: i + 1,
                insuranceCompany: '中国人寿',
                hospital: '北京协和医院',
                publicKey: Function.randomString(),
                directPaymentMoneyAmount: Math.round(Math.random() * 20000 + 1000),
                diagnosticResult: Function.randomString(),
                medicalDescription: Function.randomString(),
                insurancePurchasingInfoId: i + 1,
                directPaymentStage: Math.round(Math.random() * 4),
                // insuranceType: '少年英才保险',
                // insurancePurchasingTime: '2019年03月17日',
                // insurancePeriod: `${Math.round(Math.random() * 10 + 1)} 年`,
                // insurancePrice: Math.round(Math.random() * 20000 + 1000),
                // responsiblePersonId: 1,
                // responsiblePersonName: '王子贤',
            });
        }

        this.setState({
            directPaymentInfoList,
        });*/
    }

    onDiagnosticResultButtonClick = (diagnosticResult) =>
    {
        return () =>
        {
            this.setState({
                currentActiveDiagnosticResultInModal: diagnosticResult,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.DIAGNOSTIC_RESULT_MODAL);
            });
        };
    };

    onMedicalDescriptionButtonClick = (medicalDescription) =>
    {
        return () =>
        {
            this.setState({
                currentActiveMedicalDescriptionInModal: medicalDescription,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.MEDICAL_DESCRIPTION_MODAL);
            });
        };
    };

    render()
    {
        const {directPaymentInfoList, currentActiveDiagnosticResultInModal, currentActiveMedicalDescriptionInModal} = this.state;
        const {directPaymentMoneyAmountRange: [minMoneyAmount,maxMoneyAmount],stageId} = this.props;
        return (
            <div className={Style.DirectPaymentProcess}>
                <DirectPaymentProcessSelector />
                <div className={Style.tableWrapper}>
                    <table className={`${Style.processTable}`}>
                        <thead>
                        <tr>
                            {/* <th scope="col">保险公司</th> */}
                            <th scope="col">直付医院</th>
                            <th scope="col">患者公钥</th>
                            <th scope="col">直付金额</th>
                            <th scope="col">诊断结果</th>
                            <th scope="col">医疗说明</th>
                            <th scope="col">保险信息</th>
                            <th scope="col">直付阶段</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            directPaymentInfoList.map(directPaymentInfo =>
                            {
                                const {
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.DIRECT_PAYMENT_INFO_ID]: directPaymentInfoId,
                                    // [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.NAME]: name,
                                    // [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.AGE]: age,
                                    // [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.IS_MALE]: isMale,
                                    // [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.HEALTH_STATE]: healthState,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.INSURANCE_COMPANY]: insuranceCompany,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.HOSPITAL]: hospital,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.PUBLIC_KEY]: publicKey,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.DIRECT_PAYMENT_MONEY_AMOUNT]: directPaymentMoneyAmount,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.DIAGNOSTIC_RESULT]: diagnosticResult,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.MEDICAL_DESCRIPTION]: medicalDescription,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.DIRECT_PAYMENT_STAGE]: directPaymentStage,
                                    [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
                                } = directPaymentInfo;
                                
                                if ((directPaymentMoneyAmount>= minMoneyAmount && directPaymentMoneyAmount <= maxMoneyAmount ) && (directPaymentStage === stageId || stageId === DIRECT_PAYMENT_STAGE_ID.DEVELOPMENT.ALL_STAGES))
                                {
                                    return <DirectPaymentInfo   directPaymentInfoId={directPaymentInfoId}
                                                                // name={name}
                                                                // age={age}
                                                                // isMale={isMale}
                                                                // healthState={healthState}
                                                                insuranceCompany={insuranceCompany}
                                                                hospital={hospital}
                                                                publicKey={publicKey}
                                                                directPaymentMoneyAmount={directPaymentMoneyAmount}
                                                                insurancePurchasingInfoId={insurancePurchasingInfoId}
                                                                directPaymentStage={directPaymentStage}
                                                                key={directPaymentInfoId}
                                                                onDiagnosticResultButtonClick={this.onDiagnosticResultButtonClick(diagnosticResult)}
                                                                onMedicalDescriptionButtonClick={this.onMedicalDescriptionButtonClick(medicalDescription)} />;
                                }
                                else
                                {
                                    return null;
                                }
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <DiagnosticResultModal diagnosticResult={currentActiveDiagnosticResultInModal} />
                <MedicalDescriptionModal medicalDescription={currentActiveMedicalDescriptionInModal} />
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {DirectPaymentProcess: {ageRange, directPaymentMoneyAmountRange,stageId}, AuthProcessor: {email}} = state;
    return {
        ageRange,
        directPaymentMoneyAmountRange,
        stageId,
        email,
    };
};

export default connect(mapStateToProps)(DirectPaymentProcess);