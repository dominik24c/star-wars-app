import style from './App.module.css';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className={style.App}>
          <h1>Star Wars App</h1>
          <SearchBar/>
    </div>
  );
}

export default App;
