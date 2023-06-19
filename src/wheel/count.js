import React, { useState, useEffect } from "react";
import $ from "jquery";
import { segments, getcolor } from "../utils/include";
import EventBus from "../common/EventBus";
import ModalAds from "../modalvideofast";
var timer;
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var degg = parseFloat(360 / segments.length / 2 - 1.21).toFixed(2);

//var rndd2 = parseFloat(getRandomArbitrary(degg * -1, degg)).toFixed(2);
function checkbox() {
  var c2 = $("#cadr").attr("src2");
  $("#cadr").attr("src2", $("#cadr").attr("src"));
  $("#cadr").attr("src", c2);
}
var lighter;
const updateWheel = (wheel, rndd, time) => {
  if (wheel?.status) {
    /*   if (wheel?.status == "Spin") {
    } else {
      if (wheel.status == "Pending") {
        if ($(".mainwheel .bhdLno canvas").attr("style")) {
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(wheel.startNum) * (360 / segments.length) + rndd
              ).toFixed(2) +
              "deg)",
            transitionDuration: "1s",
          });
        } else {
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(wheel.startNum) * (360 / segments.length) + rndd
              ).toFixed(2) +
              "deg)",
            transitionDuration: "1s",
          });
        }
      }
      if (wheel.status == "Done" || wheel.status == "Spining") {
        $(".mainwheel .bhdLno").removeClass("rotaslw");
        $(".ws").html("");
        if ($(".mainwheel .bhdLno canvas").attr("style")) {
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(wheel.number) * (360 / segments.length) + rndd
              ).toFixed(2) +
              "deg)",
            transitionDuration: "1s",
          });
        } else {
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(wheel.number) * (360 / segments.length) + rndd
              ).toFixed(2) +
              "deg)",
            transitionDuration: "1s",
          });
        }
      }
    } */
    updateWheelborder(wheel);
  }
};
const updateWheelborder = (wheel) => {
  if (!wheel?.status) return false;
  var colornum = getcolor(segments[wheel.number]);
  if (wheel?.status == "Spin") {
    colornum = "#000000";
  }
  if (wheel?.status == "Pending") {
    colornum = getcolor(segments[wheel.startNum]);
  }
  if ($(".mainwheel .bhdLno >div").length) {
    $(".mainwheel .bhdLno >div").css({
      border: "  10px solid " + colornum + "",
    });
  } else {
    setTimeout(() => {
      updateWheelborder(wheel);
    }, 1000);
  }
};
function CountWheel(prop) {
  const [time, setTime] = useState(0);
  const [rndd, setRndd] = useState(0);

  const [openads, setOpenads] = useState(false);
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });

    return () => {
      clearInterval(lighter);
      clearTimeout(timer);
      setWheel({});
      EventBus.remove("wheel");
    };
  }, []);

  useEffect(() => {
    if (wheel?.status == "Pending") {
      if (wheel?.startNum == 0) {
        setOpenads(true);
      }
      $(".mainwheel .bhdLno").removeClass("rotaslw");
      $(".ws").html("");
      clearInterval(lighter);
      lighter = setInterval(() => {
        checkbox();
      }, 2500);

      //setRndd(parseFloat(getRandomArbitrary(degg * -1, degg)).toFixed(2));
      $(".mainwheel").removeClass("mytrue");
    } else {
      $(".mainwheel").removeClass("mytrue");
    }
    if (wheel?.status == "Done") {
      $(".mainwheel .bhdLno").removeClass("rotaslw");
      $(".ws").html("");
    }

    if (wheel?.status) {
      mytime();
      updateWheel(wheel, parseFloat(rndd), time);
    }
  }, [wheel]);
  useEffect(() => {
    $(".bhdLno img").remove();
    clearTimeout(timer);
    if (time > 15) {
      if ($(".ws").html() == "") {
        if (wheel?.status != "Done") {
          var num =
            (wheel?.serverCode * wheel?.startNum +
              wheel?.serverCode * ((wheel?.serverSec + 30) % 60)) %
            segments.length;
          clearInterval(lighter);
          lighter = setInterval(() => {
            checkbox();
          }, 500);
        }
        if (
          wheel?.status == "Done" ||
          wheel.status == "Spining" ||
          wheel.status == "Spin"
        ) {
          var num = wheel?.number;
        }

        $(".chipps").addClass("animate__backOutRight");
        $(".mainwheel").addClass("mytrue");
        /* $(".mainwheel .bhdLno").addClass("rotaslw");
        $(".mainwheel .bhdLno canvas").removeAttr("style");
        $(".mainwheel .bhdLno canvas").css({
          transform:
            "rotate(-" +
            parseFloat(
              parseInt(num) * (360 / segments.length) + parseFloat(rndd)
            ).toFixed(2) +
            "deg)",
          transitionDuration: 40 - time + "s",
        });
        $(".ws").html(
          "<style>.rotaslw{animation-timing-function: cubic-bezier(0.1, -0.1, 0.001, 1);animation-name: loadingslow ;animation-duration:" +
            (40 - time) +
            "s  ;}@keyframes loadingslow {  0% { transform: rotate(-" +
            parseFloat(
              parseInt(wheel.startNum) * (360 / segments.length)
            ).toFixed(2) +
            "deg);  }  100% {  transform: rotate(-" +
            parseFloat((40 - time) * 360).toFixed(2) +
            "deg);     }</style>"
        ); */
      }
    }

    if (time <= 59) {
      timer = setTimeout(() => {
        mytime();
      }, 1000);
    }
  }, [time]);

  const mytime = () => {
    if (wheel?.status) {
      var t1 = new Date(wheel?.date);
      var t2 = new Date();
      var dif = t2.getTime() - t1.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

      setTime(parseInt(Seconds_Between_Dates));
    } else {
      timer = setTimeout(() => {
        mytime();
      }, 1000);
    }
  };
  if (!wheel?.status) {
    return (
      <div className="count">
        <h2 className="text-shadows">wait</h2>
      </div>
    );
  }
  return (
    <>
      <ModalAds open={openads} setOpen={setOpenads} />
      {15 - time >= 0 && time < 15 && (
        <>
          <div className="count" style={{ zIndex: 11, marginTop: -70 }}>
            <h2 className="text-shadows">{15 - time}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default CountWheel;
