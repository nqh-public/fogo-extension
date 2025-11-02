/**
 * Fogó VSCode Extension - Picker Script Generator
 *
 * @where apps/fogo/src/picker-script.ts
 * @what Generates JavaScript code to inject DOM picker logic into webview iframe
 * @why Picker script runs in iframe context, needs to be injected as string
 * @exports generatePickerScript
 * @date 2025-11-01
 * @author Claude Code <noreply@anthropic.com>
 */

import { OUTLINE_COLOR, OUTLINE_WIDTH } from '@/constants';

/**
 * Generates picker script as IIFE string for injection into webview
 *
 * Script logic:
 * 1. Maintains picker state (active, hoveredElement, previousOutline)
 * 2. Adds event listeners: mouseover, mouseout, click (capture), keydown
 * 3. Highlights hovered elements with red outline
 * 4. Extracts element data on click, sends to parent via postMessage
 * 5. Deactivates on ESC key press
 *
 * @returns JavaScript code as string (IIFE)
 */
export function generatePickerScript(): string {
  return `
(function() {
  'use strict';

  console.log('[Selecto Picker] Script injected and executing');

  // Inline css-selector-generator library (UMD build)
  !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CssSelectorGenerator=e():t.CssSelectorGenerator=e()}(self,(()=>(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t){return"object"==typeof t&&null!==t&&t.nodeType===Node.ELEMENT_NODE}t.r(e),t.d(e,{default:()=>Q,getCssSelector:()=>K});const r={NONE:"",DESCENDANT:" ",CHILD:" > "},o={id:"id",class:"class",tag:"tag",attribute:"attribute",nthchild:"nthchild",nthoftype:"nthoftype"},i="CssSelectorGenerator";function c(t="unknown problem",...e){console.warn(\`\${i}: \${t}\`,...e)}const u={selectors:[o.id,o.class,o.tag,o.attribute],includeTag:!1,whitelist:[],blacklist:[],combineWithinSelector:!0,combineBetweenSelectors:!0,root:null,maxCombinations:Number.POSITIVE_INFINITY,maxCandidates:Number.POSITIVE_INFINITY,useScope:!1};function s(t){return t instanceof RegExp}function a(t){return["string","function"].includes(typeof t)||s(t)}function l(t){return Array.isArray(t)?t.filter(a):[]}function f(t){const e=[Node.DOCUMENT_NODE,Node.DOCUMENT_FRAGMENT_NODE,Node.ELEMENT_NODE];return function(t){return t instanceof Node}(t)&&e.includes(t.nodeType)}function d(t,e){if(f(t))return t.contains(e)||c("element root mismatch","Provided root does not contain the element. This will most likely result in producing a fallback selector using element's real root node. If you plan to use the selector using provided root (e.g. \`root.querySelector\`), it will not work as intended."),t;const n=e.getRootNode({composed:!1});return f(n)?(n!==document&&c("shadow root inferred","You did not provide a root and the element is a child of Shadow DOM. This will produce a selector using ShadowRoot as a root. If you plan to use the selector using document as a root (e.g. \`document.querySelector\`), it will not work as intended."),n):S(e)}function m(t){return"number"==typeof t?t:Number.POSITIVE_INFINITY}function p(t=[]){const[e=[],...n]=t;return 0===n.length?e:n.reduce(((t,e)=>t.filter((t=>e.includes(t)))),e)}function g(t){return[].concat(...t)}function h(t){const e=t.map((t=>{if(s(t))return e=>t.test(e);if("function"==typeof t)return e=>{const n=t(e);return"boolean"!=typeof n?(c("pattern matcher function invalid","Provided pattern matching function does not return boolean. It's result will be ignored.",t),!1):n};if("string"==typeof t){const e=new RegExp("^"+t.replace(/[|\\\\{}()[\\]^$+?.]/g,"\\\\$&").replace(/\\*/g,".+")+"$");return t=>e.test(t)}return c("pattern matcher invalid","Pattern matching only accepts strings, regular expressions and/or functions. This item is invalid and will be ignored.",t),()=>!1}));return t=>e.some((e=>e(t)))}function b(t,e,n){const r=Array.from(d(n,t[0]).querySelectorAll(e));return r.length===t.length&&t.every((t=>r.includes(t)))}function y(t,e){e=null!=e?e:S(t);const r=[];let o=t;for(;n(o)&&o!==e;)r.push(o),o=o.parentElement;return r}function N(t,e){return p(t.map((t=>y(t,e))))}function S(t){return t.ownerDocument.querySelector(":root")}const E=", ",v=new RegExp(["^$","\\\\s"].join("|")),w=new RegExp(["^$"].join("|")),I=[o.nthoftype,o.tag,o.id,o.class,o.attribute,o.nthchild],T=h(["class","id","ng-*"]);function O({name:t}){return\`[\${t}]\`}function C({name:t,value:e}){return\`[\${t}='\${e}']\`}function x({nodeName:t,nodeValue:e}){return{name:Y(t),value:Y(null!=e?e:void 0)}}function j(t){const e=Array.from(t.attributes).filter((e=>function({nodeName:t,nodeValue:e},n){const r=n.tagName.toLowerCase();return!(["input","option"].includes(r)&&"value"===t||"src"===t&&(null==e?void 0:e.startsWith("data:"))||T(t))}(e,t))).map(x);return[...e.map(O),...e.map(C)]}function A(t){var e;return(null!==(e=t.getAttribute("class"))&&void 0!==e?e:"").trim().split(/\\s+/).filter((t=>!w.test(t))).map((t=>\`.\${Y(t)}\`))}function $(t){var e;const n=null!==(e=t.getAttribute("id"))&&void 0!==e?e:"",r=\`#\${Y(n)}\`,o=t.getRootNode({composed:!1});return!v.test(n)&&b([t],r,o)?[r]:[]}function D(t){const e=t.parentNode;if(e){const r=Array.from(e.childNodes).filter(n).indexOf(t);if(r>-1)return[\`:nth-child(\${String(r+1)})\`]}return[]}function R(t){return[Y(t.tagName.toLowerCase())]}function P(t){const e=[...new Set(g(t.map(R)))];return 0===e.length||e.length>1?[]:[e[0]]}function _(t){const e=P([t])[0],n=t.parentElement;if(n){const r=Array.from(n.children).filter((t=>t.tagName.toLowerCase()===e)),o=r.indexOf(t);if(o>-1)return[\`\${e}:nth-of-type(\${String(o+1)})\`]}return[]}function k(t=[],{maxResults:e=Number.POSITIVE_INFINITY}={}){return Array.from(function*(t=[],{maxResults:e=Number.POSITIVE_INFINITY}={}){let n=0,r=M(1);for(;r.length<=t.length&&n<e;){n+=1;const e=r.map((e=>t[e]));yield e,r=L(r,t.length-1)}}(t,{maxResults:e}))}function L(t=[],e=0){const n=t.length;if(0===n)return[];const r=[...t];r[n-1]+=1;for(let t=n-1;t>=0;t--)if(r[t]>e){if(0===t)return M(n+1);r[t-1]++,r[t]=r[t-1]+1}return r[n-1]>e?M(n+1):r}function M(t=1){return Array.from(Array(t).keys())}const V=":".charCodeAt(0).toString(16).toUpperCase(),F=/[ !"#$%&'()\\[\\]{|}<>*+,./;=?@^\`~\\\\]/;function Y(t=""){return CSS?CSS.escape(t):function(t=""){return t.split("").map((t=>":"===t?\`\\\\\${V} \`:F.test(t)?\`\\\\\${t}\`:escape(t).replace(/%/g,"\\\\"))).join("")}(t)}const W={tag:P,id:function(t){return 0===t.length||t.length>1?[]:$(t[0])},class:function(t){return p(t.map(A))},attribute:function(t){return p(t.map(j))},nthchild:function(t){return p(t.map(D))},nthoftype:function(t){return p(t.map(_))}},q={tag:R,id:$,class:A,attribute:j,nthchild:D,nthoftype:_};function B(t){return t.includes(o.tag)||t.includes(o.nthoftype)?[...t]:[...t,o.tag]}function G(t={}){const e=[...I];return t[o.tag]&&t[o.nthoftype]&&e.splice(e.indexOf(o.tag),1),e.map((e=>{return(r=t)[n=e]?r[n].join(""):"";var n,r})).join("")}function H(t,e,n="",o){const i=function(t,e){return""===e?t:function(t,e){return[...t.map((t=>e+r.DESCENDANT+t)),...t.map((t=>e+r.CHILD+t))]}(t,e)}(function(t,e,n){const r=function(t,e){const{blacklist:n,whitelist:r,combineWithinSelector:o,maxCombinations:i}=e,c=h(n),u=h(r);return function(t){const{selectors:e,includeTag:n}=t,r=[...e];return n&&!r.includes("tag")&&r.push("tag"),r}(e).reduce(((e,n)=>{const r=function(t,e){return(0,W[e])(t)}(t,n),s=function(t=[],e,n){return t.filter((t=>n(t)||!e(t)))}(r,c,u),a=function(t=[],e){return t.sort(((t,n)=>{const r=e(t),o=e(n);return r&&!o?-1:!r&&o?1:0}))}(s,u);return e[n]=o?k(a,{maxResults:i}):a.map((t=>[t])),e}),{})}(t,n),o=function(t,e){return function(t){const{selectors:e,combineBetweenSelectors:n,includeTag:r,maxCandidates:o}=t,i=n?k(e,{maxResults:o}):e.map((t=>[t]));return r?i.map(B):i}(e).map((e=>function(t,e){const n={};return t.forEach((t=>{const r=e[t];r&&r.length>0&&(n[t]=r)})),function(t={}){let e=[];return Object.entries(t).forEach((([t,n])=>{e=n.flatMap((n=>0===e.length?[{[t]:n}]:e.map((e=>Object.assign(Object.assign({},e),{[t]:n})))))})),e}(n).map(G)}(e,t))).filter((t=>t.length>0))}(r,n),i=g(o);return[...new Set(i)]}(t,0,o),n);for(const n of i)if(b(t,n,e))return n;return null}function U(t){return{value:t,include:!1}}function z({selectors:t,operator:e}){let n=[...I];t[o.tag]&&t[o.nthoftype]&&(n=n.filter((t=>t!==o.tag)));let r="";return n.forEach((e=>{var n;(null!==(n=t[e])&&void 0!==n?n:[]).forEach((({value:t,include:e})=>{e&&(r+=t)}))})),e+r}function J(t,e){return t.map((t=>function(t,e){return[e?":scope":":root",...y(t,e).reverse().map((t=>{var e;const n=function(t,e,n=r.NONE){const o={};return e.forEach((e=>{Reflect.set(o,e,function(t,e){return q[e](t)}(t,e).map(U))})),{element:t,operator:n,selectors:o}}(t,[o.nthchild],r.CHILD);return(null!==(e=n.selectors.nthchild)&&void 0!==e?e:[]).forEach((t=>{t.include=!0})),n})).map(z)].join("")}(t,e))).join(E)}function K(t,e={}){var r;const i=function(t){(t instanceof NodeList||t instanceof HTMLCollection)&&(t=Array.from(t));const e=(Array.isArray(t)?t:[t]).filter(n);return[...new Set(e)]}(t),c=function(t,e={}){const n=Object.assign(Object.assign({},u),e);return{selectors:(r=n.selectors,Array.isArray(r)?r.filter((t=>{return e=o,n=t,Object.values(e).includes(n);var e,n})):[]),whitelist:l(n.whitelist),blacklist:l(n.blacklist),root:d(n.root,t),combineWithinSelector:!!n.combineWithinSelector,combineBetweenSelectors:!!n.combineBetweenSelectors,includeTag:!!n.includeTag,maxCombinations:m(n.maxCombinations),maxCandidates:m(n.maxCandidates),useScope:!!n.useScope};var r}(i[0],e),s=null!==(r=c.root)&&void 0!==r?r:S(i[0]);let a="",f=s;function p(){return function(t,e,n="",r){if(0===t.length)return null;const o=[t.length>1?t:[],...N(t,e).map((t=>[t]))];for(const t of o){const o=H(t,e,n,r);if(o)return{foundElements:t,selector:o}}return null}(i,f,a,c)}let g=p();for(;g;){const{foundElements:t,selector:e}=g;if(b(i,e,s))return e;f=t[0],a=e,g=p()}return i.length>1?i.map((t=>K(t,c))).join(E):J(i,c.useScope?s:void 0)}const Q=K;return e})()));

  // Utility: Generate unique CSS selector
  const UTILITY_CLASS_REGEX = /^(flex|grid|p-\\d+|m-\\d+|text-|bg-|border-)/;
  function generateSelector(element) {
    const selector = CssSelectorGenerator.getCssSelector(element, {
      selectors: ['attribute', 'id', 'class', 'tag', 'nthchild'],
      whitelist: [
        /^data-testid$/,
        /^data-qa$/,
        /^data-cy$/,
        /^aria-label$/,
        /^role$/,
      ],
      blacklist: [UTILITY_CLASS_REGEX],
      maxCombinations: 5,
      maxCandidates: 10,
    });

    const matches = document.querySelectorAll(selector);
    if (matches.length !== 1) {
      throw new Error(
        'Generated selector is not unique: "' + selector + '" matches ' + matches.length + ' elements'
      );
    }

    return selector;
  }

  // Utility: Format element data as markdown
  function formatMarkdown(data) {
    const elementLabel = data.innerText.trim()
      ? data.innerText.substring(0, 50) + (data.innerText.length > 50 ? '...' : '')
      : '<' + data.tagName + '>';

    const attributeEntries = Object.entries(data.attributes);
    const attributeRows = attributeEntries.length === 0
      ? '| (no attributes) | |'
      : attributeEntries.map(function([key, value]) {
          const truncatedValue = value.length > 100 ? value.substring(0, 100) + '...' : value;
          const escapedValue = truncatedValue.replace(/\\|/g, '\\\\|');
          return '| ' + key + ' | ' + escapedValue + ' |';
        }).join('\\n');

    return \`## Selected Element: \${elementLabel}

**ELEMENT**
\${data.outerHTML}

**PATH**
\\\`\${data.path}\\\`

**ATTRIBUTES**
| Attribute | Value |
|-----------|-------|
\${attributeRows}

**COMPUTED STYLES**
| Property | Value |
|----------|-------|
| color | \${data.computedStyles.color} |
| backgroundColor | \${data.computedStyles.backgroundColor} |
| fontSize | \${data.computedStyles.fontSize} |
| fontFamily | \${data.computedStyles.fontFamily} |
| display | \${data.computedStyles.display} |
| position | \${data.computedStyles.position} |

**POSITION & SIZE**
| Property | Value |
|----------|-------|
| top | \${data.position.top.toFixed(2)}px |
| left | \${data.position.left.toFixed(2)}px |
| width | \${data.position.width.toFixed(2)}px |
| height | \${data.position.height.toFixed(2)}px |

**INNER TEXT**
\${data.innerText || '(empty)'}
\`;
  }

  // Picker state
  const state = {
    active: true,
    hoveredElement: null,
    previousOutline: ''
  };

  // Constants
  const OUTLINE_COLOR = '${OUTLINE_COLOR}';
  const OUTLINE_WIDTH = '${OUTLINE_WIDTH}';

  // Remove picker and cleanup
  function deactivatePicker() {
    state.active = false;

    // Restore outline if element still hovered
    if (state.hoveredElement) {
      state.hoveredElement.style.outline = state.previousOutline;
      state.hoveredElement = null;
    }

    // Remove event listeners
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown);

    // Notify parent
    window.parent.postMessage({ command: 'pickerDeactivated' }, '*');
  }

  // Mouseover handler: Apply red outline
  function handleMouseOver(event) {
    if (!state.active) return;

    const target = event.target;

    // Skip body element
    if (target.tagName.toLowerCase() === 'body') {
      return;
    }

    console.log('[Selecto Picker] Hovering:', target.tagName, target.className);

    // Store original outline and apply highlight
    state.previousOutline = target.style.outline;
    target.style.outline = OUTLINE_WIDTH + ' solid ' + OUTLINE_COLOR;
    state.hoveredElement = target;
  }

  // Mouseout handler: Remove red outline
  function handleMouseOut(event) {
    if (!state.active) return;

    const target = event.target;

    // Restore original outline
    if (state.hoveredElement === target) {
      target.style.outline = state.previousOutline;
      state.hoveredElement = null;
      state.previousOutline = '';
    }
  }

  // Click handler: Extract element data and send to parent
  function handleClick(event) {
    if (!state.active) return;

    // Prevent default behavior and stop propagation
    event.preventDefault();
    event.stopPropagation();

    const target = event.target;

    console.log('[Selecto Picker] Clicked:', target.tagName, target.className);

    // Check if clicked element is iframe
    if (target.tagName.toLowerCase() === 'iframe') {
      console.log('[Selecto Picker] Iframe detected');
      window.parent.postMessage({ command: 'iframeDetected' }, '*');
      return;
    }

    // Extract element data
    try {
      const elementData = extractElementData(target);
      console.log('[Selecto Picker] Sending element data to parent:', elementData);
      window.parent.postMessage({
        command: 'elementSelected',
        data: elementData
      }, '*');
    } catch (error) {
      console.error('[Selecto Picker] Extraction error:', error);
      window.parent.postMessage({
        command: 'pickerError',
        error: error.message || 'Unknown error during element extraction'
      }, '*');
    }
  }

  // ESC key handler: Deactivate picker
  function handleKeyDown(event) {
    if (!state.active) return;

    // Check for ESC key (keyCode 27 or key === 'Escape')
    if (event.keyCode === 27 || event.key === 'Escape') {
      deactivatePicker();
    }
  }

  // Extract all element data for AI context
  function extractElementData(element) {
    // Get computed styles
    const computedStyle = window.getComputedStyle(element);
    const computedStyles = {
      color: computedStyle.color,
      backgroundColor: computedStyle.backgroundColor,
      fontSize: computedStyle.fontSize,
      fontFamily: computedStyle.fontFamily,
      display: computedStyle.display,
      position: computedStyle.position
    };

    // Get position and dimensions
    const rect = element.getBoundingClientRect();
    const position = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };

    // Extract attributes
    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      attributes[attr.name] = attr.value;
    }

    // Generate unique CSS selector using library
    const selector = generateSelector(element);
    const path = selector; // Use generated selector as path

    return {
      tagName: element.tagName.toLowerCase(),
      selector: selector,
      innerText: element.innerText || '',
      outerHTML: element.outerHTML.substring(0, 500), // First 500 chars
      attributes: attributes,
      computedStyles: computedStyles,
      position: position,
      path: path
    };
  }

  // Attach event listeners
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('click', handleClick, true); // Capture phase
  document.addEventListener('keydown', handleKeyDown);

  console.log('[Selecto Picker] Event listeners attached, picker active');

})();
`.trim();
}
