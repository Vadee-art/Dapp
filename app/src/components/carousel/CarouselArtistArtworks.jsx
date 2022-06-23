/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { fetchArtistById } from '../../actions/artistAction';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    position: 'relative',
    // overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      height: 2,
      width: '20px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      width: '20px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
      width: '20px',
    },
  },
}));

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'block',
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
        display: 'block',
        color: 'black',
        margin: 2,
        left: 0,
      }}
      onClick={onClick}
    />
  );
}

export default function CarouselArtistArtworks({ artist }) {
  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(artist);
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      {artist && (
        <Slider
          {...settings}
          style={{
            padding: 0,
          }}
        >
          {artist.artworks.map((artwork, index) => (
            <Grid
              sx={{
                padding: 0,
                margin: 0,
                maxWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end ',
              }}
              key={index}
            >
              <img
                srcSet={`${artwork.image}?w=164&h=164&fit=crop&auto=format 2x,
                  ${artwork.image}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                alt={artwork.title}
                loading="lazy"
                style={{ maxWidth: '90%', marginBottom: '20px' }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  padding: 0,
                  margin: 0,
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              >
                <Link style={{ color: 'black' }} to="#">
                  {artwork?.category?.name}
                </Link>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  padding: 0,
                  fontSize: '14px',
                  marginTop: '10px',
                }}
              >
                {artwork.artist.origin}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '14px',
                  marginTop: '3px',
                }}
              >
                ${artwork.price.toLocaleString()}
              </Typography>
            </Grid>
          ))}
        </Slider>
      )}
    </Grid>
  );
}
