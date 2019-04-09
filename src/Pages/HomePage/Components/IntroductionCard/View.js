import React from 'react';
import Style from './Style.module.scss';
//import iconSrc from '../../../../Static/HomePage/icon1.jpg';

class IntroductionCard extends React.Component
{
    render() {
        const {imageSrc, title, content} = this.props;
        // const imageSrc = iconSrc;
        // const title = "酒酿阿糕";
        // const content = "这是一份文案这是一份文案";
        return (
            <div className={Style.IntroductionCard}>
                <img className={Style.icon} src={imageSrc}></img>
                <div className= {Style.title}>{title}</div>
                <p className={Style.content}>{content}</p>
            </div>
        )
    }
}
export default IntroductionCard;
