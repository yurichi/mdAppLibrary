import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppSide from "./AppSide";
import AppCon from "./AppListPage";
import { isEqual } from "lodash";
import { GetRequest, browserIsMobile } from "../common/util";
import styled from "styled-components";
const AppConBox = styled.div`
   {
    img {
      border: 0px;
    }
    body ul,
    body ol {
      margin: 0px;
      padding: 0px;
      list-style-type: none;
    }
    a {
      text-decoration: none;
      color: #1e88e5;
      cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
    }
    a:focus {
      outline: none;
      -moz-outline: none;
    }
    input,
    textarea {
      outline: none;
    }

    .overflow_ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .WordBreak {
      word-wrap: break-word;
      word-break: break-word;
    }

    .Hand,
    .pointer {
      cursor: pointer;
    }

    .Block {
      display: block !important;
    }

    .Absolute {
      position: absolute !important;
    }
    .Relative,
    .relative {
      position: relative !important;
    }

    /*浮动*/
    .Left {
      float: left !important;
    }

    .TxtLeft {
      text-align: left !important;
    }
    .TxtCenter {
      text-align: center !important;
    }
    .TxtMiddle {
      vertical-align: middle !important;
    }
    .divCenter {
      margin: 0 auto;
    }
    .w100 {
      width: 100% !important;
    }
    .Bold {
      font-weight: bold !important;
    }
    .Alpha6 {
      opacity: 0.6;
      -moz-opacity: 0.6;
      filter: alpha(opacity=60);
    }
    .mTop6 {
      margin-top: 6px !important;
    }
    .mTop7 {
      margin-top: 7px !important;
    }
    .mTop15 {
      margin-top: 15px !important;
    }
    .mTop18 {
      margin-top: 18px !important;
    }
    .mTop20 {
      margin-top: 20px !important;
    }
    .mTop50 {
      margin-top: 50px !important;
    }
    .mTop80 {
      margin-top: 80px !important;
    }
    .mRight8 {
      margin-right: 8px !important;
    }
    .mRight12 {
      margin-right: 12px !important;
    }
    .mRight20 {
      margin-right: 20px !important;
    }
    .mLeft10 {
      margin-left: 10px !important;
    }
    .mLeft16 {
      margin-left: 16px !important;
    }
    .mLeft24 {
      margin-left: 24px !important;
    }
    .pLeft8 {
      padding-left: 8px !important;
    }
    .pLeft12 {
      padding-left: 12px !important;
    }
    .Gray {
      color: #333 !important;
    }
    .Gray_9e {
      color: #9e9e9e !important;
    }
    .Gray_75 {
      color: #757575 !important;
    }
    .Black18 {
      color: #000 !important;
      font-size: 18px;
    }
    .Font13 {
      font-size: 13px !important;
    }
    .Font14 {
      font-size: 14px !important;
    }
    .Font15 {
      font-size: 15px !important;
    }
    .Font16 {
      font-size: 16px !important;
    }
    .Font18 {
      font-size: 18px !important;
    }
    .Font20 {
      font-size: 20px !important;
    }
    .Font22 {
      font-size: 22px !important;
    }
    .Font26 {
      font-size: 26px !important;
    }
    .Font34 {
      font-size: 34px !important;
    }
    .Font40 {
      font-size: 40px !important;
    }
    .LineHeight28 {
      line-height: 28px !important;
    }
    &.appCon {
      height: 100%;
      box-sizing: border-box;
      overflow-y: hidden;
      display: flex;
      ul {
        margin: 0px;
        padding: 0px;
        list-style-type: none;
      }

      .appSide {
        box-sizing: border-box;
        display: inline-block;
        background-color: #fbfbfb;
        height: 100%;
        overflow-y: auto;
        width: 240px;
      }

      @media screen and (max-width: 1085px) {
        .appSide {
          display: none;
        }
      }
    }
  }
`;
class AppLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      categoryId: "",
      libraryId: "",
    };
  }
  componentDidMount() {
    var classVal = document.documentElement.getAttribute("class") || "";
    classVal = classVal.concat(" appListPage");
    document.documentElement.setAttribute("class", classVal);
    const { libraryId = "", categoryId = "", projectId = "" } = GetRequest();
    this.setState({
      libraryId,
      categoryId,
      projectId,
    });
  }

  componentWillUnmount() {
    var classVal = document.documentElement.getAttribute("class");
    classVal = classVal.replace("appListPage", "");
    document.documentElement.setAttribute("class", classVal);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.location, this.props.location)) {
      const { libraryId = "", categoryId = "", projectId = "" } = GetRequest();
      this.setState({
        libraryId,
        categoryId,
        projectId,
      });
    }
  }

  setCategoryName = (categoryName) => {
    if (categoryName === this.state.categoryName) return;
    this.setState({
      categoryName,
    });
  };

  render() {
    const param = {
      ...this.props,
      ...this.state,
      isMobile: browserIsMobile(),
    };
    return (
      <AppConBox className="appCon">
        <div className="appSide">
          <AppSide {...param} setCategoryName={this.setCategoryName} />
        </div>
        <AppCon {...param} categoryName={this.state.categoryName} />
      </AppConBox>
    );
  }
}

export default class MDAppLibrary extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/library"
            component={(data) => {
              return <AppLib {...this.props} {...data} />;
            }}
            title="模板库"
          />
          <Route
            path="/app/lib"
            component={(data) => {
              return <AppLib {...this.props} {...data} />;
            }}
            title="模板库"
          />
        </Switch>
      </Router>
    );
  }
}
