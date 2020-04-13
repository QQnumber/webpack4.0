import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.css';
import { SmileTwoTone } from '@ant-design/icons';

import logo from './static/images/logo.png';
import styles from './index.scss';
   
class App extends Component {
    render() {
        return (
            <div className={styles.helloWorld}>
                <img src={logo} className={styles.appLogo} alt="react"/> 
                <p>Hello world <SmileTwoTone /></p>
            </div>       
        )
   
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
