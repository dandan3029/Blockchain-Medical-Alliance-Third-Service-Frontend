import Function from '../../Function';
import {GET_PERSONAL_INFO, GET_MEDICAL_RECORD_INFO_LIST} from './ROUTE';
import {STATUS_CODE} from '../../Constant';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';
import NAMESPACE from '../../NAMESPACE';
import { WarningAlert, DangerAlert } from '../../Components/Alerts';

export default {
    sendGetPersonalInfoRequestAsync,
    sendGetMedicalRecordInfoListRequestAsync,
};

async function sendGetPersonalInfoRequestAsync(email)
{
    try
    {
        const {code, data} = await Function.getAsync(GET_PERSONAL_INFO, false,{
            [NAMESPACE.PERSONAL_CENTER.PERSONAL_INFO.EMAIL]: email,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('个人信息不存在');
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
                WarningAlert.pop('获取个人信息失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        return null;
    }
}

async function sendGetMedicalRecordInfoListRequestAsync(email)
{
    try
    {
        const {code, data} = Function.getAsync(GET_MEDICAL_RECORD_INFO_LIST, false, {
            [NAMESPACE.PERSONAL_CENTER.PERSONAL_INFO.EMAIL]: email,
        })

        switch(code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('病例列表信息不存在');
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
                WarningAlert.pop('获取病例列表失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('获取病例列表失败');
        return null;
    }
}