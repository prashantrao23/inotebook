import React from 'react'

const Alerts = (props) => {
    
    const capitalize = (word) => {
        if (word === 'danger') {
            word = 'error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);   //It will capitalize first character nad lower all 

    }
    return (

        <div className='h-10'> {/* To avoid layout shifting when alert is displayed */}
            {/* {props.alert && <div>
                    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>} 
                
                */}
            {props.alert && <div className={`flex justify-between shadow-inner rounded p-3 ${props.alert.type==='success'?'bg-green-600 text-green-300':'bg-red-600 text-red-200'}`}>
                <p className="self-center">
                    <strong>{capitalize(props.alert.type)} </strong>: {props.alert.msg}
                </p>
                <strong className="text-xl align-center cursor-pointer alert-del" >&times;</strong>
            </div>}
        </div>



    )
}

export default Alerts