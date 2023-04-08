import styles from '../Policy.module.scss';
import policyAPI from '~/api/policyAPI';
import { navigateToPolicy } from '~/global/functionGlobal';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DetailPolicy() {
  const url = window.location.href.slice(29);
  const info = navigateToPolicy(url);

  const [policy, setPolicy] = useState([]);
  useEffect(() => {
    const getPolicy = async () => {
      try {
        const res = await policyAPI.getByType(info.typePolicy);
        setPolicy(res.filter((x) => x.hide === false));
      } catch (error) {
        console.log(error);
      }
    };
    getPolicy();
  }, []);

  return (
    <div className={cx('wrapper-policy')}>
      <div className={cx('title-header')}>{info.header}</div>
      {policy.length > 0 ? (
        policy.map(
          (e, i) =>
            e.hide === false && (
              <div key={i}>
                <div className={cx('title')}>{e.title}</div>
                <ul className={cx('content')}>
                  {e.content.map((e1, i1) => (
                    <li key={i1}>{e1}</li>
                  ))}
                </ul>
              </div>
            ),
        )
      ) : (
        <div>Chưa có chính sách nào cả</div>
      )}
    </div>
  );
}

export default DetailPolicy;
