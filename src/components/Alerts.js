import React from 'react'

const Alerts = (props) => {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alerts