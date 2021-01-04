import React, { Component } from "react";
import cx from "classnames";
import styled from "styled-components";
const SearchWrap = styled.div`
   {
    position: relative;
    margin: 56px auto 0;
    font-size: 18px;
    width: 306px;
    
    .placeholder {
      color: #aaa;
    }
    input {
      outline: none  
      box-sizing: border-box;
      height: 52px;
      padding: 0px 53px;
      border-radius: 26px;
      border: 0px !important;
      width: 100%;
      box-sizing: border-box;

      &:hover:not(:focus) {
        background-color: #f0f0f0 !important;
      }

      &:not(:hover):not(:focus) {
        background-color: #f7f7f7 !important;
      }

      &:focus:not(:hover) {
        background-color: #f0f0f0 !important;
      }

      &:hover:focus {
        background-color: #f0f0f0;
      }

      &::-webkit-input-placeholder {
        color: #9e9e9e;
      }

      &::-moz-placeholder {
        color: #9e9e9e;
      }

      &::-moz-placeholder {
        color: #9e9e9e;
      }

      &::-ms-input-placeholder {
        color: #9e9e9e;
      }
    }

    .icon {
      position: absolute;
      top: 16px;
    }

    .search {
      left: 18px;
    }

    .close {
      right: 18px;
      color: #bdbdbd;

      &:hover {
        color: #757575;
      }
    }

    .hide {
      display: none !important;
    }
  }
`;
export default class Search extends Component {
  state = { value: "" };

  render() {
    const { className, onFocus } = this.props;
    const { value } = this.state;
    return (
      <SearchWrap className={cx("SearchWrap ", className)}>
        <input
          type="text"
          className="ThemeBorderColor3 Font15"
          value={value}
          placeholder="搜索模板库"
          onChange={(e) => {
            this.setState({ value: e.target.value });
            if (!e.target.value) {
              this.props.getSearch(e.target.value);
            }
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              this.props.getSearch(e.target.value);
            }
          }}
        />
        {/* <i
          type="search"
          className="icon icon-search search Black18 Alpha6 Font22"
        /> */}
        <img
          style={{
            position: 'absolute',
            top: '18px',
          }}
          onClick={() => {
            this.setState({ value: "" });
            this.props.getSearch("");
          }}
          className="search Hand Alpha6"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAAXnVPIAAABUUlEQVQ4EZVTy22DQBA1C5zjEpIKQglJBaEEp4JwAMQtHBEfiQ7idGBXENMB6cAl2GcQ5L3NghZCJLPSambevHk7uwzGRi3P87aWZb0ZhuECchRcd11XFkXxOfDm1iAQBAELPrCHwitxrLtfs6mbpnkuy/Ki4tEInoxoKK5M03zIsmzLTR+5CtuxbftrrNIcw/f9GG2/k4iiJy03uuDU4DwCeAVnPybgCGyXAE7b0S4tIURMvO97ydU5QilfkyQ56wndT9P0wBhcXney2AGV+wm6IhCo/aZyFEX3/9WFYShbB/c85/AKJcG2bfklFhdmIVaJ/Zwg50B75RqnxHmeH0nkyYj5hRzYI3DZiS4iBdQUntSD6nnpsxi5FwR/BkoKDBWYyB3ILt+EGPwLTImTT3qX+lROBAahJTvrcuzkZgGKLomsElgQqVYLDCL4uQ5s6gdKOJJGWudMCAAAAABJRU5ErkJggg=="
        />
        {/* <i
          onClick={() => {
            this.setState({ value: "" });
            this.props.getSearch("");
          }}
          className={cx("icon icon-close close pointer Black18 Alpha6", {
            hide: !value.length,
          })}
        /> */}
        <img
          style={{
            position: 'absolute',
            top: '18px',
            height: '13px',
          }}
          onClick={() => {
            this.setState({ value: "" });
            this.props.getSearch("");
          }}
          className={cx("close Hand Alpha6", {
            hide: !value.length,
          })}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAAXnVPIAAAA+klEQVQ4EY2TwRGDIBBFg6PnWEpKMB0knZCDVXiInSQdqB2klOSsM+R/hnUQQd0ZBHZ5HxZWpbUu8zx/KaUeTdN8TgesruuLMeY5TdM9K4riDbiCo2Ngj3dwR4ZsBkCj/eAo90Q8uCRDVuFzcjv3GJ4h8oXYNUwnAldcYwX2RFIwuVkgJUI/U2OKGPLYdmf6aQsBOsJ07KIEbGP8hOaLuNhqZ2H4ClHDsY0E/LH4pI+mEOTMtcnXWQjEbtvt1KdEZoEYLLXg3wlOt6gTK7AFuxOsXkeKTR2Bt0T4Cm2qSASU3qVUYW7/HfRtNo7jDYMBbVFhmEfNExnI/gGvoNYFRHkCggAAAABJRU5ErkJggg=="
        />
      </SearchWrap>
    );
  }
}
