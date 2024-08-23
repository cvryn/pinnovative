import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import pinnovatelogo from '../../../public/pinnovate-logo.png'
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import NavigationLoggedOut from "./NavigationLoggedOut";
import "./Navigation.css";


function Navigation() {

  const currentUser = useSelector((state) => state.session.user)
  return (
    <>
     {currentUser &&
      <nav id="navigation-main-container">
        <div id="nav-left-container">
          <NavLink to="/" id='logo-homepage-container'>
          <img src={pinnovatelogo} alt='website logo' style={{height: '30px'}} />innovate
          </NavLink>
          <div id='nav-explore-create-button'>Explore
          </div>

        </div>
        <div id="nav-middle-container">
          {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
          <SearchBar />
        </div>

        <div id="nav-right-container">
          <div id='nav-explore-create-button'>Create
            </div>
          <ProfileButton />
        </div>
      </nav>
      }

      {!currentUser &&
      <div>
        <NavigationLoggedOut />
        </div>}

    </>
  );
}

export default Navigation;
