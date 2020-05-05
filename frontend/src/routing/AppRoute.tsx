import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './../componentes/app/App';
import Home from './../componentes/home/Home';

class AppRoute extends Component
{
    render()
    {
        return(
            <Router>
                <Switch>
                    <Route exec path="/" component={Home} />
                    <Route exec component={App /*Page 404*/} />
                </Switch>
            </Router>
        );
    }
}

export default AppRoute;
