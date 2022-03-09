import { News } from "../models/App";
import NewsItem from "./NewsItem";

const NewsList:React.FC<{news: Array<News>}> = ({ news }) => {
    return (
        <div className="news-list">
            {news.map((item: any, index: number) => (
                <NewsItem key={index} {...item} />
            ))}
        </div>
    );
};

export default NewsList;