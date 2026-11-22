console.clear();

let wrapps = document.querySelectorAll(".wrapper");
let icons = document.querySelectorAll(".toolbarItem");
let dock = document.querySelector(".toolbar");
let firstIcon = icons[0];

let min = 48; // 40 + margin
let max = 120;
let bound = min * Math.PI;

gsap.set(icons, { transformOrigin: "50% 120%" });
gsap.set(dock, { position: "relative" });

const compactDock = window.matchMedia("(max-width: 700px)");
function sizeDock() {
  min = compactDock.matches ? 36 : 48;
  max = compactDock.matches ? 54 : 120;
  bound = min * Math.PI;
  gsap.set(icons, { height: compactDock.matches ? 32 : 40 });
  gsap.set(dock, { height: compactDock.matches ? 48 : 60 });
}
sizeDock();
if (compactDock.addEventListener) {
  compactDock.addEventListener("change", sizeDock);
} else {
  compactDock.addListener(sizeDock);
}

// NOT IN USE: BUT MAY COME IN HANDY LATER
// dock.addEventListener("click", (event) => {
//   let offset = dock.getBoundingClientRect().left + firstIcon.offsetLeft;
//   console.log("Click event:", event.clientX, "Offset:", offset);
//   updateIcons(event.clientX - offset);
// });

dock.addEventListener("mousemove", (event) => {
  let offset = dock.getBoundingClientRect().left + dock.clientLeft + firstIcon.offsetLeft - dock.scrollLeft;
  updateIcons(event.clientX - offset);
});

dock.addEventListener("mouseleave", (event) => {
  gsap.to(icons, {
    duration: 0.3,
    scale: 1,
    x: 0,
  });
});

function updateIcons(pointer) {
  for (let i = 0; i < icons.length; i++) {
    let icon = icons[i];
    let distance = i * min + min / 2 - pointer;
    let x = 0;
    let scale = 1;

    if (-bound < distance && distance < bound) {
      let rad = (distance / min) * 0.5;
      scale = 1 + (max / min - 1) * Math.cos(rad);
      x = 2 * (max - min) * Math.sin(rad);
    } else {
      x = (-bound < distance ? 2 : -2) * (max - min);
    }

    gsap.to(icon, {
      duration: 0.3,
      x: x,
      scale: scale,
    });
  }
}
const wrapper = document.getElementById("wrapper");

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "m" || event.repeat) return;
  if (event.target instanceof Element &&
      event.target.closest("input, textarea, select, button, a, [contenteditable='true'], [role='slider']")) return;

  wrapper.style.visibility =
    wrapper.style.visibility === "hidden" ? "visible" : "hidden";
});
