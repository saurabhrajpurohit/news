import { News } from "../models/App";
import { formatDate } from "../utils/util";

const NewsItem = ({ title, description, urlToImage, url, author, publishedAt }: News) => {
    return (
        <div className="news-item">
            <div className="news-item__content">
                <h5 className="news-item__title">
                    {title}
                </h5>
                <div className="news-item__info">
                    {author}
                    <span className="news-item__info__dot"></span>
                    {formatDate(publishedAt)}
                </div>
                <p className="news-item__description">{description}</p>
            </div>
            <div className="news-item__image">
                <img src={urlToImage} alt={title} />
            </div>
        </div>
    );
};

export default NewsItem;