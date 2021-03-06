import React from 'react';
import Style from './Style.module.scss';
import {View as InsurancePurchasingProcessSelector} from './Components/InsurancePurchasingProcessSelector';
import {View as InsurancePurchasingInfo} from './Components/InsurancePurchasingInfo';
import Function from '../../Function';
import {connect} from 'react-redux';
import {INSURANCE_COMPANY} from '../../Constant';
import NAMESPACE from '../../NAMESPACE';
import Api from '../../Api';

class InsurancePurchasingProcess extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            insurancePurchasingInfoList: [],
        };
    }

    componentDidMount()
    {
        /*const insurancePurchasingInfoList = [];
        console.log(email);
        for (let i = 0; i < 30; i++)
        {
            insurancePurchasingInfoList.push({
                insurancePurchasingInfoId: i + 1,
                insuranceType: '少年英才保险',
                insuranceCompany: '中国人寿',
                insurancePurchasingTime: '2019年03月17日',
                insurancePeriod: Math.round(Math.random() * 10 + 1) ,
                insurancePrice: Math.round(Math.random() * 20000 + 1000),
                publicKey: Function.randomString(),
                insurancePurchasingStage: Math.round(Math.random() * 3),
                responsiblePersonId: 1,
                responsiblePersonName: '王子贤',
                insuranceId: i*i,
            });
        }

        this.setState({
            insurancePurchasingInfoList,
        });*/
        const {email} = this.props;
        Api.sendGetInsurancePurchasingInfoListRequest(email)
            .then(insurancePurchasingInfoListWrapper =>
            {
                if (insurancePurchasingInfoListWrapper)
                {
                    const insurancePurchasingInfoList = insurancePurchasingInfoListWrapper[NAMESPACE.INSURANCE_PURCHASING_PROCESS.LIST.INSURANCE_PURCHASING_INFO];
                    this.setState({
                        insurancePurchasingInfoList,
                    });
                }
            });
    }


    render()
    {
        const {insurancePurchasingInfoList} = this.state;
        const {companyName, insurancePeriodRange: [minPeriod, maxPeriod]} = this.props; //, stageId
        return (
            <div className={Style.InsurancePurchasingProcess}>
                <InsurancePurchasingProcessSelector />
                <div className={Style.tableWrapper}>
                    <table className={`${Style.processTable}`}>
                        <thead>
                        <tr>
                            <th scope="col">保险种类</th>
                            <th scope="col">保险公司</th>
                            <th scope="col">投保时间</th>
                            <th scope="col">保期</th>
                            <th scope="col">投保金额</th>
                            <th scope="col">公钥</th>
                            {/* <th scope="col">投保阶段</th> */}
                            <th scope="col">负责人</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            insurancePurchasingInfoList.map(insurancePurchasingInfo =>
                            {
                                const {
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_TYPE]: insuranceType,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_COMPANY]: insuranceCompany,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_TIME]: insurancePurchasingTime,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PERIOD]: insurancePeriod,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PRICE]: insurancePrice,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.PUBLIC_KEY]: publicKey,
                                    // [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_STAGE]: insurancePurchasingStage,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.RESPONSIBLE_PERSON_ID]: responsiblePersonId,
                                    [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.RESPONSIBLE_PERSON_NAME]: responsiblePersonName,
                                } = insurancePurchasingInfo;
                                //age >= minAge && age <= maxAge &&
                                //if ( (insurancePeriod >= minPeriod && insurancePeriod <= maxPeriod )&& (insuranceCompany === companyName || companyName === INSURANCE_COMPANY.ALL_INSURANCE_COMPANY ) )
                                // && (insurancePurchasingStage === stageId || stageId === INSURANCE_PURCHASING_STAGE_ID.ALL_STAGES)
                                {
                                    return <InsurancePurchasingInfo insurancePurchasingInfoId={insurancePurchasingInfoId}
                                                                    key = {insurancePurchasingInfoId}
                                                                    insuranceType={insuranceType}
                                                                    insuranceCompany={insuranceCompany}
                                                                    insurancePurchasingTime={insurancePurchasingTime}
                                                                    insurancePeriod={insurancePeriod}
                                                                    insurancePrice={insurancePrice}
                                                                    publicKey={publicKey}
                                                                    // insurancePurchasingStage={insurancePurchasingStage}
                                                                    responsiblePersonName={responsiblePersonName}
                                                                    responsiblePersonId={responsiblePersonId} />;
                                }
                                // else
                                // {
                                //     return null;
                                // }
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {InsurancePurchasingProcess: {companyName, insurancePeriodRange}, AuthProcessor: {email}} = state; 
    return {
        companyName,
        insurancePeriodRange,
        email,
    };
};

export default connect(mapStateToProps)(InsurancePurchasingProcess);