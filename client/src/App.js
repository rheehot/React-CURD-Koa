import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';
import NotFound from './components/error/NotFound';

function App() {
  return (
    <>
    <Helmet>
      <title>사이트 제목</title>
    </Helmet>
    <Switch>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" /> {/*계정명을 주소 안에 넣을때 @username 의 식으로 사용하기위함*/}
      <Route component={NotFound}/>
    </Switch>
    </>
  );
}

export default App;
