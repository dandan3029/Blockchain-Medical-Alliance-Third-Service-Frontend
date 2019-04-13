import Function from '../../Function';
import {STATUS_CODE} from '../../Constant';
import {GET_INSURANCE_PURCHASING_INFO_LIST} from './ROUTE';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';
import NAMESPACE from '../../NAMESPACE';

export default {
    sendGetInsurancePurchasingInfoListRequest,
};

async function sendGetInsurancePurchasingInfoListRequest(email)
{
    try
    {
        const {code, data} = await Function.getAsync(GET_INSURANCE_PURCHASING_INFO_LIST, false, {
            [NAMESPACE.INSURANCE_PURCHASING_PROCESS.EMAIL]: email,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
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
                return null;
            }
            default:
            {
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