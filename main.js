import { knowledgeBase } from './knowledgeBase.js';

class Snap2KnowApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="app-container">
        <header class="header">
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
            if (header.textContent === categoryTitle) {
                const content = header.nextElementSibling;
                content.style.display = 'block';
            }
        });
    }

    renderCategory(title, content) {
        return `
            <div class="category">
                <div class="category-header">${title}</div>
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
                <h3>${safety.title}</h3>
                <ul>
                    ${safety.points.map(point => `<li><input type="checkbox">${point}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    renderChecklist(checklist) {
        return `
            <h3>${checklist.title}</h3>
            <ul>
                ${checklist.points.map(point => `<li><input type="checkbox">${point}</li>`).join('')}
            </ul>
        `;
    }

    renderQuickStart(guide) {
        return `
            <h3>${guide.title}</h3>
            <ol>
                ${guide.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
    }
    
    renderSchedule(schedule) {
        return `
            <h3>${schedule.title}</h3>
            <ul>
                ${schedule.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
        `;
    }

    renderParts(parts) {
        return `
            <h3>${parts.title}</h3>
            <ul>
                ${parts.list.map(part => `<li>${part}</li>`).join('')}
            </ul>
        `;
    }

    renderMaintenanceHistory(history) {
        return `
            <h3>${history.title}</h3>
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
            <h3>Instructional Videos</h3>
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