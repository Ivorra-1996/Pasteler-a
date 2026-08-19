import React from 'react';
import style from './Logo.module.css';

const Logo = () => {
  return (
    <div className={style.logo}>
        <div className={style.circle}>
          <div className={style.content}>
              <div className={style.horizontalLine}></div>
              <p className={style.brandName}>Dulce encanto</p>
              <div className={style.horizontalLine}></div>
          </div>
        </div>
    </div>
  );
}

export default Logo;
