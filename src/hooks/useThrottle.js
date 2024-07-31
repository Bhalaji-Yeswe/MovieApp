import { useCallback, useEffect, useState } from "react"

const useThrottle = (callback,delay) =>{
    const lastCall = useRef(0);
    const timeout = useRef(null);
    return useCallback((...args)=>{
        const now = Date.now();

        if(lastCall.current && now < lastCall.current+delay){
            clearTimeout(timeout);
            timeout.current = setTimeout(()=>{
                lastCall.current = now;
                callback(...args);
            },delay);
        }
        else{
            lastCall.current = now;
            callback(...args);
        }
    },[callback,delay]);
}

export default useThrottle;