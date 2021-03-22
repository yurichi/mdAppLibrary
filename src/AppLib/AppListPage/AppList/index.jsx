import React from "react";
import AppItem from "./AppItem";
import _, { map, pick } from "lodash";
import { Link } from "react-router-dom";
import cx from "classnames";
import Load from "/src/components/Load";
import styled from "styled-components";
import { GetPath } from "../../../common/util";
const AppListBox = styled.div`
  &.appListBox {
    width: 100%;
    max-width: 1408px;
    margin: 0 auto;
    .mTop100 {
      margin-top: 100px;
    }
    a.moreBtn {
      .normalImg {
        margin-left: 5px;
        display: inline-block;
        margin-top: 10px;
      }
      .hoverImg {
        margin-left: 5px;
        display: none;
        margin-top: 10px;
      }
      &:hover {
        .normalImg {
          display: none;
        }
        .hoverImg {
          display: inline-block;
        }
        color: #2196f3 !important;
        transition: all 0.2s;

        h5 {
          transition: all 0.2s;
          color: #2196f3 !important;
        }
      }
    }

    .listItemA {
      // flex: 1;
      max-width: 350px;
      width: 100%;
      display: inline-block;
    }

    .listBox {
      clear: both;
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      // justify-content: wrap;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      align-content: flex-start;
      // justify-content: space-between;
      justify-content: left;

      a {
        width: 100%;
        display: inline-block;
      }
    }
    &.exampleBox {
      height: 340px;
      overflow-y: hidden;
    }
    &.appListBox {
      @media (min-width: 700px) and (max-width: 784px) {
        &.appListBox {
          max-width: 570px;
        }

        &.appListBox .listItemA {
          max-width: 280px;
        }
      }

      @media (min-width: 785px) and (max-width: 1315px) {
        &.appListBox {
          max-width: 666px;
        }

        &.appListBox .listItemA {
          max-width: 330px;
        }
      }

      @media (min-width: 1316px) and (max-width: 1439px) {
        &.appListBox {
          max-width: 904px;
        }

        &.appListBox .listItemA {
          max-width: 300px;
        }
      }

      @media (min-width: 1410px) and (max-width: 1439px) {
        &.appListBox {
          max-width: 1000px;
        }

        &.appListBox .listItemA {
          max-width: 330px;
        }
      }

      @media (min-width: 1440px) and (max-width: 1479px) {
        &.appListBox {
          max-width: 1028px;
        }

        &.appListBox .listItemA {
          max-width: 340px;
        }
      }

      @media (min-width: 1480px) and (max-width: 1825px) {
        &.appListBox {
          max-width: 1060px;
        }
      }

      @media screen and (max-width: 699px) {
        &.appListBox {
          max-width: 320px;

          .appItem {
            margin: 12px auto !important;
          }

          &.appListBox .listItemA {
            width: 100%;
          }
        }

        &.exampleBox {
          height: auto;
          max-height: 630px;
          overflow: hidden;

          .moreBtn {
            margin-right: 0 !important;
          }

          h5 {
            margin-left: 0 !important;
          }
        }
      }
    }
  }
`;
class AppList extends React.Component {
  renderItem = (libraries) => {
    const {
      categoryId,
      list,
      isSearch,
      projectId,
      accountId = "",
    } = this.props;
    let url = !accountId ? "/library" : "/app/lib";
    url = GetPath() + url;
    return (
      <div className="mTop28 listBox">
        {map(libraries, (item, i) => {
          if (!categoryId && !isSearch && i > 4) {
            return false;
          } else {
            const projectIdtr = !projectId ? "" : `projectId=${projectId}&`;
            const categoryIdStr = !categoryId
              ? ""
              : `categoryId=${categoryId}&`;
            return (
              <div className="listItemA" key={`listItemA-${item.libraryId}`}>
                <Link
                  to={`${url}?${projectIdtr}${categoryIdStr}libraryId=${item.libraryId}`}
                >
                  <AppItem {...this.props} data={item} key={item.libraryId} />
                </Link>
              </div>
            );
          }
        })}
      </div>
    );
  };

  render() {
    const {
      categoryId,
      list,
      isSearch,
      loading,
      projectId,
      accountId = "",
    } = this.props;
    const thisCategoryId = categoryId;
    const projectIdtr = !projectId ? "" : `projectId=${projectId}&`;
    let url = !accountId ? "/library" : "/app/lib";
    url = GetPath() + url;
    if (loading) {
      return <Load className="mTop100" />;
    } else {
      return (
        <div>
          {!thisCategoryId ? (
            map(list, ({ categoryId, name, libraries }) => (
              <AppListBox
                className={cx("mTop80 appListBox", { exampleBox: !isSearch })}
                key={`appListBox-${categoryId}`}
              >
                {!thisCategoryId && !isSearch && (
                  <React.Fragment>
                    <Link
                      key={`more-${categoryId}`}
                      to={`${url}?${projectIdtr}categoryId=${categoryId}`}
                      className="moreBtn Gray_75"
                    >
                      <h5 className="Font22 Gary Bold Left mLeft16 Gray">
                        {name}
                      </h5>
                      <img
                        className="normalImg"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEKADAAQAAAABAAAADQAAAACP7QD7AAAAiUlEQVQoFWNgIAKUlJQ4lJaWJmBTyoRNEIfYfGyGkGIAyFwMQ0g1AMMQRqCzDvwHAhzOBgszMjIKABkGaGoSu7u7F4AMwKsZTRM6N5EcL8ANATrcgWwDgJoX9vT0JDDCjcPDAKUDYDjshymBaQbxSXYBsmaSDUDXTJIB2DSDDCAKFBQUgNIBVgAACHo5bVAUCxQAAAAASUVORK5CYII="
                      />
                      <img
                        className="hoverImg"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEKADAAQAAAABAAAADQAAAACP7QD7AAAAjklEQVQoFWNgIAJoTH/voD39fQI2pUzYBLGKMTLOx2YI8QaATMViCGkGYDGEEeisA0CT/2N1NlQQKCnAyMBggKLm///Eq5mCCxi1Z3zAqxlFEzoHaAjpXkA1xIF8A/7/Xwj0QgLQa4QBKB0wMzLuh6uEagbxSXcBkmbSDUDTTJoBWDSDDCAKKMx/L4BLIQC+kDRwk0xq7QAAAABJRU5ErkJggg=="
                      />
                    </Link>
                  </React.Fragment>
                )}
                {!isSearch ? this.renderItem(libraries) : null}
              </AppListBox>
            ))
          ) : (
            <AppListBox
              className="mTop50 appListBox listbox"
              key={`list-${categoryId}`}
            >
              {this.renderItem(list)}
            </AppListBox>
          )}
          {isSearch ? (
            <AppListBox
              className="mTop80 appListBox listbox"
              key={`list-${categoryId}`}
            >
              <h5 className="Font22 Gary Bold Left mLeft10">
                {list.length}
                个相关应用
              </h5>
              {this.renderItem(list)}
            </AppListBox>
          ) : null}
        </div>
      );
    }
  }
}

export default AppList;
