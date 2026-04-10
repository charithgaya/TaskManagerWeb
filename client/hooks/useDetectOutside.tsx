"use client";
import React, { useEffect } from 'react'

interface DetectOutsideProps {
    ref: React.RefObject<any>;
    callback: () => void;
}
function useDetectOutside({ ref, callback }: DetectOutsideProps) {
    useEffect(() => {
        // Add event listener to detect clicks outside the specified element
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        // Attach the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {        
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref, callback]);
}

export default useDetectOutside;
