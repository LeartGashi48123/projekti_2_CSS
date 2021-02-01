(function() {
  var block, i, j, len, len1, ref, ref1, responsiveMenu, slideToggler, trigger,
    indexOf = [].indexOf;

  (function() {
    var footer;
    footer = '<footer id="footer" role="contentinfo"> <div class="container"> <h3 class="footer-title"> <a href="https://codepen.io/collection/XRoxGR" target="_blank">Calibration template</a> </h3> <p class="footer-entry"> <a href="https://mobilemarkup.com" target="_blank">mobileMarkup.com</a> </p> </div> </footer>';
    return document.body.insertAdjacentHTML('beforeend', footer);
  })();

  (function() {
    var logo, logo_css;
    logo = '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>codepen-logo</title><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM7.139 21.651l1.35-1.35a.387.387 0 0 0 0-.54l-3.49-3.49a.387.387 0 0 0-.54 0l-1.35 1.35a.39.39 0 0 0 0 .54l3.49 3.49a.38.38 0 0 0 .54 0zm6.922.153l2.544-2.543a.722.722 0 0 0 0-1.018l-6.582-6.58a.722.722 0 0 0-1.018 0l-2.543 2.544a.719.719 0 0 0 0 1.018l6.58 6.579c.281.28.737.28 1.019 0zm14.779-5.85l-7.786-7.79a.554.554 0 0 0-.788 0l-5.235 5.23a.558.558 0 0 0 0 .789l7.79 7.789c.216.216.568.216.785 0l5.236-5.236a.566.566 0 0 0 0-.786l-.002.003zm-3.89 2.806a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626z" fill="#FFF" fill-rule="evenodd"/></svg>';
    logo_css = '.mM{display:block;border-radius:50%;box-shadow:0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);position:fixed;bottom:1em;right:1em;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transition:all 240ms ease-in-out;transition:all 240ms ease-in-out;z-index:9999;opacity:0.75}.mM svg{display:block}.mM:hover{opacity:1;-webkit-transform:scale(1.125);transform:scale(1.125)}';
    document.head.insertAdjacentHTML('beforeend', '<style>' + logo_css + '</style>');
    document.body.insertAdjacentHTML('beforeend', '<a href="https://codepen.io/mican/" target="_blank" class="mM">' + logo + '</a>');
  })();

  slideToggler = class slideToggler {
    constructor(el1) {
      this.getHeight = this.getHeight.bind(this);
      this.toggle = this.toggle.bind(this);
      this.el = el1;
      if (!this.el) {
        return;
      }
      window.addEventListener('resize', this.getHeight);
    }

    getHeight() {
      var clone;
      clone = this.el.cloneNode(true);
      clone.style.cssText = 'visibility: hidden; display: block; margin: -999px 0';
      this.height = (this.el.parentNode.appendChild(clone)).clientHeight;
      this.el.parentNode.removeChild(clone);
      return this.height;
    }

    toggle(time) {
      var currHeight, disp, el, end, init, repeat, start;
      this.getHeight();
      time || (time = this.height / 3 + 150);
      currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none');
      [start, end] = currHeight > this.height / 2 ? [this.height, 0] : [0, this.height];
      disp = end - start;
      el = this.el;
      this.el.classList[end === 0 ? 'remove' : 'add']('open');
      this.el.style.cssText = "overflow: hidden; display: block;";
      init = (new Date()).getTime();
      repeat = function() {
        var instance, ref, repeatLoop, step;
        instance = (new Date()).getTime() - init;
        step = start + disp * instance / time;
        if (instance <= time) {
          el.style.height = step + 'px'; // if Math.floor(step) in [start..end]
        } else {
          el.style.cssText = `display: ${end === 0 ? 'none' : 'block'}`;
        }
        repeatLoop = requestAnimationFrame(repeat);
        if (ref = Math.floor(step), indexOf.call((function() {
          var results = [];
          for (var i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--){ results.push(i); }
          return results;
        }).apply(this), ref) < 0) {
          return cancelAnimationFrame(repeatLoop);
        }
      };
      return repeat();
    }

  };

  ref = document.querySelectorAll('.block');
  for (i = 0, len = ref.length; i < len; i++) {
    block = ref[i];
    block.toggler = new slideToggler(block);
  }

  ref1 = document.querySelectorAll('button');
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    trigger = ref1[j];
    trigger.addEventListener('click', function() {
      var ref2;
      return (ref2 = this.parentNode.querySelector('.block').toggler) != null ? ref2.toggle() : void 0;
    });
  }

  // slideToggler: https://codepen.io/mican/pen/wrNjVW 
  responsiveMenu = class responsiveMenu {
    constructor(nav, opt) {
      var base, k, l, len2, len3, len4, m, menu, menuToggle, ref2, ref3, ref4, sub, subMenu, subMenuToggle;
      this.createToggle = this.createToggle.bind(this);
      this.breaking = this.breaking.bind(this);
      this.opt = opt;
      (base = this.opt).breaking || (base.breaking = '640px');
      this.opt.maxBreaking = parseInt(this.opt.maxBreaking) || 1040;
      menu = nav.querySelector('.menu');
      if (!slideToggler) {
        slideToggler = class slideToggler {
          constructor(el1) {
            this.toggle = this.toggle.bind(this);
            this.el = el1;
            if (!this.el) {
              return;
            }
          }

          toggle() {
            this.el.classList.toggle('open');
            return this.el.style.cssText = `display: ${this.el.classList.contains('open') ? 'block' : 'none'}`;
          }

        };
      }
      ref2 = menu.querySelectorAll('ul');
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        sub = ref2[k];
        sub.toggler = new slideToggler(sub);
      }
      menuToggle = this.createToggle(nav, 'menu-toggle', 'Menu');
      menuToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('nav-open');
        return menuToggle.menu.classList.toggle('open', document.documentElement.classList.contains('nav-open'));
      });
      ref3 = menu.querySelectorAll('ul');
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        subMenu = ref3[l];
        subMenu.parentNode.classList.add('has-children');
        subMenuToggle = this.createToggle(subMenu, 'sub-menu-toggle', '+');
        subMenuToggle.addEventListener('click', function() {
          var len4, m, open, ref4, results;
          this.menu.toggler.toggle();
          ref4 = this.parentNode.parentNode.querySelectorAll('ul.open');
          results = [];
          for (m = 0, len4 = ref4.length; m < len4; m++) {
            open = ref4[m];
            if (open !== this.menu) {
              results.push(open.toggler.toggle());
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      }
      ref4 = menu.querySelectorAll('.has-children[class*=current] > ul');
      for (m = 0, len4 = ref4.length; m < len4; m++) {
        sub = ref4[m];
        sub.classList.add('open');
      }
      document.addEventListener('DOMContentLoaded', this.breaking);
      window.addEventListener('resize', this.breaking);
      setTimeout(this.breaking, 3000);
    }

    createToggle(menu, klass, label) {
      var toggle;
      toggle = menu.parentNode.querySelector(`.${klass}`) || document.createElement("button");
      toggle.classList.add(klass);
      toggle.appendChild(document.createTextNode(label));
      toggle.menu = menu.nodeName === 'UL' ? menu : menu.querySelector('.menu');
      return menu.parentNode.insertBefore(toggle, menu.nextSibling);
    }

    breaking() {
      var div, el, isMobile, k, len2, ref2, windowWidth;
      document.body.classList.remove('menu-mobile');
      document.body.classList.add('menu-desktop');
      div = document.createElement('div');
      div.style.cssText = `position: absolute; width: ${this.opt.breaking}`;
      document.body.appendChild(div);
      this.menuBreak = div.clientWidth || 0;
      document.body.removeChild(div);
      ref2 = document.querySelectorAll(`${this.opt.breaking}`);
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        el = ref2[k];
        this.menuBreak += this.getWidth(el);
      }
      isMobile = (windowWidth = document.body.clientWidth) <= Math.min(this.menuBreak, this.opt.maxBreaking);
      document.body.classList.toggle('menu-mobile', isMobile);
      document.body.classList.toggle('menu-desktop', !isMobile);
      if (!isMobile) {
        return document.documentElement.classList.remove('nav-open');
      }
    }

    getWidth(el) {
      var clone, width;
      if (el.clientWidth > 0) {
        return el.clientWidth;
      }
      clone = el.cloneNode(true);
      clone.style.cssText = 'position: absolute; visibility: hidden; display: block;';
      el.parentNode.appendChild(clone);
      width = clone.clientWidth;
      el.parentNode.removeChild(clone);
      return width;
    }

  };

  new responsiveMenu(document.querySelector('#nav'), {
    breaking: '.logo, .tagline, .menu'
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxjQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUE7SUFBQTs7RUFBRyxDQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ0gsUUFBQTtJQUFFLE1BQUEsR0FBUztXQVVULFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWQsQ0FBaUMsV0FBakMsRUFBOEMsTUFBOUM7RUFYQyxDQUFBOztFQVlBLENBQUEsUUFBQSxDQUFBLENBQUE7QUFDSCxRQUFBLElBQUEsRUFBQTtJQUFFLElBQUEsR0FBTztJQUNQLFFBQUEsR0FBVztJQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWQsQ0FBaUMsV0FBakMsRUFBOEMsU0FBQSxHQUFZLFFBQVosR0FBdUIsVUFBckU7SUFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFkLENBQWlDLFdBQWpDLEVBQThDLGlFQUFBLEdBQW9FLElBQXBFLEdBQTJFLE1BQXpIO0VBSkMsQ0FBQTs7RUFNRyxlQUFOLE1BQUEsYUFBQTtJQUVFLFdBQWEsSUFBQSxDQUFBO1VBTWIsQ0FBQSxnQkFBQSxDQUFBO1VBT0EsQ0FBQSxhQUFBLENBQUE7TUFiYyxJQUFDLENBQUE7TUFFYixLQUFjLElBQUMsQ0FBQSxFQUFmO0FBQUEsZUFBQTs7TUFFQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsSUFBQyxDQUFBLFNBQW5DO0lBSlc7O0lBTWIsU0FBVyxDQUFBLENBQUE7QUFDYixVQUFBO01BQUksS0FBQSxHQUFRLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBSixDQUFjLElBQWQ7TUFDUixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQVosR0FBc0I7TUFDdEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFD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QUFxQixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQTFCO01BRXhELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQXhCLENBQStCLGFBQS9CLEVBQThDLFFBQTlDO01BQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBeEIsQ0FBK0IsY0FBL0IsRUFBK0MsQ0FBQyxRQUFoRDtNQUNBLEtBQTRELFFBQTVEO2VBQUEsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBbkMsQ0FBMEMsVUFBMUMsRUFBQTs7SUFoQlE7O0lBbUJWLFFBQVUsQ0FBQyxFQUFELENBQUE7QUFFWixVQUFBLEtBQUEsRUFBQTtNQUFJLElBQXlCLEVBQUUsQ0FBQyxXQUFILEdBQWlCLENBQTFDO0FBQUEsZUFBTyxFQUFFLENBQUMsWUFBVjs7TUFDQSxLQUFBLEdBQVEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxJQUFiO01BQ1IsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFaLEdBQXNCO01BQ3RCLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBZCxDQUEwQixLQUExQjtNQUNBLEtBQUEsR0FBUSxLQUFLLENBQUM7TUFDZCxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQWQsQ0FBMEIsS0FBMUI7QUFDQSxhQUFPO0lBUkM7O0VBbkVaOztFQThFQSxJQUFJLGNBQUosQ0FBbUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbkIsRUFBbUQ7SUFBQyxRQUFBLEVBQVU7RUFBWCxDQUFuRDtBQW5KQSIsInNvdXJjZXNDb250ZW50IjpbImRvIC0+XG4gIGZvb3RlciA9ICc8Zm9vdGVyIGlkPVwiZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cImZvb3Rlci10aXRsZVwiPlxuICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2NvZGVwZW4uaW8vY29sbGVjdGlvbi9YUm94R1JcIiB0YXJnZXQ9XCJfYmxhbmtcIj5DYWxpYnJhdGlvbiB0ZW1wbGF0ZTwvYT5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPHAgY2xhc3M9XCJmb290ZXItZW50cnlcIj5cbiAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9tb2JpbGVtYXJrdXAuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bW9iaWxlTWFya3VwLmNvbTwvYT5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9mb290ZXI+JyAgXG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MICdiZWZvcmVlbmQnLCBmb290ZXJcbmRvIC0+XG4gIGxvZ28gPSAnPHN2ZyB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjx0aXRsZT5jb2RlcGVuLWxvZ288L3RpdGxlPjxwYXRoIGQ9XCJNMTYgMzJDNy4xNjMgMzIgMCAyNC44MzcgMCAxNlM3LjE2MyAwIDE2IDBzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTZ6TTcuMTM5IDIxLjY1MWwxLjM1LTEuMzVhLjM4Ny4zODcgMCAwIDAgMC0uNTRsLTMuNDktMy40OWEuMzg3LjM4NyAwIDAgMC0uNTQgMGwtMS4zNSAxLjM1YS4zOS4zOSAwIDAgMCAwIC41NGwzLjQ5IDMuNDlhLjM4LjM4IDAgMCAwIC41NCAwem02LjkyMi4xNTNsMi41NDQtMi41NDNhLjcyMi43MjIgMCAwIDAgMC0xLjAxOGwtNi41ODItNi41OGEuNzIyLjcyMiAwIDAgMC0xLjAxOCAwbC0yLjU0MyAyLjU0NGEuNzE5LjcxOSAwIDAgMCAwIDEuMDE4bDYuNTggNi41NzljLjI4MS4yOC43MzcuMjggMS4wMTkgMHptMTQuNzc5LTUuODVsLTcuNzg2LTcuNzlhLjU1NC41NTQgMCAwIDAtLjc4OCAwbC01LjIzNSA1LjIzYS41NTguNTU4IDAgMCAwIDAgLjc4OWw3Ljc5IDcuNzg5Yy4yMTYuMjE2LjU2OC4yMTYuNzg1IDBsNS4yMzYtNS4yMzZhLjU2Ni41NjYgMCAwIDAgMC0uNzg2bC0uMDAyLjAwM3ptLTMuODkgMi44MDZhLjgxMy44MTMgMCAxIDEgMC0xLjYyNi44MTMuODEzIDAgMCAxIDAgMS42MjZ6XCIgZmlsbD1cIiNGRkZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPidcbiAgbG9nb19jc3MgPSAnLm1Ne2Rpc3BsYXk6YmxvY2s7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7cG9zaXRpb246Zml4ZWQ7Ym90dG9tOjFlbTtyaWdodDoxZW07LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCU7dHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgMjQwbXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjphbGwgMjQwbXMgZWFzZS1pbi1vdXQ7ei1pbmRleDo5OTk5O29wYWNpdHk6MC43NX0ubU0gc3Zne2Rpc3BsYXk6YmxvY2t9Lm1NOmhvdmVye29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEyNSk7dHJhbnNmb3JtOnNjYWxlKDEuMTI1KX0nXG4gIGRvY3VtZW50LmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MICdiZWZvcmVlbmQnLCAnPHN0eWxlPicgKyBsb2dvX2NzcyArICc8L3N0eWxlPidcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwgJ2JlZm9yZWVuZCcsICc8YSBocmVmPVwiaHR0cHM6Ly9jb2RlcGVuLmlvL21pY2FuL1wiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwibU1cIj4nICsgbG9nbyArICc8L2E+J1xuICByZXR1cm5cbmNsYXNzIHNsaWRlVG9nZ2xlclxuICBcbiAgY29uc3RydWN0b3I6IChAZWwpIC0+XG4gICAgXG4gICAgcmV0dXJuIHVubGVzcyBAZWxcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdyZXNpemUnLCBAZ2V0SGVpZ2h0XG4gIFxuICBnZXRIZWlnaHQ6ID0+XG4gICAgY2xvbmUgPSBAZWwuY2xvbmVOb2RlKHRydWUpXG4gICAgY2xvbmUuc3R5bGUuY3NzVGV4dCA9ICd2aXNpYmlsaXR5OiBoaWRkZW47IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IC05OTlweCAwJ1xuICAgIEBoZWlnaHQgPSAoQGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQgY2xvbmUpLmNsaWVudEhlaWdodFxuICAgIEBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lKVxuICAgIHJldHVybiBAaGVpZ2h0XG4gIFxuICB0b2dnbGU6ICh0aW1lKSA9PlxuICAgIEBnZXRIZWlnaHQoKVxuICAgIHRpbWUgb3I9IEBoZWlnaHQgLyAzICsgMTUwXG4gICAgY3VyckhlaWdodCA9IEBlbC5jbGllbnRIZWlnaHQgKiAoZ2V0Q29tcHV0ZWRTdHlsZShAZWwpLmRpc3BsYXkgIT0gJ25vbmUnKVxuICAgIFtzdGFydCwgZW5kXSA9IGlmIGN1cnJIZWlnaHQgPiBAaGVpZ2h0LzIgdGhlbiBbQGhlaWdodCwwXSBlbHNlIFswLEBoZWlnaHRdXG4gICAgZGlzcCA9IGVuZCAtIHN0YXJ0XG4gICAgZWwgPSBAZWxcbiAgICBcbiAgICBAZWwuY2xhc3NMaXN0WyBpZiBlbmQgaXMgMCB0aGVuICdyZW1vdmUnIGVsc2UgJ2FkZCcgXSAnb3BlbidcbiAgICBAZWwuc3R5bGUuY3NzVGV4dCA9IFwib3ZlcmZsb3c6IGhpZGRlbjsgZGlzcGxheTogYmxvY2s7XCJcblxuICAgIGluaXQgPSAobmV3IERhdGUpLmdldFRpbWUoKVxuXG4gICAgcmVwZWF0ID0gLT5cbiAgICAgIGluc3RhbmNlID0gKG5ldyBEYXRlKS5nZXRUaW1lKCkgLSBpbml0XG4gICAgICBzdGVwID0gc3RhcnQgKyBkaXNwICogaW5zdGFuY2UgLyB0aW1lXG4gICAgICBpZiBpbnN0YW5jZSA8PSB0aW1lXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IHN0ZXAgKyAncHgnICMgaWYgTWF0aC5mbG9vcihzdGVwKSBpbiBbc3RhcnQuLmVuZF1cbiAgICAgIGVsc2VcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9IFwiZGlzcGxheTogI3tpZiBlbmQgaXMgMCB0aGVuICdub25lJyBlbHNlICdibG9jayd9XCJcblxuICAgICAgcmVwZWF0TG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXBlYXQpXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSByZXBlYXRMb29wIHVubGVzcyBNYXRoLmZsb29yKHN0ZXApIGluIFtzdGFydC4uZW5kXVxuICAgICAgXG4gICAgcmVwZWF0KClcbiAgICBcbmZvciBibG9jayBpbiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKVxuICBibG9jay50b2dnbGVyID0gbmV3IHNsaWRlVG9nZ2xlciBibG9ja1xuXG5mb3IgdHJpZ2dlciBpbiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKVxuICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICBAcGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuYmxvY2snKS50b2dnbGVyPy50b2dnbGUoKVxuXG5cbiMgc2xpZGVUb2dnbGVyOiBodHRwczovL2NvZGVwZW4uaW8vbWljYW4vcGVuL3dyTmpWVyBcblxuY2xhc3MgcmVzcG9uc2l2ZU1lbnVcblxuICBjb25zdHJ1Y3RvcjogKCBuYXYsIEBvcHQgKSAtPlxuXG4gICAgQG9wdC5icmVha2luZyBvcj0gJzY0MHB4J1xuICAgIEBvcHQubWF4QnJlYWtpbmcgPSBwYXJzZUludChAb3B0Lm1heEJyZWFraW5nKSBvciAxMDQwXG5cbiAgICBtZW51ID0gbmF2LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JylcblxuICAgIHVubGVzcyBzbGlkZVRvZ2dsZXJcbiAgICAgIGNsYXNzIHNsaWRlVG9nZ2xlclxuICAgICAgICBjb25zdHJ1Y3RvcjogKEBlbCkgLT5cbiAgICAgICAgICByZXR1cm4gdW5sZXNzIEBlbFxuICAgICAgICB0b2dnbGU6ID0+XG4gICAgICAgICAgQGVsLmNsYXNzTGlzdC50b2dnbGUgJ29wZW4nXG4gICAgICAgICAgQGVsLnN0eWxlLmNzc1RleHQgPSBcImRpc3BsYXk6ICN7aWYgQGVsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpIHRoZW4gJ2Jsb2NrJyBlbHNlICdub25lJ31cIlxuICAgICAgICAgIFxuICAgIHN1Yi50b2dnbGVyID0gbmV3IHNsaWRlVG9nZ2xlciBzdWIgZm9yIHN1YiBpbiBtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJylcblxuICAgIG1lbnVUb2dnbGUgPSBAY3JlYXRlVG9nZ2xlIG5hdiwgJ21lbnUtdG9nZ2xlJywgJ01lbnUnXG4gICAgbWVudVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSAnbmF2LW9wZW4nXG4gICAgICBtZW51VG9nZ2xlLm1lbnUuY2xhc3NMaXN0LnRvZ2dsZSAnb3BlbicsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMgJ25hdi1vcGVuJ1xuICAgICAgXG4gICAgZm9yIHN1Yk1lbnUgaW4gbWVudS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpXG4gICAgICBzdWJNZW51LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCAnaGFzLWNoaWxkcmVuJ1xuICAgICAgc3ViTWVudVRvZ2dsZSA9IEBjcmVhdGVUb2dnbGUgc3ViTWVudSwgJ3N1Yi1tZW51LXRvZ2dsZScsICcrJ1xuICAgICAgc3ViTWVudVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICAgIEBtZW51LnRvZ2dsZXIudG9nZ2xlKClcbiAgICAgICAgZm9yIG9wZW4gaW4gQHBhcmVudE5vZGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd1bC5vcGVuJylcbiAgICAgICAgICBvcGVuLnRvZ2dsZXIudG9nZ2xlKCkgdW5sZXNzIG9wZW4gaXMgQG1lbnVcbiAgICAgICAgXG4gICAgZm9yIHN1YiBpbiBtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oYXMtY2hpbGRyZW5bY2xhc3MqPWN1cnJlbnRdID4gdWwnKVxuICAgICAgc3ViLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG4gICAgXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnRE9NQ29udGVudExvYWRlZCcsIEBicmVha2luZ1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdyZXNpemUnLCBAYnJlYWtpbmdcbiAgICBzZXRUaW1lb3V0IEBicmVha2luZywgMzAwMFxuICAgIFxuXG4gIGNyZWF0ZVRvZ2dsZTogKG1lbnUsIGtsYXNzLCBsYWJlbCkgPT5cblxuICAgIHRvZ2dsZSA9IG1lbnUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLiN7a2xhc3N9XCIpIG9yIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICB0b2dnbGUuY2xhc3NMaXN0LmFkZCBrbGFzc1xuICAgIHRvZ2dsZS5hcHBlbmRDaGlsZCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsYWJlbClcbiAgICB0b2dnbGUubWVudSA9IGlmIG1lbnUubm9kZU5hbWUgaXMgJ1VMJyB0aGVuIG1lbnUgZWxzZSBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JylcbiAgICBtZW51LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlIHRvZ2dsZSwgbWVudS5uZXh0U2libGluZ1xuXG4gIGJyZWFraW5nOiA9PlxuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlICdtZW51LW1vYmlsZScgXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkICdtZW51LWRlc2t0b3AnXG5cbiAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAje0BvcHQuYnJlYWtpbmd9XCJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGRpdlxuICAgIEBtZW51QnJlYWsgPSBkaXYuY2xpZW50V2lkdGggb3IgMFxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQgZGl2XG4gICAgXG4gICAgQG1lbnVCcmVhayArPSBAZ2V0V2lkdGgoZWwpIGZvciBlbCBpbiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3tAb3B0LmJyZWFraW5nfVwiKVxuICAgIGlzTW9iaWxlID0gKHdpbmRvd1dpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkgPD0gTWF0aC5taW4oQG1lbnVCcmVhaywgQG9wdC5tYXhCcmVha2luZylcblxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSAnbWVudS1tb2JpbGUnLCBpc01vYmlsZVxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSAnbWVudS1kZXNrdG9wJywgIWlzTW9iaWxlXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUgJ25hdi1vcGVuJyB1bmxlc3MgaXNNb2JpbGVcblxuXG4gIGdldFdpZHRoOiAoZWwpIC0+XG5cbiAgICByZXR1cm4gZWwuY2xpZW50V2lkdGggaWYgZWwuY2xpZW50V2lkdGggPiAwXG4gICAgY2xvbmUgPSBlbC5jbG9uZU5vZGUodHJ1ZSlcbiAgICBjbG9uZS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdmlzaWJpbGl0eTogaGlkZGVuOyBkaXNwbGF5OiBibG9jazsnXG4gICAgZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCBjbG9uZVxuICAgIHdpZHRoID0gY2xvbmUuY2xpZW50V2lkdGhcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lKVxuICAgIHJldHVybiB3aWR0aFxuXG5cbm5ldyByZXNwb25zaXZlTWVudSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmF2JyksIHticmVha2luZzogJy5sb2dvLCAudGFnbGluZSwgLm1lbnUnfSJdfQ==
//# sourceURL=coffeescript