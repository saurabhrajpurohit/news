import React, { useEffect, useState } from 'react';
import './App.scss';
import CategoryModal from './components/CategoryModal';
import NewsList from './components/NewsList';
import SearchIcon from './components/SearchIcon';
import { Category, News as NewsModel } from './models/App';
import { getData } from './utils/service';

function App() {
  const [news, setNews] = useState<Array<NewsModel>>([]);
  const [filteredNews, setFilteredNews] = useState<Array<NewsModel>>([]);
  const [topic, setTopic] = useState("TechCrunch");
  const [categories, setCategories] = useState(["TechCrunch"])
  const [categoryModal, setCategoryModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getNews = (topic: string) => {
    setLoading(true);
    getData(topic).then(response => {
      setLoading(false);
      setNews(response.articles);
      setFilteredNews(response.articles);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  }

  useEffect(() => {
    getNews(topic);
  }, [topic]);


  const categorySubmit = (submit: boolean, category?: Category) => {
    if (submit) {
      setCategories(prevState => [...prevState, category!.categoryName]);
    }
    setCategoryModal(false);
  };

  const search = (event: React.BaseSyntheticEvent) => {
    console.log(event.target.value);
    setFilteredNews(news.filter(news =>
      (news.title && news.title.toLowerCase().includes(event.target.value.toLowerCase()))
      || (news.author && news.author.toLowerCase().includes(event.target.value.toLowerCase()))
      || (news.description && news.description.toLowerCase().includes(event.target.value.toLowerCase()))
    ));
  };

  return (
    <div className="container">
      <div className="px-15">
        <div>
          <h2 className="heading">News Today</h2>
        </div>
        <div className="category">
          {categories.map(category => (
            <button
              onClick={() => setTopic(category)}
              className={`category__button ${topic === category ? "category__active" : ""}`}
            >
              {category}
            </button>
          ))}
          <button
            disabled={categories.length === 5}
            className="category__button"
            onClick={() => setCategoryModal(true)}
          >+</button>
        </div>
        <div className="input-group">
          <div className="input-group__icon"><SearchIcon /></div>
          <input
            className="input-group__field"
            placeholder="Search for keywords, author"
            onChange={search}
          />
        </div>
        <div>
          {loading ? (
            <div className="loader">Fetching {topic} news...</div>
          ) : (
            <NewsList news={filteredNews} />
          )}
        </div>
        <CategoryModal open={categoryModal} onSubmit={(submit: boolean, data?: Category) => categorySubmit(submit, data)} />
      </div>
    </div>
  );
}

export default App;
