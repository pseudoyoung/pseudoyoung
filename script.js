/* The Edie Diaries — timeline + per-photo comments (localStorage). */
(function () {
  "use strict";

  // Gotcha day: April 5, 2026 (she was 9 weeks old).
  // Estimated DOB ≈ Feb 1, 2026.
  const GOTCHA_DAY = new Date("2026-04-05T00:00:00");
  const WEEKS_AT_GOTCHA = 9;
  const DOB = new Date(GOTCHA_DAY);
  DOB.setDate(DOB.getDate() - WEEKS_AT_GOTCHA * 7);

  /**
   * Each post references an image taken on the listed date. The `taken`
   * field comes straight from the photo's EXIF metadata. Posts are sorted
   * chronologically before being rendered so that the timeline always
   * reflects the order events actually happened.
   */
  const POSTS = [
    {
      id: "2026-04-05-gotcha-day",
      taken: "2026-04-05T11:54:19",
      image: "images/01-gotcha-day-close-up.jpg",
      title: "Day 1: The First Time We Saw Her Face",
      alt: "A tiny tabby kitten with bright eyes, staring intently at the camera.",
      body:
        "Nine weeks old, four pounds of grump and three pounds of fluff — " +
        "she met us in the kitchen and announced herself with a squeak that " +
        "was somewhere between a meow and a question mark. We'd been " +
        "rehearsing this moment for weeks; she'd been asleep for it.",
    },
    {
      id: "2026-04-05-hello",
      taken: "2026-04-05T11:54:20",
      image: "images/02-gotcha-day-hello.jpg",
      title: "Day 1: Hello, Human",
      alt: "Edie, a grey tabby kitten, blinks slowly up at the camera.",
      body:
        "A full second after the first photo she gave us The Slow Blink. " +
        "According to every cat forum on the internet, that is the cat " +
        "equivalent of saying 'fine, you can stay.' We took the win.",
    },
    {
      id: "2026-04-05-home",
      taken: "2026-04-05T14:04:13",
      image: "images/03-first-afternoon-home.jpg",
      title: "Day 1: Home, After Lunch",
      alt: "Kitten tucked into a blanket, looking around her new living room.",
      body:
        "She spent her first hour at home investigating the edge of the " +
        "couch like a detective on a stakeout. Then she climbed into a " +
        "blanket we had pre-warmed for her and promptly conked out. No " +
        "notes. 10/10 afternoon.",
    },
    {
      id: "2026-04-09-couch",
      taken: "2026-04-09T16:35:01",
      image: "images/04-exploring-the-couch.jpg",
      title: "Week 1: Surveyor of Cushions",
      alt: "Edie standing on the back of the couch, peering down.",
      body:
        "By day four the couch had been officially re-classified as terrain. " +
        "She walked the length of it, inspected every cushion seam, and " +
        "made eye contact with the ceiling fan for a worrying amount of time.",
    },
    {
      id: "2026-04-09-stretches",
      taken: "2026-04-09T16:35:03",
      image: "images/05-afternoon-stretches.jpg",
      title: "Week 1: Afternoon Stretches",
      alt: "Kitten mid-stretch with paws out in front.",
      body:
        "Caught between stretches. New body, new paws, still figuring out " +
        "what they all do. She fell over once. We will never speak of it.",
    },
    {
      id: "2026-04-09-warming",
      taken: "2026-04-09T16:35:04",
      image: "images/06-warming-up-to-us.jpg",
      title: "Week 1: Warming Up to Us",
      alt: "Edie, eyes half closed, purring on a knit blanket.",
      body:
        "The purr kicked on today and it has not turned off since. We're " +
        "pretty sure there's a small tractor inside her.",
    },
    {
      id: "2026-04-11-zoomies",
      taken: "2026-04-11T15:23:53",
      image: "images/07-weekend-zoomies-prep.jpg",
      title: "Weekend Zoomies, Prep Phase",
      alt: "Kitten in a low crouch, eyes laser-focused on something off camera.",
      body:
        "This is the Look. The Look comes right before three laps of the " +
        "apartment, one rug skid, and a dramatic dive under the bed.",
    },
    {
      id: "2026-04-11-tour",
      taken: "2026-04-11T15:23:55",
      image: "images/08-official-house-tour.jpg",
      title: "Official House Tour, Chapter 1",
      alt: "Edie on the floor, looking up inquisitively.",
      body:
        "Today she discovered that if she stands at the door and yells, " +
        "the door stays closed. She is undeterred. Tomorrow she tries again.",
    },
    {
      id: "2026-04-18-two-week",
      taken: "2026-04-18T20:15:25",
      image: "images/09-two-week-check-in.jpg",
      title: "Two Weeks In",
      alt: "Edie sitting up on a chair, alert and looking around.",
      body:
        "Two weeks home. We have lost: one hair tie, two bottle caps, and " +
        "our ability to refer to any piece of furniture by its original name " +
        "(the couch is now 'the boat,' the chair is 'the throne,' and the " +
        "bookshelf is 'the parkour course').",
    },
    {
      id: "2026-04-18-biscuits",
      taken: "2026-04-18T22:14:43",
      image: "images/10-bedtime-biscuits.jpg",
      title: "Bedtime Biscuits",
      alt: "Edie kneading a fuzzy blanket with her front paws.",
      body:
        "Every night around ten, she climbs onto the blanket and begins " +
        "the Ceremonial Making of the Biscuits. Eyes closed. Deeply focused. " +
        "Small paws, big mission.",
    },
    {
      id: "2026-04-18-sleepy",
      taken: "2026-04-18T22:14:44",
      image: "images/11-sleepy-eyes.jpg",
      title: "Sleepy Eyes",
      alt: "Close-up of Edie's face with her eyes half closed.",
      body:
        "Post-biscuit drowsiness, also known as The Melt. She is 70% " +
        "gravity at this point.",
    },
    {
      id: "2026-04-19-sunbeam",
      taken: "2026-04-19T15:24:59",
      image: "images/12-sunday-sunbeam.jpg",
      title: "Sunday in a Sunbeam",
      alt: "Edie curled up in a patch of sunlight on the floor.",
      body:
        "Sundays are for sunbeams. She found the one square foot of " +
        "afternoon sun in the whole apartment and claimed it by divine right.",
    },
    {
      id: "2026-04-21-window",
      taken: "2026-04-21T18:20:52",
      image: "images/13-window-watching.jpg",
      title: "Window Watching",
      alt: "Edie by a window, ears perked, watching something outside.",
      body:
        "There is a bird. She knows the bird. The bird knows her. Every " +
        "evening at six, they meet at the window and stare. Neither has " +
        "blinked first in four days.",
    },
    {
      id: "2026-04-22-snuggles",
      taken: "2026-04-22T22:12:59",
      image: "images/14-late-night-snuggles.jpg",
      title: "Late-Night Snuggles",
      alt: "Edie tucked under a blanket, curled into a small loaf.",
      body:
        "The last photo of the week. She climbed onto the blanket, turned " +
        "around four times, and folded herself into a loaf so perfect you " +
        "could have mailed it. Good night, little girl.",
    },
  ];

  // ── Helpers ────────────────────────────────────────────
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function fmtTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function ageAt(iso) {
    const taken = new Date(iso);
    const ageMs = taken - DOB;
    const weeks = Math.floor(ageMs / (7 * MS_PER_DAY));
    const daysHome = Math.max(0, Math.floor((taken - GOTCHA_DAY) / MS_PER_DAY));
    if (daysHome === 0) return `${weeks} weeks old · Day 1 home`;
    return `${weeks} weeks old · Day ${daysHome + 1} home`;
  }

  function escape(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Comments store (localStorage) ──────────────────────
  const STORAGE_PREFIX = "edie-diary:comments:";

  function readComments(postId) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + postId);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeComments(postId, comments) {
    try {
      localStorage.setItem(STORAGE_PREFIX + postId, JSON.stringify(comments));
    } catch (e) {
      /* storage full or disabled — fail silently */
    }
  }

  function renderComments(postId, listEl) {
    const comments = readComments(postId);
    listEl.innerHTML = "";
    comments
      .slice()
      .sort((a, b) => a.ts - b.ts)
      .forEach((c) => {
        const li = document.createElement("li");
        li.className = "comment";
        li.innerHTML =
          '<div class="comment-head">' +
          '<span class="comment-name">' + escape(c.name) + "</span>" +
          '<span class="comment-time">' + new Date(c.ts).toLocaleString() + "</span>" +
          "</div>" +
          '<p class="comment-body"></p>';
        li.querySelector(".comment-body").textContent = c.body;
        listEl.appendChild(li);
      });
  }

  function wireForm(form, listEl, postId) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const body = (data.get("body") || "").toString().trim();
      if (!name || !body) return;
      const comments = readComments(postId);
      comments.push({ name: name, body: body, ts: Date.now() });
      writeComments(postId, comments);
      renderComments(postId, listEl);
      form.reset();
      const textarea = form.querySelector("textarea");
      if (textarea) textarea.focus();
    });
  }

  // ── Timeline rendering ─────────────────────────────────
  function renderPost(post) {
    const li = document.createElement("li");
    li.className = "post";
    li.id = "post-" + post.id;

    li.innerHTML =
      '<p class="post-date">' +
        '<time datetime="' + post.taken + '">' + fmtDate(post.taken) + "</time>" +
        " · <span class=\"post-age\">" + escape(ageAt(post.taken)) + "</span>" +
      "</p>" +
      '<h3 class="post-title">' + escape(post.title) + "</h3>" +
      '<figure class="post-figure" data-full="' + post.image + '" data-caption="' + escape(post.title) + '">' +
        '<img src="' + post.image + '" alt="' + escape(post.alt) + '" loading="lazy" />' +
      "</figure>" +
      '<div class="post-body"><p></p></div>' +
      '<p class="post-meta">Photo taken at ' + fmtTime(post.taken) + '.</p>' +
      '<div class="comments">' +
        '<h4>Comments</h4>' +
        '<ul class="comment-list" data-post-id="' + post.id + '"></ul>' +
        '<form class="comment-form" data-post-id="' + post.id + '" autocomplete="off">' +
          '<div class="row">' +
            '<label><span>Name</span>' +
              '<input type="text" name="name" required maxlength="40" placeholder="Your name" />' +
            '</label>' +
          '</div>' +
          '<label><span>Comment</span>' +
            '<textarea name="body" required maxlength="600" rows="2" placeholder="Leave a note on this photo…"></textarea>' +
          '</label>' +
          '<button type="submit">Post comment</button>' +
        '</form>' +
      '</div>';

    // Use textContent so any hyphens/apostrophes in the body render correctly.
    li.querySelector(".post-body p").textContent = post.body;

    const listEl = li.querySelector(".comment-list");
    const formEl = li.querySelector(".comment-form");
    renderComments(post.id, listEl);
    wireForm(formEl, listEl, post.id);

    return li;
  }

  function render() {
    const list = document.getElementById("timeline-list");
    if (!list) return;
    const sorted = POSTS.slice().sort(
      (a, b) => new Date(a.taken) - new Date(b.taken)
    );
    const frag = document.createDocumentFragment();
    sorted.forEach((p) => frag.appendChild(renderPost(p)));
    list.appendChild(frag);

    // Wire up the guestbook
    const gbForm = document.querySelector('.comment-form[data-post-id="__guestbook__"]');
    const gbList = document.querySelector('.comment-list[data-post-id="__guestbook__"]');
    if (gbForm && gbList) {
      renderComments("__guestbook__", gbList);
      wireForm(gbForm, gbList, "__guestbook__");
    }

    initLightbox();
  }

  // ── Lightbox ───────────────────────────────────────────
  function initLightbox() {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const cap = document.getElementById("lightbox-caption");
    const close = lb.querySelector(".lightbox-close");

    function open(src, caption) {
      img.src = src;
      cap.textContent = caption || "";
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    }
    function dismiss() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      img.src = "";
    }

    document.querySelectorAll(".post-figure").forEach((fig) => {
      fig.addEventListener("click", function () {
        open(fig.dataset.full, fig.dataset.caption);
      });
    });
    close.addEventListener("click", dismiss);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) dismiss();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") dismiss();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
