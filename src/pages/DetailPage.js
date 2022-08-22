import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Carousel from 'react-elastic-carousel';
import { BottomNavigation } from '@mui/material';

import axios from 'axios';
import { Box, List, ListItem, Typography } from '@mui/material';
import styled from 'styled-components';

export default function DetailPage() {
  // Slider breacking Points
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },

    { width: 800, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];
  // getting the id from the route
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const getImages = (path) => `https://www.themoviedb.org/t/p/original${path}`;
  const getDetail = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log(data);
    setItem(data);
  };
  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const ShowContainer = styled.div`
    width: 100%;
    height: 600px;
    padding-top: 70px;

    color: white;
  `;
  const ShowImageContainer = styled.div`
    width: 100%;
    height: 100%;
  `;
  const ShowImag = styled.img`
    width: 100%;
    height: 600px;
    object-fit: cover;
    z-index: 1;
    position: relative;
  `;
  const ShowShadow = styled.div`
    position: absolute;
    width: 100%;
    height: 600px;
    object-fit: cover;
    z-index: 2;
    background-image: linear-gradient(to right, black, transparent);
  `;
  const TextCont = styled.div`
    position: absolute;
    padding: 1rem;
    width: 100%;
    height: 600px;
    overflow: hidden;
    top: 5%;
    text-align: left;

    z-index: 2;
  `;

  const ButtonPlay = styled.button`
    padding: 10px 20px;
    color: rgb(0, 0, 0);
    margin-right: 20px;
    border: 1px solid rgb(255, 255, 255);
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    background-color: rgb(255, 255, 255);
    :hover {
      color: rgb(255, 255, 255);
      background-color: transparent;
    }
  `;
  const WatchLater = styled.button`
    padding: 10px 20px;
    color: rgb(255, 255, 255);
    border: 1px solid rgb(255, 255, 255);
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    background-color: transparent;
    :hover {
      color: rgb(0, 0, 0);
      background-color: rgb(255, 255, 255);
    }
  `;

  const Line = styled.span`
    border-left: 8px solid red;
    display: inline-block;
    height: 36px;
    padding-left: 15px;
  `;
  const Item = styled.img`
    justify-content: center;
    border-radius: 40px;
    align-items: center;
    height: 400px;
    width: 100%;

    background-color: black;
    color: #fff;
    margin: 0 15px;
    font-size: 4em;
    elevation: 50deg;
  `;
  const TextBlock = styled.div`
    bottom: 20px;
    color: white;
    padding-left: 20px;
    padding-right: 20px;
  `;
  return (
    <>
      {item && (
        <ShowContainer>
          <ShowImageContainer>
            <ShowShadow />
            <ShowImag src={getImages(item.poster_path)} alt={item.title} />
            <TextCont>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <List>
                  <ListItem>
                    <Typography
                      component="h1"
                      variant="h2"
                      color="red"
                      gutterBottom
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {item.genres.map((genre, index) => {
                      return (
                        <Typography
                          style={{
                            color: 'rgb(184,184,184) ',
                            fontSize: '28px',
                          }}
                        >
                          <div style={{ paddingRight: '10px' }}>
                            {genre.name}{' '}
                          </div>
                        </Typography>
                      );
                    })}
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="h5"
                      color="inherit"
                      style={{ width: '50%' }}
                      paragraph
                    >
                      {item.overview}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      style={{ color: 'rgb(184,184,184) ', fontSize: '18px' }}
                    >
                      Released : {item.first_air_date}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ButtonPlay>Play</ButtonPlay>
                    <WatchLater>Watch Later</WatchLater>
                  </ListItem>
                </List>
              </Box>
            </TextCont>
            <div>
              {item && item.seasons
                ? // eslint-disable-next-line array-callback-return
                  item.seasons.map((season, index) => {
                    if (
                      season.poster_path !== null &&
                      season.poster_path !== ''
                    ) {
                      return (
                        <>
                          {' '}
                          <h2
                            align="left"
                            style={{
                              padding: '30px',
                              color: 'rgb(184,184,184) ',
                            }}
                          >
                            <Line>
                              {' '}
                              {'  '}
                              {season ? season.name : ' '} :
                            </Line>
                          </h2>
                          <div>
                            <Carousel breakPoints={breakPoints}>
                              {[...Array(season.episode_count)].map(
                                (e, index) => (
                                  <div
                                    style={{
                                      alignItems: 'center',
                                    }}
                                  >
                                    {' '}
                                    <Item
                                      src={getImages(season.poster_path)}
                                      alt={item.title}
                                    />
                                    <TextBlock>
                                      <h4 align="center">
                                        {' '}
                                        Episode {index + 1}
                                      </h4>
                                    </TextBlock>
                                  </div>
                                )
                              )}
                            </Carousel>
                          </div>
                        </>
                      );
                    }
                  })
                : ''}
            </div>
          </ShowImageContainer>
          <BottomNavigation />
        </ShowContainer>
      )}
    </>
  );
}
