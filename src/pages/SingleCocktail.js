import React from "react";
//useParams returns an object of key/value pairs of URL parameters.
// Use it to access match.params of the current <Route>.
import { useParams } from 'react-router-dom';

export default function SingleCocktail() {
  const { id } = (useParams());

  return <h1>single cocktail page id : {id}</h1>;
}
