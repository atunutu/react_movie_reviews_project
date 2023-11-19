// This code defines a react component named header which is a simple 
//page containing a navigation menu with two buttons and a title
import React from "react"

//CSS javascript object for styling the header component, handles 
//two nested objects that contain the nav and button styles a
const headerStyle={
    textAlign: 'center',
    backgroundColor:'#0D0D3F',
    nav:{
        backgroundColor:'#0D0D3F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0',
        marginBottom: '20px',
    },
    button: {
        padding: '10px',
        width: '10%',
        margin: '0.1rem',
        border: 'none',
        backgroundColor: '#0D0D3F',
        color:'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }
}

//The header component accepts a prop named setCurrentPage which is
//a function to change the current page when button is clicked.
//the buttons are assigned onClick event handlers that invoke the setCurrent page
//function with a string value of either "home" or "critics" depending on
//what button is clicked 
const Header = ({setCurrentPage})=>{
    return(
        <div style={headerStyle}>
            <nav style={headerStyle.nav}>
                <button style={headerStyle.button} onClick={()=>setCurrentPage('home')}><b>Home</b></button>
                <button style={headerStyle.button} onClick={()=>setCurrentPage('criticsList')}><b>Critics</b></button>
            </nav>

            <h1 style={headerStyle}>Find reviews to your favorite movies</h1>
        </div>
    )
}
//exports the component 
export default Header