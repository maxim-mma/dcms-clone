import React from 'react';

function SVG({ className = '', size = '24' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size - 1}
      className={className}
      viewBox="0 0 24 23"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      // strokeLinecap="round"
      // strokeLinejoin="round"
    >
      <path d="M7.74523 1.03655L7.74524 1.03655C11.9797 0.605248 16.0399 4.12501 16.8855 9.36532L13.9722 9.66322C13.6965 8.15358 13.0901 6.83748 12.211 5.85904C11.1275 4.65302 9.63418 3.97604 7.96081 4.14691L7.96062 4.14692L5.29876 4.41924L4.32426 4.51894L4.40383 5.49529L4.81954 10.5957L1.82732 10.9014L1.07653 1.7157L7.74523 1.03655Z" />
      <path d="M20.084 13.0029H22.9595C22.5349 18.169 18.8261 22 14.6051 22H8V13H10.9572V17.9839V18.9839H11.9572H14.6077C17.7146 18.9839 19.7443 16.3042 20.084 13.0029Z" />
    </svg>
  );
}

export default SVG;
