import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* User Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          <div className="avatar-circle">K</div>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">Vault</h3>
          <p className="profile-subtext">Kumar Harsh</p>
        </div>
        <button className="profile-dropdown-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5.5C3 4.67157 3.67157 4 4.5 4H7.5C8.32843 4 9 4.67157 9 5.5V8.5C9 9.32843 8.32843 10 7.5 10H4.5C3.67157 10 3 9.32843 3 8.5V5.5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5.5C11 4.67157 11.6716 4 12.5 4H15.5C16.3284 4 17 4.67157 17 5.5V8.5C17 9.32843 16.3284 10 15.5 10H12.5C11.6716 10 11 9.32843 11 8.5V5.5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 12.5C3 11.6716 3.67157 11 4.5 11H7.5C8.32843 11 9 11.6716 9 12.5V15.5C9 16.3284 8.32843 17 7.5 17H4.5C3.67157 17 3 16.3284 3 15.5V12.5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 12.5C11 11.6716 11.6716 11 12.5 11H15.5C16.3284 11 17 11.6716 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H12.5C11.6716 17 11 16.3284 11 15.5V12.5Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>Dashboard</span>
        </a>

        <a href="#" className="nav-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 17L17 11M17 11L17 5M17 11L3 11M3 11L3 5M3 11L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Nexus</span>
        </a>

        <a href="#" className="nav-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 7V10L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Intake</span>
        </a>

        <div className="nav-section">
          <button className="nav-item nav-dropdown">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Services</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="dropdown-icon">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="nav-submenu">
            <a href="#" className="nav-subitem">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 6V12M6 9H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Pre-active</span>
            </a>
            <a href="#" className="nav-subitem">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>Active</span>
            </a>
            <a href="#" className="nav-subitem">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 9L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Blocked</span>
            </a>
            <a href="#" className="nav-subitem">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 7L11 11M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Closed</span>
            </a>
          </div>
        </div>

        <div className="nav-section">
          <button className="nav-item nav-dropdown">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 6H16M4 6V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V6M4 6V4M16 6V4M7 3V6M13 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Invoices</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="dropdown-icon">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="nav-submenu">
            <a href="#" className="nav-subitem highlighted">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 9L8 12L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Proforma Invoices</span>
            </a>
            <a href="#" className="nav-subitem">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 9L8 12L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Final Invoices</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
