import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * A custom button for navigation with an icon and a label. Made for main menu selections.
 */
function MenuSelection({ text, icon, path }) {
  const className = 'bg-purple-600 w-4/5 lg:w-1/3 p-3 text-lg text-white rounded hover:bg-purple-800';
  return (
    <Link to={path} className={className}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span>{text}</span>
        </div>
        <FaChevronRight />
      </div>
    </Link>
  );
}

MenuSelection.propTypes = {
  /**
   * Menu selection's text.
   */
  text: PropTypes.string.isRequired,
  /**
   * Menu selection's icon.
   */
  icon: PropTypes.element.isRequired,
  /**
   * A path to redirect to if the button/selection is clicked.
   */
  path: PropTypes.string.isRequired,
};

export default MenuSelection;
