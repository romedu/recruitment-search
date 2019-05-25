import React from "react";

const Button = ({children, action}) => (
    <button onClick={action}>
        {children}
    </button>
);

export default Button;