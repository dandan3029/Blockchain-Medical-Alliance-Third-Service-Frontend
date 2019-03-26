import React from 'react';
import Style from './Style.module.scss';
import {View as AccountPageCard} from '../../Components/AccountPageCard';
import {browserHistory, Link} from 'react-router';
import {Actions as AuthProcessorActions} from '../../Components/AuthProcessor';
import {connect} from 'react-redux';
import {PAGE_ID_TO_ROUTE, REGEX, REQUIRE_LOGIN_PAGE_ID} from '../../Config';
import Api from '../../Api';
import {WarningAlert} from '../../Components/Alerts';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.usernameInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }


    componentDidMount()
    {
        const {hasLoggedIn} = this.props;
        if (hasLoggedIn)
        {
            browserHistory.push(PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.INSURANCE_COMPANY_INSURANCE_LIST]);
        }
    }

    onFormSubmit = async e =>
    {
        e.preventDefault();
        const username = this.usernameInputRef.current.value;
        const password = this.passwordInputRef.current.value;
        if (!REGEX.USERNAME.test(username))
        {
            WarningAlert.pop('用户名或密码不正确');
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            WarningAlert.pop('用户名或密码不正确');
        }
        else
        {
            const {setLoggedIn} = this.props;
            const requestIsSuccessful = await Api.sendPostLoginRequestAsync(username, password);
            if (requestIsSuccessful)
            {
                setLoggedIn();
                browserHistory.push(PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.INSURANCE_COMPANY_INSURANCE_LIST]);
            }
        }
    };

    render()
    {
        return (
            <AccountPageCard>
                <div className={Style.Login}>
                    <div className={Style.title}>登录</div>
                    <form className={Style.loginForm} onSubmit={this.onFormSubmit}>
                        <div className={Style.inputWrapper}>
                            <input type="text" placeholder={'用户名'} autoFocus={true} ref={this.usernameInputRef} />
                            <input type="text" placeholder={'密码'} ref={this.passwordInputRef} />
                        </div>
                        <div className={Style.linkWrapper}>
                            <Link onlyActiveOnIndex={false} to={'#'}>忘记密码？</Link>
                        </div>
                        <div className={Style.buttonWrapper}>
                            <button className={Style.submitButton}>确认</button>
                        </div>
                    </form>
                </div>
            </AccountPageCard>
        );
    }
}

const mapStateToProps = state =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {
        hasLoggedIn,
    };
};

const mapDispatchToProps = {
    setLoggedIn: AuthProcessorActions.setLoggedInAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);