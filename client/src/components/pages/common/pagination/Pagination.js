import React from 'react'

const Pagination = ({ totalPages, page, setPage }) => {

  const onPageClick = (i) => {
    if (i + 1 !== page) setPage(i + 1);
  }

  const renderPages = () => {
    const elements = [];
    for (let i = 0; i < totalPages; i++) {
      elements.push(<li key={i} onClick={() => onPageClick(i)}><span className={`pointer ${page === (i + 1) ? 'text-orange text-bold' : ''}`}>{i + 1}</span></li>)
    }

    return elements.map(el => el);
  }

  return (
    <div className="uk-margin-large-top uk-text-small">
      <ul className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove" data-uk-margin>
        <li><a href="#"><span data-uk-pagination-previous></span></a></li>
        {renderPages()}
        <li><a href="#"><span data-uk-pagination-next></span></a></li>
      </ul>
    </div>
  )
}

export default Pagination
