import { axiosWithoutAuth } from '@/lib/axios';
import { Artwork } from '../types';
import { useQuery } from 'react-query';

export type getArtworkCarouselResponse = {
  count: number;
  next: string;
  prev: string;
  results: Artwork[];
};

export const getArtworkCarousel = (): Promise<getArtworkCarouselResponse> => {
  return axiosWithoutAuth.get('/artworks/carousels/');
};

export const useGetArtworkCarousel = () => {
  return useQuery<getArtworkCarouselResponse, string>(['artworkCarousel'], () =>
    getArtworkCarousel()
  );
};
