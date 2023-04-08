import React from 'react'

const GridPagination = ({userPerPage, totalUsers, paginate, currentPage, setUserPerPage}) => {

    const pageNumbers=[];
    for(let i= 1; i<=Math.ceil(totalUsers/userPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <div className='pagination'>
      <div className='pagination-left'>
        {pageNumbers.map(number=>(<div key={number} className={`page-item ${currentPage==number? 'active':''}`}><span className='pagelink' onClick={()=>paginate(number)}>{number}</span></div>))}
      </div>
      <div className="pagination-right">
        <div className="stats">Showing {currentPage}/{pageNumbers.length}</div>
        {/* <div className="set-user-perpage"><input type="number" min="1" value={userPerPage} onChange={(e)=>setUserPerPage(e.target.value)}/> <span>Per Page</span></div> */}
      </div>
    </div>
  )
}

export default GridPagination
