import React from "react";
import ReactLoading from "react-loading";

import {
  Box,
  InfiniteScroll,
  Tabs,
  Tab
} from "grommet";
import LocationItem from "./LocationItem";

const MyLoading = () => (
  <Box
    animation="fadeIn"
    direction="row"
    justify="center"
    height="60vh"
    align="center"
  >
    <ReactLoading type="cylon" color="#7D4CDB" height="7%" width="7%" />
  </Box>
);

const tabs = {
  recent: 0,
  worst: 1,
  best: 2
};

export default ({
  locations,
  incDownVote,
  locationSortType,
  switchLocationSortType,
  loading,
  locationsFromThisSession
}) => (
  <Box className="LocationsList" style={{ marginTop: "1rem" }}>
    <Tabs
      alignSelf="start"
      onActive={idx => switchLocationSortType(idx)}
      activeIndex={locationSortType}
    >
      {Object.keys(tabs).map((tab, idx) => (
        <Tab title={tab} />
      ))}
    </Tabs>
    {loading ? (
      <MyLoading />
    ) : (
      <InfiniteScroll items={locations}>
        {location => (
          <LocationItem
            location={location}
            downVoted={locationsFromThisSession.includes(location.id)}
            incDownVote={id => incDownVote(id)}
          />
        )}
      </InfiniteScroll>
    )}
  </Box>
);
