(function() {
  try {
    var d = JSON.stringify({
      path: location.pathname,
      title: document.title,
      referrer: document.referrer
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', d);
    } else {
      var x = new XMLHttpRequest();
      x.open('POST', '/api/track', true);
      x.setRequestHeader('Content-Type', 'application/json');
      x.send(d);
    }
  } catch(e) {}
})();
