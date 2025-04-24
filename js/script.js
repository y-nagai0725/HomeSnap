//GSAPメディアクエリ
const mm = gsap.matchMedia();

//GSAPのeasing
const gsapEasing = "power2.out";

const fv = document.querySelector(".fv");

const fvSvg = document.querySelector(".fv__svg");

const fvMessage = document.querySelector(".fv__message");

const path_1 = document.querySelector(".fv__path-1");
const path_2 = document.querySelector(".fv__path-2");
const path_3 = document.querySelector(".fv__path-3");
const path_4 = document.querySelector(".fv__path-4");

const beforePcBgSvgPath_1 = "M1912.83 -69.6496C2085.01 175.95 2095.69 868.6 1874.32 912.63C1652.94 956.65 1484.7 797.42 1511.26 452.34C1537.82 107.27 1141.73 173.86 1185.59 -69.6496C1229.44 -313.17 1740.64 -315.26 1912.83 -69.6496Z";
const beforePcBgSvgPath_2 = "M434.598 756.65C408.033 1101.73 804.12 1035.14 760.262 1278.65C716.413 1522.17 205.207 1524.26 33.0224 1278.65C-139.142 1033.05 -149.827 340.39 71.5435 296.37C292.914 252.34 461.163 411.58 434.598 756.65Z";
const beforePcBgSvgPath_3 = "M768.273 -432C966.881 -341.87 1038.71 31.2002 574.164 197.68C109.631 364.16 286.729 779.58 -104.283 774.43C-495.174 769.27 -492.924 108.1 -220.25 -162.85C52.4243 -433.81 569.674 -522.13 768.273 -432Z";
const beforePcBgSvgPath_4 = "M1174.48 1005.04C1639.02 838.57 1461.92 423.14 1852.95 428.29C2243.84 433.45 2241.59 1094.48 1968.9 1365.58C1696.23 1636.54 1178.98 1724.87 980.37 1634.73C781.772 1544.6 709.946 1171.52 1174.48 1005.04Z";

const beforeTabBgSvgPath_1 = "M599.16 -162.59C802.35 -62.6299 1257.24 448.59 1061.36 548.22C865.48 647.85 626.48 659.43 517.3 421.27C408.11 183.11 182.21 279.31 121.72 102.04C61.2198 -75.22 395.97 -262.61 599.16 -162.59Z";
const beforeTabBgSvgPath_2 = "M314.56 692.39C423.8 930.66 649.76 834.41 710.31 1011.79C770.86 1189.18 435.95 1376.57 232.64 1276.55C29.3999 1176.53 -425.71 665.07 -229.72 565.39C-33.73 465.7 205.32 454.12 314.56 692.39Z";
const beforeTabBgSvgPath_3 = "M-158.6 -87.7598C38.2299 -241.98 377.7 -258.45 498.18 -184.35C618.67 -110.25 635.14 137.29 323.33 208.64C11.5199 279.98 92.2599 563.23 -158.6 529.05C-409.46 494.92 -355.38 66.4502 -158.6 -87.7598Z";
const beforeTabBgSvgPath_4 = "M460.51 839.98C772.32 768.63 691.59 485.38 942.45 519.57C1193.32 553.75 1139.29 982.22 942.45 1136.44C745.62 1290.66 406.15 1307.13 285.66 1232.97C165.18 1158.81 148.7 911.32 460.51 839.98Z";

const beforeSpBgSvgPath_1 = "M292.56 -79.3898C391.77 -30.5798 613.89 219.04 518.24 267.68C422.6 316.33 305.9 321.99 252.58 205.7C199.27 89.4102 88.97 136.38 59.43 49.8202C29.89 -36.7298 193.34 -128.22 292.56 -79.3898Z";
const beforeSpBgSvgPath_2 = "M153.59 505.08C206.93 621.42 317.26 574.42 346.83 661.04C376.4 747.65 212.86 839.15 113.59 790.31C14.35 741.47 -207.86 491.74 -112.17 443.07C-16.47 394.39 100.25 388.74 153.59 505.08Z";
const beforeSpBgSvgPath_3 = "M-77.44 -42.8499C18.66 -118.15 184.42 -126.19 243.25 -90.0099C302.08 -53.8299 310.12 67.0301 157.87 101.87C5.61996 136.71 45.04 275.01 -77.44 258.32C-199.93 241.66 -173.52 32.4401 -77.44 -42.8499Z";
const beforeSpBgSvgPath_4 = "M224.86 577.14C377.11 542.3 337.69 404 460.18 420.69C582.67 437.38 556.29 646.6 460.18 721.9C364.07 797.2 198.31 805.24 139.48 769.03C80.65 732.82 72.61 611.98 224.86 577.14Z";

const afterPcBgSvgPath_1 = "M1405 540C1405 785.767 1205.77 985 960 985C714.233 985 516 785.767 515 540C514 294.233 714.233 95 960 95C1205.77 95 1405 294.233 1405 540Z";
const afterPcBgSvgPath_2 = "M1405 540C1405 785.767 1205.77 985 960 985C714.233 985 516 785.767 515 540C514 294.233 714.233 95 960 95C1205.77 95 1405 294.233 1405 540Z";
const afterPcBgSvgPath_3 = "M731 172C731 249.32 668.32 312 591 312C513.68 312 452 249.32 451 172C451 94.6801 513.68 32 591 32C668.32 32 731 94.6801 731 172Z";
const afterPcBgSvgPath_4 = "M731 172C731 249.32 668.32 312 591 312C513.68 312 452 249.32 451 172C451 94.6801 513.68 32 591 32C668.32 32 731 94.6801 731 172Z";

const afterTabBgSvgPath_1 = "M802 511.5C802 742.079 615.079 929 384.5 929C153.921 929 -32 742.079 -33 511.5C-33 280.921 153.921 94 384.5 94C615.079 94 802 280.921 802 511.5Z";
const afterTabBgSvgPath_2 = "M802 511.5C802 742.079 615.079 929 384.5 929C153.921 929 -32 742.079 -33 511.5C-33 280.921 153.921 94 384.5 94C615.079 94 802 280.921 802 511.5Z";
const afterTabBgSvgPath_3 = "M375 110C374 170.751 325.751 220 265 220C204.249 220 155 170.751 155 110C155 49.2487 204.249 0 265 0C325.751 0 375 49.2487 375 110Z";
const afterTabBgSvgPath_4 = "M375 110C374 170.751 325.751 220 265 220C204.249 220 155 170.751 155 110C155 49.2487 204.249 0 265 0C325.751 0 375 49.2487 375 110Z";

const afterSpBgSvgPath_1 = "M447 333C446 476.594 330.594 593 187 593C43.406 593 -73 476.594 -73 333C-73 189.406 43.406 73 187 73C330.594 73 447 189.406 447 333Z";
const afterSpBgSvgPath_2 = "M447 333C446 476.594 330.594 593 187 593C43.406 593 -73 476.594 -73 333C-73 189.406 43.406 73 187 73C330.594 73 447 189.406 447 333Z";
const afterSpBgSvgPath_3 = "M184 73C183 104.48 158.48 130 127 130C95.5198 130 70 104.48 70 73C70 41.5198 95.5198 16 127 16C158.48 16 184 41.5198 184 73Z";
const afterSpBgSvgPath_4 = "M184 73C183 104.48 158.48 130 127 130C95.5198 130 70 104.48 70 73C70 41.5198 95.5198 16 127 16C158.48 16 184 41.5198 184 73Z";


const bgSvgPathList = {
  "before": { "pc": [beforePcBgSvgPath_1, beforePcBgSvgPath_2, beforePcBgSvgPath_3, beforePcBgSvgPath_4], "tab": [beforeTabBgSvgPath_1, beforeTabBgSvgPath_2, beforeTabBgSvgPath_3, beforeTabBgSvgPath_4], "sp": [beforeSpBgSvgPath_1, beforeSpBgSvgPath_2, beforeSpBgSvgPath_3, beforeSpBgSvgPath_4] },
  "after": { "pc": [afterPcBgSvgPath_1, afterPcBgSvgPath_2, afterPcBgSvgPath_3, afterPcBgSvgPath_4], "tab": [afterTabBgSvgPath_1, afterTabBgSvgPath_2, afterTabBgSvgPath_3, afterTabBgSvgPath_4], "sp": [afterSpBgSvgPath_1, afterSpBgSvgPath_2, afterSpBgSvgPath_3, afterSpBgSvgPath_4] },
}

function setSvgPath() {
  const windowWidth = window.innerWidth;
  let prefix;
  if (windowWidth >= 1024) {
    prefix = "pc";
  } else if (windowWidth >= 768) {
    prefix = "tab";
  } else {
    prefix = "sp";
  }

  //初期path設定
  path_1.setAttribute("d", bgSvgPathList["before"][prefix][0]);
  path_2.setAttribute("d", bgSvgPathList["before"][prefix][1]);
  path_3.setAttribute("d", bgSvgPathList["before"][prefix][2]);
  path_4.setAttribute("d", bgSvgPathList["before"][prefix][3]);
}

setSvgPath();
setFvSvgAnimation();

function setFvSvgAnimation() {
  const easing = "linear";

  mm.add("(max-width: 767px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: fv,
        start: "top top",
        end: "+=1800",
        scrub: 1,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
      }
    }).to(path_1, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["sp"][0],
      }
    }).to(path_2, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["sp"][1],
      }
    }, "<").to(path_3, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["sp"][2],
      }
    }, "<").to(path_4, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["sp"][3],
      }
    }, "<").to(fvMessage, {
      ease: easing,
      opacity: 1,
    });
  });

  mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: fv,
        start: "top top",
        end: "+=1800",
        scrub: 1,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
      }
    }).to(path_1, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["tab"][0],
      }
    }).to(path_2, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["tab"][1],
      }
    }, "<").to(path_3, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["tab"][2],
      }
    }, "<").to(path_4, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["tab"][3],
      }
    }, "<").to(fvMessage, {
      ease: easing,
      opacity: 1,
    });
  });

  mm.add("(min-width: 1024px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: fv,
        start: "top top",
        end: "+=1800",
        scrub: 1,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
      }
    }).to(path_1, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["pc"][0],
      }
    }).to(path_2, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["pc"][1],
      }
    }, "<").to(path_3, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["pc"][2],
      }
    }, "<").to(path_4, {
      ease: easing,
      attr: {
        d: bgSvgPathList["after"]["pc"][3],
      }
    }, "<").to(fvMessage, {
      ease: easing,
      opacity: 1,
    });
  });
}

function setSvgViewBoxSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  fvSvg.setAttribute("viewBox", "0 0 " + width + " " + height);
}

window.addEventListener("resize", () => {
  setSvgViewBoxSize();
  setSvgPath();
});

setSvgViewBoxSize();
setSvgPath();