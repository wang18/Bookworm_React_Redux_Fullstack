import React from 'react';
import PropType from 'prop-types';

const InlineError =({text})=>{
    return(
        <span style={{color:"#ae5856"}}>
            {text}
        </span>
    );
};

InlineError.propTypes={
    text:PropType.string.isRequired
}

export default InlineError;