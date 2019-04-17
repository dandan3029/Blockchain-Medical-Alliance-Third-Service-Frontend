import React from 'react';
import InsurancePurchasingDetail from './View';
import leftImage from '../../Static/InsurancePurchasingDetail/leftImage.png';
import {browserHistory, withRouter} from 'react-router';
import Api from '../../Api';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../Config';

class InsurancePurchasingDetailContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            insuranceId: 0,                 // 保险 ID
            insuranceImageSrc: leftImage,   // 保险图片
            name: '',                       // 姓名
            isMale: '',                     // 性别
            age: '',                        // 年龄
            healthState: '',                // 健康状况
            publicKey: '',                  // 公钥
            insuranceCompany: '',           // 保险公司
            insuranceType: '',              // 保险类型
            insurancePurchasingTime: '',    // 投保时间
            insurancePeriod: '',            // 保期
            insurancePrice: '',             // 保费价格
            responsiblePersonName: '',      // 负责人名字
            hasGotInfo: false,
            /*insuranceName: '',              // 保险名称
            isSpecialMedicalCare: 0,        // 是否特殊医疗
            hasSocialSecurity: 0,           // 有无社保
            insuranceAmount: 0,             // 保额
            insurancePeriod: '',            // 保险期限
            insuranceDiseaseType: '',       // 保险病种
            coveringAge: '',                // 承保年龄
            insurancePrice: 0,              // 保费价格
            electronicInsurancePolicy: '',  // 电子保单*/
        };
    }

    componentDidMount()
    {
        const {insurancePurchasingInfoId} = this.props.location.query;
        if (insurancePurchasingInfoId === undefined)
        {
            browserHistory.push(PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_PROCESS]);
        }
        else
        {
            Api.sendGetInsurancePurchasingDetailInfoRequestAsync(insurancePurchasingInfoId)
                .then(insuranceDetail =>
                {
                    if (insuranceDetail)
                    {
                        this.setState({
                            hasGotInfo: true,
                            ...insuranceDetail,
                        });
                    }
                });
            /*const insurancePurchasingDetailInfo = {
                insuranceImageSrc: leftImage,                               // 保险图片
                insuranceName: '少儿英才保险',                               // 保险名称
                isSpecialMedicalCare: 0,                                    // 是否特殊医疗
                hasSocialSecurity: 0,                                       // 有无社保
                insuranceAmount: Math.round(Math.random()*2000),            // 保额
                insurancePeriod: '3年',                                     // 保险期限
                insuranceDiseaseType: '肺结核，狂犬病',                      // 保险病种
                coveringAge: '20岁以下',                                    // 承保年龄
                insurancePrice: Math.round(Math.random()*2000+1000),        // 保费价格
                electronicInsurancePolicy: '这是一份电子保单',               // 电子保单
            }
            this.setState({
                hasGotInfo: true,
                ...insurancePurchasingDetailInfo,
            })*/
        }
    }

    render()
    {
        const {
            insurancePurchasingInfoId,
            insuranceImageSrc,
            name,
            isMale,
            age,
            healthState,
            publicKey,
            insuranceCompany,
            insuranceType,
            insurancePurchasingTime,
            insurancePeriod,
            insurancePrice,
            responsiblePersonName,
            hasGotInfo,
        } = this.state;
        return (
            <InsurancePurchasingDetail      hasGotInfo={hasGotInfo}
                                            insuranceImageSrc={insuranceImageSrc}
                                            insurancePurchasingInfoId={insurancePurchasingInfoId}
                                            name={name}
                                            isMale={isMale}
                                            age={age}
                                            healthState={healthState}
                                            publicKey={publicKey}
                                            insuranceCompany={insuranceCompany}
                                            insuranceType={insuranceType}
                                            insurancePurchasingTime={insurancePurchasingTime}
                                            insurancePeriod={insurancePeriod}
                                            insurancePrice={insurancePrice} 
                                            responsiblePersonName={responsiblePersonName} />
        );
    }
}

export default withRouter(InsurancePurchasingDetailContainer);