function load_js(url) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = url;
  head.appendChild(script);
  return script;
}

window.SideKiqPage = {
  loadScript() {
    script = load_js("https://www.gstatic.com/firebasejs/5.9.3/firebase.js");
    script.addEventListener('load', function () {
      var config = {
        apiKey: "AIzaSyAV55iE69n_GXKgRW2ZkvxTqbpobG60jzo",
        authDomain: "hungk-7f1fa.firebaseapp.com",
        databaseURL: "https://hungk-7f1fa.firebaseio.com",
        projectId: "hungk-7f1fa",
        storageBucket: "hungk-7f1fa.appspot.com",
        messagingSenderId: "757765893348"
      };
      firebase.initializeApp(config);

      window.SideKiqPage.database = firebase.database();
      window.SideKiqPage.rootref = window.SideKiqPage.database.ref("/");
      window.SideKiqPage.reportsref = window.SideKiqPage.database.ref("/reports");
      window.SideKiqPage.reports;
      window.SideKiqPage.reportsref.on('value', function (snap) {
        window.SideKiqPage.reports = snap.val();
      });
    });
  },

  get() {
    let processed = document.querySelector('.processed .count').textContent;
    processed = parseInt(processed.replace(/,/g, ""));

    let enqueued = document.querySelector('.enqueued .count').textContent;
    enqueued = parseInt(enqueued.replace(/,/g, ""));

    return {
      processed,
      enqueued
    };
  },

  update(processed, enqueued) {
    var index = window.SideKiqPage.reports.length;
    var created_at = new Date().getTime();
    var new_reportref = window.SideKiqPage.database.ref("reports/" + index);
    return new_reportref.set({
      processed,
      enqueued,
      created_at
    });
  }
}
