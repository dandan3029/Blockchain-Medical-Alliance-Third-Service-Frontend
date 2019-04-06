import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../Api';
import Function from '../../../Function';

export function getInsurancePurchasingInfoAction(insurancePurchasingInfoId)
{
    return async dispatch =>
    {
        // const insurancePurchasingInfo = await Api.sendGetInsurancePurchasingInfoRequestAsync(insurancePurchasingInfoId);
        // 测试用的数据
        const insurancePurchasingInfo = {
            insurancePurchasingInfoId: 1,
            name: '罗小黑',
            age: Math.round(Math.random() * 80 + 1),
            isMale: 0,
            healthState: '健康',
            publicKey: Function.randomString(),
            insuranceType: '少年英才保险',
            insurancePurchasingTime: '2019年03月17日',
            insurancePeriod: `${Math.round(Math.random() * 10 + 1)} 年`,
            insurancePrice: Math.round(Math.random() * 20000 + 1000),
            insurancePurchasingStage: Math.round(Math.random() * 3),
            responsiblePersonId: 1,
            responsiblePersonName: '王子贤',
        };
        if (insurancePurchasingInfo)
        {
            dispatch(getInsurancePurchasingInfoSuccessfulAction(insurancePurchasingInfo));
        }
        else
        {
            dispatch(getInsurancePurchasingInfoFailedAction());
        }
    };
}

function getInsurancePurchasingInfoSuccessfulAction(insurancePurchasingInfo)
{
    return {
        type: ACTION_TYPE.GET_INSURANCE_PURCHASING_INFO_SUCCEEFUL,
        insurancePurchasingInfo,
    };
}

function getInsurancePurchasingInfoFailedAction()
{
    return {
        type: ACTION_TYPE.GET_INSURANCE_PURCHASING_INFO_FAILED,
    };
}