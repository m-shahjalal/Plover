import { useState } from 'react';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const user = false;
	const [toggle, setToggle] = useState(false);

	return (
		<nav className={styles.nav}>
			<div className={styles.logo}>
				<Link to='/'>LOGO</Link>
			</div>
			<div
				className={styles.hamburger}
				onClick={() => setToggle(!toggle)}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M4 6h16M4 12h16M4 18h16'
					/>
				</svg>
			</div>
			<ul className={toggle ? styles.show : styles.hide}>
				<li className={styles.linkItem}>
					<Link to='/'>Home</Link>
				</li>
				{user?.email ? (
					<li className={styles.linkItem}>
						<Link to='/account'>Hello! {user.email}</Link>
					</li>
				) : (
					<>
						<li className={styles.linkItem}>
							<Link to='/login'>Log in</Link>
						</li>
						<li className={`${styles.linkItem} ${styles.register}`}>
							<Link to='/register'>Register</Link>
						</li>
					</>
				)}
				<li className={`${styles.linkItem} ${styles.cart}`}>
					<Link to='#'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
							/>
						</svg>
					</Link>
					<div className={styles.badge}>{9}</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
