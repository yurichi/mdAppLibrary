import React from "react";
import styled from "styled-components";
const AppItemBox = styled.div`
   {
    // width: 100%;
    overflow: hidden;
    transition: 0.2s ease-in-out all;
    cursor: pointer;
    margin: 25px 16px 40px 16px;
    flex: 1 1;
    // min-width: 320px;
    // max-width: 320px;
    align-items: flex-start;
    align-content: flex-start;
    display: flex;
    flex-flow: column nowrap;

    .wrapper {
      width: 100%;
      height: 280px;
      // background-color: #F7F7F8;
      position: relative;
      display: flex;
      flex-flow: row wrap;
      // width: 100%;
      flex: 0 0 auto;
      // margin: 0 10px;
      border-radius: 5px;
      overflow: hidden;

      .itemImg {
        height: 190px;
        background-size: 100%;
        width: 100%;
        background-repeat: no-repeat;
      }

      .textContainer {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 90px;
        overflow: hidden;
        padding: 0 20px;
        transition: 0.2s height ease;
        background-color: #f7f7f8;
        color: #333;
        box-sizing: border-box;

        h5 {
          // line-height: 20px;
        }
      }

      &:hover {
        .itemImg {
          opacity: 0.3;
        }

        .textContainer {
          height: 130px;
        }
      }
    }
  }
`;

class AppItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppItemBox className="appItem">
        <div className="wrapper">
          <div
            className="itemImg"
            style={{
              backgroundImage:
                "url(" +
                this.props.data.cover.fileUrl +
                "?imageView2/0/w/640/h/480/format/jpg/interlace/1/q/90)",
            }}
          />
          <div className="textContainer">
            <h5 className="mTop15 Font20 Gray overflow_ellipsis">
              {this.props.data.name}
            </h5>
            <p className="mTop5 Font14 Gray_9e overflow_ellipsis w100">
              {this.props.data.intro}
            </p>
          </div>
        </div>
      </AppItemBox>
    );
  }
}

export default AppItem;
