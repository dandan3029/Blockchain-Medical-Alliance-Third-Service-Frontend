import Function from '../../Function';
import {GET_VERIFICATION_CODE, LOGIN, SIGN_UP} from './ROUTE';
import NAMESPACE from '../../NAMESPACE';
import {STATUS_CODE} from '../../Constant';
import {DangerAlert, WarningAlert} from '../../Components/Alerts';

export default {
    sendPostLoginRequestAsync,
    sendGetVerificationCodeRequestAsync,
    sendPostSignUpRequestAsync,
};

async function sendPostLoginRequestAsync(email, password)
{
    try
    {
        const {code} = await Function.postAsync(LOGIN, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]: password,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return true;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('邮箱或密码错误');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                WarningAlert.pop('邮箱或密码错误');
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('登录失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('登录失败');
        return null;
    }
}

async function sendGetVerificationCodeRequestAsync(email)
{
    try
    {
        const {code} = await Function.getAsync(GET_VERIFICATION_CODE, false, {
            [NAMESPACE.ACCOUNT.PERSONAL_INFO.EMAIL]: email,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return true;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('获取验证码失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('获取验证码失败');
        return null;
    }
}

async function sendPostSignUpRequestAsync(username, password, name, age, address, email, verificationCode)
{
    try
    {
        const {code, data} = await Function.postAsync(SIGN_UP, {
            [NAMESPACE.ACCOUNT.ACCOUNT.USERNAME]: username,
            [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]: password,
            [NAMESPACE.ACCOUNT.PERSONAL_INFO.NAME]: name,
            [NAMESPACE.ACCOUNT.PERSONAL_INFO.AGE]: parseInt(age, 10),
            [NAMESPACE.ACCOUNT.PERSONAL_INFO.ADDRESS]: address,
            [NAMESPACE.ACCOUNT.PERSONAL_INFO.EMAIL]: email,
            [NAMESPACE.ACCOUNT.SIGN_UP.VERIFICATION_CODE]: verificationCode,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return true;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                WarningAlert.pop('验证码错误');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                WarningAlert.pop('用户名已存在');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('注册失败');
                return null;
            }
        }

    }
    catch (e)
    {
        console.error(e);
        WarningAlert.pop('注册失败');
        return null;
    }
}