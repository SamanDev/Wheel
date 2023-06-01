import React, { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  return (
    <>
      <amp-ad
        width="100vw"
        height="320"
        type="adsense"
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8671523665871932"
        data-ad-slot={dataAdSlot}
        data-auto-format="rspv"
        data-full-width=""
      >
        <div overflow=""></div>
      </amp-ad>
    </>
  );
};

export default AdsComponent;
