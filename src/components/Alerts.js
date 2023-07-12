import React from 'react'

const Alerts = (props) => {
    const capitalize = (word)=>{
        if(word==='danger'){
            word ='error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);   //It will capitalize first character nad lower all 
         
    }
    return (
        <div style={{height:'50px'}}> {/* To avoid layout shifting when alert is displayed */}
        {props.alert && <div>  
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>}
        </div>
    )
}

export default Alerts