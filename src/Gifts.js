import React from "react";

import { Card } from "semantic-ui-react";
import Product from "./product";

const TableExampleSingleLine = (prop) => {
  return (
    <Card.Group>
      <Product
        header="Digikala Gift Cart 500,000T"
        fee={"80,000"}
        image="https://dkstatics-public.digikala.com/digikala-products/9c5bf631d7f0ff12b20f13a1676c56ae08635a4b_1676754033.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
      />
      <Product
        header="Apple Store Gift Cart 10$"
        fee={"80,000"}
        image="https://dkstatics-public.digikala.com/digikala-products/10191a4c1db34f89dcc0a933f3f86bf69ee4eed2_1676753477.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
      />
      <Product
        header="Googele Play Gift Cart 10$"
        fee={"80,000"}
        image="https://dkstatics-public.digikala.com/digikala-products/d07b1fe102c85f03b7800cc0755b0b0d04e1caab_1676752903.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
      />
    </Card.Group>
  );
};

export default TableExampleSingleLine;
