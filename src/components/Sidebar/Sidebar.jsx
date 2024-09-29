import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { useContext, useState } from "react";
import { Context } from "../../context/Context.jsx";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);
  const toggleSidebar = () => {
    setExtended(!extended);
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };
  // {`sidebar ${extended ? "" : "collapsed"}`
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={toggleSidebar}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div className="recent-entry-parent">
                  <div
                    // onMouseOver={handleMouseOver}
                    // onMouseOut={handleMouseOut}
                    onClick={() => loadPrompt(item)}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="" />
                    <p>{item}</p>
                  </div>

                  <div className="tooltip">
                    <p>{item}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
