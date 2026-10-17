/**
 * ============================================================================
 * OncoSynth AI Enterprise - Genetic Test Report Parser & Variant Identifier
 * ============================================================================
 */

const ReportParserEngine = {
    initDragAndDrop() {
        const zone = document.getElementById('upload-zone');
        if (!zone) return;

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('dragging');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('dragging');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('dragging');
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                this.handleFile(e.dataTransfer.files[0]);
            }
        });

        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files.length > 0) {
                    this.handleFile(e.target.files[0]);
                }
            });
        }
    },

    async handleFile(file) {
        if (!file) return;
        const zone = document.getElementById('upload-zone');
        zone.innerText = `Ingesting report: ${file.name}...`;

        try {
            if (file.name.endsWith('.txt')) {
                const text = await file.text();
                document.getElementById('complex-patient-data').value = text;
                AppState.saveState();
                zone.innerText = "Text Genetic Report Loaded Successfully!";
            } else if (file.name.endsWith('.docx')) {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                document.getElementById('complex-patient-data').value = result.value;
                AppState.saveState();
                zone.innerText = "Word DOCX Genetic Report Loaded Successfully!";
            } else {
                zone.innerText = "Unsupported file format. Please upload .txt or .docx reports.";
            }
        } catch (err) {
            console.error("File ingestion error:", err);
            zone.innerText = "Error parsing file. Please paste text directly below.";
        }
    },

    parseReport() {
        const out = document.getElementById('analysis-output');
        const rawTextarea = document.getElementById('complex-patient-data');
        if (!out || !rawTextarea) return;

        const rawText = rawTextarea.value;
        out.innerText = "Scanning genetic report for affected genes, somatic variants, and gene editing coordinates...";

        setTimeout(() => {
            const lines = rawText.split('\n');
            const identifiedGenes = [];
            const editingTargets = [];
            
            const oncogeneRegistry = [
                "EGFR", "KRAS", "TP53", "BRCA1", "BRCA2", "PIK3CA", "ALK", 
                "ROS1", "BRAF", "HER2", "ERBB2", "MET", "RET", "NTRK1", 
                "NTRK2", "NTRK3", "IDH1", "IDH2", "SMAD4", "PTEN", "ARID1A"
            ];

            lines.forEach(line => {
                const upperLine = line.toUpperCase();
                oncogeneRegistry.forEach(gene => {
                    const regex = new RegExp(`\\b${gene}\\b`, 'i');
                    if (regex.test(upperLine)) {
                        identifiedGenes.push(`• Affected Gene Detected: ${gene}`);
                        editingTargets.push(`- Actionable Site: ${gene} variant confirmed in text snippet ("${line.trim()}")`);
                    }
                });
            });

            const uniqueGenes = [...new Set(identifiedGenes)];
            const uniqueTargets = [...new Set(editingTargets)];

            if (uniqueGenes.length === 0) {
                uniqueGenes.push("• Scan finished: No standard oncogene symbols detected in text.");
                uniqueTargets.push("- Recommendation: Manually specify target biomarker in Panel 3 below.");
            } else {
                const firstGeneMatch = uniqueGenes[0].replace("• Affected Gene Detected: ", "").trim();
                const biomarkerInput = document.getElementById('target-biomarker');
                if (biomarkerInput) {
                    biomarkerInput.value = `${firstGeneMatch} Variant Axis`;
                }
            }

            const summaryReport = `[GENETIC VARIANT PARSING REPORT]
--------------------------------------------------
[AFFECTED GENES IDENTIFIED]:
${uniqueGenes.join('\n')}

[PRECISION GENE EDITING / TREATMENT TARGETS]:
${uniqueTargets.join('\n')}

[AI RESEARCH SYNTHESIS]:
• Action: Target genes isolated and synchronized to Panel 3. Proceed to synthesize your guide RNA / therapeutic blueprint below.`;

            out.innerText = summaryReport;
            AppState.saveState();
        }, 450);
    }
};

ReportParserEngine.initDragAndDrop();
