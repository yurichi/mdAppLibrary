import React from 'react';
import Load from '/src/components/Load';
import styled from "styled-components";
const BoxLoading = styled.div`
   {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1001;

    .dialogMask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.7);
    }

    .text {
      z-index: 2;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);

      .addLoading {
        .MdLoader-path {
          stroke: #fff;
        }
      }

      p {
        color: #fff;
      }
    }
  }
`;

class AddLoad extends React.Component {
  render() {
    return (
      <BoxLoading className='boxLoading'>
        <div className="dialogMask"></div>
        <div className='text TxtCenter'>
          <Load className="addLoading" />
          <p className='Font18 mTop18 TxtCenter'>正在安装模板…</p>
        </div>
      </BoxLoading>
    );
  }
}

export default AddLoad;
