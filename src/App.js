import React from 'react';
// import Counter from './components/Counter';
// import CounterContainer from './containers/CounterContainer';
// import PostListContainer from './containers/PostListContainer';
import { Switch, Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Switch>
      <Route path='/' component={PostListPage} exact={true} />
      <Route path='/:id' component={PostPage} />
    </Switch>
  );
}

export default App;
