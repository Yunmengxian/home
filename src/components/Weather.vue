<template>
  <div class="weather" v-if="weatherData.adCode.city && weatherData.weather.weather">
    <span>{{ weatherData.adCode.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{ formatDirection(weatherData.weather.winddirection) }}&nbsp;
    </span>
    <span class="sm-hidden">{{ formatPower(weatherData.weather.windpower) }}&nbsp;</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { getTXAdcode, getTXWeather, getGDAdcode, getGDAdcodeI, getGDWeather, getIPV4Addr, getOtherWeather, getHXHWeather } from "@/api";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";

const store = mainStore();
const txkey = import.meta.env.VITE_TX_WEATHER_KEY;
const gdkey = import.meta.env.VITE_GD_WEATHER_KEY;

const weatherData = reactive({
  adCode: { city: null, adcode: null },
  weather: { weather: null, temperature: null, winddirection: null, windpower: null },
});

const formatDirection = (d) => d?.endsWith("风") ? d : d + "风";
const formatPower = (p) => p?.endsWith("级") ? p : p + "级";

const getTemperature = (min, max) => {
  const a = parseFloat(String(min).replace(/[^\d.-]/g, ""));
  const b = parseFloat(String(max).replace(/[^\d.-]/g, ""));
  return isNaN(a) || isNaN(b) ? "NaN" : Math.round((a + b) / 2);
};

const showError = (msg) => {
  ElMessage({ message: msg, icon: h(Error, { theme: "filled", fill: "#efefef" }) });
};

const getTXW = async () => {
  const adCode = await getTXAdcode(txkey);
  if (String(adCode.status) !== "0") throw "地区查询失败";
  weatherData.adCode = {
    city: adCode.result.ad_info.district || adCode.result.ad_info.city || adCode.result.ad_info.province || "未知地区",
    adcode: adCode.result.ad_info.adcode,
  };
  const txWeather = await getTXWeather(txkey, weatherData.adCode.adcode);
  if (String(txWeather.status) !== "0") throw "天气信息获取失败";
  const infos = txWeather.result.realtime?.[0]?.infos;
  if (!infos) throw "天气信息获取失败";
  weatherData.weather = {
    weather: infos.weather,
    temperature: infos.temperature,
    winddirection: infos.wind_direction,
    windpower: infos.wind_power,
  };
};

const getGDW = async () => {
  const adCode = await getGDAdcode(gdkey);
  let getAd;
  if (String(adCode?.infocode) !== "10000" || String(adCode?.status) !== "1") {
    const ip = await getIPV4Addr();
    getAd = await getGDAdcodeI(ip.ip, gdkey);
    if (String(getAd?.infocode) !== "10000" || String(getAd?.status) !== "1") throw "地区查询失败";
  }
  const code = getAd || adCode;
  weatherData.adCode = { city: code.city || code.province || "未知地区", adcode: code.adcode };
  const result = await getGDWeather(gdkey, weatherData.adCode.adcode);
  if (String(result?.status) !== "1" || String(result?.infocode) !== "10000") throw "天气信息获取失败";
  weatherData.weather = {
    weather: result.lives[0].weather,
    temperature: result.lives[0].temperature,
    winddirection: result.lives[0].winddirection,
    windpower: result.lives[0].windpower,
  };
};

const getOW = async () => {
  const { result: data } = await getOtherWeather();
  weatherData.adCode = { city: data.city.City || "未知地区" };
  weatherData.weather = {
    weather: data.condition.day_weather,
    temperature: getTemperature(data.condition.min_degree, data.condition.max_degree),
    winddirection: data.condition.day_wind_direction,
    windpower: data.condition.day_wind_power,
  };
};

const getHXHW = async () => {
  const result = await getHXHWeather();
  if (String(result?.success) !== "true") throw "天气信息获取失败";
  const { data, city } = result;
  weatherData.adCode = { city: city || "未知地区" };
  weatherData.weather = {
    weather: data.type || data.night?.type,
    temperature: getTemperature(data.low || data.night?.low, data.high || data.night?.high),
    winddirection: data.fengxiang || data.night?.fengxiang,
    windpower: data.fengli || data.night?.fengli,
  };
};

const getWeatherData = async () => {
  try {
    if (!gdkey && !txkey) {
      try { await getHXHW(); } catch { await getOW(); }
    } else if (!txkey) {
      try { await getGDW(); } catch { try { await getHXHW(); } catch { await getOW(); } }
    } else if (!gdkey) {
      try { await getTXW(); } catch { try { await getHXHW(); } catch { await getOW(); } }
    } else {
      try { await getTXW(); } catch { try { await getGDW(); } catch { try { await getHXHW(); } catch { await getOW(); } } }
    }
  } catch (e) {
    console.error("天气信息获取失败:", e);
    showError("天气信息获取失败");
  }
};

onMounted(getWeatherData);
</script>
