
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { FiGrid, FiList } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            <FiGrid className={styles.icon} />
            <span>Calculator</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/materials" className={styles.navLink}>
            <FiList className={styles.icon} />
            <span>Materials</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
