import styles from './Support.module.scss';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const cx = classNames.bind(styles);

function Support() {
  const [tab, setTab] = useState(0);
  const title = ['Người dùng', 'Tài xế'];
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
        <TabPane tabId={0}>
          <div className={cx('wrapper')}>
            <img src={require('~/assets/images/banner-page.jpg')} className={cx('image')} />
          </div>
        </TabPane>
        <TabPane tabId={1}>
          <div className={cx('wrapper')}>
            <img src={require('~/assets/images/banner-page.jpg')} className={cx('image')} />
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Support;
