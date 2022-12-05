const useThemeType = () => {
  const themeType = useState('themeType', () => null);
  
  const setThemeType = (theme) => {
    themeType.value = theme;
  }

  return {themeType, setThemeType};
}

export default useThemeType;