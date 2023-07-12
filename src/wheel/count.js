import React, { useState, useEffect } from "react";
import $ from "jquery";
import { segments, getcolor } from "../utils/include";
import EventBus from "../common/EventBus";
import ModalAds from "../modalvideofast";
import { useWheel } from "../hooks/user.hooks";
var timer;

function checkbox() {
  if ($("#cadr2:visible").length) {
    $("#cadr").show();
    $("#cadr2").hide();
  } else {
    $("#cadr2").show();
    $("#cadr").hide();
  }
}
var lighter;

const updateWheelborder = (wheel) => {
  if (!wheel?.status) return false;
  var colornum = getcolor(segments[wheel?.number]);
  if (wheel?.status == "Spin") {
    colornum = "#000000";
  } else {
  }
  if (wheel?.status == "Pending") {
    colornum = getcolor(segments[wheel?.startNum]);
  }
  if ($(".mainwheel .bhdLno >div").length) {
    $(".mainwheel .bhdLno >div").css({
      border: "12px solid " + colornum + "",
    });
    if (wheel?.status == "Spin") {
      $(".mainwheel .bhdLno >div").css({
        border: "1px solid " + colornum + "",
      });
    }
  } else {
    setTimeout(() => {
      updateWheelborder(wheel);
    }, 1000);
  }
};
function CountWheel(prop) {
  const [time, setTime] = useState(1);

  const [openads, setOpenads] = useState(false);
  const [wheel] = useWheel();

  useEffect(() => {
    clearInterval(lighter);
    if (wheel?.status == "Pending") {
      setTime(0);
      clearTimeout(timer);
      mytime();
      updateWheelborder(wheel);
      lighter = setInterval(() => {
        checkbox();
      }, 1900);
    } else {
      setTime(0);
      clearTimeout(timer);
      updateWheelborder(wheel);

      if (wheel?.status == "Done") {
        if (
          segments[wheel?.number] == 0 ||
          segments[wheel?.number] == 20 ||
          segments[wheel?.number] == 25
        ) {
          $("#playButton").trigger("click");
        }
      }
    }
  }, [wheel?.status]);
  useEffect(() => {
    clearTimeout(timer);
    if (time >= 15) {
      if ($(".ws").html() == "") {
        if (wheel?.status != "Done") {
          clearInterval(lighter);
          lighter = setInterval(() => {
            checkbox();
          }, 800);
        }

        $(".mainwheel").addClass("mytrue");
        $(".ws").html("hi");
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
      if (Seconds_Between_Dates >= 0 && Seconds_Between_Dates <= 16) {
        setTime(parseInt(Seconds_Between_Dates));
        //console.log(Seconds_Between_Dates);

        timer = setTimeout(() => {
          mytime();
        }, 1000);
      }
    } else {
      timer = setTimeout(() => {
        mytime();
      }, 1000);
    }
  };
  if (!wheel?.status) {
    return (
      <div className="count" style={{ zIndex: 11, marginTop: -70 }}>
        <h2 className="text-shadows">wait</h2>
      </div>
    );
  }
  return (
    <>
      {15 - time > 0 && time > 0 && time < 15 && (
        <>
          <ModalAds open={openads} setOpen={setOpenads} />
          <div className="count" style={{ zIndex: 11, marginTop: -70 }}>
            <h2 className="text-shadows">{15 - time}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default CountWheel;
