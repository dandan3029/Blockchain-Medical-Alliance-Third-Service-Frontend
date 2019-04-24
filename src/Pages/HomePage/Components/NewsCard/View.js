import React from 'react';
import Style from './Style.module.scss';

class NewsCard extends React.Component
{
    render() {
        const {newsTitle, newsHref} = this.props;
        return (
            <div className={Style.NewsCard}>
                <div className= {Style.title}>{newsTitle}</div>
                <a className={Style.link} href={newsHref} target="_blank">更多 ></a>
                <div className={Style.clearFloat}></div>
            </div>
        )
    }
}
export default NewsCard;
