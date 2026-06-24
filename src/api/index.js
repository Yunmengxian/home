/**
 * JSONP 请求模块
 */
const loadJSONP = (url, callbackName) => {
  return new Promise((resolve, reject) => {
    window[callbackName] = (data) => {
      resolve(data);
      delete window[callbackName];
    };
    const script = document.createElement("script");
    script.src = url;
    script.onerror = () => {
      reject(new Error("JSONP 请求失败"));
      delete window[callbackName];
    };
    document.body.appendChild(script);
  });
};

/**
 * 一言
 */
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

/**
 * 天气
 */
const buildTXUrl = (key, base, extra = "") =>
  `https://apis.map.qq.com/ws/${base}?key=${key}${extra}`;

export const getTXAdcode = async (key) => {
  const callback = `jsonp_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const url = `${buildTXUrl(key, "location/v1/ip")}&output=jsonp&callback=${callback}`;
  return await loadJSONP(url, callback);
};

export const getTXWeather = async (key, adcode) => {
  const callback = `jsonp_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const url = `${buildTXUrl(key, "weather/v1/")}&adcode=${adcode}&type=now&output=jsonp&callback=${callback}`;
  return await loadJSONP(url, callback);
};

export const getGDAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

export const getGDAdcodeI = async (ipv4, key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?ip=${ipv4}&key=${key}`);
  return await res.json();
};

export const getGDWeather = async (key, city) => {
  const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`);
  return await res.json();
};

export const getIPV4Addr = async () => {
  const res = await fetch("https://api4.ipify.org?format=json");
  return await res.json();
};

export const getHXHWeather = async () => {
  const res = await fetch("https://api.vvhan.com/api/weather");
  return await res.json();
};

export const getOtherWeather = async () => {
  const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
  return await res.json();
};
