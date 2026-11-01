// Config do particles.js (inline; particlesJS.load exigiria servir o particles.json)
// Quem pede menos movimento no sistema vê as partículas paradas
var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        // Pré-definido: com move desligado (reduced motion) o particles.js desenha antes do init converter a cor
        "color_rgb_line": { "r": 255, "g": 255, "b": 255 },
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": !prefersReducedMotion,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

// Pausa o loop de animação quando o hero sai da tela (o canvas não fica visível no resto da página)
(function () {
  var container = document.getElementById('particles-js');
  var instance = window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;
  if (!container || !instance || !('IntersectionObserver' in window)) return;

  var paused = false;
  new IntersectionObserver(function (entries) {
    var visible = entries[0].isIntersecting;
    if (!visible && !paused) {
      cancelRequestAnimFrame(instance.fn.drawAnimFrame);
      paused = true;
    } else if (visible && paused) {
      paused = false;
      instance.fn.vendors.draw(); // reagenda o próprio requestAnimFrame se move.enable
    }
  }).observe(container);
})();