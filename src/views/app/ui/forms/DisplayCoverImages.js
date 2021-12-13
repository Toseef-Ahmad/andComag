import { Card } from 'reactstrap';
import React from 'react';
// import { app } from './firebase'
// import { getDatabase, ref, child, get } from "firebase/database";
// import { getDatabase, ref, onValue, remove} from "firebase/database";
import {Paper, List, ListItem, ListItemAvatar, Avatar, Grid, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import firebase from "firebase";


const DisplayCoverImages = () => {
  const [images, setImages ] = React.useState({});
  const fetchData = () => {
    /* its working */
    // const db = getDatabase();
    // const starCountRef = ref(db, 'design/frontCoverImages');
    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     setImages(data)
    // });

    /* its trying of version 8*/
    const dbRef = firebase.database().ref();
    dbRef.child("design/frontCoverImages").on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
        setImages(data)
      } else {
        console.log("No data available");
      }
    })
  }

  React.useEffect(async () => {
    await fetchData();
  }, []);

  const displayImages = () => {
    const imgArr = [];
    for (let i in images) {
      for (let j in images[i]) {
        imgArr.push({key: i, img: images[i][j]});

      }
    }
    return imgArr;
  }

  const handleClickDeleteIcon = (key) => {
    const database = firebase.database();

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this CoverPhoto!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // remove(ref(database, 'design/frontCoverImages/' + key))
        firebase.database().ref(`design/frontCoverImages/${key}`).remove();
        swal('Poof! Your CoverPhoto has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your CoverPhoto is safe!');
      }
    });
  }

  // eslint-disable-next-line no-undef
  const themeColor = theme.split('.')[0];

  return (
    <>
      <Grid  container style={{ justifyContent: 'center', margin: '50px 0' }} >
        <Grid item xs={11} md={8} lg={8}>
          {/* eslint-disable-next-line no-undef */}
          <Paper sx={{backgroundColor: themeColor === 'dark' ? '#1E2021' : 'white'}} elevation={5}>
            <List>
              {
                displayImages().map(img => (
                  <ListItem>
                    <Avatar sx={{ width: 200, height: 200 }} src={img.img}/>
                    <div style={{flexGrow: 0.8}}/>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleClickDeleteIcon(img.key)}

                    >
                      <DeleteIcon sx={{'&:hover': {color: 'maroon'}, color: themeColor === 'dark' ? 'white' : 'gray'}}/>
                    </IconButton>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default DisplayCoverImages;