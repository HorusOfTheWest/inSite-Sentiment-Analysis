"use strict";

import data1 from "../json-files/tiktok/aboriginal_1645393273321.json" assert { type: "json" };

import data2 from "../json-files/tiktok/MMIWG_1645393936914.json" assert { type: "json" };
import data3 from "../json-files/tiktok/MMIW_1645393901810.json" assert { type: "json" };
import data4 from "../json-files/tiktok/firstnations_1645393389256.json" assert { type: "json" };
import data5 from "../json-files/tiktok/idigenouspeople_1645393794309.json" assert { type: "json" };
import data6 from "../json-files/tiktok/idigenouspeoplesday_1645393785342.json" assert { type: "json" };
import data7 from "../json-files/tiktok/idigenouswoman_1645393818200.json" assert { type: "json" };
import data8 from "../json-files/tiktok/idigenouswomen_1645393802717.json" assert { type: "json" };
import data9 from "../json-files/tiktok/idlenomore_1645393520113.json" assert { type: "json" };
import data10 from "../json-files/tiktok/indigenous_1645393611372.json" assert { type: "json" };
import data11 from "../json-files/tiktok/indigenouscanadian_1645393971675.json" assert { type: "json" };
import data12 from "../json-files/tiktok/mikmaq_1645393883807.json" assert { type: "json" };
import data13 from "../json-files/tiktok/nativeamerican_1645393957742.json" assert { type: "json" };
import data14 from "../json-files/tiktok/nomorestolensisters_1645393995708.json" assert { type: "json" };
import data15 from "../json-files/tiktok/reconciliation_1645394032780.json" assert { type: "json" };
import data16 from "../json-files/tiktok/tairp_1645394046317.json" assert { type: "json" };
import data17 from "../json-files/tiktok/trailoftears_1645394012647.json" assert { type: "json" };
import data18 from "../json-files/tiktok/trc_1645394061190.json" assert { type: "json" };
import data19 from "../json-files/tiktok/treatyrights_1645394078293.json" assert { type: "json" };
import data20 from "../json-files/tiktok/indigenouscanada_1645574539038.json" assert { type: "json" };

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

const tiktokData = {
  dataArr,
  hashtagNames,
};

export default tiktokData;
