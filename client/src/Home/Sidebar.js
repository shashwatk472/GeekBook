import React from "react";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Communities</h3>
      <div className="communities">Data Science</div>
      <div className="communities">Python</div>
      <div className="communities">React</div>
      <div className="communities">Android development</div>
      <div className="communities">web development</div>
      <div className="communities">Blockchain</div>
      <div className="communities">Machine learning</div>
    </div>
  );
}

export default Sidebar;
