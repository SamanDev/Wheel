import React, { useState, useEffect } from "react";
import { Table, Statistic, Label } from "semantic-ui-react";

import { Button, Image, Card } from "semantic-ui-react";
import Mod from "./modal";
import ListService from "./services/list.service";
import EventBus from "./common/EventBus";
import Product from "./product";

const TableExampleSingleLine = (prop) => {
  const [lastList, setlastList] = useState([]);

  return (
    <Card.Group>
      <Product
        header="کارت هدیه دیجی کالا به ارزش 10.000.000 تومان"
        fee={"80,000,000"}
        image="https://dkstatics-public.digikala.com/digikala-products/9c5bf631d7f0ff12b20f13a1676c56ae08635a4b_1676754033.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
      />
      <Product
        header="کارت هدیه دیجی کالا به ارزش 5.000.000 تومان"
        fee={"50,000,000"}
        image="https://dkstatics-public.digikala.com/digikala-products/10191a4c1db34f89dcc0a933f3f86bf69ee4eed2_1676753477.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
      />
      <Product
        header="کارت هدیه دیجی کالا به ارزش 2.000.000 تومان"
        fee={"30,000,000"}
        image="https://dkstatics-public.digikala.com/digikala-products/d07b1fe102c85f03b7800cc0755b0b0d04e1caab_1676752903.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
      />
    </Card.Group>
  );
};

export default TableExampleSingleLine;
