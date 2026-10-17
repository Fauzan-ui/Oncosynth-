/**
 * ============================================================================
 * OncoSynth AI Enterprise - Core State Management Module
 * ============================================================================
 */

const AppState = {
    inputs: [
        'complex-patient-data', 
        'target-biomarker', 
        'therapy-type',
        'paper-search-query'
    ],

    saveState() {
        try {
            this.inputs.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    localStorage.setItem(`oncosynth_${id}`, el.value);
                }
            });
            localStorage.setItem('oncosynth_analysis-output', document.getElementById('analysis-output').innerText);
            localStorage.setItem('oncosynth_cure-output', document.getElementById('cure-output').innerText);
            localStorage.setItem('oncosynth_dna-seq-output', document.getElementById('dna-seq-output').innerText);
            localStorage.setItem('oncosynth_paper-list-output', document.getElementById('paper-list-output').innerHTML);
            localStorage.setItem('oncosynth_paper-summary-output', document.getElementById('paper-summary-output').innerText);

            const storageBadge = document.getElementById('storage-status-badge');
            if (storageBadge) {
                storageBadge.innerText = "Storage: Synchronized";
                storageBadge.style.color = "var(--accent-emerald)";
            }
        } catch (err) {
            console.error("Storage persistence error:", err);
        }
    },

    loadState() {
        try {
            this.inputs.forEach(id => {
                const val = localStorage.getItem(`oncosynth_${id}`);
                const el = document.getElementById(id);
                if (val !== null && el) {
                    el.value = val;
                }
            });

            const analysisOut = localStorage.getItem('oncosynth_analysis-output');
            if (analysisOut) document.getElementById('analysis-output').innerText = analysisOut;

            const cureOut = localStorage.getItem('oncosynth_cure-output');
            if (cureOut) document.getElementById('cure-output').innerText = cureOut;

            const dnaOut = localStorage.getItem('oncosynth_dna-seq-output');
            if (dnaOut) document.getElementById('dna-seq-output').innerText = dnaOut;

            const paperList = localStorage.getItem('oncosynth_paper-list-output');
            if (paperList) document.getElementById('paper-list-output').innerHTML = paperList;

            const paperSum = localStorage.getItem('oncosynth_paper-summary-output');
            if (paperSum) document.getElementById('paper-summary-output').innerText = paperSum;

        } catch (err) {
            console.error("Failed to load saved state from localStorage:", err);
        }
    },

    init() {
        window.addEventListener('load', () => {
            this.loadState();
            console.info("OncoSynth AI Enterprise Workspace initialized successfully.");
        });

        this.inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => this.saveState());
                el.addEventListener('change', () => this.saveState());
            }
        });
    }
};

AppState.init();
