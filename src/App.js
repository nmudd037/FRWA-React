import './App.css';
import 'tachyons';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import NotFound from './components/NotFound/NotFound';
import ParticleUI from './components/ParticleUI/ParticleUI';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import FrwaState from './context/frwa/FrwaState';

const App = () => {
  return (
    <AuthState>
      <FrwaState>
        <AlertState>
          <Router>
            <div className="app">
              <ParticleUI />
              <Navigation />
              <div className="app-content">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </AlertState>
      </FrwaState>
    </AuthState>
  );
};

export default App;
