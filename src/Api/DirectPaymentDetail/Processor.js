import Function from '../../Function';
import NAMESPACE from '../../NAMESPACE';
import {GET_DIRECT_PAYMENT_INFO} from './ROUTE';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';
import {STATUS_CODE} from '../../Constant';
import { WarningAlert, DangerAlert } from '../../Components/Alerts';

export default {
    sendGetDirectPaymentInfoRequestAsync,
};

async function sendGetDirectPaymentInfoRequestAsync(directPaymentInfoId)
{
    try
    {
        const {code, data} = Function.getAsync(GET_DIRECT_PAYMENT_INFO, false, {
            [NAMESPACE.DIRECT_PAYMENT_PROCESS.DIRECT_PAYMENT_INFO_ID]: directPaymentInfoId,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('直付信息不存在');
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
                WarningAlert.pop('获取直付信息失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.log(e);
        WarningAlert.pop('获取直付信息失败');
    }
}