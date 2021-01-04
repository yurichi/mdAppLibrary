import React from 'react';
import { ReactSVG } from 'react-svg';

export default ({ url = '', size = 24, fill = '#2196f3', addClassName = '' }) => {
  return (
    <ReactSVG
      src={url}
      beforeInjection={svg => {
        if (addClassName) {
          svg.classList.add(...addClassName.split(' '));
        }

        svg.setAttribute('style', `width: ${size}px;height: ${size}px;vertical-align: top;`);
        svg.setAttribute('fill', fill);
      }}
      afterInjection={(error, svg) => {
        if (error) {
          return;
        }

        const el = svg.getElementsByTagName('title')[0];

        if (el) {
          svg.removeChild(el);
        }

        svg.querySelectorAll('*').forEach(item => item.removeAttribute('fill'));
      }}
    />
  );
};
