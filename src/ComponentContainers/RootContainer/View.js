import React from 'react';
import {View as Root} from '../../Components/Root';
import {NOT_REQUIRE_LOGIN_PAGE_ID, PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID, ROUTE_TO_PAGE_ID} from '../../Config';
import {connect} from 'react-redux';

class RootContainer extends React.Component
{
    shouldInsuranceLinkBeActive = pageId =>
    {
        return (
            // pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_LIST ||
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_HOME_PAGE||
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PUBLICATION ||
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_DETAIL
        );
    };

    shouldInsurancePurchasingLinkBeActive = pageId =>
    {
        return (
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_PROCESS ||
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_DETAIL
        );
    };

    shouldDirectPaymentLinkBeActive = pageId =>
    {
        return (
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_DIRECT_PAYMENT_DETAIL ||
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_DIRECT_PAYMENT_PROCESS
        );
    };

    shouldPersonalCenterLinkBeActive = pageId =>
    {
        return (
            pageId === REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_PERSONAL_CENTER
        );
    };

    render()
    {
        const {children, hasLoggedIn} = this.props;
        const currentPageId = ROUTE_TO_PAGE_ID[this.props.location.pathname];
        return (
            <Root hasLoggedIn={hasLoggedIn}
                    insuranceUrl={PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_HOME_PAGE]}
                    directPaymentUrl={PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_DIRECT_PAYMENT_PROCESS]}
                    insurancePurchasingUrl={PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_PROCESS]}
                    loginUrl={PAGE_ID_TO_ROUTE[NOT_REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_LOGIN]}
                    signUpUrl={PAGE_ID_TO_ROUTE[NOT_REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_SIGN_UP]}
                    personalCenterUrl={PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_PERSONAL_CENTER]}
                    insuranceLinkIsActive={this.shouldInsuranceLinkBeActive(currentPageId)}
                    insurancePurchasingLinkIsActive={this.shouldInsurancePurchasingLinkBeActive(currentPageId)}
                    directPaymentLinkIsActive={this.shouldDirectPaymentLinkBeActive(currentPageId)}
                    personalCenterLinkIsActive={this.shouldPersonalCenterLinkBeActive(currentPageId)}>{children}</Root>
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

export default connect(mapStateToProps)(RootContainer);