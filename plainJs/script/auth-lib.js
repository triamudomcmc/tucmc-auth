function init() {
  const fp = FingerprintJS.load();

  fp.then((fp) => fp.get()).then((result) => {
    window.fingerPrint = result.visitorId;
  });
}

// syntax sugar for updating every element by class name
// Note: Proxies are an ES6 feature (and so are promises), so you may want to include a polyfill idk
const $c = (name) => {
  const selection = document.getElementsByClassName(name);
  if (!selection) return null;
  return new Proxy(
    {
      selected: selection,
      parentprops: null,
    },
    {
      get: function (obj, prop, receiver) {
        if (!selection) return null;
        if (prop === "selected") return obj.selected;

        // returns the value for everything except 'style' (style returns an object)
        const getValue = obj.parentprops
          ? obj.parentprops.reduce((acc, curr) => acc[curr], obj.selected[0])[prop]
          : obj.selected[0][prop];
        if (!(typeof getValue === "object" && getValue !== null && !Array.isArray(getValue))) {
          // if value isn't an object, return the value itself
          let result = [];
          for (let i = obj.selected.length - 1; i >= 0; i--) {
            if (obj.parentprops) result.push(obj.parentprops.reduce((acc, curr) => acc[curr], obj.selected[i])[prop]);
            else result.push(obj.selected[i][prop]);
          }
          return result;
        }

        if (obj.parentprops) obj.parentprops = Array.from(obj.parentprops).push(prop);
        else obj.parentprops = [prop];

        return receiver; // returns instance of proxy
      },
      set: function (obj, prop, newVal) {
        if (!selection) return null;

        for (let i = obj.selected.length - 1; i >= 0; i--) {
          obj.parentprops
            ? (obj.parentprops.reduce((acc, curr) => acc[curr], obj.selected[i])[prop] = newVal) // chaining properties
            : (obj.selected[i][prop] = newVal);
        }

        if (obj.parentprops) {
          obj.parentprops = null;
        }

        return true;
      },
    }
  );
};

class TUCMCAuth {
  constructor(TOKEN) {
    this.TOKEN = TOKEN;
    this.prevPop = null;
    window.addEventListener("load", () => {
      $c("tucmc-login").innerHTML = "Login with TUCMC";
      Array.from($c("tucmc-login").selected).forEach((elem) => {
        elem.addEventListener("click", () => {
          this.login();
        });
      });
    });
  }

  logout() {
    window.localStorage.setItem("data", "");
    window.location.reload();
  }

  _setLoading() {
    $c("tucmc-login").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; shape-rendering: auto;width: 40px; height: 26px" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid">\n' +
      '    <circle cx="84" cy="50" r="10" fill="#ffffff">\n' +
      '        <animate attributeName="r" repeatCount="indefinite" dur="0.7142857142857142s" calcMode="spline" keyTimes="0;1" values="10;0"\n' +
      '                 keySplines="0 0.5 0.5 1" begin="0s"/>\n' +
      '        <animate attributeName="fill" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"/>\n' +
      "    </circle>\n" +
      '    <circle cx="16" cy="50" r="10" fill="#ffffff">\n' +
      '        <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>\n' +
      '        <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>\n' +
      "    </circle>\n" +
      '    <circle cx="50" cy="50" r="10" fill="#ffffff">\n' +
      '        <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"/>\n' +
      '        <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"/>\n' +
      "    </circle>\n" +
      '    <circle cx="84" cy="50" r="10" fill="#ffffff">\n' +
      '        <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4285714285714284s"/>\n' +
      '        <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4285714285714284s"/>\n' +
      "    </circle>\n" +
      '    <circle cx="16" cy="50" r="10" fill="#ffffff">\n' +
      '        <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.142857142857143s"/>\n' +
      '        <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"\n' +
      '                 values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.142857142857143s"/>\n' +
      "    </circle>\n" +
      "    </svg>";
    // $c("tucmc-login").style.padding = "0.15rem 4.71rem";
    setTimeout(() => {
      this._resetLoading();
    }, 3 * 60 * 1000);
  }

  _resetLoading() {
    $c("tucmc-login").innerHTML = "Login with TUCMC";
    // $c("tucmc-login").style.padding = "0.5rem 2rem";
  }

  _checkToken() {
    return this.TOKEN.length === 44;
  }

  login() {
    const data = window.localStorage.getItem("data");
    if (data) return;
    if (this.prevPop) this.prevPop.close();
    if (!this._checkToken()) {
      console.error("invalid_client_token");
      return;
    }

    this._setLoading();

    const wid = window.open("https://account.triamudom.club/auth", "_blank", "width=492,height=740");
    this.prevPop = wid;

    async function _fetchToken(token, resetLoading) {
      const res = await fetch(`https://account.triamudom.club/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "fetchAuthToken",
          authToken: window.sessionStorage.getItem("authToken"),
          reqToken: token,
          fp: fingerPrint,
        }),
      });

      const jsonResult = await res.json();

      if (jsonResult.status) {
        window.sessionStorage.setItem("authToken", "");
        window.localStorage.setItem("data", JSON.stringify(jsonResult.data.data));
        window.location.reload();
      }
      resetLoading();
    }

    const inter = setInterval(() => {
      if (this.prevPop.closed) {
        _fetchToken(this.TOKEN, this._resetLoading);
        clearInterval(inter);
      }
    }, 500);

    async function _genToken(token) {
      const res = await fetch(`https://account.triamudom.club/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "genAuthToken",
          reqToken: token,
          fp: fingerPrint,
        }),
      });

      return await res.json();
    }

    _genToken(this.TOKEN).then((jsonResult) => {
      if (jsonResult.status) {
        window.sessionStorage.setItem("authToken", jsonResult.data.authToken);
        wid.location.replace(`https://account.triamudom.club/auth?authToken=${jsonResult.data.authToken}`);
      }
    });
  }

  user() {
    const data = window.localStorage.getItem("data");

    if (data) {
      const parsed = JSON.parse(data);
      return parsed.data;
    } else {
      return null;
    }
  }
}
