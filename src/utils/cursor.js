import { isEqual } from "lodash-es";

let mainCursor;

const lerp = (a, b, n) => {
  if (Math.round(a) === b) return b;
  return (1 - n) * a + n * b;
};

const cursorInit = () => {
  mainCursor = new Cursor();
  return mainCursor;
};

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("xs-hidden");
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.create();
    this.init();
    this.render();
  }

  init() {
    this._onMouseMove = (e) => {
      if (!this.pos.curr) this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 };
      this.cursor.classList.remove("hidden");
      this.render();
    };
    this._onMouseEnter = () => this.cursor.classList.remove("hidden");
    this._onMouseLeave = () => this.cursor.classList.add("hidden");
    this._onMouseDown = () => this.cursor.classList.add("active");
    this._onMouseUp = () => this.cursor.classList.remove("active");
    document.addEventListener("mousemove", this._onMouseMove);
    document.addEventListener("mouseenter", this._onMouseEnter);
    document.addEventListener("mouseleave", this._onMouseLeave);
    document.addEventListener("mousedown", this._onMouseDown);
    document.addEventListener("mouseup", this._onMouseUp);
  }

  destroy() {
    if (this._onMouseMove) {
      document.removeEventListener("mousemove", this._onMouseMove);
      document.removeEventListener("mouseenter", this._onMouseEnter);
      document.removeEventListener("mouseleave", this._onMouseLeave);
      document.removeEventListener("mousedown", this._onMouseDown);
      document.removeEventListener("mouseup", this._onMouseUp);
    }
    if (this.cursor) this.cursor.remove();
    if (this.scr) this.scr.remove();
  }

  render() {
    if (this.pos.prev) {
      this.pos.prev.x = lerp(this.pos.prev.x, this.pos.curr.x, 0.35);
      this.pos.prev.y = lerp(this.pos.prev.y, this.pos.curr.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    if (!isEqual(this.pos.curr, this.pos.prev)) {
      requestAnimationFrame(() => this.render());
    }
  }
}

export default cursorInit;
