import React from "react";

// we can export the function directly
export default function Header({ title, children }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
