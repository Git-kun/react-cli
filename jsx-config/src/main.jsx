/*
 * @Author: hukun
 * @Date: 2018-11-20 14:06:17
 * @Last Modified by:   hukun
 * @Last Modified time: 2018-11-20 14:06:17
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import * as styles from "./index.css";
import Testsvg, { ReactComponent as Start } from "./test.svg";

// 移动端 safari click 会有 300ms 延迟, 而 微信,chrome 没有, 需要引用 fastClick.js 来解决
import fastClick from 'fastclick';

fastClick.attach(document.body)


const titleText = [];

const handlerClick = (ev) => {
  const oTitle = document.getElementById('title');
  const isSelect = ev.target.getAttribute('data-select') === 'true';

  ev.target.setAttribute('data-select', !isSelect)

  for (const children of ev.currentTarget.children) {
    if (children.nodeName === 'rect') {
      children.setAttribute('fill', isSelect ? '#f0f0f0' : 'blue');
      continue;
    }
    if (children.nodeName === 'text') {
      const text = children.textContent;
      if (!isSelect) {
        titleText.push(text)
      } else {
        titleText.splice(titleText.indexOf(text), 1)
      }
      oTitle.textContent = titleText.length > 0 ? titleText.join(' -- ') : '没有选择';
      continue;
    }
  }

}

const eles = () => {
  let es = [(
    <text key="title" x="180" y="25" id="title" className={styles.title}>
      第一排 - 第一座
      <set attributeName="fill" to="blue" begin="click" />
    </text>
  )];

  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 4; x++) {
      es.push((
        <g key={x + ' - ' + y} onClick={handlerClick}>
          <rect
            fill='#f0f0f0'
            x={x * 70 + 50} y={y * 70 + 50}
            width="50" height="50"
          >
          </rect>
          <text
            style={{ pointerEvents: 'none' }}
            x={x * 70 + 75} y={y * 70 + 75}
            className={styles['svg-text']}
          >
            {`第${y + 1}排 - 第${x + 1}座`}
          </text>
        </g>
      ))
    }
  }
  return es;
}

const svgAttr = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  xmlSpace: "preserve",
  width: "100%",
  height: "100%",
  viewBox:"0 125 360 300"
  // viewBox: "0 0 700 500",
  // enableBackground: "new 0 0 700 500"
}

ReactDOM.render(
  (
    <div className={styles.container}>
      <svg {...svgAttr} className={styles.svg}>
        {eles()}
      </svg>
    </div >
  ),
  document.getElementById('root')
);
