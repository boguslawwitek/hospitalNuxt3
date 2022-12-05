const useFontSize = () => {
  const fontSize = useState('fontSize', () => null);

  const setFontSize = (font) => {
    fontSize.value = font;
  }

  return {fontSize, setFontSize};
}

export default useFontSize;