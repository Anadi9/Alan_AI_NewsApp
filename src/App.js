import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import alan from './images/alan2.png'
import alanPowered from './images/alan_powered.png'

const alanKey = '3c585e128455bc34dab6a0fc36567ea12e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy : true}) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);
  
  return (
    <div>
      <div className={classes.logoContainer}>
        <img className={classes.alanLogo} alt="alan logo" src={alan}/>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        <img className={classes.alanpowerLogo} alt="alan logo" src={alanPowered}/>
    </div>
  );
}

export default App;
