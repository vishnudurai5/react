import React , {Component}from "react";

class  Welcome extends Component{

    constructor(props){
        super(props)

        this.state ={
            isLoggedIn:true
        }
    }

  // Conditional Rendering


  // if else 
  /* render(){
        if(this.state.isLoggedIn){
         return(
             <h1> Welcome vishnu</h1>            
        )
     }
        else{
            return(
                <h1>Welcome Guest</h1>            
            )
        }
    }*/

    //Ternary condition operator

  /*  render(){
        return this.state.isLoggedIn ? 
        (<div>'Welcome vishnu'</div>) : (<div>'Welcome Guest'</div>)
        
    }*/
 
   // short circuite
   
    render(){
        return this.state.isLoggedIn && <div>'Welcome vishnu'</div>
    }

}

export default Welcome