import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateNotice from './components/CreateNotice/CreateNotice';
import CreateNewCrew from './components/Crew/CreateCrew/CreateCrew';
import Crew from './components/Crew/Crew';
import CrewDetail from './components/Crew/CrewDetail/CrewDetail';
import CrewManagement from './components/Crew/CrewManagement/CrewManagement';
import GuestPage from './components/GuestPage/GuestPage';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MyPage from './components/Mypage/MyPage';
import ViewNotice from './components/ViewNotice/ViewNotice';
import UserPage from './components/UserPage/Userpage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/guest" component={GuestPage} />
          <Route exact path="/myPage" component={MyPage} />
          <Route exact path="/crew/new" component={CreateNewCrew} />
          <Route exact path="/myPage" component={MyPage} />
          <Route exact path="/myPage/changePassword" component={MyPage} />
          <Route exact path="/myPage/leaving" component={MyPage} />
          <Route exact path="/crew" component={Crew} />
          <Route exact path="/crew/:id" component={CrewDetail} />
          <Route exact path="/crew/:id/management" component={CrewManagement} />
          <Route
            exact
            path="/crew/:id/peopleManagement"
            component={CrewManagement}
          />
          <Route exact path="/notice/:noticeId" component={ViewNotice} />
          <Route exact path="/notice-create" component={CreateNotice} />
          <Route exact path="/userInfo" component={UserPage} />
        </Switch>
        <div id="modal" />
      </BrowserRouter>
    </>
  );
}

export default App;
