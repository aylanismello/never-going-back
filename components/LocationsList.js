import React from "react";
import styled from "styled-components";
import {
 Heading, Box, Image, InfiniteScroll, Text, Grid, Tabs, Tab
} from "grommet";
import { CaretDown } from "grommet-icons";

const DownVote = styled(CaretDown)`
  /* background: red; */
  &:hover {
    cursor: pointer;
  }
`;

const tabs = {
  recent: 0,
  worst: 1,
  best: 2
};

export default ({
  locations,
  incDownVote,
  locationSortType,
  switchLocationSortType
}) => (
  <Box className="LocationsList">
    <Tabs
      alignSelf="start"
      onActive={idx => switchLocationSortType(idx)}
      activeIndex={locationSortType}
    >
      {Object.keys(tabs).map((tab, idx) => (
        <Tab title={tab} />
      ))}
    </Tabs>
    <InfiniteScroll items={locations}>
      {location => (
        <Grid
          rows={["small"]}
          columns={["small", "small", "small", "small", "small", "small"]}
          gap="small"
          className="Location"
          areas={[
            { name: "left", start: [0, 0], end: [1, 0] },
            { name: "center", start: [1, 0], end: [4, 0] },
            { name: "right", start: [4, 0], end: [6, 0] }
          ]}
        >
          <Box
            gridArea="left"
            className="Location-left"
            height="small"
            width="small"
          >
            <Image
              fit="cover"
              src={
                location.unsplashData
                  ? location.unsplashData.urls.small
                  : "https://images.unsplash.com/photo-1521137959136-6bc78e585f23?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzNTU1fQ"
              }
            />
          </Box>

          <Box gridArea="center" className="Location-center">
            <Heading margin="xsmall">{location.address.city}</Heading>
            <Heading size="small" margin="xsmall">
              {location.address.country}
            </Heading>
          </Box>

          <Box gridArea="right" className="Location-right">
            <Box className="LocationStat" direction="row">
              <Text>💩</Text>
              <Text>{location.downVoteCount}</Text>
            </Box>
            <DownVote onClick={() => incDownVote(location.id)} />
          </Box>
        </Grid>
      )}
    </InfiniteScroll>
  </Box>
);
