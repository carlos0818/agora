import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import ReactPaginate from 'react-paginate'

interface Props {
    items: []
    itemsPerPage: number
    setStart: Dispatch<SetStateAction<number>>
    setEnd: Dispatch<SetStateAction<number>>
}

export const Paginate: FC<Props> = ({ items, itemsPerPage, setStart, setEnd }) => {

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(items.length / itemsPerPage));
        setStart(itemOffset);
        setEnd(endOffset);
      }, [items, itemOffset]);

    const handlePageClick = (page: any) => {
        const newOffset = (page.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    }

    return (
        <ReactPaginate
            previousLabel={ 'Previous' }
            nextLabel={ 'Next' }
            breakLabel={ '...' }
            marginPagesDisplayed={ 3 }
            pageRangeDisplayed={ 80 }
            pageCount={ pageCount }
            onPageChange={ handlePageClick }
            containerClassName={ 'pagination' }
            pageClassName={ 'page-item' }
            pageLinkClassName={ 'page-link' }
            previousClassName={ 'page-item' }
            previousLinkClassName={ 'page-link' }
            nextClassName={ 'page-item' }
            nextLinkClassName={ 'page-link' }
            breakClassName={ 'page-item' }
            breakLinkClassName={ 'page-link' }
            activeClassName={ 'active' }
            renderOnZeroPageCount={null}
            disabledClassName={ 'disabled-page' }
            disabledLinkClassName={ 'disabled-page' }
        />
    )
}
