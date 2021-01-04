import React, { Component } from "react";
import AppDetails from "./AppDetails";
import AppListCon from "./AppListCon.jsx";
import styled from "styled-components";
const AppBoxMd = styled.div`
   {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    overflow-y: auto;
    box-sizing: border-box;
    height: 100%;

    .appBoxScrollContent {
      padding: 0 50px 120px;
      box-sizing: border-box;
    }

    .appBoxTitle {
      font-size: 36px;
      margin-bottom: 0px;
      margin-top: 80px;
      color: #333;
      text-align: center;
    }

    .appText {
      width: 100%;
      max-width: 600px;
      margin: 20px auto 0;
      font-size: 18px;
      line-height: 32px;
      color: #333;
    }

    p,
    img,
    h5 {
      margin: 0;
      padding: 0;
    }

    .detailsBoxPc {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    @media screen and (max-width: 875px) {
      .appBox {
        .appBoxScrollContent {
          padding: 0 24px 120px;
          box-sizing: border-box;
        }
      }
    }
  }
`;
const DetailsBoxPc = styled.div`
   {
    .Hide {
      display: none;
    }

    .imgVideo {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1001;
      background: rgba(0, 0, 0, 0.7);

      .dialogMask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      video {
        z-index: 2;
        margin: 2% 0 0 10%;
        width: 80%;
        max-height: 500px;
        position: relative;
      }

      .closeBtn {
        z-index: 2;
        color: #ffffff;
        position: absolute;
        right: 40px;
        top: 40px;
      }
    }

    .itemImg {
      margin-top: 32px;
      width: 100%;
      border-radius: 10px;
      height: 300px;
      overflow: hidden;

      img {
        width: 100%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .appIcon {
      display: inline-block;
      border-radius: 16px;
      width: 80px;
      height: 80px;
      background-color: #f9ce1d;
      text-align: center;
      line-height: 80px;

      .iconFont {
        color: #fff;
        line-height: 80px;
      }
    }

    .detailsHead {
      width: 100%;
      margin-top: 50px;
      display: flex;

      .headLeft {
        height: auto;
        overflow: hidden;
        float: left;
        display: flex;
        flex: 1;

        .appIcon {
          width: 80px;
        }

        .appTitle {
          flex: 1;

          span.title {
            line-height: 1.25;
          }

          span.tag {
            border-radius: 13px;
            background-color: #f5f5f5;
            padding: 6px 18px;
            display: inline-block;
            box-sizing: border-box;
            color: #9e9e9e;
            margin-top: 10px;

            &:hover {
              color: #2196f3;
              cursor: pointer;
            }
          }
        }
      }

      .headBtn {
        float: right;
        margin-top: 17px;
        margin-left: 60px;

        .btn {
          height: 46px;
          transition: all 0.2s ease;
          width: 160px;
          border-radius: 32px;
          display: inline-block;
          text-align: center;
          line-height: 46px;
          cursor: pointer;
        }

        .btnForVideo {
          background-color: #f0f9ff;
          color: #2196f3;
          font-weight: bold;

          &:hover {
            background-color: #dff2ff;
          }
        }

        .btnForApp {
          background-color: #4caf50;
          color: #ffffff;
          font-weight: bold;

          &:hover {
            background-color: #388e3c;
          }
        }
      }
    }

    @media screen and (max-width: 1170px) {
      .detailsHead {
        display: block;

        .headBtn {
          float: none;
          clear: both;
          padding-top: 50px;
          margin-left: 0;
        }
      }
    }

    .details {
      clear: both;

      .detailsTitle {
        font-family: "宋体";
        padding: 60px 0;
      }

      .detailsText {
        max-width: 800px;
        padding-bottom: 60px;
        white-space: pre-wrap;
      }

      .sliderBox {
        // max-width: 1200px;
        padding-top: 56.52%;
        position: relative;

        .imgBox {
          overflow: hidden;
          width: 100%;
          padding-top: 56.52%;
          position: absolute;
          left: 0;
          top: 0;
          border: 2px solid #eaeaea;
          border-radius: 8px;

          .silderImg {
            width: 800%;
            position: absolute;
            left: 0;
            top: 0;
            transition: all 0.2s ease-in-out;

            .itemBannerImg {
              width: 12.5%;
              min-height: 10px;
              display: block;
            }
          }
        }

        span.btn {
          position: absolute;
          top: 50%;
          cursor: pointer;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          background-color: #ffffff;
          color: #9e9e9e;
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
          display: block;
          line-height: 39px;
          text-align: center;
          z-index: 1;
          img {
          }

          &:hover {
            color: #2196f3;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.25);
          }
        }

        span.btn.disabledBtn {
          color: #eaeaea;
          cursor: auto;
        }

        .leftBtn {
          left: 0;
          margin: -18px 0 0 -18px;
        }

        .rightBtn {
          right: 0;
          margin: -18px -18px 0 0;
        }

        ul {
          margin: 25px auto 0;
          text-align: center;

          li {
            width: 24px;
            height: 8px;
            background-color: #eaeaea;
            display: inline-block;
            border-radius: 4px;
            margin: 0 3px;
          }

          li.current {
            width: 40px;
            background-color: #2196f3;
          }
        }
      }

      .mobileSliderBox {
        padding-top: 178.65%;

        .mobileImgBox {
          padding-top: 178.65%;
        }
      }

      .appOperation {
        margin: 80px auto 0;
        text-align: center;

        .appIcon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          line-height: 36px;

          .iconFont {
            line-height: 36px;
          }
        }

        .btnForApp {
          width: 160px;
          height: 46px;
          border-radius: 32px;
          color: #4caf50;
          background-color: #eaf7ed;
          line-height: 46px;
          font-weight: bold;
          cursor: pointer;

          &:hover {
            background-color: #d4efdc;
          }
        }
      }
    }

    // 移动端
    @media screen and (max-width: 875px) {
      .itemImg {
        height: 220px;
      }

      .headBtn {
        display: flex;

        .btnForVide,
        .btnForApp,
        .btn {
          max-width: 160px;
          flex: 1;
        }
      }
    }
  }
`;
class AppCon extends Component {
  render() {
    const {
      categoryId = "",
      libraryId = "",
      projectId = "",
      categoryName = "",
      accountId = "",
    } = this.props;
    return (
      <AppBoxMd
        className="appBoxMd"
        style={{
          maxHeight: !accountId
            ? "initial"
            : document.documentElement.clientHeight - 50,
          height: !accountId
            ? "initial"
            : document.documentElement.clientHeight - 50,
        }}
      >
        {!libraryId ? (
          <div className="appBoxScrollContent">
            <AppListCon {...this.props} />
          </div>
        ) : (
          <div className="appBoxScrollContent">
            <DetailsBoxPc className="detailsBoxPc">
              <AppDetails {...this.props} />
            </DetailsBoxPc>
          </div>
        )}
      </AppBoxMd>
    );
  }
}

export default AppCon;
