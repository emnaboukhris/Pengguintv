import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function NavBar(props) {
  return (
    <div>
      <header>PengguinTv</header>
      <AppBar
        elevation={10}
        position="fixed"
        color="transparent"
        sx={{ backdropFilter: 'blur(60px)' }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            PengguinTV
          </Typography>

          <input
            // ref={input}
            placeholder=" Search ..."
            value={props.value}
            onChange={(event) => props.setSearchTerm(event.target.value)}
            style={{
              marginLeft: 'auto',
              width: 500,
              backgroundColor: 'white',
              opacity: 0.7,
              height: 45,
              fontSize: 17,
              borderRadius: 45,
              padding: 10,
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
