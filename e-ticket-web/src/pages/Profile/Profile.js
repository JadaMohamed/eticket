import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";

function Search() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="Route-who-i-m">
        You are in <span>Search</span>
      </div>
    </>
  );
}

export default Search;
