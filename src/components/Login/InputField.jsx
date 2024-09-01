import React from 'react'

const InputField = ({ label, id, name, type, pattern }) => {

    return (
        <>
            {
                name ?
                    (
                        <div className="input-container" style={{width:'60%', marginLeft:'20%'}}>
                            <input type={type} name={name} pattern={pattern} placeholder={label} required className='Input'/>
                        </div >
                    )
                    :

                    (<div className="input-container" id={id}>
                        <input type={type} name={id} pattern={pattern} placeholder={label} required className='Input'/>
                    </div>)

            }
        </>
    )
}

export default InputField