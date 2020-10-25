import React from "react";
import Pagination from "react-js-pagination";


const AppPagination = ({pageSize, pageNum, onChange, count}) => {
    return (
        <div>
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={pageNum}
                itemsCountPerPage={pageSize}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                onChange={page => onChange(page, pageSize)}
            />
        </div>
    );
};

export default AppPagination;
