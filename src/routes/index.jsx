import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  EditMovie, MovieList, NewMovie, MovieDetails, NotFound,
} from '../pages';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={MovieList} />
      <Route path="/movies/new" component={NewMovie} />
      <Route path="/movies/:id" exact component={MovieDetails} />
      <Route path="/movies/:id/edit" component={EditMovie} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
