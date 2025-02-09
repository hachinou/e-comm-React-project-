import React, {useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';



 export default function PaginatedItems({ itemsPerPage ,total,setPage}) {
   const pageCount = total/ itemsPerPage;

  return (
    <>
    
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >>"
        onPageChange={(e) =>setPage(e.selected +1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<< "
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex justify-content-end align-items-center"
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary rounded-circle"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
}
