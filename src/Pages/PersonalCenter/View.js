import React from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../Components/Card';
import identification1 from '../../Static/PersonalCenter/identification1.png';
import identification2 from '../../Static/PersonalCenter/identification2.png';
import NAMESPACE from '../../NAMESPACE';
import {MODAL_ID} from '../../Constant';
import {Function as ModalFunction} from '../../Components/Modal';
import {View as MedicalRecordInfo} from './Components/MedicalRecordInfo';
import {View as MedicalRecordModal} from './Components/MedicalRecordModal';
import {View as PrivateKeyModal} from './Components/PrivateKeyModal';
import {View as PublicKeyModal} from './Components/PublicKeyModal';
import {View as AuthorizationModal} from './Components/AuthorizationModal';
import {View as PublicKeyInListModal} from './Components/PublicKeyInListModal';
import {connect} from 'react-redux';

import Api from '../../Api';

class PersonalCenter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            personalInfo: '',
            medicalRecordInfoList:[],
            currentActivePrivateKeyInModal: '',
            currentActivePublicKeyInModal: '',
            currentActiveMedicalRecordInModal: '',
            currentActiveAuthorizationInModal: '',
            currentActivePublicKeyInListInModal: '',
        }
    }
    componentDidMount(){
        const {email} = this.props;
        Api.sendGetPersonalInfoRequestAsync(email)
        .then(personalInfoWrapper =>
            {
                if (personalInfoWrapper)
                {
                    this.setState({
                        personalInfo:personalInfoWrapper,
                    })
                }
            });
        
        Api.sendGetMedicalRecordInfoListRequestAsync(email)
        .then(medicalRecordInfoListWrapper =>
            {
                if (medicalRecordInfoListWrapper)
                {
                    const medicalRecordInfoList = medicalRecordInfoListWrapper[NAMESPACE.PERSONAL_CENTER.LIST.MEDICAL_RECORD_INFO];
                    this.setState({
                        medicalRecordInfoList: medicalRecordInfoList,
                    })
                }
            });
        /*
        const medicalRecordInfoList = []
        for( let i = 0; i < 5 ; i++ )
        {
            medicalRecordInfoList.push(
                {
                    medicalRecordInfoId: i,
                    treatmentDate: '2019年4月3日',
                    treatmentHospital: '北京协和医院',
                    treatmentDoctor: '王艳',
                    publicKey: 'da;flkjewp',
                    medicalRecordContent: '这是一份电子病例',
                }
            )
        }
        const personalInfo = {
            name: '蒋小斐',
            age: '32',
            location: '辽宁省大连市',
            email: '123456',
            publicKey: 'fdla;weopdlkfj',
            privateKey:'fdla;weopdlkfj',
        }
        this.setState({
            personalInfo,
            medicalRecordInfoList,
        });*/
    }

    stopPropagation = e =>
    {
        e.stopPropagation();
        e.cancelBubble = true;
    };

    onPublicKeyDivClick = (e) =>
    {
        this.stopPropagation(e);
        const {personalInfo} = this.state;
        this.setState({
            currentActivePublicKeyInModal: personalInfo.publicKey,
        }, () =>
        {
            ModalFunction.showModal(MODAL_ID.PUBLIC_KEY_MODAL);
        });
    }
    onPublicKeyTdClick = (publicKey) =>
    {
        return () =>
        {
            this.setState({
                currentActivePublicKeyInListInModal: publicKey,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.PUBLIC_KEY_IN_LIST_MODAL);
            })
        }
    }

    onPrivateKeyDivClick = (e) =>
    {
        this.stopPropagation(e);
        const {personalInfo} = this.state;
        this.setState({
            currentActivePrivateKeyInModal: personalInfo.privateKey,
        }, () =>
        {
            ModalFunction.showModal(MODAL_ID.PRIVATE_KEY_MODAL);
        })
    }

    onMedicalRecordButtonClick = (medicalRecordContent) => 
    {
        return () =>
        {
            this.setState({
                currentActiveMedicalRecordInModal: medicalRecordContent,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.MEDICAL_RECORD_MODAL);
            });
        };
    }

    onAuthorizationButtonClick = (publicKey) =>
    {
        return () =>
        {
            this.setState({
                currentActiveAuthorizationInModal: publicKey,
            }, () => 
            {
                ModalFunction.showModal(MODAL_ID.AUTHORIZATION_MODAL);
            })
        }
    }

    render()
    {
        const {currentActiveMedicalRecordInModal, currentActiveAuthorizationInModal,
        currentActivePrivateKeyInModal, currentActivePublicKeyInModal,
        currentActivePublicKeyInListInModal} = this.state;
        const {personalInfo, medicalRecordInfoList}= this.state;
        return (
            <div className={Style.PersonalCenter}>
                <div className={Style.contentWrapper}>
                    <div className={Style.leftPart}>
                        <Card className={Style.identificationWrapper}>
                            <div className={Style.identification} style={{background: `url('${identification1}')`}} />
                        </Card>
                        <Card className={Style.identificationWrapper}>
                            <div className={Style.identification} style={{background: `url('${identification2}')`}} />
                        </Card>
                    </div>
                    <div className={Style.rightPart}>
                        <div className={Style.personalInfoWrapper}>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>姓名：</div>
                                <div className={Style.info}>{personalInfo.name}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>年龄：</div>
                                <div className={Style.info}>{personalInfo.age}岁</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>家庭住址：</div>
                                <div className={Style.info}>{personalInfo.location}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>联系方式：</div>
                                <div className={Style.info}>{personalInfo.email}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>公钥：</div>
                                <div className={Style.key}  onClick={this.onPublicKeyDivClick}>{personalInfo.publicKey}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>私钥：</div>
                                <div className={Style.key}  onClick={this.onPrivateKeyDivClick}>{personalInfo.privateKey}</div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className={Style.modifyButtonWrapper}>
                    <button className={Style.modifyButton}>编辑</button>
                </div>

                <div className={Style.tableTitleWrapper} id="tableTitleWrapper">
                    <a className={Style.tableTitle} href="#tableTitleWrapper">我的病例</a>
                </div>
                <div className={Style.tableWrapper}>
                    <table className={`${Style.medicalRecordTable}`}>
                        <thead>
                        <tr>
                            <th scope="col">就诊日期</th>
                            <th scope="col">就诊医院</th>
                            <th scope='col'>负责医生</th>
                            <th scope='col'>公钥</th>
                            <th scope="col">病例记录</th>
                            <th scope="col">病例授权</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            medicalRecordInfoList.map(medicalRecord =>
                            {
                                const {
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.MEDICAL_RECORD_INFO_ID]: medicalRecordInfoId,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.TREATMENT_DATE]: treatmentDate,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.TREATMENT_HOSPITAL]: treatmentHospital,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.DOCTOR]: doctor,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.PUBKEY]: pubkey,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.MEDICAL_RECORD_CONTENT]: medicalRecordContent,
                                } = medicalRecord;
                                return <MedicalRecordInfo   medicalRecordInfoId={medicalRecordInfoId}
                                                            key = {medicalRecordInfoId}
                                                            treatmentDate={treatmentDate}
                                                            treatmentHospital={treatmentHospital}
                                                            doctor={doctor}
                                                            pubkey={pubkey}
                                                            onMedicalRecordButtonClick={this.onMedicalRecordButtonClick(medicalRecordContent)}
                                                            onAuthorizationButtonClick={this.onAuthorizationButtonClick(personalInfo.publicKey)} 
                                                            onPublicKeyTdClick={this.onPublicKeyTdClick(pubkey)} />
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <PublicKeyInListModal publicKey = {currentActivePublicKeyInListInModal}/>
                <PublicKeyModal publicKey = {currentActivePublicKeyInModal}/>
                <PrivateKeyModal privateKey = {currentActivePrivateKeyInModal}/>
                <MedicalRecordModal medicalRecordContent={currentActiveMedicalRecordInModal} />
                <AuthorizationModal publicKey={currentActiveAuthorizationInModal} />
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {AuthProcessor: {email}} = state; 
    return {
        email,
    };
};

export default connect(mapStateToProps)(PersonalCenter);