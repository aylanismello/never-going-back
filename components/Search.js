import React from "react";
import Autosuggest from "react-autosuggest";
import styled from 'styled-components';
import { TextInput } from "grommet";

const displayName = ({ address }) => `${address.city}, ${address.country}`;
const getSuggestionValue = suggestion => displayName(suggestion);
const renderSuggestion = suggestion => <div>{displayName(suggestion)}</div>;

const SearchContainer = styled.div`
  padding-top: 50px;
`;

const MyTextInput = styled(TextInput)`
  background: white;
  color: black;
`;


const renderInputComponent = inputProps => (
  <MyTextInput
    placeholder={inputProps.placeholder}
    value={inputProps.value}
    onChange={inputProps.onChange}
    suggestions={inputProps.suggestions}
    onSelect={inputProps.onSelect}
  />
);

const HERE_APP_ID = "gvZ0Fy1G2AZLJnie8pKD";
const HERE_APP_CODE = "eZls3Ajl13rU8YRAdSHdtQ";


class Search extends React.Component {
  state = Object.freeze({
    value: "",
    locationSuggestions: [],
    loading: false
  });

  static async fetchSuggestions(query) {
    // https://developer.here.com/documentation/geocoder-autocomplete/topics/quick-start-get-suggestions.html

    const res = await fetch(`
      https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${HERE_APP_ID}&app_code=${HERE_APP_CODE}&query=${query}&resultType=areas
    `);
    const data = await res.json();
    const { suggestions } = data;
    if (!suggestions) return [];
    return suggestions.filter(suggestion => suggestion.matchLevel === "city");
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      locationSuggestions: []
    });
  }

  async onSuggestionsFetchRequested({ value }) {
    // if (this.state.loading) return;
    this.setState({ loading: true });
    const locationSuggestions = await Search.fetchSuggestions(value);

    this.setState({
      locationSuggestions,
      loading: false
    });
  }

  onSuggestionSelected(suggestion) {
    this.setState({ value: suggestion });
    const location = this.state.locationSuggestions.filter(loc => displayName(loc) === suggestion)[0];
    this.props.selectLocation(location);  
  }

  render() {
    const { locationSuggestions, value } = this.state;
    const inputProps = {
      placeholder: "📍 Search places",
      value,
      onChange: this.onChange,
      suggestions: locationSuggestions.map(loc => displayName(loc)),
      onSelect: ({ suggestion }) => {
        this.onSuggestionSelected(suggestion);
      }
    };

    return (
      <SearchContainer>
        <Autosuggest
          suggestions={locationSuggestions}
          onSuggestionsFetchRequested={e =>
            this.onSuggestionsFetchRequested(e)
          }
          onSuggestionsClearRequested={e =>
            this.onSuggestionsClearRequested(e)
          }
          onSuggestionSelected={(e, s) => this.onSuggestionSelected(e, s)}
          getSuggestionValue={s => getSuggestionValue(s)}
          renderSuggestion={s => renderSuggestion(s)}
          renderSuggestionsContainer={() => null}
          renderInputComponent={daProps => renderInputComponent(daProps)}
          inputProps={inputProps}
        />
      </SearchContainer>
    );
  }
}
export default Search;
