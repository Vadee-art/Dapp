/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/carouselTop.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIsCarousel } from '../../actions/artworkAction';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        color: 'black',
        margin: 5,
        right: window.innerWidth < 600 ? -10 : -80,
        position: 'absolute',
        opacity: '10%',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        color: 'black',
        margin: 2,
        left: 0,
      }}
      onClick={onClick}
    />
  );
}

export default function CarouselTop() {
  const dispatch = useDispatch();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const isCarousels = useSelector((state) => state.isCarousels);
  const { carousels, loading: loadingisCarousel } = isCarousels;

  useEffect(() => {
    dispatch(fetchIsCarousel());
  }, []);

  return (
    <Slider {...settings} style={{ height: '700px' }}>
      {carousels &&
        carousels.map((artwork, index) => (
          <div key={index}>
            <div
              loading="lazy"
              style={{
                backgroundImage: `url(${artwork.image})`,
                minWidth: '100%',
                width: '100%',
                height: '700px',
                zIndex: 99,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            />
            <Container maxWidth="xl">
              <Grid
                direction="column"
                justifyContent="center"
                container
                style={{
                  position: 'absolute',
                  top: 0,
                  zIndex: 100,
                  // height: '700px',
                  marginTop: 100,
                  backgroundColor: 'transparent',
                  color: '#fff',
                }}
                sx={{
                  width: '100%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  // marginBottom: 8,
                }}
              >
                <Grid item>
                  <Typography variant="h5" style={{ fontWeight: 300 }}>
                    VADEE Collection
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 400,
                      marginTop: '0px',
                      lineHeight: 1,
                    }}
                  >
                    {artwork.artist.first_name} {artwork.artist.last_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h3"
                    style={{ fontWeight: 400, lineHeight: 1, padding: 0 }}
                  >
                    <Link
                      style={{ color: '#fff' }}
                      to={`/artworks/${artwork._id}`}
                    >
                      {artwork && artwork.collection.title}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </div>
        ))}
    </Slider>
  );
}
