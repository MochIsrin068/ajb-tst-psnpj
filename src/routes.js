import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import NotFoundPage from './pages/404'
import HomePage from './pages/home'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    )
}
