(function () {
  var moon = document.getElementById('cl-moon');
  var lit = document.getElementById('cl-lit');
  var shade = document.getElementById('cl-shade');
  var eclipseEl = document.getElementById('cl-eclipse');
  var logo = document.getElementById('cl-logo');
  var bulbGlow = document.getElementById('cl-bulb-glow');
  var filament = document.getElementById('cl-filament');

  if (!moon) return; // loader not present on this page

  var startTime = null;
  var running = true;
  var raf;

  function animate(now) {
    if (!running) return;
    if (!startTime) startTime = now;
    var elapsed = now - startTime;

    var period = 3600;
    var a = 186, b = 64;
    var tilt = 20 * Math.PI / 180;
    var t = (elapsed % period) / period * Math.PI * 2;
    var cosT = Math.cos(t), sinT = Math.sin(t);
    var x0 = a * cosT, y0 = b * sinT;
    var moonX = x0 * Math.cos(tilt) - y0 * Math.sin(tilt);
    var moonY = x0 * Math.sin(tilt) + y0 * Math.cos(tilt);
    var scale = 0.86 + 0.07 * (1 - sinT);
    var isBehind = sinT > 0;

    var sunX = 0, sunY = 165;
    var lvx = sunX - moonX, lvy = sunY - moonY;
    var ld = Math.hypot(lvx, lvy) || 1;
    lvx /= ld; lvy /= ld;

    var md = Math.hypot(moonX, moonY) || 1;
    var upAlign = -moonY / md;
    var ecl = isBehind ? (upAlign - 0.25) / 0.75 : 0;
    ecl = Math.max(0, Math.min(1, ecl));
    ecl = ecl * ecl * (3 - 2 * ecl);

    moon.style.transform = 'translate(calc(-50% + ' + moonX.toFixed(2) + 'px), calc(-50% + ' + moonY.toFixed(2) + 'px)) scale(' + scale.toFixed(4) + ')';
    moon.style.zIndex = isBehind ? '2' : '4';

    if (lit) {
      var lx = 50 + lvx * 42, ly = 50 + lvy * 42;
      var litStr = (0.55 * (1 - ecl)).toFixed(3);
      lit.style.background = 'radial-gradient(circle at ' + lx.toFixed(1) + '% ' + ly.toFixed(1) + '%, rgba(255,243,222,' + litStr + ') 0%, rgba(255,240,215,' + (litStr * 0.4).toFixed(3) + ') 32%, transparent 58%)';
    }
    if (shade) {
      var sx = 50 - lvx * 46, sy = 50 - lvy * 46;
      shade.style.background = 'radial-gradient(circle at ' + sx.toFixed(1) + '% ' + sy.toFixed(1) + '%, rgba(22,16,30,0.82) 0%, rgba(22,16,30,0.34) 45%, transparent 70%)';
    }
    if (eclipseEl) eclipseEl.style.opacity = ecl.toFixed(3);

    if (logo) {
      var s = elapsed / 1000;
      var fx = Math.sin(s * 0.7) * 7 + Math.sin(s * 1.9 + 1.3) * 2.5;
      var fy = Math.sin(s * 0.52 + 2.1) * 9 + Math.cos(s * 1.3) * 2;
      var rot = Math.sin(s * 0.45) * 1.6;
      logo.style.transform = 'translate(calc(-50% + ' + fx.toFixed(2) + 'px), calc(-50% + ' + fy.toFixed(2) + 'px)) rotate(' + rot.toFixed(2) + 'deg)';
    }

    var s2 = elapsed / 1000;
    var fl = 0.5 * Math.sin(s2 * 13) + 0.3 * Math.sin(s2 * 27.3 + 1.7) + 0.2 * Math.sin(s2 * 41.1 + 0.4);
    var dip = Math.max(0, Math.sin(s2 * 3.1 + 2)) > 0.985 ? 1 : 0;

    if (filament) {
      var fop = Math.max(0.55, 0.85 + 0.15 * fl - 0.45 * dip);
      filament.style.opacity = fop.toFixed(3);
      filament.style.transform = 'translate(-50%,-50%) scale(' + (0.92 + 0.12 * fl).toFixed(3) + ')';
    }
    if (bulbGlow) {
      var gop = Math.max(0.22, 0.55 + 0.32 * fl - 0.4 * dip);
      bulbGlow.style.opacity = gop.toFixed(3);
      bulbGlow.style.transform = 'translate(-50%,-50%) scale(' + (0.9 + 0.16 * fl).toFixed(3) + ')';
    }

    raf = requestAnimationFrame(animate);
  }

  raf = requestAnimationFrame(animate);

  // Stop when loader is removed from DOM
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.removedNodes.forEach(function (n) {
        if (n.id === 'cm-loader') {
          running = false;
          cancelAnimationFrame(raf);
          observer.disconnect();
        }
      });
    });
  });
  observer.observe(document.body, { childList: true });
}());
