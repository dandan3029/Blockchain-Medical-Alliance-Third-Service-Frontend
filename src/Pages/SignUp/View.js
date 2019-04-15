import React from 'react';
import Style from './Style.module.scss';
import {View as AccountPageCard} from '../../Components/AccountPageCard';
import {browserHistory, Link} from 'react-router';
import {NOT_REQUIRE_LOGIN_PAGE_ID, PAGE_ID_TO_ROUTE, REGEX, REGEX_TEXT} from '../../Config';
import Api from '../../Api';
import {WarningAlert} from '../../Components/Alerts';

class SignUp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.usernameInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.repeatPasswordInputRef = React.createRef();
        this.nameInputRef = React.createRef();
        this.ageInputRef = React.createRef();
        this.addressInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();

        this.state = {
            hasSendVerificationCode: false,
            timeToNextSend: 0,
            signUpSucceed: false,
        };

    }

    onGetVerificationCodeButtonClick = async () =>
    {
        const {hasSendVerificationCode} = this.state;
        if (!hasSendVerificationCode)
        {
            const email = this.emailInputRef.current.value;
            if (!REGEX.EMAIL.test(email))
            {
                WarningAlert.pop('请输入有效的邮箱');
            }
            else
            {
                const requestIsSuccessful = await Api.sendGetVerificationCodeRequestAsync(email);
                if (requestIsSuccessful)
                {
                    this.setState({
                        hasSendVerificationCode: true,
                        timeToNextSend: 30,
                    }, () =>
                    {
                        const interval = setInterval(() =>
                        {
                            const {timeToNextSend} = this.state;
                            this.setState({
                                timeToNextSend: timeToNextSend - 1,
                            });
                        }, 1000);

                        setTimeout(() =>
                        {
                            clearInterval(interval);
                            this.setState({
                                hasSendVerificationCode: false,
                            });
                        }, 30 * 1000);
                    });
                }
            }
        }
    };

    onFormSubmit = async e =>
    {
        e.preventDefault();
        const username = this.usernameInputRef.current.value;
        const password = this.passwordInputRef.current.value;
        const repeatPassword = this.repeatPasswordInputRef.current.value;
        const name = this.nameInputRef.current.value;
        const age = this.ageInputRef.current.value;
        const address = this.addressInputRef.current.value;
        const email = this.emailInputRef.current.value;
        const verificationCode = this.verificationCodeInputRef.current.value;

        if (!REGEX.USERNAME.test(username))
        {
            WarningAlert.pop('请输入有效的用户名');
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            WarningAlert.pop('请输入有效的密码');
        }
        else if (password !== repeatPassword)
        {
            WarningAlert.pop('两次输入密码不一致');
        }
        else if (!REGEX.NAME.test(name))
        {
            WarningAlert.pop('请输入有效的姓名');
        }
        else if (!REGEX.AGE.test(age))
        {
            WarningAlert.pop('请输入有效的年龄');
        }
        else if (!REGEX.ADDRESS.test(address))
        {
            WarningAlert.pop('请输入有效的家庭住址');
        }
        else if (!REGEX.EMAIL.test(email))
        {
            WarningAlert.pop('请输入有效的邮箱');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            WarningAlert.pop('请输入有效的验证码');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostSignUpRequestAsync(username, password, name, age, address, email, verificationCode);
            if (requestIsSuccessful)
            {
                this.setState({
                    signUpSucceed: true,
                });
            }
        }
    };

    render()
    {
        const {hasSendVerificationCode, timeToNextSend, signUpSucceed} = this.state;
        return (
            <AccountPageCard>
                <div className={Style.SignUp}>
                    {signUpSucceed ?
                        <div className={Style.signUpSuccessPart}>
                            <div className={Style.title}>注册成功</div>
                            <div className={Style.buttonWrapper}>
                                <button className={Style.toLoginButton} onClick={() =>
                                {
                                    browserHistory.push(PAGE_ID_TO_ROUTE[NOT_REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_LOGIN]);
                                }
                                }>去登录
                                </button>
                            </div>
                        </div> :
                        <div className={Style.signUpPart}>
                            <div className={Style.title}>注册</div>
                            <form className={Style.signUpForm} onSubmit={this.onFormSubmit}>
                                <div className={Style.inputWrapper}>
                                    <input type="text"
                                           placeholder={`用户名 (${REGEX_TEXT.USERNAME})`}
                                           autoFocus={true}
                                           ref={this.usernameInputRef} />
                                    <input type="password"
                                           placeholder={`密码 (${REGEX_TEXT.PASSWORD})`}
                                           ref={this.passwordInputRef} />
                                    <input type="password" placeholder={'确认密码'} ref={this.repeatPasswordInputRef} />
                                    <input type="text" placeholder={'姓名'} ref={this.nameInputRef} />
                                    <input type="number" placeholder={'年龄'} ref={this.ageInputRef} />
                                    <input type="text" placeholder={'家庭住址'} ref={this.addressInputRef} />
                                    <input type="email" placeholder={'邮箱 (接收验证码的邮箱)'} ref={this.emailInputRef} />
                                    <div className={`input-group ${Style.verificationCodeInputWrapper}`}>
                                        <input type="text"
                                               placeholder={'验证码'}
                                               className={`form-control ${Style.verificationCodeInput}`}
                                               ref={this.verificationCodeInputRef} />
                                        <div className={`input-group-append ${Style.verificationCodeInputLabelWrapper}`}
                                             onClick={this.onGetVerificationCodeButtonClick}>
                                    <span className={`input-group-text ${Style.verificationCodeInputLabel}`}>
                                        {
                                            hasSendVerificationCode ? timeToNextSend : '发送'
                                        }
                                    </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={Style.linkWrapper}>
                                    <Link onlyActiveOnIndex={false}
                                          to={PAGE_ID_TO_ROUTE[NOT_REQUIRE_LOGIN_PAGE_ID.INSURANCE_COMPANY_LOGIN]}>已有帐号？</Link>
                                </div>
                                <div className={Style.buttonWrapper}>
                                    <button className={Style.submitButton}>确认</button>
                                </div>
                            </form>
                        </div>
                    }
                </div>

            </AccountPageCard>
        );
    }
}

export default SignUp;