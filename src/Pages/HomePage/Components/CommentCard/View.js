import React from 'react';
import Style from './Style.module.scss';

class CommentCard extends React.Component
{
    render() {
        const {imageSrc, title, content} = this.props;
        return (
            <div className={Style.CommentCard}>
                <img className={Style.icon} src={imageSrc}></img>
                <div className= {Style.title}>{title}</div>
                <p className={Style.content}>{content}</p>
            </div>
        )
    }
}
export default CommentCard;
