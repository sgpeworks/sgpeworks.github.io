/* SG Precision Engineering — site interactions */
(function () {
  "use strict";

  // ---- Year in footer ----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Mobile nav ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ---- Header shadow on scroll ----
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 12 ? "0 8px 30px -14px rgba(0,0,0,.5)" : "none";
    });
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      item.closest(".faq-list").querySelectorAll(".faq-item").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ---- Upload drop zones ----
  document.querySelectorAll(".upload-drop").forEach(function (drop) {
    var input = drop.querySelector("input[type=file]");
    var label = drop.querySelector(".upload-filename");
    if (!input) return;
    drop.addEventListener("click", function (e) {
      if (e.target !== input) input.click();
    });
    ["dragenter", "dragover"].forEach(function (evt) {
      drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.add("drag"); });
    });
    ["dragleave", "drop"].forEach(function (evt) {
      drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.remove("drag"); });
    });
    drop.addEventListener("drop", function (e) {
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        updateFileLabel();
      }
    });
    input.addEventListener("change", updateFileLabel);
    function updateFileLabel() {
      if (!label) return;
      if (input.files && input.files.length) {
        var names = Array.prototype.map.call(input.files, function (f) { return f.name; }).join(", ");
        label.textContent = "Selected: " + names;
      } else {
        label.textContent = "";
      }
    }
  });

  // ---- AJAX form submit (FormSubmit.co — no backend required) ----
  // FormSubmit requires the dedicated /ajax/ endpoint for fetch-based
  // submissions (the plain endpoint expects a full-page POST + redirect
  // and can get blocked by CORS when called via fetch). We derive the
  // ajax URL from the form's normal action so the form still degrades
  // to a working full-page POST if JavaScript is unavailable.
  document.querySelectorAll("form[data-ajax]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      var msg = form.querySelector(".form-msg");
      if (!form.checkValidity()) {
        return; // let native validation messages show
      }
      e.preventDefault();
      var submitBtn = form.querySelector("button[type=submit]");
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

      var ajaxUrl = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

      fetch(ajaxUrl, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            window.location.href = "thank-you.html";
          } else {
            throw new Error("submit-failed");
          }
        })
        .catch(function () {
          if (msg) {
            msg.textContent = "Something went wrong sending the form. Please call +91 80105 12390 or email sgpeworks@gmail.com directly.";
            msg.classList.add("show", "error");
          }
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        });
    });
  });
})();
