import React from "react";
import fire from "../helpers/fire";
import Header from "../components/Header";
import LocationsList from "../components/LocationsList";
import Layout from "../components/MyLayout";
import Search from "../components/Search";

const hereToFirebaseId = hereId => hereId.replace(/\./g, "");

class Index extends React.Component {
  state = Object.freeze({
    firebaseInit: false,
    loading: false,
    err: undefined,
    locations: [],
    locationsFromThisSession: [],
    locationSortType: 0
  });

  async initFireDB() {
    this.setState({ loading: true });
    this.fireDB = await fire();
    this.setState({ firebaseInit: true, loading: false });
    this.initLocationListener();
  }

  componentWillMount() {
    this.initFireDB();
  }

  initLocationListener(locationSortType = 0) {
    this.setState({ loading: true });

    if (locationSortType === 0) {
      this.dbRef = this.fireDB.ref("locations").orderByChild("createdAt");
    } else {
      this.dbRef = this.fireDB.ref("locations").orderByChild("downVoteCount");
    }
    // https://firebase.google.com/docs/reference/js/firebase.database.Query

    this.dbRef.on("value", snapshot => {
      const locations = [];
      snapshot.forEach(childSnapshot => {
        const location = childSnapshot.val();

        if (locationSortType !== 2) {
          locations.unshift(location);
        } else {
          locations.push(location);
        }
      });
      this.setState({ locations, loading: false });
    });
  }

  incDownVote(id) {
    this.setState({ loading: true });
    const locationRef = this.fireDB.ref(`locations/${id}`);

    locationRef
      .once("value")
      .then(snapshot => {
        const downVoteCount = snapshot.val().downVoteCount;
        snapshot.ref.update({ downVoteCount: downVoteCount + 1 });
      })
      .then(() => {
        this.setState({ loading: false, locationsFromThisSession: [id, ...this.state.locationsFromThisSession] });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  async fetchUnsplashImage(query) {
    const ACCESS_KEY =
      "72e26a09a2d8c2615b1a52c5b1ace1b4cdccac44d4a86aebddcaded56e53e958";

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
      !unsplashImage.errors &&
      unsplashImage.results &&
      unsplashImage.results[0]
    ) {
      unsplashData = unsplashImage.results[0];
    }

    const todaysDate = JSON.stringify(new Date());

    this.fireDB
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

    this.setState({ loading: true });
    this.fireDB.ref(`locations/${id}`).once("value", snapshot => {
      if (!snapshot.exists()) {
        this.addShit(location, id);
        // const email = snapshot.val();
      } else {
        // do some other shit
        this.setState({ loading: false });
      }
    });
  }

  switchLocationSortType(locationSortType) {
    this.setState({ locationSortType });
    this.dbRef.off("value");
    this.initLocationListener(locationSortType);
  }

  render() {
    const { loading, locations, locationSortType, locationsFromThisSession } = this.state;

    return (
      <Layout>
        <Header>
          <Search selectLocation={location => this.selectLocation(location)} />
        </Header>
        <LocationsList
          loading={loading}
          locations={locations}
          locationsFromThisSession={locationsFromThisSession}
          incDownVote={id => this.incDownVote(id)}
          locationSortType={locationSortType}
          switchLocationSortType={idx => this.switchLocationSortType(idx)}
        />
      </Layout>
    );
  }
}
export default Index;
