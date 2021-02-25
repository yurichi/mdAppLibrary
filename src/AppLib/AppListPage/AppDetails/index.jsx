import React from "react";
import cx from "classnames";
import Slideshow from "../../../components/Slideshow";
import AddDialog from "../../../components/AddDialog";
import { getAppLibraryDetail, installApp, getLibraryToken } from "/lib/api";
import Load from "/src/components/Load";
import { pick, isEqual, map } from "lodash";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import VideoCon from "../../../components/VideoCon";
import SvgIcon from "/src/components/SvgIcon";
import { Modal } from "antd";
class AppDetails extends React.Component {
  constructor(props) {
    super(props);
    this.saveRef = (ref) => {
      this.refDom = ref;
    };
  }
  state = {
    showVideo: false,
    showDialog: false,
    data: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetch();
  }

  componentDidUpdate(prevProps, prevState) {
    const keys = [].concat(["libraryId"]);
    if (!isEqual(pick(this.props, keys), pick(prevProps, keys))) {
      this.fetch();
    }
  }

  showVideoDialog = () => {
    this.setState({ showVideo: true });
  };

  IsPC = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  };

  fetch = () => {
    getAppLibraryDetail(this.props.getUrl, {
      libraryId: this.props.libraryId,
    }).then((res) => {
      if (res.length <= 0) {
        let url = !this.props.accountId ? "/library" : "/app/lib";
        window.location.assign(url);
      } else {
        this.setState({
          ...this.state,
          data: res.data.data,
        });
      }
    });
  };

  installAppFn = (projectId, libraryId) => {
    const { isMobile, upgradeVersionDialog = null } = this.props;
    const cancelFn = (hint, explainText) => {
      this.setState({ showDialog: false });
      if (upgradeVersionDialog) {
        upgradeVersionDialog({
          projectId,
          explainText,
          hint,
        });
      } else {
        Modal.error({
          title: hint || "安装失败",
          content: "",
        });
      }
    };
    getLibraryToken(this.props.getUrl, {
      libraryId: libraryId,
      projectId: projectId,
    })
      .then(
        (o) => {
          const { data } = o.data;
          let fileUrl = data;
          if (!fileUrl) {
            Modal.error({
              title: "安装失败，请稍后重试",
              content: "",
            });
          }
          installApp(this.props.installUrl, {
            fileUrl,
            projectId: projectId,
            id: libraryId,
            accountId: this.props.accountId,
          })
            .then(
              (res) => {
                const { status = null, data } = res;
                if (data) {
                  const { appId = "", errorCode = "" } = data;
                  //错误码 1=应用数量超标，6=工作表数量超标,7=网络已到期
                  if ([1, 6, 7].includes(errorCode) || !appId) {
                    switch (errorCode) {
                      case 1:
                        return cancelFn(
                          "当前网络应用数量超标",
                          ""
                        );
                      case 6:
                        return cancelFn(
                          "当前网络工作表数量超标",
                          ""
                        );
                      case 7:
                        return cancelFn(
                          "版本授权已过期",
                          ""
                        );
                      default:
                        return cancelFn("安装失败", "安装失败，请稍后重试");
                    }
                  }
                  setTimeout(() => {
                    let url = isMobile
                      ? `/mobile/app/${appId}`
                      : `/app/${appId}`;
                    window.location.assign(url);
                  }, 3000);
                } else {
                  cancelFn();
                }
              },
              (data) => {}
            )
            .catch((error) => {
              console.log(error);
            });
        },
        () => {}
      )
      .catch((error) => {
        console.log(error);
      });
  };

  appDone = () => {
    const {
      projects = [],
      accountId = "",
      isMobile,
      categoryId = "",
      libraryId = "",
    } = this.props;
    let flag = this.IsPC();
    if (flag || isMobile) {
      if (!accountId) {
        const categoryIdStr = !categoryId ? "" : `categoryId=${categoryId}&`;
        let url =
          (this.props.unKnownUrl || "/login.htm?ReturnUrl=") +
          encodeURIComponent(
            `${window.location.origin}/app/lib?${categoryIdStr}libraryId=${libraryId}`
          );
        window.location.assign(url);
      } else {
        if (!projects.find((item) => !item.cannotCreateApp)) {
          Modal.info({
            title: "您没有可安装模板的组织",
          });
          return;
        }

        this.setState({ showDialog: true });
        // 存在projectId，直接安装，无需选择网络
        if (this.props.projectId) {
          this.installAppFn(this.props.projectId, libraryId);
        }
      }
    } else {
      let ua = window.navigator.userAgent.toLowerCase();
      // 打开某手机上的某个app应用
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        Modal.info({
          title: "点击右上角，选择在浏览器中打开",
          content: "",
        });
      } else {
        window.open(`mingdao://installapk/${libraryId}`);
        setTimeout(function () {
          if (/iphone|ipad|ipod/.test(ua)) {
            window.open("http://itunes.apple.com/cn/app/id468630782");
          } else if (/android/.test(ua)) {
            window.open("//filepub.mingdao.com/mingdao.apk?r=" + Math.random());
          } else {
            window.open("/m/mobile.htm");
          }
        }, 1000);
      }
    }
  };

  renderTag = (categoryInfo) => {
    let url = !this.props.accountId ? "/library" : "/app/lib";
    return (
      <React.Fragment>
        {map(categoryInfo, ({ categoryId, name }) => (
          <Link
            key={`more-${categoryId}`}
            to={`${url}?categoryId=${categoryId}`}
          >
            <span className="tag Font13 mRight8">{name}</span>
          </Link>
        ))}
      </React.Fragment>
    );
  };

  render() {
    const { data = [] } = this.state;
    const { isMobile } = this.props;
    if (data.length <= 0) {
      return (
        <div className="mTop100">
          <Load />
        </div>
      );
    }
    const {
      name,
      intro,
      description,
      iconUrl,
      iconColor,
      cover,
      pictures,
      mobilePictures,
      video,
      categoryInfo,
    } = this.state.data;
    return (
      <React.Fragment>
        {!this.state.showVideo ? (
          ""
        ) : (
          <VideoCon
            video={video}
            showVideo={this.state.showVideo}
            onCancel={() => this.setState({ showVideo: false })}
          />
        )}
        <div className="itemImg Block Relative">
          <img
            className="Absolute"
            src={`${cover.fileUrl}?imageView2/0/w/1200/h/900/format/jpg/interlace/1/q/90`}
          />
        </div>
        <div className="detailsHead">
          <div className="headLeft">
            <div
              className="appIcon Left mRight20"
              style={{ backgroundColor: iconColor }}
            >
              <SvgIcon
                url={iconUrl}
                fill="#fff"
                size={40}
                addClassName="mTop20"
              />
            </div>
            <div className="appTitle Left">
              <span className="Gray Font34 TxtLeft title Bold WordBreak">
                {name}
              </span>
              <br />
              {this.renderTag(categoryInfo)}
            </div>
          </div>
          <div className="headBtn">
            {!video || !video.viewUrl ? (
              ""
            ) : (
              <div
                className="btnForVideo btn Font16"
                onClick={this.showVideoDialog}
              >
                {/* <i className="icon icon-arrow-right-tip Font16" /> */}
                <img
                  style={{
                    height: "16px",
                    verticalAlign: "text-top",
                  }}
                  className="mRight8"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAABqZJREFUaAXFW2tSGzkQlqYg7FZh4AaZPUHMCXBOEOcEy/5M2CrgBJAT4FQt5Odyg3hPEHMCnBNkuAFgqnZJUu79umWZsUYazxOrCs+MHt39jbpbrdagVQslPn/oguye0hTjinuKtdJ8Py+kKFFK40+NFcn1KjnYHM87NHSjG6Kj4r/u3yit+qDX11rvVKFLRLcYN1SkhsmfW/9UoeGOqQUwPqMd9cvDoZrSUVVQrkD2WcBGeqD+2/yYHGsGXqlUBhh/mpy0AcxFYYEm7zof3LYiz6UBAlhPEf3t2lQRZnX6iM1q/QeAjsrQKQUwvpicYcBRGQZwMHek9NiMYcfCRcf4gclSF7/bfF+0kFKD5H3nuGj/QgDF1l48fNGaPeKSQnQDQEN40JF67IyW2Y/Q3mCt0D2tab8IYCJ43u+br5fRZkmXAow//Rur6c/Py8DhzV5htvB2t4ZLXkFuc3xx34dYRxBsL6+jgIzW3ibvfk3y+uUCNOB+XOd5SAD7itd0VNY28oTiNmPragABX4X6Gge0vpsHMgiwiFpCFY+T95uDkABN1McXD5hNOgvRWqauUWigyrM5tjPSu22DY9mYB/OC577xySqmA1l9bVznBRifTwYhm2OVpO+dbhthVUhI5sU8xRw8nVhWltnTlHUyrPualPeNCIPHzV4R7+VjVrfOeNyHUcguSavXri/IziAWca8grCIrBMcyyYuFDCF15QDElX0BIKb5NBShkIr6q5q5tNAsA8uSrrP3LDtjsM98nQOU6Vd0mG609+ItS25lZlsmS6LRq9gkPLifKB0aLKZ1DhBe07sjYLur5i2pj9DuS5qZX6BqteJdeQ12iqzZwGKrnwAGZg9uaN7ZDip6hTPoqReTb7JoFx1Upl9INk2/WzICkMMjX7SC2btyvZIdWPTKdNkrA+RJ0TFF+7FsLKPbX2xRQr4nG/QaLceW7uCqzwB52o7KBmQkvc+yGhUl9SYjOJaFuoGzS7MNlTUy0p3LC5Ozx3URezu/emLL00JpQ2URyl26ojIfxhbBifTcRnnm/VyLpVGVDckKbBFW/9iLA5tVb32DlY2pbEhWYOMZ7GZlprvnilqaUFkjq8cOgQ1Ohl66AJ9yKG5Le891VdYrM6ntKBR7tgclTLkxlZ2x4G2UWSZcnpzUWVGprrI2Y7couB+gRsZ61WUK79BAWfPT0LG//jlqkUfVuo/c56gcNx37+vMyceNrWEUdx5X02Inrxr9WdtD7uoa3lUAXFj0pUTBVZwc3fUV27ENy0DmtTJdlhldxyi1mMOtQJMzhk6NnKaySyKXUAMd7TpY5Iy6wYaGXw8dMm+J0esulMZUMyQpsa5jBkddf4awA+IZtYaytkmnBWNaMdqIDsEUmv+kJc9TTrjhNq/59fZXMyuCTFeEm8kiyDkJVMjMldjjbFWcJVqtpTCVT7IPZCNIj7mYX+gxAQ0N7s2ymrdyvqOT7TgtJ44CMmi5ZQgEY2hVDrXv1E0ZtqKR5uZKFh4zmKfWbykbYGcR6jwN/X5mqM191kbo2VHKBb0A27Cwubb85QJyYAmDW2cjBBo6w7IDiVz1EuNWCShoJ5FgtsJc1WEy/BecqqXutTnwg5LisZHbbR6eJOpNHomsfLXf5WQDIA347v0+w+L90B8tXDo+d3efa6bv87bNkyjcm1959LGzv28FWbPvy9UlFZ7UU6f3Z7cJFCOKgsa1U/AKzwIPw5oNZpWNfF5/sGYCSLSb10UeA7ZFPflcBcg7Oa3fwHpDZtwvJqKgFhiz0GI2v7HP6KupK0VsTBaVb2rmXkyo9/RycOTkg6nR93DMzOO+Eg0a4+czpDbczI3zTcg3Gh/P+Ld0wD+aVB44PZkPsgzPIA4y3mo4AaTtEAKoxhiUf+9QjNKZIvQQYWOfELIIDOIhY71b6jMTSlG9l6OcwpK62H2Z7hI/zBnU/g5TPMiP5EKhnafuuol16rZ8HjsflzqAlLAa+ET78t/34Kh/naEQSU6T+f3Suli0rQnt9sqcibHmI9r0b1zQD5sGmA7VcRpuHFQJo6fOnGlCZUnY3AzwWGjRL7Wkdz569Bz/SFvgRb3nQKRxZlQLIPCXAnSJS9wQDAZmaqcYizutcWVsvDVBAcr5GzvQJbzLsgBpCdscbgao5m0oAreCzxZe/JdtvfEZ5xnhXgE1AEVuzMrnXWgDTxOQzSBwbY83qVZ9VuH3eiWOz2tTpcmMAF8DyvxXIweoU0YWO0bYDRgtR0SyIuIVPTBAS418L1KiNyOh/iID8hEt+o14AAAAASUVORK5CYII="
                />

                {"观看视频"}
              </div>
            )}
            <div
              className={cx("btnForApp Font16 btn", {
                mLeft24: !!video.viewUrl,
              })}
              onClick={this.appDone}
            >
              {"安装模板"}
            </div>
          </div>
        </div>
        <div className="details">
          <div className="Font26 Gray_9e detailsTitle">
            {!intro ? "" : `“${intro}”`}
          </div>
          <p className="Font16 Gray LineHeight28 detailsText">
            <Linkify properties={{ target: "_blank" }}>{description}</Linkify>
          </p>
          <Slideshow
            isMobile={isMobile}
            data={
              !isMobile || !mobilePictures || mobilePictures.length <= 0
                ? pictures
                : mobilePictures
            }
          />
          <div className="appOperation">
            <div className="appTitle TxtMiddle">
              <div
                className="appIcon mRight12"
                style={{ backgroundColor: iconColor }}
              >
                <SvgIcon
                  url={iconUrl}
                  fill="#fff"
                  size={22}
                  addClassName="mTop7"
                />
              </div>
              <span className="Gray Font18 Bold title">{name}</span>
            </div>
            <p className="appDet mTop25 Font20 Gray_75">
              {!intro ? "" : `“${intro}”`}
            </p>
            <div className="btnForApp Font16 btn mTop50" onClick={this.appDone}>
              {"立即安装"}
            </div>
          </div>
        </div>
        {this.state.showDialog ? (
          <AddDialog
            {...this.props}
            visible={this.state.showDialog}
            onCancel={() => this.setState({ showDialog: false })}
            libraryId={this.props.libraryId}
            projectId={this.props.projectId}
            installAppFn={this.installAppFn}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export default AppDetails;
