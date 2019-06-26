import React from 'react';
import ReactPaginate from 'react-paginate';

interface IProps {
  page;
  pageLimit: number;
  pageCount: number;
  totalHits: number;
  setPage;
}

const SectionPagination = (props: IProps) => {
  const { page, pageLimit, pageCount, totalHits, setPage } = props;
  return (
    <ReactPaginate
      //Label for the previous button
      previousLabel={parseInt(page.value) > 0 && totalHits > pageLimit && '<'}
      //Label for the next button
      nextLabel={pageCount > parseInt(page.value) + 1 && '>'}
      //Label for elipsis
      breakLabel={'..'}
      //Required. Total number of pages
      pageCount={pageCount}
      //Required. Number of pages to display of margins
      marginPagesDisplayed={2}
      //Required. The range of pages displayed
      pageRangeDisplayed={4}
      //Method to call when a page is clicked. Expose the current page object as an argument.
      onPageChange={event => {
        setPage({ value: event.selected.toString(), label: '' });
      }}
      //Classname of the pagination container
      containerClassName={'pagination-component'}
      //Classname of the pagination sub container
      pageClassName={'pagination-component--page'}
      //Classname of the active page
      activeClassName={'pagination-component--active'}
    />
  );
};

export default SectionPagination;
