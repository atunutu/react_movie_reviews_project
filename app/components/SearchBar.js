import React, {useState,useEffect} from "react";
import ReviewList from "./ReviewList";


const headerStyle = {

    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop:'5%'
      },
    search:{
        border: 'none',
        borderRadius: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '1rem',
        padding: '10px 20px',
        width: '500px',
        backgroundColor: '#f1f1f1',
        backgroundPosition: '10px 10px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '20px 20px',
        justifyContent:'center',
        alignItems: 'center',
        display: 'block',
        textAlign:'center',
        margin:'0 25%'
    
   }
}
const filterStyles ={
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'20px 0'
    },
    label:{
        margin:'0 10px',
        fontWeight:'bold'
    },
    select:{
        border:'none',
        borderRadius:'20px',
        boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
        fontSize:'1rem',
        padding:'10px 20px',
        backgroundColor:'#f1f1f1',
        margin:'0 10px'
    }
}

//The component takes two props, searchTerm and setSearchTerm, 
//which are used for handling the search term entered by the user
const SearchBar =({searchTerm,setSearchTerm})=>{
    const [search,setSearch]= useState('')
    const [filteredReviews, setFilteredReviews] = useState([])
    const [filters, setFilters] = useState({
        mpaa_rating: '',
        publication_date: '',
        critics_pick: ''
    })

    //the useEffect hook fetches the movie reviews and stores them in a list
    //The list is then filtered based on the search term and other filters,
    // which are set through the handleFilter function. The filtered list is
    // then passed down to the ReviewList component as a prop, which is responsible for rendering the movie reviews.
    useEffect(() => {
        fetch('../../static/movie-reviews.json')
        .then(response => response.json())
        .then(data => {
            let results = data.filter(currentReview => {
                let mpaa_rating_check = true;
                let publication_date_check = true;
                let critics_pick_check = true;
            
            //for each review check whether filters.mpaa_rating, publication_date
            //and critic's-pick exists, if it does it sets their respective checks
            //to the value 
                if (filters.mpaa_rating) {
                    mpaa_rating_check = currentReview.mpaa_rating === filters.mpaa_rating;
                }

                if (filters.publication_date) {
                    publication_date_check = currentReview.publication_date.includes(filters.publication_date);
                }

                if (filters.critics_pick) {
                    
                    critics_pick_check = currentReview.critics_pick == filters.critics_pick;
                }

                return (
                    currentReview.display_title.toLowerCase().includes(searchTerm)
                    && mpaa_rating_check
                    && publication_date_check
                    && critics_pick_check
                );
            });
            setFilteredReviews(results)
        })
        .catch(error => console.error(error));
    }, [filters, searchTerm]);

    //function takes two arguments, an event object which
    //contains information about the filter option that was
    //changed, and a filterName string which
    //identifies which filter is being changed.
    const handleFilter =(event, filterName)=>{
        //..filters copies existing filters object
        //and then updates the filterName property with the new
        //value provided in the event object. This then updates the
        //state of the filters
        setFilters({
            ...filters,
            [filterName]: event.target.value
        })
    }

    const handleSearch =(event)=>{
        // setSearch(event.target.value.toLowerCase())
        const searchTerm = event.target.value.toLowerCase()
        setSearchTerm(searchTerm)
    }

    return(
        <div>
            {/* when value of text box changes invoke handleSearch function and 
            change the state of search to the value in the txt box */}
            <div style={headerStyle.container}>
            <input style={headerStyle.search} type="text" id="search" placeholder="Search for your movies here" onChange= {(e)=>{
                handleSearch(e)
                setSearch(e.target.value)
            }}/>
            </div>
        {/* Group of select options for filters that invoke the handleFilter function
        when their value is changed */}
        <div style={filterStyles.container}>
        <label style={filterStyles.label}>MPAA Rating:</label>
        <select style={filterStyles.select} placeholder="Rating" onChange={(e) => handleFilter(e,'mpaa_rating')}>
        <option value="">Rating</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="Not Rated">Not Rated</option>
      </select>
      <label style={filterStyles.label}>Publication Date:</label>
      <select style={filterStyles.select} placeholder="Year" onChange={(e) => handleFilter(e,'publication_date')}>
        <option value="">Year</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
      </select>
      <label style={filterStyles.label}>Critics Pick:</label>
      <select style={filterStyles.select} placeholder="Critics Pick" onChange={(e) => handleFilter(e,'critics_pick')}>
        <option value="">Critics Pick</option>
        <option value= "1">Yes</option>
        <option value="0">No</option>
      </select>
      {/* Render ReviewList component and passing a reviews prop to it
      the value of the prop is the filteredReviews state variable
      only reviews that matched the applied filters and current search term
      will be displayed  */}
      </div>
            <ReviewList reviews={filteredReviews} />

        </div>
        
    )
}

export default SearchBar