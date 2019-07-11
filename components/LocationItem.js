import { Box, Image, Text, Grid } from "grommet";
import React from "react";
import styled from "styled-components";

import { CaretDown } from "grommet-icons";

const DownVote = styled(CaretDown)`
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const LocationItemContainer = styled(Grid)`
  margin-bottom: 1rem;
  border: 1px solid #7d4cdb;
  border-radius: 10px;
  padding: 1rem;
`;

class LocationItem extends React.Component {

  render() {
    const { location, incDownVote, downVoted } = this.props;

    return (
      <LocationItemContainer
        margin="1rem"
        rows={["small"]}
        alignContent="start"
        columns={["xsmall", "fit", "fit", "fit", "fit", "fit"]}
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
          <Text size="large" margin="xsmall">
            {location.address.city}
          </Text>
          <Text size="small" margin="xsmall">
            {location.address.country} 🇻🇳
          </Text>
        </Box>

        <Box gridArea="right" className="Location-right">
          <Box className="LocationStat" direction="row">
            <Text>💩</Text>
            <Text>{location.downVoteCount}</Text>
          </Box>
          <DownVote
            color={downVoted ? 'purple' : 'black'}
            onClick={() => {
              if (!downVoted) {
                incDownVote(location.id);
              }
            }}
          />
        </Box>
      </LocationItemContainer>
    );
  }
}

export default LocationItem;
