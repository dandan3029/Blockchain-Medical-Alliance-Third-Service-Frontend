import Function from '../../Function';
import {GET_DIRECT_PAYMENT_INFO_LIST} from './ROUTE';
import {STATUS_CODE} from '../../Constant';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';

export default {
    sendGetDirectPaymentInfoListRequestAsync,
};

async function sendGetDirectPaymentInfoListRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_DIRECT_PAYMENT_INFO_LIST, false);

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