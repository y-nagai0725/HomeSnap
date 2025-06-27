/**
 * historyアイテムクラス
 */
class HistoryItem {
  /**
   * 共通duration(秒)
   */
  duration = 0.4;

  /**
   * 画像アニメーションduration(秒)
   */
  imageAnimationDuration = 0.3;

  /**
   * 共通easing
   */
  easing = gsapEasing;

  /**
   * 画像アニメーションeasing
   */
  imageAnimationEasing = "back.out(1.4)";

  /**
   * y方向の初期値(px)
   */
  yMove = 40;

  /**
   * 序数
   */
  number;

  /**
   * 序数アニメーション
   */
  currentNumberAnimation;

  /**
   * 説明文
   */
  description;

  /**
   * 説明文アニメーション
   */
  currentDescriptionAnimation;

  /**
   * 画像
   */
  image;

  /**
   * 画像アニメーション
   */
  currentImageAnimation;

  /**
   * タイトル
   */
  title;

  /**
   * 年
   */
  year;

  /**
   * index
   */
  index;

  /**
   * indexが偶数番目かどうか
   */
  isEven;

  /**
   * 開始deg
   */
  startRotate;

  /**
   * 終了deg
   */
  endRotate;

  /**
   * コンストラクタ
   *
   * @param {*} e historyアイテム要素(.history__item)
   * @param {*} index index
   */
  constructor(e, index) {
    this.number = e.querySelector(".history__number-wrapper");
    this.description = e.querySelector(".history__description-wrapper");
    this.image = e.querySelector(".history__image-wrapper");
    this.index = index;
    this.isEven = index % 2 !== 0;
    this.startRotate = this.isEven ? "-8deg" : "8deg";
    this.endRotate = this.isEven ? "8deg" : "-8deg";

    //序数と説明文のsp,tab表示での初期化
    mm.add(`(max-width: ${pcBreakPoint - 1}px)`, () => {
      gsap.set(this.number, {
        autoAlpha: 0,
        y: this.yMove,
        yPercent: -50,
      });

      gsap.set(this.description, {
        autoAlpha: 0,
        y: this.yMove,
      });
    });

    //序数と説明文のpc表示での初期化
    mm.add(`(min-width: ${pcBreakPoint}px)`, () => {
      gsap.set(this.number, {
        autoAlpha: 0,
        y: this.yMove,
      });

      gsap.set(this.description, {
        autoAlpha: 0,
        y: this.yMove,
        yPercent: -50,
      });
    });

    //画像の初期化
    gsap.set(this.image, {
      autoAlpha: 0,
      "--image-rotate": this.startRotate,
      "--peseudo-rotate": this.endRotate,
    });

    //タイトル要素作成、追加、初期化
    this.title = document.createElement("span");
    this.title.className = "history__progress-title";
    this.title.textContent = e.querySelector(".history__item-title").textContent;
    document.querySelector(".history__progress-title-wrapper").append(this.title);
    gsap.set(this.title, {
      autoAlpha: 0,
    });

    //年要素作成、追加
    this.year = document.createElement("span");
    this.year.className = "history__progress-year";
    this.year.textContent = e.querySelector(".history__item-year").textContent;
    this.year.dataset.title = this.title.textContent;
    document.querySelector(".history__progress-bar").before(this.year);
  }

  /**
   * アイテム表示
   */
  show() {
    this.#showNumber();
    this.#showDescription();
    this.#showImage();
    this.#showTitle();
    this.#activeYear();
    this.#updateProgressBar();
  }

  /**
   * アイテム非表示
   */
  hide() {
    this.#hideNumber();
    this.#hideDescription();
    this.#hideImage();
    this.#hideTitle();
    this.#inactiveYear()
  }

  /**
   * プログレスバー更新
   */
  #updateProgressBar() {
    const progressYearWrapper = document.querySelector(".history__progress-year-wrapper");
    const progressActiveBar = document.querySelector(".history__progress-active-bar");
    const startPercent = (100 / historyItems.length / 2);
    const plusPercent = (100 / historyItems.length) * this.index;

    //sp,tab表示
    mm.add(`(max-width: ${pcBreakPoint - 1}px)`, () => {
      gsap.timeline().to(progressActiveBar, {
        duration: this.duration,
        ease: this.easing,
        width: (startPercent + plusPercent) + "%",
      }).to(progressYearWrapper, {
        duration: this.duration,
        ease: this.easing,
        xPercent: (-(100 / historyItems.length * 0.8) * this.index),
      }, "<");
    });

    //pc表示
    mm.add(`(min-width: ${pcBreakPoint}px)`, () => {
      gsap.timeline().to(progressActiveBar, {
        duration: this.duration,
        ease: this.easing,
        width: (startPercent + plusPercent) + "%",
      });
    });
  }

  /**
   * 年要素にクラス付与
   */
  #activeYear() {
    this.year.classList.add("js-large");
  }

  /**
   * 年要素からクラス削除
   */
  #inactiveYear() {
    this.year.classList.remove("js-large");
  }

  /**
   * gsapAnimation作成
   *
   * @param {*} targetPropertyName
   * @param {*} targetElement
   * @param {*} gsapOptions
   */
  #createAnimation(targetPropertyName, targetElement, gsapOptions) {
    if (this[targetPropertyName]) {
      this[targetPropertyName].kill();
    }
    this[targetPropertyName] = gsap.to(targetElement, gsapOptions);
  }

  /**
   * タイトル表示
   */
  #showTitle() {
    this.#createAnimation("currentTitleAnimation", this.title, {
      duration: this.duration,
      ease: this.easing,
      autoAlpha: 1,
    });
  }

  /**
   * タイトル非表示
   */
  #hideTitle() {
    this.#createAnimation("currentTitleAnimation", this.title, {
      duration: this.duration,
      ease: this.easing,
      autoAlpha: 0,
    });
  }

  /**
   * 画像表示
   */
  #showImage() {
    this.#createAnimation("currentImageAnimation", this.image, {
      duration: this.imageAnimationDuration,
      ease: this.imageAnimationEasing,
      autoAlpha: 1,
      "--image-rotate": this.endRotate,
      "--peseudo-rotate": this.startRotate,
    });
  }

  /**
   * 画像非表示
   */
  #hideImage() {
    this.#createAnimation("currentImageAnimation", this.image, {
      duration: this.imageAnimationDuration,
      ease: this.imageAnimationEasing,
      autoAlpha: 0,
      "--image-rotate": this.startRotate,
      "--peseudo-rotate": this.endRotate,
    });
  }

  /**
   * 序数表示
   */
  #showNumber() {
    this.#createAnimation("currentNumberAnimation", this.number, {
      duration: this.duration,
      ease: this.easing,
      autoAlpha: 1,
      y: 0,
    });
  }

  /**
   * 序数非表示
   */
  #hideNumber() {
    this.#createAnimation("currentNumberAnimation", this.number, {
      duration: 0,
      autoAlpha: 0,
      y: this.yMove,
    });
  }

  /**
   * 説明文表示
   */
  #showDescription() {
    this.#createAnimation("currentDescriptionAnimation", this.description, {
      duration: this.duration,
      ease: this.easing,
      autoAlpha: 1,
      y: 0,
    });
  }

  /**
   * 説明文非表示
   */
  #hideDescription() {
    this.#createAnimation("currentDescriptionAnimation", this.description, {
      duration: 0,
      autoAlpha: 0,
      y: this.yMove,
    });
  }
}

/**
 * GSAPメディアクエリ
 */
const mm = gsap.matchMedia();

/**
 * GSAPのeasing
 */
const gsapEasing = "power2.out";

/**
 * PCブレイクポイント
 */
const pcBreakPoint = 1024;

/**
 * TABブレイクポイント
 */
const tabBreakPoint = 768;

/**
 * Historyセクションアイテム
 */
const historyItems = [];

/**
 * 現在のウィンドウ幅
 */
let currentWindowWidth = window.screen.width;

/**
 * Historyセクションの現在の表示Number
 */
let historyCurrentNumber = -1;

/**
 * SVGのアニメーション
 */
let svgAnimation;

/**
 * Historyセクションのアニメーション
 */
let historySectionAnimation;

/**
 * Contetnsセクションのアニメーション
 */
let contentsSlideAnimation;

/**
 * resizeイベント制御用
 */
let resizeTimer;

/**
 * イベント処理禁止用
 *
 * @param {*} e
 */
function noScroll(e) {
  e.preventDefault();
}

/**
 * 指定されたパスをアニメーションさせる
 *
 * @param {gsap.core.Timeline} timeline GSAPのタイムライン
 * @param {string} selector パスのCSSセレクタ
 * @param {number} duration アニメーションの時間
 * @param {string} position タイムライン上の開始位置
 */
function animatePath(timeline, selector, duration, position) {
  document.querySelectorAll(selector).forEach(path => {
    const pathLength = path.getTotalLength();
    timeline.to(path, {
      duration: duration,
      strokeDasharray: `${pathLength}, ${pathLength}`,
    }, position);
  });
}

/**
 * opアニメーションを開始
 */
function startOpeningAnimation() {
  const opening = document.querySelector(".opening");
  const logo = document.querySelector(".opening__logo");
  const pathList = document.querySelectorAll(".opening__logo path");
  const logoFillColor = "#ffffff";

  //opアニメーション中はスクロール禁止
  document.addEventListener('touchmove', noScroll, { passive: false });
  document.addEventListener('wheel', noScroll, { passive: false });

  //pathの初期化
  pathList.forEach(path => {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `0, ${pathLength}`;
  });

  //タイムライン
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
  });

  //ロゴ表示
  logo.style.opacity = 1;

  //ロゴのstroke描画
  animatePath(tl, ".outer-curve > path", 0.1, "<0.1");
  animatePath(tl, ".line-left > path, .line-right > path", 0.01, "<0.01");
  animatePath(tl, ".ordinal-number > path", 0.05, "<0.05");
  animatePath(tl, ".ribbon > path", 0.1, "<0.1");
  animatePath(tl, ".anniversary > path", 0.05, "<0.05");

  //ロゴのfill設定
  tl.to(".opening__logo path", {
    duration: 0.4,
    fill: logoFillColor,
  });

  //シャッターアニメーション
  tl.fromTo(".shutter", {
    rotate: -60,
    opacity: 1,
    transformOrigin: "50% -50%",
  }, {
    duration: 1.0,
    keyframes: {
      rotate: [-60, 0, -60],
    },
  });

  //opening要素を非表示にする
  tl.to(opening, {
    duration: 0.4,
    autoAlpha: 0,
  }, "<0.66");

  //opアニメーション終了後の処理
  tl.add(() => {
    //FV更新処理開始
    changeFvImage();

    //スクロール禁止を解除
    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel', noScroll);
  }, "<0.2");
}

/**
 * SVGのアニメーション設定
 *
 * @param {Number} windowWidth ウィンドウ幅
 */
function setSvgAnimation(windowWidth) {
  const pseudoElementProperty = "--border-opacity";
  const fv = document.querySelector(".fv");
  const fvYear = document.querySelector(".fv__year-wrapper");
  const fvText = document.querySelector(".fv__text");
  const fvHeaderLogo = document.querySelector(".header__logo");
  const fvAnniversaryLogo = document.querySelector(".fv__anniversary-logo");
  const fvScrollLine = document.querySelector(".fv__scroll-line");
  const fvImageWrapper = document.querySelector(".fv__image-wrapper");
  const fvMessage = document.querySelector(".fv__message");
  const fvCircleTextGray = document.querySelector(".fv__circle-text-gray");
  const fvSmallCircleWrapper = document.querySelector(".fv__small-circle-wrapper");
  const svgPath_1 = document.querySelector(".fv__bg-svg-path-1");
  const svgPath_2 = document.querySelector(".fv__bg-svg-path-2");
  const svgPath_3 = document.querySelector(".fv__bg-svg-path-3");
  const svgPath_4 = document.querySelector(".fv__bg-svg-path-4");
  const prefix = (windowWidth >= pcBreakPoint) ? "pc" : "sp";

  //pc表示の各pathの初期値
  const beforePcBgSvgPath_1 = "M2032.83 -59.6496C2205.01 185.95 2215.69 878.6 1994.32 922.63C1772.94 966.65 1604.7 807.42 1631.26 462.34C1657.82 117.27 1261.73 183.86 1305.59 -59.6496C1349.44 -303.17 1860.64 -305.26 2032.83 -59.6496Z";
  const beforePcBgSvgPath_2 = "M344.598 726.65C318.033 1071.73 714.12 1005.14 670.261 1248.65C626.413 1492.17 115.207 1494.26 -56.9777 1248.65C-229.142 1003.05 -239.827 310.39 -18.4566 266.37C202.913 222.34 371.163 381.58 344.598 726.65Z";
  const beforePcBgSvgPath_3 = "M768.273 -432C966.881 -341.87 1038.71 31.2002 574.164 197.68C109.631 364.16 286.729 779.58 -104.283 774.43C-495.174 769.27 -492.924 108.1 -220.25 -162.85C52.4243 -433.81 569.674 -522.13 768.273 -432Z";
  const beforePcBgSvgPath_4 = "M1174.48 1005.04C1639.02 838.57 1461.92 423.14 1852.95 428.29C2243.84 433.45 2241.59 1094.48 1968.9 1365.58C1696.23 1636.54 1178.98 1724.87 980.37 1634.73C781.772 1544.6 709.946 1171.52 1174.48 1005.04Z";

  //sp表示の各pathの初期値
  const beforeSpBgSvgPath_1 = "M292.56 -79.3898C391.77 -30.5798 613.89 219.04 518.24 267.68C422.6 316.33 305.9 321.99 252.58 205.7C199.27 89.4102 88.97 136.38 59.43 49.8202C29.89 -36.7298 193.34 -128.22 292.56 -79.3898Z";
  const beforeSpBgSvgPath_2 = "M153.59 505.08C206.93 621.42 317.26 574.42 346.83 661.04C376.4 747.65 212.86 839.15 113.59 790.31C14.35 741.47 -207.86 491.74 -112.17 443.07C-16.47 394.39 100.25 388.74 153.59 505.08Z";
  const beforeSpBgSvgPath_3 = "M-77.44 -42.8499C18.66 -118.15 184.42 -126.19 243.25 -90.0099C302.08 -53.8299 310.12 67.0301 157.87 101.87C5.61996 136.71 45.04 275.01 -77.44 258.32C-199.93 241.66 -173.52 32.4401 -77.44 -42.8499Z";
  const beforeSpBgSvgPath_4 = "M224.86 577.14C377.11 542.3 337.69 404 460.18 420.69C582.67 437.38 556.29 646.6 460.18 721.9C364.07 797.2 198.31 805.24 139.48 769.03C80.65 732.82 72.61 611.98 224.86 577.14Z";

  //pc表示の各pathの変形後の値
  const afterPcBgSvgPath_1 = "M1405 540C1405 785.767 1205.77 985 960 985C714.233 985 516 785.767 515 540C514 294.233 714.233 95 960 95C1205.77 95 1405 294.233 1405 540Z";
  const afterPcBgSvgPath_2 = "M1405 540C1405 785.767 1205.77 985 960 985C714.233 985 516 785.767 515 540C514 294.233 714.233 95 960 95C1205.77 95 1405 294.233 1405 540Z";
  const afterPcBgSvgPath_3 = "M731 172C731 249.32 668.32 312 591 312C513.68 312 452 249.32 451 172C451 94.6801 513.68 32 591 32C668.32 32 731 94.6801 731 172Z";
  const afterPcBgSvgPath_4 = "M451 172C452 94.6801 513.68 32 591 32C668.32 32 731 94.6801 731 172C731 249.32 668.32 312 591 312C513.68 312 451 249.32 451 172Z"

  //sp表示の各pathの変形後の値
  const afterSpBgSvgPath_1 = "M447 333C446 476.594 330.594 593 187 593C43.406 593 -73 476.594 -73 333C-73 189.406 43.406 73 187 73C330.594 73 447 189.406 447 333Z";
  const afterSpBgSvgPath_2 = "M447 333C446 476.594 330.594 593 187 593C43.406 593 -73 476.594 -73 333C-73 189.406 43.406 73 187 73C330.594 73 447 189.406 447 333Z";
  const afterSpBgSvgPath_3 = "M70.1683 73C70.1683 41.5198 95.6881 16 127.168 16C158.649 16 184.168 41.5198 184.168 73C184.168 104.48 158.649 130 127.168 130C95.6881 130 70.1683 104.48 70.1683 73Z";
  const afterSpBgSvgPath_4 = "M70.1683 73C70.1683 41.5198 95.6881 16 127.168 16C158.649 16 184.168 41.5198 184.168 73C184.168 104.48 158.649 130 127.168 130C95.6881 130 70.1683 104.48 70.1683 73Z";

  //pathのリスト
  const bgSvgPathList = {
    "before": { "pc": [beforePcBgSvgPath_1, beforePcBgSvgPath_2, beforePcBgSvgPath_3, beforePcBgSvgPath_4], "sp": [beforeSpBgSvgPath_1, beforeSpBgSvgPath_2, beforeSpBgSvgPath_3, beforeSpBgSvgPath_4] },
    "after": { "pc": [afterPcBgSvgPath_1, afterPcBgSvgPath_2, afterPcBgSvgPath_3, afterPcBgSvgPath_4], "sp": [afterSpBgSvgPath_1, afterSpBgSvgPath_2, afterSpBgSvgPath_3, afterSpBgSvgPath_4] },
  };

  if (svgAnimation) {
    svgAnimation.scrollTrigger.kill();
    svgAnimation.kill();
  }

  svgAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: fv,
      start: "top top",
      end: "+=1800",
      scrub: 1,
      pin: true,
      aniticipatePin: 1,
      invalidateOnRefresh: true,
    },
    defaults: {
      ease: "none",
    },
  }).fromTo(svgPath_1, {
    attr: {
      d: bgSvgPathList["before"][prefix][0],
    }
  }, {
    attr: {
      d: bgSvgPathList["after"][prefix][0],
    },
    onUpdate: () => {
      // 進捗度計算
      // この部分はアニメーション全体の1/3なので3倍で計算
      const progress = svgAnimation ? svgAnimation.progress() * 3 : 0;
      fv.style.setProperty(pseudoElementProperty, (1 - progress));
    },
  }).fromTo(svgPath_2, {
    attr: {
      d: bgSvgPathList["before"][prefix][1],
    }
  }, {
    attr: {
      d: bgSvgPathList["after"][prefix][1],
    }
  }, "<").fromTo(svgPath_3, {
    attr: {
      d: bgSvgPathList["before"][prefix][2],
    }
  }, {
    attr: {
      d: bgSvgPathList["after"][prefix][2],
    }
  }, "<").fromTo(svgPath_4, {
    attr: {
      d: bgSvgPathList["before"][prefix][3],
    }
  }, {
    attr: {
      d: bgSvgPathList["after"][prefix][3],
    },
  }, "<").fromTo(fvScrollLine, {
    opacity: 1,
  }, {
    opacity: 0,
  }, "<").fromTo(fvImageWrapper, {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
  }, {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0)",
  }, "<").fromTo([fvHeaderLogo, fvAnniversaryLogo], {
    opacity: 1,
    xPercent: 0,
  }, {
    opacity: 0,
    xPercent: -15,
  }, "<").fromTo([fvYear, fvText], {
    opacity: 1,
    xPercent: 0,
  }, {
    opacity: 0,
    xPercent: 15,
  }, "<").fromTo(fvMessage, {
    opacity: 0,
    yPercent: 8,
  }, {
    keyframes: [
      { opacity: 1, yPercent: 0, },
      { opacity: 1, yPercent: 0, },
    ],
  }).fromTo(fvCircleTextGray, {
    opacity: 0,
  }, {
    opacity: 1,
  }, "<").fromTo(fvSmallCircleWrapper, {
    opacity: 0,
  }, {
    opacity: 1,
    onUpdate: () => {//（onUpdateの理由）timeline途中で画面幅resizeイベント起きた場合にも対応するため
      setSmallCircleWrapperPosition(fvSmallCircleWrapper, svgPath_4);
    },
  }, "<");
}

/**
 * SVGのviewBoxの設定
 *
 * @param {Number} windowWidth ウィンドウ幅
 */
function setSvgViewBoxSize(windowWidth) {
  const fvBgSvg = document.querySelector(".fv__bg-svg");
  if (windowWidth >= pcBreakPoint) {
    fvBgSvg.setAttribute("viewBox", "0 0 1920 1080");
  } else {
    fvBgSvg.setAttribute("viewBox", "0 0 375 667");
  }
}

/**
 * SmallCircleWrapperの位置設定
 *
 * @param {HTMLElement} fvSmallCircleWrapper fvSmallCircleWrapper要素
 * @param {HTMLElement} targetSvgPath 設定したい位置の要素
 */
function setSmallCircleWrapperPosition(fvSmallCircleWrapper, targetSvgPath) {
  const pathData = targetSvgPath.getBoundingClientRect();
  const width = pathData.width;
  const height = pathData.height;
  const top = pathData.top;
  const left = pathData.left;

  fvSmallCircleWrapper.style.width = width + "px";
  fvSmallCircleWrapper.style.height = height + "px";
  fvSmallCircleWrapper.style.top = top + "px";
  fvSmallCircleWrapper.style.left = left + "px";
}

/**
 * FVの画像更新処理
 */
function changeFvImage() {
  const fvYearPrefix = document.querySelector(".fv__year-prefix");
  const fvYearSuffix = document.querySelector(".fv__year-suffix");
  const fvImages = document.querySelectorAll(".fv__image");
  const maxIndex = fvImages.length - 1;
  let currentIndex = 0;

  //初期表示
  fvImages[currentIndex].classList.add("js-actived");

  //2秒毎に処理
  setInterval(() => {
    //現在表示している画像を非表示
    fvImages[currentIndex].classList.remove("js-actived");

    //index更新
    currentIndex++;
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    //次の画像表示
    fvImages[currentIndex].classList.add("js-actived");

    //数字表示
    fvYearPrefix.innerHTML = (currentIndex + 1);

    //接尾表示
    if (currentIndex === 0) {
      fvYearSuffix.innerHTML = "st";
    } else if (currentIndex === 1) {
      fvYearSuffix.innerHTML = "nd";
    } else if (currentIndex === 2) {
      fvYearSuffix.innerHTML = "rd";
    } else {
      fvYearSuffix.innerHTML = "th";
    }
  }, 2000);
}

/**
 * Historyセクションアニメーション設定
 */
function setHistoryAnimation() {
  const historySection = document.querySelector(".history");
  const historyProgressWrapper = document.querySelector(".history__progress-wrapper");
  const historyItemList = document.querySelector(".history__item-list");

  if (historySectionAnimation) {
    historySectionAnimation.scrollTrigger.kill();
    historySectionAnimation.kill();
  }

  historySectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: historySection,
      start: "top top",
      end: "+=5000",
      scrub: 1,
      pin: true,
      aniticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        historyProgressWrapper.classList.add("js-actived");
        historyItemList.classList.add("js-actived");
      },
      onLeaveBack: () => {
        historyProgressWrapper.classList.remove("js-actived");
        historyItemList.classList.remove("js-actived");
      },
      onUpdate: (self) => {
        let targetNumber = Math.floor(self.progress * historyItems.length);
        if (targetNumber === historyItems.length) {
          targetNumber--;
        }

        if (historyCurrentNumber === targetNumber) {
          return;
        } else {
          showHistoryItem(targetNumber, historyCurrentNumber);
          historyCurrentNumber = targetNumber;
        }
      }
    }
  });
}

/**
 * historyアイテム表示
 *
 * @param {Number} targetIndex 表示対象番号
 * @param {Number} currentIndex 現在表示対象番号
 */
function showHistoryItem(targetIndex, currentIndex) {
  if (currentIndex !== -1) {
    const currentItem = historyItems[currentIndex];
    currentItem.hide();
  }

  const targetItem = historyItems[targetIndex];
  targetItem.show();
}

/**
 * historyアイテム初期設定
 */
function setHistoryItem() {
  const items = document.querySelectorAll(".history__item");
  items.forEach((item, index) => {
    historyItems.push(new HistoryItem(item, index));
  });

  //アイテム数に応じてプログレスバーのpadding調整
  const progressYearWrapper = document.querySelector(".history__progress-year-wrapper");
  progressYearWrapper.style.setProperty("--padding-adjustment", (100 / historyItems.length / 2) + "%");
}

/**
 * Contentsセクションのスライドアニメーション設定
 */
function setContentsSlideAnimation() {
  const slideWrapper = document.querySelector(".contents__slide-wrapper");
  const slide_1 = document.querySelector(".contents__slide-list.slide-1");
  const slide_2 = document.querySelector(".contents__slide-list.slide-2");
  const slide_3 = document.querySelector(".contents__slide-list.slide-3");

  if (contentsSlideAnimation) {
    contentsSlideAnimation.scrollTrigger.kill();
    contentsSlideAnimation.kill();
  }

  contentsSlideAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: slideWrapper,
      start: "top top",
      end: "+=2000",
      scrub: 1,
      pin: true,
      aniticipatePin: 1,
      invalidateOnRefresh: true,
    },
    defaults: {
      ease: gsapEasing,
    }
  }).fromTo(slide_1, {
    zIndex: 3,
    opacity: 1,
    xPercent: -50,
    rotationY: 0,
    scale: 1,
  }, {
    keyframes: {
      "50%": {
        zIndex: 2,
        opacity: 0.6,
        xPercent: -125,
        rotationY: -30,
        scale: 0.45,
      },
      "100%": {
        zIndex: 1,
        opacity: 0.6,
        xPercent: -75,
        rotationY: -60,
        scale: 0.2,
      }
    },
  }).fromTo(slide_2, {
    zIndex: 2,
    opacity: 0.6,
    xPercent: 25,
    rotationY: 30,
    scale: 0.45,
  }, {
    keyframes: {
      "50%": {
        zIndex: 3,
        opacity: 1,
        xPercent: -50,
        rotationY: 0,
        scale: 1,
      },
      "100%": {
        zIndex: 1,
        opacity: 0.6,
        xPercent: -125,
        rotationY: -30,
        scale: 0.45,
      }
    },
  }, "<").fromTo(slide_3, {
    zIndex: 1,
    opacity: 0.6,
    xPercent: 0,
    rotationY: 60,
    scale: 0.2,
  }, {
    keyframes: {
      "50%": {
        zIndex: 2,
        opacity: 0.6,
        xPercent: 25,
        rotationY: 30,
        scale: 0.45,
      },
      "100%": {
        zIndex: 3,
        opacity: 1,
        xPercent: -50,
        rotationY: 0,
        scale: 1,
      }
    },
  }, "<");
}

/**
 * Eventsセクションのスライダー初期化
 */
function initEventsSlider() {
  const eventsSectionSwiper = new Swiper(".events__slider.swiper", {
    effect: "slide",
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 500,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

/**
 * Postsセクションのスライダー初期化
 */
function initPostsSlider() {
  //スライダー生成
  const createSwiper = (targetClassName, isReverseDirection = false) => {
    return new Swiper(targetClassName, {
      slidesPerView: 4.8,
      spaceBetween: 4,
      loop: true,
      loopAdditionalSlides: 1,
      speed: 2500,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        reverseDirection: isReverseDirection,
      },
      breakpoints: {
        768: {
          slidesPerView: 5.2,
          spaceBetween: 8,
        },
        1024: {
          slidesPerView: 7.65,
          spaceBetween: 10,
        }
      },
    });
  };

  //右方向スライダー設定
  const postsSectionRightSwiper = createSwiper(".posts__slider-right.swiper");

  //左方向スライダー設定
  const postsSectionLeftSwiper = createSwiper(".posts__slider-left.swiper", true);
}

/**
 * 要素を監視
 */
function observeElements() {
  const targets = document.querySelectorAll(".fade, .fade-up");

  const options = {
    root: null,
    rootMargin: "-70% 0px -30%",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("js-actived");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  targets.forEach(target => {
    observer.observe(target);
  });
}

/**
 * トップへ戻るボタンクリックイベント
 */
document.querySelector(".footer__back-button").addEventListener("click", () => {
  gsap.to(window, {
    duration: 1,
    ease: gsapEasing,
    scrollTo: {
      y: 0,
    }
  })
});

/**
 * resizeイベント
 */
window.addEventListener("resize", () => {
  // 前のタイマーがあったらキャンセル
  clearTimeout(resizeTimer);

  // 0.2秒後に実行するタイマーをセット
  resizeTimer = setTimeout(() => {
    currentWindowWidth = window.screen.width;
    setSvgViewBoxSize(currentWindowWidth);
    setSvgAnimation(currentWindowWidth);
    setHistoryAnimation();
    setContentsSlideAnimation();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(".history__progress-year-wrapper", {
        clearProps: "transform",
      });
    });
  }, 200);
});

/**
 * 初期実行処理
 */
function init() {
  setSvgViewBoxSize(currentWindowWidth);
  setSvgAnimation(currentWindowWidth);
  setHistoryItem();
  setHistoryAnimation();
  setContentsSlideAnimation();
  initEventsSlider();
  initPostsSlider();
  observeElements();
  startOpeningAnimation();
}

init();
