/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { Heading, Box, Image } from "grommet";
import fire from '../helpers/fire';
import Layout from "../components/MyLayout";
import Search from "../components/Search";

const hereToFirebaseId = hereId => hereId.replace(/\./g, "");

class Index extends React.Component {
  state = Object.freeze({
    loading: false,
    err: undefined,
    locations: []
  });

  componentWillMount() {
    this.setState({ loading: true });
    this.dbRef = fire
      .ref("locations")
      .orderByChild("createdAt");
    // https://firebase.google.com/docs/reference/js/firebase.database.Query

    this.dbRef.on("value", snapshot => {
      const locations = [];
      snapshot.forEach(childSnapshot => {
        // to 'reverse' the list
        locations.unshift(childSnapshot.val());
      });
      this.setState({ locations, loading: false });
    });
  }

  async fetchUnsplashImage(query) {
    const ACCESS_KEY =      "72e26a09a2d8c2615b1a52c5b1ace1b4cdccac44d4a86aebddcaded56e53e958";

    const res = await fetch(`
      https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=1&per_page=1&query=${query}
    `);

    const data = await res.json();
    return data;
  }

  async addShit(location, id) {
    this.setState({ loading: true });
    const unsplashImage = await this.fetchUnsplashImage(location.address.city);
    let unsplashData = {};

    if (
      !unsplashImage.errors
      && unsplashImage.results
      && unsplashImage.results[0]
    ) {
      unsplashData = unsplashImage.results[0];
    }

    const todaysDate = JSON.stringify(new Date());

    fire
      .ref(`locations/${id}`)
      .set({
        ...location,
        id,
        displayName: `${location.address.city}, ${location.address.country}`,
        createdAt: todaysDate,
        updatedAt: todaysDate,
        downVoteCount: 0,
        unsplashData
      })
      .then(success => {
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false, err });
      });
  }

  selectLocation(location) {
    // if it exists, let the user know
    // if it does not, then get unsplash image url
    // then write that url and the rest to firebase
    // then let user know that it's done

    // stackoverflow.com/questions/37910008/check-if-value-exists-in-firebase-db
    const { locationId } = location;
    const id = hereToFirebaseId(locationId);
    console.log(locationId);
    console.log(id);

    this.setState({ loading: true });
    fire
      .ref(`locations/${id}`)
      .once("value", snapshot => {
        if (!snapshot.exists()) {
          this.addShit(location, id);
          // const email = snapshot.val();
        } else {
          // do some other shit
          this.setState({ loading: false });
        }
      });
  }

  render() {
    const { loading, locations } = this.state;

    return (
      <Layout>
        <h1>Suggested Locations</h1>
        {loading ? <p>loading</p> : <p>we good</p>}
        <Search selectLocation={s => this.selectLocation(s)} />
        {locations.map(location => (
          <Box>
            <Box height="small" width="small">
              <Image
                fit="cover"
                src={
                  location.unsplashData
                    ? location.unsplashData.urls.small
                    : "https://images.unsplash.com/photo-1521137959136-6bc78e585f23?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzNTU1fQ"
                }
              />
            </Box>
            <Box>
              <Heading margin="xsmall">{location.address.city}</Heading>
              <Heading size="small" margin="xsmall">
                {location.address.country}
              </Heading>
            </Box>
          </Box>
        ))}
      </Layout>
    );
  }
}
export default Index;
