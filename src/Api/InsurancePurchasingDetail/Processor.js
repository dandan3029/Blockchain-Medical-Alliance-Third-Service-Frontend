import Function from '../../Function';
import NAMESPACE from '../../NAMESPACE';
import {
    GET_ELECTRONIC_INSURANCE_POLICY,
    GET_INSURANCE_PURCHASING_INFO,
    GET_MEDICAL_RECORD,
    SUBMIT_INSURANCE_COMPANY_VERIFY_RESULT,
    SUBMIT_PAY_CONFIRMATION,
} from './ROUTE';
import {STATUS_CODE} from '../../Constant';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../Components/Alerts';

export default {
    sendGetInsurancePurchasingInfoRequestAsync,
    sendGetElectronicInsurancePolicyRequestAsync,
    sendGetMedicalRecordRequestAsync,
    sendPostSubmitInsuranceCompanyVerifyResultRequestAsync,
    sendPostSubmitPayConfirmationRequestAsync,
};

async function sendGetInsurancePurchasingInfoRequestAsync(insurancePurchasingInfoId)
{
    try
    {
        const {code, data} = Function.getAsync(GET_INSURANCE_PURCHASING_INFO, false, {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('投保信息不存在');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                AuthProcessorFunction.setLoggedOut();
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('获取投保信息失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('获取投保信息失败');
        return null;
    }
}

async function sendGetElectronicInsurancePolicyRequestAsync(insurancePurchasingInfoId)
{
    try
    {
        const {code, data} = await Function.getAsync(GET_ELECTRONIC_INSURANCE_POLICY, false, {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('电子保单不存在');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                AuthProcessorFunction.setLoggedOut();
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('获取电子保单失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('获取电子保单失败');
        return null;
    }
}

async function sendGetMedicalRecordRequestAsync(insurancePurchasingInfoId)
{
    try
    {
        const {code, data} = await Function.getAsync(GET_MEDICAL_RECORD, false, {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('病历不存在');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                AuthProcessorFunction.setLoggedOut();
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('获取病历失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('获取病历失败');
        return null;
    }
}

async function sendPostSubmitInsuranceCompanyVerifyResultRequestAsync(insurancePurchasingInfoId, verifyResult)
{
    try
    {
        const {code} = await Function.postAsync(SUBMIT_INSURANCE_COMPANY_VERIFY_RESULT, {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
            [NAMESPACE.INSURANCE_PURCHASING_DETAIL.INSURANCE_COMPANY_VERIFY.VERIFY_RESULT]: verifyResult,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                SuccessAlert.pop('审核结果提交成功');
                return true;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('投保信息不存在');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                AuthProcessorFunction.setLoggedOut();
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('提交审核结果失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('提交审核结果失败');
        return null;
    }
}

async function sendPostSubmitPayConfirmationRequestAsync(insurancePurchasingInfoId)
{
    try
    {
        const {code} = await Function.postAsync(SUBMIT_PAY_CONFIRMATION, {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.INSURANCE_PURCHASING_INFO_ID]: insurancePurchasingInfoId,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                SuccessAlert.pop('投保人缴费确认成功');
                return true;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('投保信息不存在');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                AuthProcessorFunction.setLoggedOut();
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('投保人缴费确认失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('投保人缴费确认失败');
        return null;
    }
}