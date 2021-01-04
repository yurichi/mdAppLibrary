import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
const AddWrap = styled.div`
   {
    .dialogContent {
      padding-right: 0;
    }
    .pLeft12 {
      padding-left: 12px;
    }
    .flex {
      -webkit-flex: 1;
      flex: 1;
      -ms-flex: 1;
    }
    .icon-chatnetwork-type2 {
      color: #00bcd4;
    }
    .icon-chatnetwork-type3 {
      color: #00bcd4;
    }
    .icon-chatnetwork-type4 {
      color: #8bc34a;
    }
    .icon-chatnetwork-type5 {
      color: #ff9802;
    }
    .icon-chatnetwork-type6 {
      color: #ba68c8;
    }
    ul,
    ol {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    .projectList {
      overflow-y: auto;
      max-height: 300px;
      margin-bottom: 20px;
    }

    .splitLine {
      width: 372px;
      border-top: 1px solid #ccc;
      margin: 24px 0;
    }

    .projectList.scrollBar {
      padding-right: 20px;
    }

    .projectItem {
      display: flex;
      font-size: 15px;
      line-height: 50px;
      width: 100%;
      height: 50px;
      margin-bottom: 20px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
    }
    .projectItem .companyName {
      overflow: hidden;
      min-width: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #333;
    }
    .projectItem:hover {
      border-color: #2196f3;
      color: #2196f3;
    }
    .projectItem:last-child {
      margin: 0;
    }
    .projectItem:not(:hover) .icon-arrow-right-border {
      color: #999 !important;
    }
  }
`;

export default class ModalForPC extends React.Component {
  renderDiaLog = () => {
    let { projects = [] } = this.props;
    projects = projects.filter((item) => !item.cannotCreateApp);
    const length = projects.length;
    return (
      <div className="dialogContent">
        <ul className="projectList">
          {projects.map((item, i) => {
            // let type = ((length - 1 - i) % 6) + 1;
            // let projectClassName = "icon-chatnetwork-type" + type;
            return (
              <li
                className="projectItem flexRow pointer ThemeColor3 Hand false"
                key={item.projectId}
                onClick={() => {
                  this.props.installAppFn(item.projectId, this.props.libraryId);
                }}
              >
                {/* <span className={cx("Font18 projectIcon", projectClassName)} /> */}
                <span className="flex companyName">{item.companyName}</span>
                {/* <span className="icon-arrow-right-border ThemeColor3" /> */}
                <img
                  style={{
                    height: "16px",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAyCAYAAACtd6CrAAAAAXNSR0IArs4c6QAAAZtJREFUWAnt1s1Kw0AQB/AmpCAtCBaFpDSpF0EQLx6Fqn0NQVB8Ed/Bs/giQrUP4MWLxzaB9CIRhJ5SE/8jJITVancz29MuhGzzMT9mumSn0ev19nzfH7uuu9PQPGzLsu5gDJrN5kg3aC8WiwtgExwHjuOMu93uNuZahkVRPc/rA3rEdDfP89csywZxHL/RPc7xjVFAEbRt+zgMw3dOzC6CzWazKUp6ht8T/I/7yO4pCIKt4j7HucysCCZk+IIMT7ky/IERqgv8FdMFLsV0gH9i3OC/GCe4EsYFroxxgFJYXVAaqwMqYaqgMqYC1sJkwdqYDFhuMfSS6hC2p0PanjqdzqYYjwWjoCLYbrdHIshSxmoG1e0J15/n8/kwSZIPeoYdo6DLQLYyElIMKmmapkM0T1NcO2q1Wg90TwtGgdGtXaKX6dMc6C2dtQx02TfosnOcP3Gca0EoaAXK1gYhs6u1ZGQgqTJXF4MpnSld8QnKzGIwi8EsBqk1UD5sPqplKRQm1MptoNXK0XZdR1F0rxBD7hV8607k3lB7+gu3XEQBvIY6BQAAAABJRU5ErkJggg=="
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        className="AddDialog"
        title="安装到"
        footer={null}
        onCancel={this.props.onCancel}
        style={{
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <AddWrap className="AddWrap">{this.renderDiaLog()}</AddWrap>
      </Modal>
    );
  }
}
