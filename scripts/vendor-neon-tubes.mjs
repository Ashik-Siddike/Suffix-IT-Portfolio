import fs from 'node:fs';

// Keep the supplied 0.0.19 renderer, repairing its listener disposal bindings.
const source = 'node_modules/threejs-components/build/cursors/tubes1.min.js';
let code = fs.readFileSync(source, 'utf8');
code = code.replace('class BC{#e;canvas;', 'class BC{#e;#resizeHandler;#visibilityHandler;canvas;');
code = code.replace(
  'constructor(e){this.#e={...e},this.#l()',
  'constructor(e){this.#resizeHandler=this.#p.bind(this);this.#visibilityHandler=this.#g.bind(this);this.#e={...e},this.#l()',
);
code = code.replaceAll('"resize",this.#p.bind(this)', '"resize",this.#resizeHandler');
code = code.replaceAll(
  'new ResizeObserver(this.#p.bind(this))',
  'new ResizeObserver(this.#resizeHandler)',
);
code = code.replaceAll(
  '"visibilitychange",this.#g.bind(this)',
  '"visibilitychange",this.#visibilityHandler',
);
code = code.replace(
  'document.body.removeEventListener("pointerleave",rB),ZC=!1',
  'document.body.removeEventListener("pointerleave",rB),document.body.removeEventListener("click",sB),ZC=!1',
);
code = code.replace(
  'this.#n?.disconnect(),this.#i?.disconnect()',
  'clearTimeout(this.#a),this.#n?.disconnect(),this.#i?.disconnect()',
);
fs.mkdirSync('public/vendor', { recursive: true });
fs.writeFileSync('public/vendor/neon-tubes.js', code);
