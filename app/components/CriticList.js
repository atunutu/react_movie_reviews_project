import React, { useState, useEffect } from 'react';

// specifies the styles for the card containing a critic's information.
const cardStyles ={
    card:{
        alignItems:'center',
        width: '35%',
        padding: '10px',
        margin: 'auto',
        justifyContent:'center',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '5px',
        transition: 'box-shadow 0.3s ease-in-out',
        marginBottom:'2%',
        backgroundColor:'#ffffff',
        color:'black',
        ':hover':{
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
        },
    },

        img:{
            width:'100%',
            height:'auto'
        }

}

//The component fetches data from two JSON files 
//("critics.json" and "movie-reviews.json") using 
//the "fetch" function and the "useEffect" hook. 
//It sets the retrieved data as the initial state 
//for two states: "critics" and "movies".
const CriticsPage =()=>{
    const [critics,setCritics] = useState([])
    const[movies, setMovies] = useState([])

    useEffect(()=>{
        //load the data from critics.json file
        fetch('../../static/critics.json')
        .then((response)=>response.json())
        .then((data)=>setCritics(data))

        fetch('../../static/movie-reviews.json')
        .then((response)=>response.json())
        .then((data)=>setMovies(data))

    },[])

    //The component then returns a div that maps
    // over the "critics" state and returns a card for each critic. 
    //For each critic, it uses the "filter" method to get the number of
    // reviews and critic's picks for that critic, and it displays this information 
    //along with the critic's name, bio, and picture (if available). Finally, the 
    //component exports the "CriticsPage" component.
    return(
        
        <div>
            {critics.map((critic) => {
        // Get the number of reviews and critic's picks for each critic
        const reviews = movies.filter((movie) => movie.byline.toLowerCase() === critic.display_name.toLowerCase());
        const picks = reviews.filter((review) => review.critics_pick === 1);
        
        return (
          <div key={critic.display_name} style={cardStyles.card}>
            {/* display image only if current critic's multimedia proprerty
            is not null */}
            {critic.multimedia &&(<img style={cardStyles.card}
                src={`${critic.multimedia.resource.src}`}
                alt={`${critic.display_name}'s picture`}
              />)}
            
            <p><b>Critic's Name: {critic.display_name}</b></p>
            <p>{critic.bio}</p>
            <p><b>Number of reviews: </b>{reviews.length}</p>
            <p><b>Number of critic's picks: </b>{picks.length}</p>
          </div>
        );
      })}
        </div>
    )
}

export default CriticsPage;
