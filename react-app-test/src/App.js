import React, { Component } from "react";
import EventItem from "./components/Events";
import { GET_EVENT_ITENS } from "./config/Urls";
import axios from "axios";
import { MainBox } from "./shared/style";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    this.getEvents();
  }

  async getEvents() {
    axios
      .get(GET_EVENT_ITENS)
      .then(response => {
        if (Array.isArray(response.data.events)) {
          let eventsOrdered = this.orderByDate(response.data.events);
          let events = this.filterAndGroupEvents(eventsOrdered);
          this.setState({ events });
        }
      })
      .catch(err => {});
  }

  orderByDate(events) {
    let ordered = events.sort((a, b) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      return 0;
    });
    return ordered;
  }

  groupProducts(events, value) {
    let itenName = events.reduce(
      (prev, next) =>
        prev.concat(
          next.custom_data
            .filter(
              t =>
                t.key == "product_name" &&
                next.custom_data.find(e => e.value == value)
            )
            .sort()
        ),
      []
    );
    let itenprice = events.reduce(
      (prev, next) =>
        prev.concat(
          next.custom_data
            .filter(
              t =>
                t.key == "product_price" &&
                next.custom_data.find(e => e.value == value)
            )
            .sort()
        ),
      []
    );
    let products = [];
    itenName.forEach((e, indice) => {
      let product = { name: e.value };
      product.price = parseFloat(itenprice[indice].value).toFixed(2);
      products.push(product);
    });
    return products;
  }

  filterAndGroupEvents(events) {
    let mainTransation = [];
    events.forEach((e, j) => {
      if (e.event === "comprou") {
        var { value } = e.custom_data.find(t => t.key == "transaction_id");
        mainTransation.push({
          totalPurchase: parseFloat(e.revenue).toFixed(2),
          date: e.timestamp,
          products: this.groupProducts(events, value, j),
          store: ({ value } = e.custom_data.find(t => t.key == "store_name"))
        });
      }
    });
    return mainTransation;
  }

  render() {
   
    return (
      <MainBox>
        {" "}
        {Array.isArray(this.state.events) ? (
          <EventItem events={this.state.events} />
        ) : null}
      </MainBox>
    );
  }
}

export default App;
