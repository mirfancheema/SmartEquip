import { knowledgeBase } from './knowledgeBase.js';

class Snap2KnowApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="app-container">
        <header class="header">
          <img src="images/Gemini_Generated_Image_2eo7912eo7912eo7.png" alt="Snap2Know Logo" class="logo">
          <h1>Snap2Know</h1>
        </header>
        <main class="main-content">
          <equipment-selector></equipment-selector>
          <button id="fetch-button" disabled>Fetch</button>
          <camera-view></camera-view>
          <voice-input></voice-input>
          <info-display></info-display>
        </main>
        <footer class="footer">
          <p>&copy; 2024 Snap2Know Inc.</p>
        </footer>
      </div>
    `;

    this.selectedEquipment = null;
    this.infoDisplay = this.shadowRoot.querySelector('info-display');
    this.voiceInput = this.shadowRoot.querySelector('voice-input');
    this.fetchButton = this.shadowRoot.querySelector('#fetch-button');

    this.shadowRoot.addEventListener('equipment-selected', (event) => {
        this.selectedEquipment = event.detail.equipmentId;
        this.shadowRoot.querySelector('camera-view').updateEquipment(this.selectedEquipment);
        this.fetchButton.disabled = !this.selectedEquipment;
        if (!this.selectedEquipment) {
            this.infoDisplay.clear();
        }
    });

    this.fetchButton.addEventListener('click', () => {
        if (this.selectedEquipment) {
            this.infoDisplay.updateContent(knowledgeBase[this.selectedEquipment]);
            setTimeout(() => this.infoDisplay.expandCategory('Application'), 100);
        }
    });

    this.voiceInput.addEventListener('command', (event) => {
      this.handleCommand(event.detail.command);
    });
  }

  handleCommand(command) {
    if (!this.selectedEquipment) {
        this.infoDisplay.updateContent({ error: 'Please select an equipment first.' });
        return;
    }

    const lowerCaseCommand = command.toLowerCase();
    const equipment = knowledgeBase[this.selectedEquipment];
    let data = null;

    if (lowerCaseCommand.includes('start') || lowerCaseCommand.includes('application')) {
      data = { application: equipment.application };
    } else if (lowerCaseCommand.includes('maintenance')) {
      data = { maintenance: equipment.maintenance };
    } else if (lowerCaseCommand.includes('troubleshoot') || lowerCaseCommand.includes('error')) {
        data = { troubleshoot: equipment.troubleshoot };
        if (lowerCaseCommand.includes('error code 12')) {
            data = {
                troubleshoot: {
                    ...equipment.troubleshoot,
                    symptoms: equipment.troubleshoot.symptoms.filter(s => s.symptom === 'Error Code 12')
                }
            }
        }
    } else if (lowerCaseCommand.includes('safety')) {
        data = {
            application: { safety: equipment.application.safety }
        }
    }

    if (data) {
      this.infoDisplay.updateContent(data);
    } else {
      this.infoDisplay.updateContent({ error: `Command "${command}" not understood.` });
    }
  }
}

class EquipmentSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const equipmentOptions = Object.keys(knowledgeBase).map(id => {
            return `<option value="${id}">${knowledgeBase[id].name}</option>`;
        }).join('');

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css">
            <div class="equipment-selector">
                <label for="equipment">Select Equipment:</label>
                <select id="equipment">
                    <option value="" disabled selected>Select an equipment</option>
                    ${equipmentOptions}
                </select>
            </div>
        `;

        this.shadowRoot.querySelector('#equipment').addEventListener('change', (event) => {
            this.dispatchEvent(new CustomEvent('equipment-selected', {
                detail: { equipmentId: event.target.value },
                bubbles: true,
                composed: true
            }));
        });
    }
}

class CameraView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="camera-view">
        <p>Camera view simulated. Equipment recognized: <strong id="equipment-id"></strong></p>
      </div>
    `;
    this.equipmentIdElement = this.shadowRoot.getElementById('equipment-id');
  }

  updateEquipment(equipmentId) {
      this.equipmentIdElement.textContent = equipmentId || 'None';
  }
}

class VoiceInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="voice-input">
        <input type="text" placeholder="Enter voice command...">
        <button>Record</button>
      </div>
    `;

    const input = this.shadowRoot.querySelector('input');
    const button = this.shadowRoot.querySelector('button');

    button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('command', { 
        detail: { command: input.value },
        bubbles: true,
        composed: true
      }));
      input.value = '';
    });
  }
}

class InfoDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css">
            <div class="info-display">
                <h2>Please select an equipment to begin.</h2>
            </div>
        `;

        this.icons = {
            APPLICATION: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
            MAINTENANCE: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
            TROUBLESHOOT: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            SAFETY: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
            CHECKLIST: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line><line x1="9" y1="11" x2="15" y2="11"></line></svg>',
            GUIDE: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
            SCHEDULE: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
            PARTS: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
            HISTORY: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M12 7v5l3 3"></path></svg>',
            VIDEOS: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>'
        };
        
        this.shadowRoot.addEventListener('click', (event) => {
            const header = event.target.closest('.category-header');
            if (header) {
                const content = header.nextElementSibling;
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    clear() {
        this.shadowRoot.querySelector('.info-display').innerHTML = '<h2>Please select an equipment to begin.</h2>';
    }

    updateContent(data) {
        const container = this.shadowRoot.querySelector('.info-display');
        let html = '';

        if (data.error) {
            html = `<h2>Error</h2><p>${data.error}</p>`;
        } else {
            if (data.application) {
                html += this.renderCategory('Application', this.renderApplication(data.application));
            }
            if (data.maintenance) {
                html += this.renderCategory('Maintenance', this.renderMaintenance(data.maintenance));
            }
            if (data.troubleshoot) {
                html += this.renderCategory('Troubleshoot', this.renderTroubleshoot(data.troubleshoot));
            }
        }

        container.innerHTML = html;
    }
    
    expandCategory(categoryTitle) {
        const headers = this.shadowRoot.querySelectorAll('.category-header');
        headers.forEach(header => {
            const titleNode = Array.from(header.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (titleNode && titleNode.textContent.trim() === categoryTitle) {
                const content = header.nextElementSibling;
                content.style.display = 'block';
            }
        });
    }

    renderCategory(title, content) {
        let icon = '';
        if (title === 'Application') icon = this.icons.APPLICATION;
        if (title === 'Maintenance') icon = this.icons.MAINTENANCE;
        if (title === 'Troubleshoot') icon = this.icons.TROUBLESHOOT;
        return `
            <div class="category">
                <div class="category-header">${icon} ${title}</div>
                <div class="category-content" style="display: none;">${content}</div>
            </div>
        `;
    }

    renderApplication(application) {
        let content = '';
        if (application.safety) content += this.renderSafety(application.safety);
        if (application.readiness_checklist) content += this.renderChecklist(application.readiness_checklist);
        if (application.quick_start_guide) content += this.renderQuickStart(application.quick_start_guide);
        if (application.instructional_videos) content += this.renderVideos(application.instructional_videos);
        return content;
    }

    renderMaintenance(maintenance) {
        let content = '';
        if (maintenance.safety) content += this.renderSafety(maintenance.safety);
        if (maintenance.schedule) content += this.renderSchedule(maintenance.schedule);
        if (maintenance.parts) content += this.renderParts(maintenance.parts);
        if (maintenance.maintenance_history) content += this.renderMaintenanceHistory(maintenance.maintenance_history);
        return content;
    }

    renderTroubleshoot(troubleshoot) {
        let content = '';
        if (troubleshoot.safety) content += this.renderSafety(troubleshoot.safety);
        if (troubleshoot.symptoms) content += this.renderSymptoms(troubleshoot.symptoms);
        return content;
    }

    renderSafety(safety) {
        return `
            <div class="safety">
                <h3>${this.icons.SAFETY} ${safety.title}</h3>
                <ul>
                    ${safety.points.map(point => `<li><input type="checkbox">${point}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    renderChecklist(checklist) {
        return `
            <h3>${this.icons.CHECKLIST} ${checklist.title}</h3>
            <ul>
                ${checklist.points.map(point => `<li><input type="checkbox">${point}</li>`).join('')}
            </ul>
        `;
    }

    renderQuickStart(guide) {
        return `
            <h3>${this.icons.GUIDE} ${guide.title}</h3>
            <ol>
                ${guide.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
    }
    
    renderSchedule(schedule) {
        return `
            <h3>${this.icons.SCHEDULE} ${schedule.title}</h3>
            <ul>
                ${schedule.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
        `;
    }

    renderParts(parts) {
        return `
            <h3>${this.icons.PARTS} ${parts.title}</h3>
            <ul>
                ${parts.list.map(part => `<li>${part}</li>`).join('')}
            </ul>
        `;
    }

    renderMaintenanceHistory(history) {
        return `
            <h3>${this.icons.HISTORY} ${history.title}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    ${history.records.map(record => `
                        <tr>
                            <td>${record.date}</td>
                            <td>${record.description}</td>
                            <td>${record.technician}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderSymptoms(symptoms) {
        return `
            <h3>Troubleshooting</h3>
            ${symptoms.map(symptom => `
                <h4>${symptom.symptom}</h4>
                <ul>
                    ${symptom.causes.map(cause => `<li>${cause}</li>`).join('')}
                </ul>
            `).join('')}
        `;
    }

    renderVideos(videos) {
        return `
            <h3>${this.icons.VIDEOS} ${videos.title}</h3>
            ${videos.map(video => `
                <h4>${video.title}</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
                </div>
            `).join('')}
        `;
    }
}

customElements.define('snap-2-know-app', Snap2KnowApp);
customElements.define('equipment-selector', EquipmentSelector);
customElements.define('camera-view', CameraView);
customElements.define('voice-input', VoiceInput);
customElements.define('info-display', InfoDisplay);
