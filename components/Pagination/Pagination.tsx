import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

export interface PaginationProps {
  pageCount: number;
  currentPage: number; // 1-based
  onPageChange: (page: number) => void; // 1-based
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
    />
  );
}