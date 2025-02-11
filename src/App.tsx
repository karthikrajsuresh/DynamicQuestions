import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { resetQuestions } from './store/questionSlice';
import WelcomePage from './pages/WelcomePage.tsx';
import DynamicQuestion from './pages/DynamicQuestion';
import ThankYouPage from './pages/ThankYouPage.tsx';

type PageType = 'welcome' | 'questions' | 'thankyou';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');

  const handleStartQuestions = () => {
    setCurrentPage('questions');
  };

  const handleCompleteQuestions = () => {
    setCurrentPage('thankyou');
  };

  const handleRestartQuestions = () => {
    store.dispatch(resetQuestions());
    setCurrentPage('welcome');
  };

  return (
    <Provider store={store} >
      {currentPage === 'welcome' && (
        <WelcomePage onComplete={handleStartQuestions} />
      )
      }
      {
        currentPage === 'questions' && (
          <DynamicQuestion onComplete={handleCompleteQuestions} />
        )
      }
      {
        currentPage === 'thankyou' && (
          <ThankYouPage onRestart={handleRestartQuestions} />
        )
      }
    </Provider>
  );
}

export default App;