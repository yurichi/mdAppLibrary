import PropTypes from "prop-types";

import React from "react";
import classNames from "classnames";
import styled from "styled-components";
const MdLoader = styled.div`
   {
    &.MdLoader {
      position: relative;
      margin: 0 auto;
      .circle(@size: 88px) {
        width: @size;
        height: @size;
        border-radius: 50%;
      }
    }

    &.MdLoader:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    .MdLoader-circular {
      animation: mdLoaderRotate 2s linear infinite;
      height: 100%;
      transform-origin: center center;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    @keyframes mdLoaderRotate {
      to {
        transform: rotate(1turn);
      }
    }

    .MdLoader-path {
      stroke: #1e88e5;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      stroke-miterlimit: 10;
      fill: none;
      animation: mdLoaderDash 1.5s ease-in-out infinite;
    }

    @keyframes mdLoaderDash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }

      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }

      to {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  }
`;
/**
 * 加载中
 */
export default function Load(props) {
  let { size, style } = props;
  if (size === "big") {
    size = 36;
  } else if (!size || size === "middle") {
    size = 24;
  } else if (size === "small") {
    size = 16;
  }
  const strokeWidth = Math.floor(size / 8);
  const r = Math.floor(size / 2);
  const cx = r + strokeWidth;
  const cy = cx;
  const width = cx + cy;
  return (
    <div
      style={style}
      className={classNames("divCenter TxtCenter TxtMiddle", props.className)}
    >
      <MdLoader className="MdLoader" style={{ width }}>
        <svg className="MdLoader-circular">
          <circle {...{ cx, cy, r, strokeWidth }} className="MdLoader-path" />
        </svg>
      </MdLoader>
    </div>
  );
}
Load.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
