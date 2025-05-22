import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import '../assets/styles.css';

export default function DetailsTab() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    'User Data',
    'Conversation Attributes',
    'Company Details',
    'Salesforce',
    'Stripe',
    'Jira for Tickets'
  ];

  return (
    <div className="details-tab p-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-muted small">Assignee</div>
          <div className="fw-semibold">Brian Byrne</div>
        </div>
        <div>
          <div className="text-muted small">Team</div>
          <div className="fw-semibold">Unassigned</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-muted fw-semibold small mb-2 d-flex justify-content-between">
          <span>LINKS</span>
          <span className="cursor-pointer" onClick={() => toggleSection('Links')}>▾</span>
        </div>
        <div className="d-flex flex-column gap-2">
          <button className="btn btn-sm btn-light d-flex justify-content-between align-items-center">
            <span><i className="bi bi-ticket-detailed me-2"></i> Tracker ticket</span>
            <i className="bi bi-plus"></i>
          </button>
          <button className="btn btn-sm btn-light d-flex justify-content-between align-items-center">
            <span><i className="bi bi-archive me-2"></i> Back-office tickets</span>
            <i className="bi bi-plus"></i>
          </button>
          <button className="btn btn-sm btn-light d-flex justify-content-between align-items-center">
            <span><i className="bi bi-arrow-return-right me-2"></i> Side conversations</span>
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section} className="mb-2">
          <div
            className="d-flex justify-content-between align-items-center fw-semibold cursor-pointer parts"
            onClick={() => toggleSection(section)}
          >
            <span>{section.toUpperCase()}</span>
            <i className={`bi ${openSections[section] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </div>
          <Collapse in={openSections[section]}>
            <div className="mt-2 text-muted small">
              This is {section.toLowerCase()} content.
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}
