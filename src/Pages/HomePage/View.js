import React from 'react';
import Style from './Style.module.scss';
import {View as CarouselContainer} from '../../ComponentContainers/CarouselContainer';
import {View as IntroductionCard} from './Components/IntroductionCard';
import {View as CommentCard} from './Components/CommentCard';
import {View as NewsCard} from './Components/NewsCard';
import {INTRODUCTION_ICON} from '../../Config';
import {HEAD_PORTRAIT} from '../../Config';
import {INSURANCE_PURCHASING_STAGE_ID_TO_TEXT, DIRECT_PAYMENT_STAGE_ID_TO_TEXT} from '../../Constant';
import {View as HorizontalStageProgressIndicator} from '../../Components/HorizontalStageProgressIndicator';
import {View as StageTextIndicator} from '../../Components/StageTextIndicator';
import medicalInsuranceImgSrc from '../../Static/HomePage/medicalInsurance.png';

class HomePage extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            insuranceList: [],
            introductionCardInfoList: [],
            newsCardInfoList: [],
            commentCardInfoList: [],
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

        // 系统特性卡片数据
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
        // 新闻卡片信息数据
        const newsCardInfoList = [];
        const newsTitleList = [
            '民心专列：救命药价格高医保不能报 改革采购方式降低价格',
            '十九大关于医疗健康的4点重要解读',
            '韩正副总理透露 下一步医保改革将有六大趋势动向',
            '【两会特别报道】一图读懂医保改革亮点（上）',
            '《2019年国家医保药品目录调整工作方案》公布，4点变化需要你注意！​',
            '国家医保局官方解读 | 目录调整优先考虑哪些药？',
            '医保管理，如何走好筹资与待遇的平衡木？',
        ];
        const newsHrefList = [
            'http://www.zgnt.net/content/2019-04/18/content_2612931.htm',
            'https://www.cn-healthcare.com/articlewm/20171019/content-1018105.html',
            'https://www.cn-healthcare.com/articlewm/20190112/content-1044543.html',
            'https://www.zgylbx.com/index.php?m=content&c=index&a=show&catid=6&id=32763',
            'https://www.zgylbx.com/index.php?m=content&c=index&a=show&catid=6&id=35091',
            'https://www.zgylbx.com/index.php?m=content&c=index&a=show&catid=6&id=35090',
            'https://www.zgylbx.com/index.php?m=content&c=index&a=show&catid=10&id=34925',
        ];
        for (let i = 0 ; i < newsTitleList.length; i++)
        {
            newsCardInfoList.push({
                newsTitle: newsTitleList[i],
                newsHref: newsHrefList[i],
            });
        }
        // 评论卡片信息数据
        const headPortraitImageSrcList = [...HEAD_PORTRAIT];
        const nickNameList = ['善变梦想家', '红蜻蜓', '心已成沙'];
        const commentContent = [
            '人民健康是民族昌盛和国家富强的重要标志。要完善国民健康政策，为人民群众提供全方位全周期健康服务。',
            '从前，由于基层医疗卫生服务体系的不完善，群众看病难、看病贵问题一直是制约“满足群众健康需求”的瓶颈，相信在未来的5年内可以得到逐步改善。',
            '坚持预防为主，深入开展爱国卫生运动，倡导健康文明生活方式，预防控制重大疾病。实施食品安全战略，让人民吃得放心。',
        ];
        const commentCardInfoList = [];
        for( let i = 0; i < 3 ; i ++)
        {
            commentCardInfoList.push({
                imageSrc: headPortraitImageSrcList[i],
                title: nickNameList[i],
                content: commentContent[i],
            })
        }
        this.setState({insuranceList, introductionCardInfoList, newsCardInfoList, commentCardInfoList});
    }
    render(){
        const {insuranceList} = this.state;
        const insurancePurchasingStageTextArray = [...INSURANCE_PURCHASING_STAGE_ID_TO_TEXT];
        const directPaymentStageTextArray = [...DIRECT_PAYMENT_STAGE_ID_TO_TEXT];
        const insurancePurchasingStageNumber = insurancePurchasingStageTextArray.length - 1;
        const directPaymentStageNumber = directPaymentStageTextArray.length - 1;
        const {introductionCardInfoList, newsCardInfoList, commentCardInfoList} = this.state;
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
                        <div className={Style.moduleTitle}><strong>相关新闻</strong></div>
                    </div>
                    <div className={Style.newsModuleWrapper}>
                        <div className={Style.newsImageWrapper}>
                            <img src={medicalInsuranceImgSrc} className={Style.newsImage}/>
                        </div>
                        <div className={Style.newsCardListWrapper}>
                            {
                                newsCardInfoList.map( (newsCardInfo, i) => {
                                    const {newsTitle, newsHref} = newsCardInfo;
                                    return (
                                        <div className={Style.newsCardWrapper}>
                                            <NewsCard {...{newsTitle,newsHref}}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div class={Style.clearFloat}></div>
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


                    <div className={Style.moduleTitleWrapper}>
                        <div className={Style.moduleTitle}><strong>用户评论</strong></div>
                    </div>
                    <div className={Style.commentListWrapper}>
                        {
                            commentCardInfoList.map( (commentCardInfo,i) => {
                                const {imageSrc, title, content} = commentCardInfo;
                                return (
                                    <div className={Style.commentCardWrapper} key={i}>
                                        <CommentCard {...{
                                            imageSrc,title,content,
                                        }}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default HomePage;