import React from 'react';
import '../../css/subnavbar.css'
import { useNavigate } from 'react-router-dom';

function SubNavbar() {
    const Nav = useNavigate();
    const navigate = useNavigate();

    const handleCategoryChange = (mycategory) => {
        navigate(`/search/` + mycategory);
    }

    return (
        <div className='subNavbar'>
            <div className='snavcontainer' id="snav-container">
                <ul>
                    <li onClick={() => Nav('/home', { replace: true })} id='home_' className='cate'>{/*<span className="material-symbols-outlined">home</span>*/} Home</li>
                    <li onClick={() => { handleCategoryChange(' Festival | Concert') }} id='festival_concert' className='cate'>{/*<span className="material-symbols-outlined">festival</span>*/} Festival | Concert</li>
                    <li onClick={() => { handleCategoryChange(' Family') }} id='family_' className='cate'>{/*<span className="material-symbols-outlined">diversity_1</span>*/} Family</li>
                    <li onClick={() => { handleCategoryChange(' Theater | Cinema') }} id='theater_cinema' className='cate'>{/*<span className="material-symbols-outlined">theaters</span>*/} Theater | Cinema</li>
                    <li onClick={() => { handleCategoryChange(' Sport') }} id='sport_' className='cate'>{/*<span className="material-symbols-outlined">sports_soccer</span>*/} Sport</li>
                    <li onClick={() => { handleCategoryChange(' Course | Lecture') }} id='course_lecture' className='cate'>{/*<span className="material-symbols-outlined">school</span>*/} Course | Lecture</li>
                </ul>
            </div>
        </div>
    );
}

export default SubNavbar;