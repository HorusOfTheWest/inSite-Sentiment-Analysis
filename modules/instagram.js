"use strict";

import data1 from "../json-files/instagram/top/Aboriginal_top_hashtag.json" assert { type: "json" };

import data2 from "../json-files/instagram/top/MMIWG_top_hashtag.json" assert { type: "json" };
import data3 from "../json-files/instagram/top/MMIW_top_hashtag.json" assert { type: "json" };
import data4 from "../json-files/instagram/top/FirstNations_top_hashtag.json" assert { type: "json" };
import data5 from "../json-files/instagram/top/indigenouspeople_top_hashtag.json" assert { type: "json" };
import data6 from "../json-files/instagram/top/IndigenousPeoplesDay_top_hashtag.json" assert { type: "json" };
import data7 from "../json-files/instagram/top/indigenouswoman_top_hashtag.json" assert { type: "json" };
import data8 from "../json-files/instagram/top/indigenouswomen_top_hashtag.json" assert { type: "json" };
import data9 from "../json-files/instagram/top/IdleNoMore_top_hashtag.json" assert { type: "json" };
import data10 from "../json-files/instagram/top/Indigenous_top_hashtag.json" assert { type: "json" };
import data11 from "../json-files/instagram/top/indigenouscanadian_top_hashtag.json" assert { type: "json" };
import data12 from "../json-files/instagram/top/Mikmaq_top_hashtag.json" assert { type: "json" };
import data13 from "../json-files/instagram/top/NativeAmerican_top_hashtag.json" assert { type: "json" };
import data14 from "../json-files/instagram/top/nomorestolensisters_top_hashtag.json" assert { type: "json" };
import data15 from "../json-files/instagram/top/Reconciliation_top_hashtag.json" assert { type: "json" };
import data16 from "../json-files/instagram/top/TAIRP_top_hashtag.json" assert { type: "json" };
import data17 from "../json-files/instagram/top/trailoftears_top_hashtag.json" assert { type: "json" };
import data18 from "../json-files/instagram/top/TRC_top_hashtag.json" assert { type: "json" };
import data19 from "../json-files/instagram/top/treatyrights_top_hashtag.json" assert { type: "json" };
import data20 from "../json-files/instagram/top/indigenouscanada_top_hashtag.json" assert { type: "json" };

const dataArr = [
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  data14,
  data15,
  data16,
  data17,
  data18,
  data19,
  data20,
];

const hashtagNames = [
  "Aboriginal",
  "MMIWG",
  "MMIW",
  "FirstNations",
  "IndigenousPeople",
  "IndigenousPeoplesDay",
  "IndigenousWoman",
  "IndigenousWomen",
  "IdleNoMore",
  "Indigenous",
  "IndigenousCanadian",
  "Mikmaq",
  "NativeAmerican",
  "NoMoreStolenSisters",
  "Reconciliation",
  "TAIRP",
  "TrailOfTears",
  "TRC",
  "TreatyRights",
  "IndigenousCanada",
];

const instagramData = {
  dataArr,
  hashtagNames,
};

export default instagramData;
