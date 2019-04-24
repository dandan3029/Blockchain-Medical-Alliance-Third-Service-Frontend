import React from 'react';
import Style from './Style.module.scss';
import {View as CarouselContainer} from '../../ComponentContainers/CarouselContainer';
import {View as IntroductionCard} from './Components/IntroductionCard';
import {INTRODUCTION_ICON} from '../../Config';
import {INSURANCE_PURCHASING_STAGE_ID_TO_TEXT, DIRECT_PAYMENT_STAGE_ID_TO_TEXT} from '../../Constant';
import {View as HorizontalStageProgressIndicator} from '../../Components/HorizontalStageProgressIndicator';
import {View as StageTextIndicator} from '../../Components/StageTextIndicator';

class HomePage extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            insuranceList: [],
            introductionCardInfoList: [],
        };
    }
    componentDidMount(){
        
        const insuranceList = [];
        for( let i = 0; i < 6; i ++ ){
            insuranceList.push({
                insuranceId: i + 1,
                insuranceSource: "中国人寿",
                insuranceDuration:"3年",
                insurancePrice:1500
            })
        }

        const imageSrcList = [...INTRODUCTION_ICON];
        const titleList = ['建立完整的电子健康档案系统', '注重隐私保护与数据安全' ,'注重个性化智慧医疗', '助力商业医保投付直付问题'];
        const contentList = [
            '建立医疗联盟平台搭建电子健康档案管理数据库，在获得患者许可的前提下，经过认证的医疗从业人员可以上传和随时检索患者完整的原始纵向医疗健康数据，并且这些档案记录可以在不同机构间进行查询。',
            '区块链系统能够充分保护数据的隐私，通过非对称加密技术实现对于病历的有限访问，授权人将病历信息使用被授权人的公钥加密，从而使得病历信息只能被被授权人查看，同时借助于哈希算法可以保证病历的来源以及完整真实性。',
            '经患者许可，可通过授予医疗从业人员、研究人员或希望访问数据的第三方等访问数据 的权限，使有需要的第三方能够进行更深度的数据分析，从而使得面向患者的智慧医疗服务得以落地。',
            '患者可以直接从平台提取可验证的医疗数据向保险公司索赔，从而节省了时间并绕过繁琐昂贵的行政流程。保险公司也将从更短的周转时间和更强大的欺诈威慑中受益。',
        ]
        const introductionCardInfoList = [];
        for( let i = 0; i < 4 ; i ++ ){
            introductionCardInfoList.push({
                imageSrc: imageSrcList[i],
                title: titleList[i],
                content: contentList[i],
            })
        }
        this.setState({insuranceList, introductionCardInfoList});
    }
    render(){
        const {insuranceList} = this.state;
        const insurancePurchasingStageTextArray = [...INSURANCE_PURCHASING_STAGE_ID_TO_TEXT];
        const directPaymentStageTextArray = [...DIRECT_PAYMENT_STAGE_ID_TO_TEXT];
        const insurancePurchasingStageNumber = insurancePurchasingStageTextArray.length - 1;
        const directPaymentStageNumber = directPaymentStageTextArray.length - 1;
        const {introductionCardInfoList} = this.state;
        return (
            <div className={Style.HomePage}>
                <CarouselContainer shouldShowInsurancePublicationButton={false} className={Style.carousel} />
                <div className={Style.contentWrapper}>
                    <div className={Style.moduleTitleWrapper}>
                        <div className={Style.moduleTitle}><strong>系统特性</strong></div>
                    </div>
                    <div className={Style.introductionCardListWrapper}>
                        {
                            introductionCardInfoList.map( (introductionCardInfo,i) => {
                                const {imageSrc, title, content} = introductionCardInfo;
                                return (
                                    <div className={Style.introductionCardWrapper} key={i}>
                                        <IntroductionCard {...{
                                            imageSrc,
                                            title,
                                            content,
                                        }}/>
                                    </div>
                                )
                                
                            })
                        }
                    </div>
                    <div className={Style.moduleTitleWrapper}>
                        <div className={Style.moduleTitle}><strong>系统流程</strong></div>
                    </div>
                    <div className={Style.indicatorWrapper}>
                        <div className={Style.title}>投保流程</div>
                        <div className={Style.stageProgressIndicatorWrapper}>
                            <HorizontalStageProgressIndicator currentStageNumber={insurancePurchasingStageNumber}
                                                            maxStageNumber={insurancePurchasingStageNumber} />
                        </div>
                        <div className={Style.stageTextIndicatorWrapper}  style={{width:'60%',}}>
                            <StageTextIndicator currentStageNumber={insurancePurchasingStageNumber}
                                            stageTextArray={insurancePurchasingStageTextArray} />
                        </div>
                    </div>
                    <div className={Style.indicatorWrapper}>
                        <div className={Style.title}>直付流程</div>
                        <div className={Style.stageProgressIndicatorWrapper}>
                            <HorizontalStageProgressIndicator currentStageNumber={directPaymentStageTextArray.length - 1}
                                                            maxStageNumber={directPaymentStageTextArray.length - 1} />
                        </div>
                        <div className={Style.stageTextIndicatorWrapper}>
                            <StageTextIndicator currentStageNumber={directPaymentStageNumber}
                                            stageTextArray={directPaymentStageTextArray} />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default HomePage;