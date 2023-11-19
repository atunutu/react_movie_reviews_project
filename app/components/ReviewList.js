import React,{useState,useEffect} from "react";
import ReviewDetails from "./ReviewDetails";


//This is a React functional component that displays a list of movie reviews,
//including a thumbnail image, title, date, rating, and whether it is a critics' pick.
//The component recieves two props 'reviews' and 'handleloadmore' which are
//used to display the list of movie reviews and load more reviews
//when load more button is clicked 
const ReviewList = ({reviews, handleLoadMore})=>{
    //usestate hook used to declare four states, maintains 
    //state of displayedReviews, selectedReview, displayCount, and 
    //detailsToggle
    const[displayedReviews,setDisplayedReviews] = useState([])
    const [selectedReview,setSelectedReview] = useState(null)
    const[displayCount, setDisplayCount] = useState(20)
    const [detailsToggle,setDetailsToggle] = useState(false)

    //sorts the reviews in descending order based on publication data
    //and sets the displayedReviews state to the sorted array using the
    //setDisplayed reviews function. The useEffect hook will re-run every
    //time the reviews prop changes 
    useEffect(()=>{
        if(!reviews)return;

        const sortedReviews = reviews.sort((a,b)=>
            a.publication_date>b.publication_date? -1:1
        )
        setDisplayedReviews(sortedReviews)
    },[reviews])

    //function used to toggle the display of the 'ReviewDetails' 
    //when a review is clicked
    const handleReviewClick=(review)=>{
        //if selectedReview state is the same as the review argument
        //it means the user clicked the same review twice, therefore
        //the setSelectedReview is called with null to reset the selectedReview state
        //and the details toggle is also set to false
        //if selectedReview state is different than the passed review argument
        //then user clicked on a different card to the one that was previously selected
        //its details should be set appropriately
        if (selectedReview && selectedReview === review) {
            setSelectedReview(null);
            setDetailsToggle(false);
          } else {
            setSelectedReview(review);
            setDetailsToggle(true);
          }

        
    }

    //function that is used to load more reviews when the "Load More" button is clicked.
    //It updates the displayCount state to display more reviews up to a limit of 50,
    //and it calls the handleLoadMore function to indicate whether more reviews can be loaded.

    const handleLoadMoreClick=()=>{
        if(displayCount+10 >displayedReviews.length &&displayedReviews.length<50){
            setDisplayCount(displayedReviews.length)
            handleLoadMore(false)
        }else if(displayCount+10<50){
            setDisplayCount(displayCount+10)
        }
    }

    //object that styles the review cards, the "Load More" button,
    //and the message to display when no search results are found.
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

        h:{
            alignItems:'center',
            justifyContent:'center',
            textAlign:'center'
        },

        img:{
            width:'100%',
            height:'auto'
        },
        button:{
            background: '#0077cc',
            justifyContent:'center',
            alignItems:'center',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out',
            ':hover': {
                background: '#005ea6',

                 },
        },
        buttonContainer:{
            display: 'flex', 
            justifyContent: 'center'
        }
    
    
    }

    return(
    <div>
        {/*  If there are no reviews to display, 
        render an <h3> element with the message "No search results found". */}
       {displayedReviews.length===0 &&(<h3 style={cardStyles.h}>No search results found</h3>)}
        
        {/* maps through the displayedReviews array and renders a new div element for each review.
         Each review div element has a unique key attribute set to the review.id. */}
       {displayedReviews.slice(0,displayCount).map((review)=>(

        // The div elements include an onClick event listener that calls the handleReviewClick function
        // when a review is clicked. The handleReviewClick function sets the selectedReview state to 
        //the current review object and toggles the detailsToggle state to display the ReviewDetails component for the selected review.
        <div style={cardStyles.card} key={review.id} onClick={()=> handleReviewClick(review)}>
            <img src={review.multimedia.src} style ={cardStyles.img}/>
            <div className="container">
                <h4>{review.display_title}</h4>
                <h5>{review.publication_date}</h5>
                <p><b>Rated: {review.mpaa_rating || "Not Rated"}</b></p>
                <p><b>Critics pick: {(review.critics_pick==1)? "Yes":"No"}</b> </p>

            </div>
            {selectedReview===review &&detailsToggle && (
            <ReviewDetails review={selectedReview} />
        )}
        </div>
        
        
        
       ))} 
       {/* "Load More" button at the bottom of the reviews list, 
       which is only displayed if there are more reviews to load.
        When the button is clicked, the handleLoadMoreClick function is called to load more reviews. */}
       {displayCount<displayedReviews.length &&displayCount<50 &&(<div style={cardStyles.buttonContainer}><button style={cardStyles.button} onClick={handleLoadMoreClick}>Load More</button> </div>)}
       </div>
   
)
}
export default ReviewList;