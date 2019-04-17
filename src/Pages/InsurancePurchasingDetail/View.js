import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {View as Card} from '../../Components/Card';
import Icon from 'antd/lib/icon';
import Skeleton from 'antd/lib/skeleton';
import Api from '../../Api';

function InsurancePurchasingDetail(props)
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
    } = props;
    const gender = isMale === 1 ? '男':'女';
    
    const onSubmitStartDirectPayment = async e =>
    {
        e.preventDefault();
        //console.log(insurancePurchasingInfoId);
        Api.sendPostSubmitStartDirectPaymentRequestAsync(insurancePurchasingInfoId);
    }

    return (
        <div className={Style.InsuranceDetail}>
            <Card className={Style.insuranceDetailContainer}>
                <div className={Style.imageWrapper}>
                    <img src={insuranceImageSrc} alt="insuranceImage" className={Style.image} />
                </div>
                <div className={Style.infoWrapper}>
                    <Skeleton active={true} loading={!hasGotInfo}>
                        <div className={Style.info}>
                            <div className={Style.insuranceNameWrapper}>
                                <div className={Style.insuranceName}>
                                <span className={Style.icon}>
                                    <Icon type="heart" theme="twoTone" twoToneColor={'#F00'} />
                                </span>
                                    {name}
                                </div>
                            </div>
                            {/* <div className={Style.itemWrapper}>
                                <div className={Style.label}>姓名</div>
                                <div className={Style.itemContent}>
                                    {name}
                                </div>
                            </div> */}
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>性别</div>
                                <div className={Style.itemContent}>
                                    {gender}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>年龄</div>
                                <div className={Style.itemContent}>
                                    {age} 岁
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>健康状况</div>
                                <div className={Style.itemContent}>
                                    {healthState}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>公钥</div>
                                <div className={Style.key}>
                                    {publicKey}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保险公司</div>
                                <div className={Style.itemContent}>
                                    {insuranceCompany?insuranceCompany:"中国人寿"}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保险类型</div>
                                <div className={Style.itemContent}>
                                    {insuranceType}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>投保时间</div>
                                <div className={Style.itemContent}>
                                    {insurancePurchasingTime}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保险期限</div>
                                <div className={Style.itemContent}>
                                    {insurancePeriod} 年
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保险价格</div>
                                <div className={Style.itemContent}>
                                    {insurancePrice} 元
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>负责人姓名</div>
                                <div className={Style.itemContent}>
                                    {responsiblePersonName}
                                </div>
                            </div>
                            <form className={Style.buttonWrapper} onSubmit={onSubmitStartDirectPayment}>
                                <button className={Style.submitButton}>发起直付</button>
                            </form>
                        </div>
                    </Skeleton>
                    
                </div>
            </Card>
        </div>
    );
}

InsurancePurchasingDetail.propTypes = {
    hasGotInfo: PropTypes.bool.isRequired,
    insuranceImageSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    age: PropTypes.number.isRequired,
    healthState: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
    insuranceCompany: PropTypes.string.isRequired,
    insuranceType: PropTypes.string.isRequired,
    insurancePurchasingTime: PropTypes.string.isRequired,
    insurancePeriod: PropTypes.number.isRequired,
    insurancePrice: PropTypes.number.isRequired,
    responsiblePersonName: PropTypes.string.isRequired,
};

export default InsurancePurchasingDetail;