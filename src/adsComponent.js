import React, { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-cr-1p+4i-cp+1l"
        data-ad-client="ca-pub-2041686233914582"
        data-ad-slot={dataAdSlot}
      ></ins>
    </>
  );
};

export default AdsComponent;
