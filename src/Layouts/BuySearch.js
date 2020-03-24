import React, { Component, Fragment } from "react";
import { Header } from "../Containers";
import Helmet from "react-helmet";
import { Grid, Typography } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const style = {
  GridColor: { color: "#003366" },
  HomeHeader: { font: "Roboto", color: "white", marginTop: 10 },
  Paragraph: { font: "Times New Roman", color: "white", fontStyle: "italic" },
  SearchBox: { width: 1000, height: 60 }
};

class BuySearch extends Component {
  state = {
    searchText: "",
    listOfItems: []
  };

  handleSearchChange = event => {
    this.setState({ searchText: event });
  };

  handleSearch = async () => {
    let requestString = "/apis/get/buy:" + this.state.searchText;
    const response = await fetch(requestString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      this.setState({ listOfItems: response.json() });
    }
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <style>{"body { background-color: #003366;}"}</style>
          <title>Search an Item to Buy</title>
        </Helmet>
        <Header />
        <Grid
          container
          spacing={8}
          direction="column"
          justify="center"
          alignItems="center"
          style={style.GridColor}
        >
          <Grid item xs={12} md={12}>
            <Typography style={style.HomeHeader} variant="h2">
              Blink Exchange
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <MuiThemeProvider>
              <SearchBar
                value={this.state.searchText}
                onChange={this.handleSearchChange}
                style={style.SearchBox}
                onRequestSearch={this.handleSearch}
              />
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default BuySearch;
