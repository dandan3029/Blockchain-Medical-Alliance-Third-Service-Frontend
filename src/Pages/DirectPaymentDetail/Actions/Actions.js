import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../Api';
import Function from '../../../Function';

export function getDirectPaymentInfoAction(directPaymentInfoId)
{
    return async dispatch =>
    {
        const directPaymentInfo = Api.sendGetDirectPaymentInfoRequestAsync(directPaymentInfoId);
        // 测试用的数据
        /*const directPaymentInfo = {
            directPaymentInfoId: 1,
            insuranceCompany: '中国人寿',
            hospital: '北京协和医院',
            publicKey: Function.randomString(),
            directPaymentMoneyAmount: Math.round(Math.random() * 20000 + 1000),
            diagnosticResult: Function.randomString(),
            medicalDescription: Function.randomString(),
            insurancePurchasingInfoId: 1,
            directPaymentStage: Math.round(Math.random() * 5),
        };*/
        if (directPaymentInfo)
        {
            dispatch(getDirectPaymentInfoSuccessfulAction(directPaymentInfo));
        }
        else
        {
            dispatch(getDirectPaymentInfoFailedAction());
        }
    };
}

function getDirectPaymentInfoSuccessfulAction(directPaymentInfo)
{
    return {
        type: ACTION_TYPE.GET_DIRECT_PAYMENT_INFO_SUCCEEFUL,
        directPaymentInfo,
    };
}

function getDirectPaymentInfoFailedAction()
{
    return {
        type: ACTION_TYPE.GET_DIRECT_PAYMENT_INFO_FAILED,
    };
}