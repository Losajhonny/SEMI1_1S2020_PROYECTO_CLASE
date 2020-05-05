import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './../componentes/app/App';

class AppRoute extends Component
{
    render()
    {
        return(
            <Router>
                <Switch>
                    <Route path="/" component={App} />
                    <Route component={App /*Page 404*/} />
                </Switch>
            </Router>
        );
    }
}

export default AppRoute;
