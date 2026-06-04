(function () {
  var yearTarget = document.querySelector("[data-year]");
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      return target ? { link: link, target: target } : null;
    })
    .filter(Boolean);

  var collapseEl = document.getElementById("mainNav");
  var collapse = collapseEl && window.bootstrap ? new window.bootstrap.Collapse(collapseEl, { toggle: false }) : null;

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (collapse && collapseEl.classList.contains("show")) {
        collapse.hide();
      }
    });
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          sections.forEach(function (section) {
            section.link.classList.toggle("active", section.target === entry.target);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section.target);
    });
  }
})();
