import { WIDTH_MD, WIDTH_SM, WIDTH_XL } from 'weplay-core/reduxs/_legacy/layout/consts'

export const sliderSettings = {
  draggable: false,
  speed: 500,
  slidesToShow: 2,
  centerMode: true,
  centerPadding: '18%',
  responsive: [
    {
      breakpoint: WIDTH_XL,
      settings: {
        centerPadding: '3%',
      },
    },
    {
      breakpoint: WIDTH_MD,
      settings: {
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: WIDTH_SM,
      settings: {
        centerMode: false,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: true,
      },
    },
    {
      breakpoint: 320,
      settings: {
        centerMode: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
      },
    },
  ],
}
