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
moment.locale("pt-br");
const EventItem = ({ events }) => (
  <Fragment>
    {events.map((element, key) => {
      return (
        <BoxItem key={key}>
          <DotIcon />
          <TimeLine />
          <BodyItem>
            <ItemRowInfo>
              <DateSpamBaloon>
                {`${moment(element.timestamp)
                  .locale("pt-BR")
                  .format("DD/MM/YYYY")}
                  ${moment(element.timestamp).format("HH:mm")}`}
              </DateSpamBaloon>
              <ValueSpamBaloon>
                R${" "}
                {parseFloat(element.revenue)
                  .toFixed(2)
                  .replace(".", ",")}
              </ValueSpamBaloon>
              <LabelSimple>{element.store}</LabelSimple>
            </ItemRowInfo>
            <TableItem>
              <tbody >
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                </TableRow>
                {element.products.map((p, key) => {
                  return (
                    <TableRow key={key}>
                      <TableData>{p.name}</TableData>
                      <TableData>R$ {p.price.replace(".", ",")}</TableData>
                    </TableRow>
                  );
                })}
              </tbody>
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
