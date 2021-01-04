import React from "react";
import { Modal, List } from "antd-mobile";

export default class ModalForM extends React.Component {
  render() {
    return (
      <Modal
        popup
        visible={this.props.visible}
        onClose={this.props.onCancel}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>安装到</div>} style={{ maxHeight: 390 }}>
          {this.props.projects.map((item, index) => (
            <List.Item
              key={item.projectId}
              thumb={''
                // <i
                //   className={`Font20 icon icon-chatnetwork-type${
                //     ((length - 1 - index) % 6) + 1
                //   }`}
                // />
              }
              onClick={() => {
                this.props.installAppFn(item.projectId, this.props.libraryId);
              }}
            >
              {item.companyName}
            </List.Item>
          ))}
        </List>
      </Modal>
    );
  }
}
