import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import CriticsPage from '../components/CriticList'
import SearchBar from '../components/SearchBar'

//general styling for the homepage 
const homePageStyle={
    home:{
        backgroundColor:'#0D0D3F',
        color:'white'
    }

}


const Home =()=>{
    //The component uses the useState hook to define two states: 
    //searchTerm and currentPage. The searchTerm state represents
    //the text that the user inputs into the search bar, and the 
    //currentPage state represents the current page that is displayed.
    const[searchTerm,setSearchTerm] = useState('')
    const [currentPage,setCurrentPage] = useState('home')

   // The component then returns a div element with the style of 
   //homePageStyle.home, which contains the Header component and 
   //either the SearchBar or CriticsPage component, depending on 
   //the current page stored in the currentPage state.
    return (
        <div style={homePageStyle.home}>
            <Header setCurrentPage={setCurrentPage}/>
            {currentPage === 'home' && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}
            {currentPage === 'criticsList' && <CriticsPage />}
        </div>
    )
}
export default Home;