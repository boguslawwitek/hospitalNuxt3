const useSubdirectory = () => {
    const config = useRuntimeConfig();
    const subdirectory = useState('subdirectory', () => config.public.baseUrl);
  
    return {subdirectory};
  }
  
export default useSubdirectory;