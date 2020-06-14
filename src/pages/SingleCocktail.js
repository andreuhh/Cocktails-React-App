import React from "react";
//useParams returns an object of key/value pairs of URL parameters.
// Use it to access match.params of the current <Route>.
import { useParams, Link } from 'react-router-dom';

export default function SingleCocktail() {
  const { id } = (useParams());
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients
          }
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  if (loading) {
    return <h2 className='section-title'>Loading...</h2>
  }
  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>;
  }
  else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients
    } = cocktail;
    return (
      <section className='section cocktail-section'>

        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt='name' />
          <div className='drink-info'>
            <p>Name : {name}</p>
            <p>Category : {category}</p>
            <p>Info : {info}</p>
            <p>Glass : {glass}</p>
            <h3>Instructions :</h3>
            <p> {instructions}</p>
            <h3>Ingredients :</h3>
            <p>
              {
                ingredients.map((item, index) => {
                  return item ? <span key={index}>{item}</span>
                    : null;
                })
              }
            </p>
          </div>
        </div>
        <Link to='/' className='btn btn-primary btn-primary-center'>
          go back
        </Link>
      </section>
    );
  }
}
