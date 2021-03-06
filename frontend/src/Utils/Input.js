import {useState, useEffect, useRef} from 'react'
import {apiURL} from './apiURL'
import axios from 'axios'
const API = apiURL();
// export const usePrevState = (prevState) => {
//     const ref = useRef();
//     const API = apiURL()
    
//     useEffect(() => {
//         ref.current = prevState;
//     });
    
//     return ref.current;
//     }

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return {value, onChange:handleChange}
    }


export const useFetch = (url, options) => {
        const [response, setResponse] = useState(null);
        const [error, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        
        useEffect(() => {
          const fetchData = async () => {
            setIsLoading(true);
            try {
              const res = await fetch(url, options);
              const json = await res.json();
              setResponse(json);
              setIsLoading(false)
            } catch (error) {
              setError(error);
            }
          };
          fetchData();
        }, []);
        return { response, error, isLoading };
          };
      export const createLikes = async (postId) => {
            try {
              const API = apiURL()
              const res = await axios.post(API + `/likes`)
              return res
            } catch (error) {
              console.log(error)
            }
          }
          export const getCommentsByPostId = async (postId) => {
            try {
              const res = await axios.get(API + `/comments/${postId}/posts`);
              
              return res;
            } catch (error) {
              console.log(error);
            }
          };
          export const createComments = async (dataObj) => {
            try {
              const res = await axios.post(API + `/comments`, dataObj);
              return res;
            } catch (error) {
              console.log(error);
            }
          };

          