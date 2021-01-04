import React from "react";
import cx from "classnames";

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.saveRef = (ref) => {
      this.refDom = ref;
    };
  }
  state = {
    tag: 0,
    width: 0,
  };

  handleChange = (n) => {
    const { clientWidth, clientHeight } = this.refDom;
    this.setState({
      tag: n,
      width: clientWidth,
    });
  };

  /** 判断当前设备是否为移动端 */
  browserIsMobile = () => {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    return (
      bIsIpad ||
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM
    );
  };

  render() {
    const isMobile = this.browserIsMobile();
    if (!this.props.data || this.props.data.length <= 0) {
      return;
    }
    return (
      <div className={cx("sliderBox", { mobileSliderBox: isMobile })}>
        <span
          className={cx("leftBtn btn", { disabledBtn: this.state.tag <= 0 })}
          onClick={() => {
            if (this.state.tag <= 0) return false;
            this.handleChange(this.state.tag - 1);
          }}
        >
          <img
            style={{
              height: "18px",
              "textAlign": "center",
              "verticalAlign": "top",
              "marginTop": "10px",
              cursor: this.state.tag <= 0 ? "auto" : "pointer",
              opacity: this.state.tag <= 0 ? 0.3 : 1,
            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAyCAYAAACtd6CrAAAAAXNSR0IArs4c6QAAAatJREFUWAm92M1Kw0AQB/AmLRS1NMFjaDwIPoF6EVHoA3gQFF/C9/EVvKoo+gSCFw9eFD0l5OihuUrqf0JTok02m92ZDGyybML8CMx+kH5PMIIgWPd9/87zvPfZbJYMpCyCXNd9QP4jtB20bRFsMpmsOY7zCOBwPp9/o3+Cfs+hC2csoCfkLKDjKIreyGDFVBAr1gSxYToQC6YLWWNtIMJcuhjGECVdWXV1+UyxIb7qHklXyrsOonGT0s8hfNV0MWGX80gFmWDGUFvMCmqDWUO6GAukg7FBTRgrpMLYoTpMBKrCxKD/mChUxsShAusEImwQhuE17vmiioV1Gsdxfjihh9zhAriipFjFN9EuuYFyvj5Oqp84sT5j8BzY/ng83sLYTfklrn6fEiH5F8AXdAnckwJzrCtwiXUB/sGkwRVMEqzEpMBaTAJUYtxgI8YJamFcoDbGAbbCbMHWmA1ohJmCxlgZxJ54gd1it2m3sMIKcDQavQI7awKtMQLTNP3QAVkwXZAN0wFZsSaQHVOBpn8LKKcykiS5zbLsFNPiB1W6oXyZ6yH+Ox4UuX4Bq7yvJV1DZG0AAAAASUVORK5CYII="
          />
        </span>
        <div
          className={cx("imgBox", { mobileImgBox: isMobile })}
          ref={this.saveRef}
        >
          <div
            className="silderImg"
            style={{ left: -this.state.tag * this.state.width + "px" }}
          >
            {this.props.data.map((item, i) => {
              return (
                <img
                  className={cx("itemBannerImg Block Left", {
                    current: i === this.state.tag,
                  })}
                  key={`img-${i}`}
                  src={
                    !isMobile
                      ? `${item.fileUrl}?imageView2/0/w/1200/h/680`
                      : `${item.fileUrl}?imageView2/0/w/698/h/1246`
                  }
                />
              );
            })}
          </div>
        </div>
        <ul>
          {this.props.data.map((item, i) => {
            return (
              <li
                className={cx({ current: i === this.state.tag })}
                onClick={() => this.handleChange(i)}
                key={`li-${i}`}
              />
            );
          })}
        </ul>
        <span
          className={cx("rightBtn btn", {
            disabledBtn: this.state.tag >= this.props.data.length - 1,
          })}
          onClick={() => {
            if (this.state.tag >= this.props.data.length - 1) return;
            this.handleChange(this.state.tag + 1);
          }}
        >
          <img
            style={{
              height: "18px",
              "textAlign": "center",
              "marginLeft": "4px",
              "verticalAlign": "top",
              "marginTop": "10px",
              cursor: this.state.tag >= this.props.data.length - 1 ? "auto" : "pointer",
              opacity: this.state.tag >= this.props.data.length - 1 ? 0.3 : 1,            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAyCAYAAACtd6CrAAAAAXNSR0IArs4c6QAAAZtJREFUWAnt1s1Kw0AQB/AmpCAtCBaFpDSpF0EQLx6Fqn0NQVB8Ed/Bs/giQrUP4MWLxzaB9CIRhJ5SE/8jJITVancz29MuhGzzMT9mumSn0ev19nzfH7uuu9PQPGzLsu5gDJrN5kg3aC8WiwtgExwHjuOMu93uNuZahkVRPc/rA3rEdDfP89csywZxHL/RPc7xjVFAEbRt+zgMw3dOzC6CzWazKUp6ht8T/I/7yO4pCIKt4j7HucysCCZk+IIMT7ky/IERqgv8FdMFLsV0gH9i3OC/GCe4EsYFroxxgFJYXVAaqwMqYaqgMqYC1sJkwdqYDFhuMfSS6hC2p0PanjqdzqYYjwWjoCLYbrdHIshSxmoG1e0J15/n8/kwSZIPeoYdo6DLQLYyElIMKmmapkM0T1NcO2q1Wg90TwtGgdGtXaKX6dMc6C2dtQx02TfosnOcP3Gca0EoaAXK1gYhs6u1ZGQgqTJXF4MpnSld8QnKzGIwi8EsBqk1UD5sPqplKRQm1MptoNXK0XZdR1F0rxBD7hV8607k3lB7+gu3XEQBvIY6BQAAAABJRU5ErkJggg=="
          />
        </span>
      </div>
    );
  }
}

export default Slideshow;
