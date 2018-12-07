import React, { Component } from "react";
import EventItem from "./components/Events";
import { GET_EVENT_ITENS } from "./config/Urls";
import axios from "axios";
import { MainBox,Label } from "./shared/style";
import { ErrorRequest, RequestNull } from "./shared/LabelConst";
require('./app.css')
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
          if(response.data.events.length>0){
          let eventsOrdered = this.orderByDate(response.data.events);
          let events = this.filterAndGroupEvents(eventsOrdered);        
          this.setState({ events });
          }else{
            this.setState({message:RequestNull})
          }
        }
      })
      .catch(err => {
        this.setState({message:ErrorRequest})
      });
  }

  orderByDate(events) {
    let ordered = events.sort((a, b) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      return 0;
    });
    return ordered;
  }

  filterAndGroupEvents(events) {
    let purchases = events.filter(b => b.event === "comprou");
    let products = events.filter(b => b.event === "comprou-produto"); 
    let events_filtered = []  
    purchases.forEach(purchase => {
      purchase.products = [];
      let { value } = purchase.custom_data.find(l => l.key === "transaction_id");      
      let store = purchase.custom_data.find(l => l.key === "store_name");
      purchase.store = store.value      
      products.forEach(product => {
        var produto = {};
        if (product.custom_data.find(m => m.key === "transaction_id" && m.value === value)) {
          let name = product.custom_data.find(o => o.key === "product_name");
          let price = product.custom_data.find(o => o.key === "product_price");         
          produto.name = name.value;
          produto.price = parseFloat(price.value).toFixed(2);        
          purchase.products.push(produto);
        }
      });
      delete purchase.custom_data;
      events_filtered.push(purchase);
    });  
    return events_filtered
  }

  render() {   
    return (
      <MainBox>        
        {Array.isArray(this.state.events) ? (
          <EventItem events={this.state.events} />
        ) : <Label>{this.state.message}</Label>}
      </MainBox>
    );
  }
}

export default App;
