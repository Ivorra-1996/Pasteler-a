import React from 'react'
import styles from './Footer.module.css'
import { Divider } from '../Divider';

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.content}>
            <Divider />
            <div className={styles.container}>
                <p> Copyright © 1999-2025 Dulce encanto S.R.L</p>
                <p>Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
            </div>
        </div>
    </div>
  )
}

export default Footer;