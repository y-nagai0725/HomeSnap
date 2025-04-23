const fv = document.querySelector(".fv");

gsap.timeline({
  scrollTrigger: {
    trigger: fv,
    start: "top top",
    end: "+=500",
    scrub: 1,
    pin: true,
    aniticipatePin: 1,
    invalidateOnRefresh: true,
    markers: true,
  }
});
