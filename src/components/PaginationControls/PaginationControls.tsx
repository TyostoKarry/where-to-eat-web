import { Button } from "@components/Button";
import { FC, useEffect, useState } from "react";

import LeftArrowIcon from "../../assets/icons/left-arrow.svg?react";
import RightArrowIcon from "../../assets/icons/right-arrow.svg?react";
import UpArrowIcon from "../../assets/icons/up-arrow.svg?react";
import "./paginationcontrols.css";

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  restaurantCount: number;
  itemsPerPage: number;
  totalPages: number;
}

export const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  setCurrentPage,
  restaurantCount,
  itemsPerPage,
  totalPages,
}) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlurOrEnter = () => {
    const newPage = parseInt(inputValue, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages)
      setCurrentPage(newPage);
    if (isNaN(newPage) || newPage < 1) setInputValue("1");
    if (newPage > totalPages) setInputValue(totalPages.toString());
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, restaurantCount);

  return (
    <div className="pagination-controls-container">
      <h3 className="pagination-controls__page-number">
        {startItem} - {endItem} / {restaurantCount}
      </h3>

      <div className="pagination-controls">
        <Button
          label={<LeftArrowIcon className="pagination-controls__icon" />}
          useLightTheme
          onClick={() => setCurrentPage(currentPage - 1)}
          width="auto"
          disabled={currentPage === 1}
        />
        <div className="pagination-controls__page-number-container">
          <input
            id="pagination-input"
            type="number"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlurOrEnter}
            onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
            className="pagination-input"
            min={1}
            max={totalPages}
          />
          <span>/</span>
          <span className="pagination-controls__total-pages">{totalPages}</span>
        </div>
        <Button
          label={<RightArrowIcon className="pagination-controls__icon" />}
          useLightTheme
          onClick={() => setCurrentPage(currentPage + 1)}
          width="auto"
          disabled={currentPage === totalPages}
        />
      </div>

      <div className="pagination-controls__up-button">
        <Button
          label={<UpArrowIcon className="pagination-controls__icon" />}
          useLightTheme
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          width="auto"
        />
      </div>
    </div>
  );
};
