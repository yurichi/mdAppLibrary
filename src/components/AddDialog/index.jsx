import React, { Fragment, Component } from "react";
import { getLibraryToken, installApp } from "/lib/api";
import AddLoad from "./AddLoad";
import { filter } from "lodash";
import ModalForPC from "./ModalForPC";
import ModalForM from "./ModalForM";
class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInstallApp: false,
    };
  }

  render() {
    let { onCancel, visible, projectId, isMobile, projects = [] } = this.props;
    const { isInstallApp } = this.state;
    projects = projects.filter((item) => !item.cannotCreateApp);
    return !!projectId || isInstallApp ? (
      <AddLoad visible={visible} />
    ) : (
      <Fragment>
        {isMobile ? (
          <ModalForM
            {...this.props}
            projects={projects}
            installAppFn={(projectId, libraryId) => {
              this.setState({
                isInstallApp: true,
              });
              this.props.installAppFn(projectId, libraryId);
            }}
          />
        ) : (
          <ModalForPC
            {...this.props}
            projects={projects}
            installAppFn={(projectId, libraryId) => {
              this.setState({
                isInstallApp: true,
              });
              this.props.installAppFn(projectId, libraryId);
            }}
          />
        )}
      </Fragment>
    );
  }
}

export default AddDialog;
