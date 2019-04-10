import React from 'react';
import Style from './Style.module.scss';
import {View as CarouselContainer} from '../../ComponentContainers/CarouselContainer';
import {View as IntroductionCard} from './Components/IntroductionCard';
import {INTRODUCTION_ICON} from '../../Config';

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

        const imageSrcList = [...INTRODUCTION_ICON, ...INTRODUCTION_ICON, ];
        const titleList = ['平台架构', '平台优势' ,'功能实现', '平台架构', '平台优势' ,'功能实现',];
        const contentList = [
            '平台为一个基于区块链的电子医疗信息共享系统，具有独特的分层架构。在其控制和数据层之上,结合了机器学习和数据分析功能，允许将具有复杂应用的机器学习编程接口构建在系统之上。',
            '研发前期，在医院和保险公司达成合作共识的基础上，平台主要作为由医院提供保险资格审查和理赔前置的一种增值服务系统，具体体现为投保前期投保者身体健康资质审查和投保实现过程中的商业医疗保险直付两个功能。',
            '后期，随着信息数据的进一步共享，预期可以实现如下功能：……（随便加）',
            '平台为一个基于区块链的电子医疗信息共享系统，具有独特的分层架构。在其控制和数据层之上,结合了机器学习和数据分析功能，允许将具有复杂应用的机器学习编程接口构建在系统之上。',
            '研发前期，在医院和保险公司达成合作共识的基础上，平台主要作为由医院提供保险资格审查和理赔前置的一种增值服务系统，具体体现为投保前期投保者身体健康资质审查和投保实现过程中的商业医疗保险直付两个功能。',
            '后期，随着信息数据的进一步共享，预期可以实现如下功能：……（随便加）',
        ]
        const introductionCardInfoList = [];
        for( let i = 0; i < 6 ; i ++ ){
            introductionCardInfoList.push({
                imageSrc: imageSrcList[i],
                title: titleList[i],
                content: contentList[i],
            })
        }
        this.setState({insuranceList, introductionCardInfoList});
    }
    render(){
        console.log(this.state)
        const {insuranceList} = this.state;
        const {introductionCardInfoList} = this.state;
        return (
            <div className={Style.HomePage}>
                <CarouselContainer shouldShowInsurancePublicationButton={false} className={Style.carousel} />
                <div className={Style.contentWrapper}>
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
                    
                </div>
            </div>
        );
    }
}
export default HomePage;