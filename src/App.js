import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MovieList from './pages/MovieList';
import EditMovie from './pages/EditMovie';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ MovieList } />
        <Route exact path="/movies/new" component={ NewMovie } />
        <Route exact path="/movies/:id" component={ MovieDetails } />
        <Route exact path="/movies/:id/edit" component={ EditMovie } />
        <Route path="/NotFound" component={ NotFound } />
        <Redirect to="/NotFound" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
