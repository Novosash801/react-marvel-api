import { useHttp } from '../hooks/useHttp';
import { CHARACTERS_PAGE_SIZE } from '../constants';

const useMarvelService = () => {
  const { loading, req, error, clearError } = useHttp();

  const _apiBase = import.meta.env.VITE_MARVEL_API_BASE;
  const _apiKey = import.meta.env.VITE_MARVEL_API_KEY;
  const _baseOffset = 0;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await req(`${_apiBase}characters?limit=${CHARACTERS_PAGE_SIZE}&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_getTransformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await req(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _getTransformCharacter(res.data.results[0]);
  };

  const _getTransformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
  };
};

export default useMarvelService;
