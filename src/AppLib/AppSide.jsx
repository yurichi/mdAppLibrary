import React, { Component } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import { getAppsCategoryInfo } from "/lib/api";
import styled from "styled-components";
import { GetPath } from "../common/util";
const AppCategories = styled.div`
   {
    ul {
      list-style-type: none;
    }
    .appCategories {
      height: 100%;
      padding: 22px 0 !important;
      box-sizing: border-box;
      a {
        &:hover {
          text-decoration: none;
        }
      }
      li {
        box-sizing: border-box;
        width: 222px;
        height: 40px;
        line-height: 40px;
        padding-left: 28px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        cursor: pointer;
        color: #333333;
        transition: 0.2s ease-in-out all;
        &:hover {
          background-color: #f0f0f0;
          color: #333333;
        }
      }
      .current {
        color: #fff;
        background-color: #2196f3;
        &:hover {
          background-color: #2196f3;
          color: #fff;
        }
      }
    }
  }
`;
export default class AppSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    getAppsCategoryInfo(this.props.getUrl, { isCategory: true }).then((res) => {
      if (res) {
        const { data = [] } = res.data;
        this.setState({
          list: data,
        });
        this.setName(this.props.categoryId);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryId !== this.props.categoryId) {
      this.setName(nextProps.categoryId);
    }
  }

  setName = (categoryId) => {
    if (categoryId) {
      const dataList = this.state.list.filter(
        (data) => categoryId === data.categoryId
      );
      if (!dataList || dataList.length <= 0) return "";
      const name = dataList[0].name;
      this.props.setCategoryName(name);
    }
  };

  render() {
    const { projectId = "", accountId = "", categoryId = "" } = this.props;
    const projectIdtr = !projectId ? "" : `projectId=${projectId}&`;
    const { list = [] } = this.state;
    let url = !accountId ? "/library" : "/app/lib";
    url = GetPath() + url;
    if (!list || list.length <= 0) return "";
    const ptr = !projectId ? "" : `?projectId=${projectId}`;
    return (
      <AppCategories>
        <ul
          className="appCategories"
          style={{
            maxHeight: document.documentElement.clientHeight - 50,
            height: document.documentElement.clientHeight - 50,
          }}
        >
          <Link to={`${url}${ptr}`}>
            <li className={cx({ current: !categoryId })}>首页</li>
          </Link>
          {list.map(({ categoryId, name }) => (
            <Link
              key={categoryId}
              to={`${url}?${projectIdtr}categoryId=${categoryId}`}
            >
              <li
                className={cx({
                  current: this.props.categoryId === categoryId,
                })}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </AppCategories>
    );
  }
}
