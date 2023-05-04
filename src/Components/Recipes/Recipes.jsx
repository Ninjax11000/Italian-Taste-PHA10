import React, { useEffect, useState } from 'react';
import { CardGroup, Col } from 'react-bootstrap';
import { useLoaderData, useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Recipes = () => {
    const [chef, setChef]=useState([]);
    const recipes =useLoaderData();
    const chefId=useParams();
    console.log(chefId.id);
    
    // load chefs from server
    useEffect(()=>{
        fetch(`https://italian-taste-server1-ninjax11000.vercel.app/chefs/${chefId.id}`)
        .then(res=>res.json())
        .then(data=>setChef(data))
        .catch(error=>console.log(error))
        window.scrollTo(0,0);
    },[]);
    
    console.log(chef);
    return (
        <div>
            <div className='container d-lg-flex bg-warning rounded align-items-center my-3'>
                <div className='w-50'>
                <LazyLoadImage  className='w-100 rounded' src={chef.picture} alt="" />
                </div>
                <div className='w-50 ps-3 '>
                    <h2>{chef.name}</h2>
                    <p>{chef.short_bio}</p>
                    <h4>{chef.likes} likes</h4>
                    <h4>{chef.number_of_recipes} recipes</h4>
                    <h4>{chef.years_of_experience} years of experience!</h4>

                </div>
                
            </div>
            
           <div className=' d-flex flex-column justify-content-center '>
           
                
                {
                    recipes.map(recipe=>  <RecipeCard 
                        key={recipe.chef_id}
                        recipe={recipe}></RecipeCard> )
                }
               
           </div>
             
        </div>
    );
};

export default Recipes;