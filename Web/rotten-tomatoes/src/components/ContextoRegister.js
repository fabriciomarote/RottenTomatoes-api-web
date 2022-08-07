import React, { useState } from "react";

export const RegisterContext = React.createContext();

const ModalRegisterContext = ({children}) => {

    const [registerState, setRegisterState] = useState(false);

    return(
        <>
            <RegisterContext.Provider value = {[registerState, setRegisterState]}>{children}</RegisterContext.Provider>
        </>
    )
}

export default ModalRegisterContext;