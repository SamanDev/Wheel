import React, { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  return (
    <>
      <amp-ad
        layout="fixed"
        width="415"
        height="320"
        type="adsense"
        data-ad-client="ca-pub-3130483322710260"
        data-ad-slot={dataAdSlot}
      ></amp-ad>
    </>
  );
};

export default AdsComponent;
