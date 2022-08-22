import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
} from '@mui/material';

import { Star } from '@mui/icons-material';
import NavBar from '../components/NavBar';
// Home Page
export default function SearchPage() {
  let navigate = useNavigate();

  //styling Components
  const StyledFavIcon = styled(FavoriteIcon, {
    name: 'StyledFav',
    slot: 'Wrapper',
  })({
    '&:hover': { color: 'red' },
  });
  const StyledCard = styled(
    Card,
    {}
  )({
    '&:hover': {
      transform: 'scale(1.12)',
    },
  });
  const StyledStar = styled(Star, {
    name: 'StyledFav',
    slot: 'Wrapper',
  })({
    color: 'goldenrod',
  });

  const MovieContainer = styled.div`
    padding: 100px;
  `;
  const [content, setContent] = useState([]);
  //loading
  const [loading, setLoading] = useState(false);
  //getting Data
  const fetchTvShow = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    console.log(data);
    setContent(data.results);
  };
  //getting Data Images
  const getImages = (path) => `https://www.themoviedb.org/t/p/original${path}`;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scroll(0, 0);
    setLoading(true);

    fetchTvShow();
    setLoading(false);
  }, []);
  return (
    <div>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <MovieContainer>
        {' '}
        <Grid container spacing={3}>
          {loading ? (
            <CircularProgress />
          ) : (
            content &&
            content
              // eslint-disable-next-line array-callback-return
              .filter((show) => {
                if (searchTerm === '') {
                  return show;
                } else {
                  if (
                    show.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return show;
                  }
                }
              })
              .map((show) => (
                <Grid
                  item
                  lg={3}
                  md={6}
                  sm={12}
                  key={show.id}
                  onClick={() => {
                    navigate(`/detail/${show.id}`);
                  }}
                >
                  <StyledCard sx={{ maxWidth: 300 }}>
                    <CardMedia
                      component="img"
                     height="350"
                      width="200"
                      image={getImages(show.poster_path)}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        height="30px"
                        style={{ overflow: 'hidden' }}
                      >
                        {show.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {show.first_air_date}
                      <div style={{ width: '50%' }}></div>

                      <IconButton aria-label="add to favorites">
                        <StyledFavIcon />
                      </IconButton>
                      <StyledStar />
                      <CardMedia style={{ color: 'goldenrod' }}>
                        {show.vote_average}
                      </CardMedia>
                    </CardActions>
                  </StyledCard>
                </Grid>
              ))
          )}
        </Grid>
      </MovieContainer>
    </div>
  );
}
