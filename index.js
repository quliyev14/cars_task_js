 let images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];

  const MAX_THUMBS = 9;

  const myimage = document.querySelector("#myimg");
  const l = document.querySelector("#left");
  const r = document.querySelector("#right");
  const thumbsBox = document.querySelector("#thumbs");
  const gallery = document.querySelector("#gallery");

  let index = 0;            
  let timer = null;
  const DELAY = 3000;

  const visible = images.slice(0, MAX_THUMBS);
  visible.forEach((name, i) => {
    const t = document.createElement("div");
    t.className = "thumb";
    t.innerHTML = `<img src="images/${name}" alt="">`;

    if (i === MAX_THUMBS - 1 && images.length > MAX_THUMBS) {
      t.insertAdjacentHTML("beforeend",
        `<div class="more">+${images.length - MAX_THUMBS} şəkil</div>`);
    }

    t.addEventListener("mouseenter", () => show(i));
    t.addEventListener("click", () => show(i));

    thumbsBox.appendChild(t);
  });

  function show(i) {
    index = i;

    myimage.classList.add("fade");
    setTimeout(() => {
      myimage.src = `images/${images[index]}`;
      myimage.classList.remove("fade");
    }, 120);

    // Oxların görünüşü
    l.style.display = index === 0 ? "none" : "block";
    r.style.display = index === images.length - 1 ? "none" : "block";

    // Aktiv kiçik şəkil
    document.querySelectorAll(".thumb").forEach((el, k) => {
      el.classList.toggle("active", k === index);
    });
  }

  function left()  { if (index > 0) show(index - 1); }
  function right() { if (index < images.length - 1) show(index + 1); }

  l.addEventListener("click", left);
  r.addEventListener("click", right);

  function Slide() {
    clearInterval(timer);
    timer = setInterval(() => {
      show(index + 1 >= images.length ? 0 : index + 1);
    }, DELAY);
  }

  function MouseMove() { clearInterval(timer); }
  function MouseOut()  { Slide(); }

  gallery.addEventListener("mouseenter", MouseMove);
  gallery.addEventListener("mouseleave", MouseOut);

  show(0);
  Slide();