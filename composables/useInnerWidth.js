const useInnerWidth = () => {
    const innerWidth = useState('innerWidth', () => null);
    const isMobile = useState('isMobile', () => null);
    
    const setInnerWidth = (width) => {
      innerWidth.value = width;

      if(typeof width === 'number' && width <= 1120) isMobile.value = true;
      else if(typeof width === 'number' && width > 1120) isMobile.value = false;
    }
  
    return {innerWidth, isMobile, setInnerWidth};
  }
  
  export default useInnerWidth;