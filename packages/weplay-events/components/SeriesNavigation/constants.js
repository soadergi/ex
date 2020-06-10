import React from 'react'

import NextArrow from 'weplay-events/components/NextArrow'
import PrevArrow from 'weplay-events/components/PrevArrow'

export const MAD_MOON_TAB_ID = '3'

export const carouselConfig = {
  slidesToShow: 3,
  initialSlide: 2,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: 0,
  speed: 300,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    },
  ],
}

export const TOURNAMENT_SLUGS_WITH_SERIES_NAVIGATION = [
  'tug-of-war-mad-moon',
]
