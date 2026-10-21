import { useCallback } from 'react';
import { useHttp } from '../hooks/useHttp';
import { CHARACTERS_PAGE_SIZE } from '../constants';

const useMarvelService = () => {
  const { loading, req, error, clearError } = useHttp();

  const _apiBase = import.meta.env.VITE_MARVEL_API_BASE;
  const _apiKey = import.meta.env.VITE_MARVEL_API_KEY;
  const _baseOffset = 0;

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
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || 'en-us',
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
    };
  };

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await req(`${_apiBase}characters?limit=${CHARACTERS_PAGE_SIZE}&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_getTransformCharacter);
  };

  const getCharacter = useCallback(async (id) => {
    const res = await req(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _getTransformCharacter(res.data.results[0]);
  }, [req, _apiBase, _apiKey]);

  const getAllComics = async (offset = 0) => {
    const res = await req(`${_apiBase}comics?limit=${CHARACTERS_PAGE_SIZE}&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await req(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
  };
};

export default useMarvelService;
