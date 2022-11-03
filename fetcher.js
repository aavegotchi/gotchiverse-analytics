import {
  getAlchemicaTotalSupplyDiff,
  getAlchemicaTotalSupplyFromBlock,
} from "./fetcher/alchemica";
import { getGotchis, getGotchisDiff } from "./fetcher/gochis";
import { getGrass } from "./fetcher/grass";
import { getFakeCards, getFakeGotchis } from "./fetcher/fakegotchis";
import { INTERVAL_ALL, INTERVAL_DAY } from "./fetcher/helper/constats";
import { getRugs } from "./fetcher/rugs";
import { getStatsDiff } from "./fetcher/stats";

export default async function Fetcher(url) {
  let urlParts = url.split("/");
  let asTimeSeries = false;
  if (urlParts[5] == "series") {
    asTimeSeries = true;
  }

  if (url == "/api/alchemica/supply") {
    return getAlchemicaTotalSupplyDiff();
  }
  if (url == "/api/gotchiverse/stats") {
    return getStatsDiff();
  }
  if (url == "/api/gotchis/stats") {
    return getGotchis();
  }

  if (url == "/api/grass") {
    return getGrass();
  }

  if (url == "/api/rugs") {
    return getRugs();
  }

  if (url == "/api/fakeGotchis") {
    return getFakeGotchis();
  }

  if (url == "/api/fakeGotchis/cards") {
    return getFakeCards();
  }

  if (urlParts[1] !== "api") {
    return false;
  }

  if (
    !["alchemica", "gltr", "wallets", "gotchis", "gotchiverse"].includes(
      urlParts[2]
    )
  ) {
    return false;
  }
  let fetchMethod = getCategoryMethod(urlParts[2], urlParts[3]);
  if (!fetchMethod) {
    return false;
  }

  let interval = INTERVAL_ALL;
  if (urlParts[3]) {
    interval = INTERVAL_DAY * parseInt(urlParts[4].substring(-1));
  }

  const result = await fetchMethod(interval, asTimeSeries);
  return result;
}

function getCategoryMethod(category, attribute) {
  if (category == "alchemica" && attribute == "supply") {
    return getAlchemicaTotalSupplyDiff;
  } else if (category == "gotchiverse" && attribute == "stats") {
    return getStatsDiff;
  } else if (category == "gotchis" && attribute == "stats") {
    return getGotchisDiff;
  }

  return false;
}
