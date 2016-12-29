(function($) {

  $.fn.fancyrange = function() {
    return this.each(function() {
      $(this).hide();

      var mode = $(this).data("mode") || "normal";
      var label = $(this).data("label") || "";
      var isDrag = false;
      var minval = Number($(this).prop("min"));
      var maxval = Number($(this).prop("max"));
      var step = parseFloat($(this).prop('step')) || 1.0;
      var decimal_digits = 0;
      var rangeElem;
      var x_str = step.toString().split('.')[1];
      if (x_str !== undefined) {
        decimal_digits = x_str.length;
      }

      if (mode == "normal") {

        rangeElem = $(this);

        if (minval < 0) {
          $('<div class="ctrlBar" ><div class="valBarminus"></div><div class="valBarplus"></div></div>').insertAfter($(this));
          var ctrlbar = $(this).next();
          var valbarminus = ctrlbar.find(".valBarminus");
          var valbarplus = ctrlbar.find(".valBarplus");

          var updatebar = function(x) {

            var position = x - ctrlbar.offset().left;
            var percentage = 100 * position / ctrlbar.width();

            if (percentage > 100) {
              percentage = 100;
            }
            if (percentage < 0) {
              percentage = 0;
            }
            if (percentage < 50) {
              var percentminus = 50 - percentage;

              valbarminus.css('width', percentminus + '%');
              valbarplus.css('width', 0);
              var pc = (minval * percentminus / 50).toFixed(decimal_digits);
              rangeElem.val(pc);
              ctrlbar.attr('data-content', label + " " + pc);
            } else if (percentage > 50) {
              var percentplus = percentage - 50;

              valbarplus.css('width', percentplus + '%');
              valbarminus.css('width', 0);
              var pc = (maxval * percentplus / 50).toFixed(decimal_digits);
              rangeElem.val(pc);
              ctrlbar.attr('data-content', label + " " + pc);
            } else if (percentage == 50) {
              valbarplus.css('width', "1px");
              valbarminus.css('width', "1px");
              rangeElem.val(0);
              ctrlbar.attr('data-content', label + " " + 0);
            }

          };

          ctrlbar.mousedown(function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.pageX);
            return false;
          });
          $(document).mouseup(function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.pageX);
            }
            return false;
          });
          $(document).mousemove(function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.pageX);
            }
            return false;
          });
          ctrlbar.on('touchstart', function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.originalEvent.touches[0].pageX);
            return false;
          });
          $(document).on('touchmove', function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.originalEvent.touches[0].pageX);

            }
            return false;
          });
          $(document).on('touchend ', function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.originalEvent.touches[0].pageX);
            }
            return false;
          });

        } else {

          $('<div class="ctrlBar"><div class="valBar"></div></div>').insertAfter($(this));
          var ctrlbar = $(this).next();
          var valbar = ctrlbar.find(".valBar");

          var updatebar = function(x) {

            var position = x - ctrlbar.offset().left;
            var percentage = 100 * position / ctrlbar.width();

            if (percentage > 100) {
              percentage = 100;
            }
            if (percentage < 0) {
              percentage = 0;
            }

            valbar.css('width', percentage + '%');
            var pc = (maxval * percentage / 100).toFixed(decimal_digits);
            rangeElem.val(pc);
            ctrlbar.attr('data-content', label + " " + pc);
          };

          ctrlbar.mousedown(function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.pageX);
            return false;
          });
          $(document).mouseup(function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.pageX);
            }
            return false;
          });
          $(document).mousemove(function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.pageX);
            }
            return false;
          });
          ctrlbar.on('touchstart', function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.originalEvent.touches[0].pageX);
            return false;
          });
          $(document).on('touchmove ', function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.originalEvent.touches[0].pageX);

            }
            return false;
          });
          $(document).on('touchend ', function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.originalEvent.touches[0].pageX);
            }
            return false;
          });

        }
      } else if (mode == "vertical") {

        rangeElem = $(this);

        if (minval < 0) {
          $('<div class="ctrlBar-vertical"><div class="valBarplus-vertical"></div><div class="valBarminus-vertical"></div></div>').insertAfter($(this));
          var ctrlbar = $(this).next();
          var valbarminus = ctrlbar.find(".valBarminus-vertical");
          var valbarplus = ctrlbar.find(".valBarplus-vertical");

          var updatebar = function(x) {

            var position = x - ctrlbar.offset().top;

            var percentage = 100 * position / ctrlbar.height();
            var percentage = 100 - percentage;

            if (percentage > 100) {
              percentage = 100;
            }
            if (percentage < 0) {
              percentage = 0;
            }
            if (percentage < 50) {
              var percentminus = 50 - percentage;

              valbarminus.css('height', percentminus + '%');
              valbarplus.css('height', 0);
              var pc = (minval * percentminus / 50).toFixed(decimal_digits);
              rangeElem.val(pc);
              ctrlbar.attr('data-content', label + " " + pc);
            } else if (percentage > 50) {
              var percentplus = percentage - 50;

              valbarplus.css('height', percentplus + '%');
              valbarminus.css('height', 0);
              var pc = (maxval * percentplus / 50).toFixed(decimal_digits);
              rangeElem.val(pc);
              ctrlbar.attr('data-content', label + " " + pc);
            } else if (percentage == 50) {
              valbarplus.css('height', "1px");
              valbarminus.css('height', "1px");
              rangeElem.val(0);
              ctrlbar.attr('data-content', label + " " + 0);
            }

          };

          ctrlbar.mousedown(function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.pageY);
            return false;
          });
          $(document).mouseup(function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.pageY);
            }
            return false;
          });
          $(document).mousemove(function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.pageY);
            }
            return false;
          });

          ctrlbar.on('touchstart', function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.originalEvent.touches[0].pageY);
            return false;
          });
          $(document).on('touchmove', function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.originalEvent.touches[0].pageY);

            }
            return false;
          });
          $(document).on('touchend ', function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.originalEvent.touches[0].pageY);
            }
            return false;
          });

        } else {
          $('<div class="ctrlBar-vertical"><div class="valBar-vertical"></div></div>').insertAfter($(this));
          var ctrlbar = $(this).next();
          var valbar = ctrlbar.find(".valBar-vertical");

          var updatebar = function(x) {

            var position = x - ctrlbar.offset().top;

            var percentage = 100 * position / ctrlbar.height();
            var percentage = 100 - percentage;

            if (percentage > 100) {
              percentage = 100;
            }
            if (percentage < 0) {
              percentage = 0;
            }

            valbar.css('height', percentage + '%');
            var pc = (maxval * percentage / 100).toFixed(decimal_digits);
            rangeElem.val(pc);
            ctrlbar.attr('data-content', label + " " + pc);
          };

          ctrlbar.mousedown(function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.pageY);
            return false;
          });
          $(document).mouseup(function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.pageY);
            }
            return false;
          });
          $(document).mousemove(function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.pageY);
            }
            return false;
          });
          ctrlbar.on('touchstart', function(e) {
            e.preventDefault();
            isDrag = true;
            updatebar(e.originalEvent.touches[0].pageY);
            return false;
          });
          $(document).on('touchmove ', function(e) {
            e.preventDefault();
            if (isDrag) {
              updatebar(e.originalEvent.touches[0].pageY);

            }
            return false;
          });
          $(document).on('touchend ', function(e) {
            e.preventDefault();
            if (isDrag) {
              isDrag = false;
              updatebar(e.originalEvent.touches[0].pageY);
            }
            return false;
          });
        }

      }

      rangeElem.on("input change", function() {
        if (mode == "normal") {
          if (minval < 0) {
            var val = Number(rangeElem.val());

            if (val < 0) {
              var percentage = val / minval * 50;
              valbarminus.css('width', percentage + '%');
              valbarplus.css("width", 0);
            } else if (val > 0) {
              var percentage = val * maxval / 200;
              valbarplus.css('width', percentage + '%');
              valbarminus.css("width", 0);
            } else if (val === 0) {
              valbarplus.css('width', "1px");
              valbarminus.css('width', "1px");
            }

          } else {
            var val = Number(rangeElem.val());
            var percentage = 100 * (val / maxval);
            valbar.css('width', percentage + '%');
          }
        } else if (mode == "vertical") {

          if (minval < 0) {
            var val = Number(rangeElem.val());

            if (val < 0) {
              var percentage = val / minval * 50;
              valbarminus.css('height', percentage + '%');
              valbarplus.css("height", 0);
            } else if (val > 0) {
              var percentage = 50 * val / maxval;
              valbarplus.css('height', percentage + '%');
              valbarminus.css("height", 0);
            } else if (val === 0) {
              valbarplus.css('height', "1px");
              valbarminus.css('height', "1px");
            }

          } else {
            var val = Number(rangeElem.val());
            var percentage = 100 * (val / maxval);
            valbar.css('height', percentage + '%');

          }

        }
        ctrlbar.attr('data-content', label + " " + rangeElem.val());
      });

      $(this).trigger("change");
      $(this).next().bind('DOMMouseScroll', function(e) {
        var current = Number(rangeElem.val());
        if (e.originalEvent.detail > 0) {
          rangeElem.val(current - step);
          if (current <= minval) {
            rangeElem.val(minval);
          }
        } else {
          rangeElem.val(current + step);
          if (current >= maxval) {
            rangeElem.val(maxval);
          }
        }
        rangeElem.trigger('change');

        return false;
      });
      $(this).next().bind('mousewheel', function(e) {
        var current = Number(rangeElem.val());
        if (e.originalEvent.wheelDelta < 0) {
          rangeElem.val(current - step);
          if (Number(current) <= minval) {
            rangeElem.val(minval);
          }

        } else {
          rangeElem.val(current + step);
          if (current >= maxval) {
            rangeElem.val(maxval);
          }
        }
        rangeElem.trigger('change');
        return false;
      });
    });
  };

  $.fn.fancyknob = function(options) {
    return this.each(function() {
      $(this).hide();
      $('<div class="knob-surround"><div class="knob"></div><div class="ticks"><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div></div><div class="knoblabel"></div><div class="knobvalue"></div></div>').insertAfter($(this));
      var angle = 0,
        minangle = 0,
        maxangle = 280,
        rangeelem = $(this),
        minval = parseFloat($(this).prop('min')),
        maxval = parseFloat($(this).prop('max')),
        knob = $(this).next().find('.knob'),
        doc = $(document),
        step = parseFloat($(this).prop('step')) || 1.0,
        a, b, deg, tmp,
        rad2deg = 180 / Math.PI,
        startDeg = -1,
        currentDeg = 0,
        rotation = 0,
        lastDeg = 0,
        decimal_digits = 0,
        x_str = step.toString().split('.')[1];
      if (x_str !== undefined) {
        decimal_digits = x_str.length;
      }
      $(this).next().find(".knoblabel").html($(this).data("label"));
      $(this).on("input change", function() {
        $(this).next().find(".knobvalue").html($(this).val());
        if (minval < 0) {
          if (parseInt($(this).val()) < 0) {
            var i = Math.abs(minval) + parseInt($(this).val());
            angle = Math.round((i / maxval) * 280) / 2;
          } else {
            var i = parseInt($(this).val());
            angle = 140 + (Math.round((i / maxval) * 280) / 2);
          }
        } else {
          angle = Math.round(($(this).val() / maxval) * 280);
        }
        setAngle($(this).next(), false);
      });

      function moveKnob(direction, elem, mode) {
        if (direction == 'up') {
          if (angle <= maxangle) {
            if (mode) {
              angle = angle + 10;
              setAngle(elem, true);
            } else {
              var t = parseFloat(rangeelem.val()) + step;
              if (t <= minval) {
                t = minval;
              } else if (t >= maxval) {
                t = maxval;
              }
              rangeelem.val(t).trigger('change');
            }
            if (angle >= maxangle) {
              angle = maxangle;
              setAngle(elem, true);
            }
          }
        } else if (direction == 'down') {
          if ((angle) >= minangle) {
            if (mode) {
              angle = angle - 10;
              setAngle(elem, true);
            } else {
              var t = parseFloat(rangeelem.val()) - step;
              if (t <= minval) {
                t = minval;
              } else if (t >= maxval) {
                t = maxval;
              }
              rangeelem.val(t).trigger('change');
            }
            if (angle <= minangle) {
              angle = minangle;
              setAngle(elem, true);
            }
          }
        }

      }
      $(this).next().bind('DOMMouseScroll', function(e) {

        if (e.originalEvent.detail > 0) {
          moveKnob('down', $(this), false);
        } else {
          moveKnob('up', $(this), false);
        }
        return false;
      });
      $(this).next().bind('mousewheel', function(e) {
        if (e.originalEvent.wheelDelta < 0) {
          moveKnob('down', $(this));
        } else {
          moveKnob('up', $(this));
        }
        return false;
      });
      knob.on('mousedown', function(e) {

        e.preventDefault();

        var offset = $(this).offset();
        var center = {
          y: offset.top + knob.height() / 2,
          x: offset.left + knob.width() / 2
        };
        var a, b, deg, tmp,
          rad2deg = 180 / Math.PI;
        doc.on('mousemove.rem ', function(e) {
          a = center.y - e.pageY;
          b = center.x - e.pageX;
          deg = Math.atan2(a, b) * rad2deg;
          if (deg < 0) {
            deg = 360 + deg;
          }
          if (startDeg == -1) {
            startDeg = deg;
          }
          tmp = Math.floor((deg - startDeg) + rotation);
          if (tmp < 0) {
            tmp = 360 + tmp;
          } else if (tmp > 280) {
            tmp = tmp % 360;
          }
          if (Math.abs(tmp - lastDeg) > 180) {
            return false;
          }
          angle = tmp;
          if (angle > maxangle) {
            angle = maxangle;
          }
          setAngle(knob.parent(), true);
          lastDeg = tmp;
        });
        doc.on('mouseup.rem', function() {
          knob.off('.rem');
          doc.off('.rem');
          rotation = currentDeg;
          startDeg = -1;
        });
      });
      knob.on('touchstart', function(e) {

        e.preventDefault();

        var offset = $(this).offset();
        var center = {
          y: offset.top + knob.height() / 2,
          x: offset.left + knob.width() / 2
        };

        doc.on('touchmove.rem ', function(e) {
          a = center.y - e.originalEvent.touches[0].pageY;
          b = center.x - e.originalEvent.touches[0].pageX;
          deg = Math.atan2(a, b) * rad2deg;
          if (deg < 0) {
            deg = 360 + deg;
          }
          if (startDeg == -1) {
            startDeg = deg;
          }
          tmp = Math.floor((deg - startDeg) + rotation);
          if (tmp < 0) {
            tmp = 360 + tmp;
          } else if (tmp > 280) {
            tmp = tmp % 360;
          }
          if (Math.abs(tmp - lastDeg) > 180) {
            return false;
          }
          angle = tmp;
          if (angle > maxangle) {
            angle = maxangle;
          }
          setAngle(knob.parent(), true);
          lastDeg = tmp;
        });
        doc.on('touchend.rem', function() {
          knob.off('.rem');
          doc.off('.rem');
          rotation = currentDeg;
          startDeg = -1;
        });
      });

      function setAngle(elem, mode) {
        elem.find('.knob').css({
          '-moz-transform': 'rotate(' + angle + 'deg)',
          '-webkit-transform': 'rotate(' + angle + 'deg)',
          '-o-transform': 'rotate(' + angle + 'deg)',
          '-ms-transform': 'rotate(' + angle + 'deg)',
          'transform': 'rotate(' + angle + 'deg)'
        });
        if (minval < 0) {
          if (angle < 135) {
            var anglepos = (Math.round(angle / 10));
            var activeTicks = Math.abs(anglepos - 14);
            elem.find('.tick').removeClass('activetick');
            for (var i = 0; i <= activeTicks; i++) {
              elem.find('.tick:eq(' + Math.round(14 + i) + ')').removeClass('activetick');
              elem.find('.tick:eq(' + Math.round(14 - i) + ')').addClass('activetick');
            }
          } else if (angle > 145) {
            var anglepos = (Math.round(angle / 10));
            var activeTicks = anglepos - 14;
            elem.find('.tick').removeClass('activetick');
            for (var i = 0; i <= activeTicks; i++) {
              elem.find('.tick:eq(' + Math.round(14 - i) + ')').removeClass('activetick');
              elem.find('.tick:eq(' + Math.round(14 + i) + ')').addClass('activetick');
            }

          } else {
            elem.find('.tick').removeClass('activetick');
            elem.find('.tick:eq(' + Math.round(14) + ')').addClass('activetick');
          }
        } else {
          var activeTicks = (Math.round(angle / 10) + 1);
          elem.find('.tick').removeClass('activetick');
          elem.find('.tick').slice(0, activeTicks).addClass('activetick');
          if (angle === 0) {
            elem.find('.tick').removeClass('activetick');
          }
        }
        var pc;
        if (mode) {
          if (minval < 0) {
            if (angle < 140) {
              pc = (angle / 140) * Math.abs(minval);
              pc = parseInt(minval) + Math.abs(pc);

            } else if (angle > 140) {
              pc = ((angle / 140) * maxval) - parseInt(maxval);

            } else {
              pc = 0;
            }
          } else {
            pc = (angle / 280) * maxval;
          }
          elem.prev().val(pc.toFixed(decimal_digits));
          elem.find(".knobvalue").html(pc.toFixed(decimal_digits));
        }
      }
      $(this).trigger('change');
    });
  };

  $.fn.dualrange = function(opt) {

    return this.each(function() {
      var isDragh1 = false;
      var isDragh2 = false;
      var cont = $(this);
      var id = cont.data('id');
      var step = cont.data('step');
      var minval = cont.data("min");
      var maxval = cont.data("max");
      var decimal_digits = 0;
      var x_str = step.toString().split('.')[1];
      if (x_str !== undefined) {
        decimal_digits = x_str.length;
      }

      cont.append('<input id="in_' + id + '" class="range1"  type="range" style="display:none;" min="' + minval + '" max="' + maxval + '" step="' + step + '" value="' + minval + '"><input id="out_' + id + '" class="range2" type="range" style="display:none;" min="' + minval + '" max="' + maxval + '" step="' + step + '" value="' + maxval + '"><div class="dualBar"><div  class="handle1"></div><div class="rangebg"></div><div  class="handle2" ></div></div>');

      var handle1 = cont.find('.handle1');
      var handle2 = cont.find('.handle2');
      var range1 = cont.find('.range1');
      var range2 = cont.find('.range2');

      var bg = cont.find('.rangebg');
      bg.css({
        "left": handle1.position().left,
        "right": handle2.position().left,
        "width": (handle2.position().left - handle1.position().left) + "px"
      });

      var updateh1 = function(x) {
        isDragh2 = false;

        var position = x - cont.offset().left;

        var percentage = 100 * position / cont.width();
        if (percentage < 0) {
          percentage = 0;
        }
        if (percentage > 100) {
          percentage = 100;
        }
        handle1.css({
          "left": percentage + '%'
        });
        if (handle1.offset().left >= handle2.offset().left) {
          handle2.css({
            "left": percentage + '%'
          });
        }
        var left = handle1.position().left;
        var right = handle2.position().left;
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });

        var pc = (maxval * percentage / 100).toFixed(decimal_digits);
        range1.val(pc);
        if (Number(range1.val()) >= Number(range2.val())) {
        range2.val(Number(range1.val()));
        }

      };
      var updateh2 = function(x) {
        isDragh1 = false;

        var position = x - cont.offset().left;

        var percentage = 100 * position / cont.width();
        if (percentage < 0) {
          percentage = 0;
        }
        if (percentage > 100) {
          percentage = 100;
        }

        handle2.css({
          "left": percentage + '%'
        });
        if (handle2.offset().left <= handle1.offset().left) {
          handle1.css({
            "left": percentage + '%'
          });
        }
        var left = handle1.position().left;
        var right = handle2.position().left;
        if (left < 0) {
          left = 0;
        }
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });

        var pc = (maxval * percentage / 100).toFixed(decimal_digits);
        range2.val(pc);
        if (Number(range1.val()) >= Number(range2.val())) {
          range1.val(Number(range2.val()));
        }

      };

      handle1.on('mousedown', function(e) {
        e.preventDefault();
        isDragh1 = true;

        updateh1(e.pageX);
      });
      handle2.on('mousedown', function(e) {
        e.preventDefault();
        isDragh2 = true;

        updateh2(e.pageX);
      });
      $(document).on('mouseup', function(e) {

        if (isDragh1) {
          isDragh1 = false;
          isDragh2 = false;
          updateh1(e.pageX);

        }
        if (isDragh2) {
          isDragh2 = false;
          isDragh1 = false;
          updateh2(e.pageX);
        }
      });

      $(document).on('mousemove', function(e) {
        if (isDragh1) {
          updateh1(e.pageX);

        } else if (isDragh2) {
          updateh2(e.pageX);
        }
      });

      handle1.on('touchstart', function(e) {
        e.preventDefault();
        isDragh1 = true;

        updateh1(e.pageX);
      });
      handle2.on('touchstart', function(e) {
        e.preventDefault();
        isDragh2 = true;

        updateh2(e.originalEvent.touches[0].pageX);
      });
      $(document).on('touchend', function(e) {

        if (isDragh1) {
          isDragh1 = false;
          isDragh2 = false;
          updateh1(e.originalEvent.touches[0].pageX);

        }
        if (isDragh2) {
          isDragh2 = false;
          isDragh1 = false;
          updateh2(e.originalEvent.touches[0].pageX);
        }
      });

      $(document).on('touchmove', function(e) {
        if (isDragh1) {
          updateh1(e.originalEvent.touches[0].pageX);

        } else if (isDragh2) {
          updateh2(e.originalEvent.touches[0].pageX);
        }
      });

      range1.on("input change", function() {

        var val = Number(range1.val());
        var percentage = 100 * (val / maxval);
        handle1.css('left', percentage + '%');

        if (Number(range1.val()) >= Number(range2.val())) {
       range2.val(Number(range1.val()));
          handle2.css('left', percentage + '%');

        }
        var left = handle1.position().left;
        var right = handle2.position().left;
        if (left < 0) {
          left = 0;
        }
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });
      });

      range2.on("input change", function() {
        var val = Number(range2.val());
        var percentage = 100 * (val / maxval);
        handle2.css('left', percentage + '%');

        if (Number(range1.val()) >= Number(range2.val())) {
         range1.val(Number(range2.val()));
          handle1.css('left', percentage + '%');
        }
        var left = handle1.position().left;
        var right = handle2.position().left;
        if (left < 0) {
          left = 0;
        }
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });
      });

    });

  };

})(jQuery);
