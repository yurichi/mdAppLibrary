import React from "react";
import cx from "classnames";

class VideoCon extends React.Component {
  render() {
    return (
      <div className={cx("imgVideo", { Hide: !this.props.showVideo })}>
        <div
          className="dialogMask"
          onClick={() => {
            this.props.onCancel();
          }}
        />
        <video width="" className="" controls name="media">
          <source src={this.props.video.viewUrl} type="video/mp4" />
        </video>
        {/* <i
        className="icon icon-close Font40 Hand closeBtn"
        onClick={() => {
          this.props.onCancel();
        }}
      /> */}
        <img
          style={{
            height: "24px",
            textAlign: "center",
            marginLeft: "4px",
            verticalAlign: "top",
            marginTop: "6px",
          }}
          onClick={() => {
            this.props.onCancel();
          }}
          className="Hand closeBtn"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAAXnVPIAAAA+klEQVQ4EY2TwRGDIBBFg6PnWEpKMB0knZCDVXiInSQdqB2klOSsM+R/hnUQQd0ZBHZ5HxZWpbUu8zx/KaUeTdN8TgesruuLMeY5TdM9K4riDbiCo2Ngj3dwR4ZsBkCj/eAo90Q8uCRDVuFzcjv3GJ4h8oXYNUwnAldcYwX2RFIwuVkgJUI/U2OKGPLYdmf6aQsBOsJ07KIEbGP8hOaLuNhqZ2H4ClHDsY0E/LH4pI+mEOTMtcnXWQjEbtvt1KdEZoEYLLXg3wlOt6gTK7AFuxOsXkeKTR2Bt0T4Cm2qSASU3qVUYW7/HfRtNo7jDYMBbVFhmEfNExnI/gGvoNYFRHkCggAAAABJRU5ErkJggg=="
        />
      </div>
    );
  }
}

export default VideoCon;
