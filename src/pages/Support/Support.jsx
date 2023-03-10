import styles from './Support.module.scss';
import User from './User/User';
import Shipper from './Shipper/Shipper';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const cx = classNames.bind(styles);

function Support() {
  const [tab, setTab] = useState(0);
  const title = ['Người dùng', 'Tài xế'];
  const content = [<User />, <Shipper />];
  return (
    <div>
      <Nav tabs>
        {title.map((e, i) => (
          <NavItem key={i} className={cx('tabs')}>
            <NavLink className={tab == i ? 'active' : ''} onClick={() => setTab(i)}>
              <div className={tab == i ? cx('choose-tab') : cx('no-choose-tab')}>{e}</div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={tab}>
        {content.map((e, i) => (
          <TabPane tabId={i} key={i}>
            <div className={cx('wrapper')}>{e}</div>
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
}

export default Support;
