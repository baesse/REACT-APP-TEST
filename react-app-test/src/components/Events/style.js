import styled from "styled-components";

export const BoxItem = styled.div`
  width: 20%;
  height: 300px;
  display: flex;
  justify-content: space-between; 
  margin-left:20px;
  
`;
export const BodyItem = styled.div`
  margin-top:5%;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  margin-left:10px
`;

export const ItemRowInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const DateSpamBaloon = styled.span`
  background-color: #dddddd;
  padding: 10px;
  border-radius: 50px;
  color: #b7b7b7;
`;

export const ValueSpamBaloon = styled.span`
  background-color: #f0ca5e;
  padding: 10px;
  border-radius: 50px;
  color: white;
`;

export const LabelSimple = styled.span`
  font-size: 18px;
`;

export const TableItem = styled.table`
  background-color: #dddddd;
  border-radius: 10px;
  width: 100%;
  border-spacing: 5px;
`;

export const TableRow = styled.tr`
  border-bottom: 1pt solid black;
`;
export const TableHead = styled.th`
  border-bottom: 1px solid #cdcdcd;
  text-align: left;
`;

export const TableData = styled.td`
  border-bottom: 1pt solid #cacaca;
`;

export const TimeLine = styled.div`
  height: 100%;
  width: 8px;
  background-color: #00b637;
  margin-left: 5%;
  margin-right: 5%;
`;

export const DotIcon = styled.span`
  width: 30px;
  height: 100px;
  background: radial-gradient(
    circle closest-side,
    white 0%,
    white 74%,
    white 76%,
    #00b637 98%,
    rgba(0, 0, 0, 0) 100%
  );
  display: block;
  z-index: 2;
  margin-right:-9%;
  margin-top: -20%
`;
