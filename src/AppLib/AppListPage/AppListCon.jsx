import React from "react";
import Search from "../../components/Search";
import AppList from "./AppList";
import {
  getAppsLibraryInfo,
  getAppsCategoryInfo,
  searchAppLibrary,
  urlPrefix,
} from "/lib/api";
import Load from "/src/components/Load";
import { pick, isEqual } from "lodash";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
class AppListCon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataByCategory: [],
      datalibraryDetails: [],
      categoryId: "", // 分类id=>点击分类下的应用列表
      libraryId: "", // 模板库模板id=>点击应用详情
      isSearch: false,
      dataBysearch: [],
      categoryName: this.props.categoryName,
      loading: true,
      // isPending: false,
    };
  }
  ajaxRequest = null;
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getlibraryByCategory(this.props.categoryId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const keys = [].concat(["categoryId"]);
    if (!isEqual(pick(this.props, keys), pick(nextProps, keys))) {
      this.getlibraryByCategory(nextProps.categoryId);
    }
    if (!isEqual(nextProps.categoryName, this.props.categoryName)) {
      this.setState({
        categoryName: nextProps.categoryName,
        isSearch: false,
      });
    }
  }

  componentWillUnmount() {}

  // 获取分类下模板库模板列表
  getlibraryByCategory = (categoryId) => {
    this.setState({
      ...this.state,
      loading: true,
      isSearch: false,
      // isPending: true,
    });
    if (!categoryId) {
      // 获取模板库分类首页信息
      getAppsCategoryInfo(this.props.getUrl, {}).then((res) => {
        const { data } = res.data;
        if (data) {
          this.setState({
            ...this.state,
            data: data,
            loading: false,
            isPending: false,
          });
        }
      });
    } else {
      getAppsLibraryInfo(this.props.getUrl, { categoryId }).then((res) => {
        const { data } = res.data;
        if (data) {
          this.setState({
            dataByCategory: data,
            loading: false,
            isPending: false,
          });
        }
      });
    }
  };

  getSearch = (value) => {
    if (!value) {
      this.setState({
        ...this.state,
        isSearch: false,
        loading: false,
        dataBysearch: [],
      });
      return;
    }
    this.setState({
      isSearch: true,
      loading: true,
      dataBysearch: [],
    });
    searchAppLibrary(this.props.getUrl, {
      keyword: value,
    }).then((res) => {
      if (res) {
        this.setState({
          ...this.state,
          loading: false,
          dataBysearch: res.data.data,
        });
      }
    });
  };

  render() {
    const { categoryId, projectId } = this.props;
    if (!categoryId) {
      return (
        <React.Fragment>
          <h1 className="appBoxTitle">安装、并立即使用</h1>
          <p className="appText TxtCenter">
            根据您的需求特点，安装模板库中现成的开箱模板，您可以直接使用，也可以继续按需修改。
          </p>
          <Search getSearch={this.getSearch} />
          {this.state.loading && (
            <div className="mTop100">
              <Load />
            </div>
          )}
          {!this.state.loading && (
            <AppList
              {...this.props}
              list={
                this.state.isSearch ? this.state.dataBysearch : this.state.data
              }
              categoryId={categoryId}
              isSearch={this.state.isSearch}
              loading={this.state.loading}
              projectId={projectId}
            />
          )}
        </React.Fragment>
      );
    } else {
      if (this.state.loading)
        return (
          <div className="mTop100">
            <Load />
          </div>
        );
      return (
        <React.Fragment>
          <h1 className="appBoxTitle">{this.state.categoryName}</h1>
          <AppList
            {...this.props}
            categoryId={categoryId}
            isSearch={this.state.isSearch}
            list={this.state.dataByCategory}
            loading={this.state.loading}
            projectId={projectId}
          />
        </React.Fragment>
      );
    }
  }
}

export default AppListCon;
