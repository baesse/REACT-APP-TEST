import React, { Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  BoxItem,
  ItemRowInfo,
  DateSpamBaloon,
  ValueSpamBaloon,
  LabelSimple,
  TableItem,
  TableRow,
  TableData,
  TableHead,
  TimeLine,
  BodyItem,
  DotIcon
} from "./style";
moment.locale("pt-BR");
const EventItem = ({ events }) => (
  <Fragment>
    {events.map((element, key) => {
      return (
        <BoxItem>
          <DotIcon />
          <TimeLine />
          <BodyItem>
            <ItemRowInfo>
              <DateSpamBaloon>
                {moment(element.date)
                  .locale("pt-BR")
                  .format("DD/MM/YYYY")}
                {moment(element.date).format("HH:mm")}
              </DateSpamBaloon>
              <ValueSpamBaloon>R$ {element.totalPurchase}</ValueSpamBaloon>
              <LabelSimple>{element.store.value}</LabelSimple>
            </ItemRowInfo>
            <TableItem>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Preço</TableHead>
              </TableRow>
              {element.products.map(p => {
                return (
                  <tbody>
                    <TableRow>
                      <TableData>{p.name}</TableData>
                      <TableData>R$ {p.price}</TableData>
                    </TableRow>
                  </tbody>
                );
              })}
            </TableItem>
          </BodyItem>
        </BoxItem>
      );
    })}
  </Fragment>
);
EventItem.propTypes = {
  events: PropTypes.array.isRequired
};
export default EventItem;
