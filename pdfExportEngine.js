/**
 * ============================================================================
 * OncoSynth AI Enterprise - Multi-Page PDF Report Export Engine
 * ============================================================================
 */

const PDFExportEngine = {
    exportPanel(panelType) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.setTextColor(56, 189, 248);
        doc.text("OncoSynth AI Enterprise Workspace", 20, 20);
        
        doc.setFontSize(11);
        doc.setTextColor(156, 163, 175);
        doc.text(`Scientific Panel Export | Timestamp: ${new Date().toLocaleString()}`, 20, 28);
        doc.line(20, 33, 190, 33);

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);

        if (panelType === 'paper-search') {
            doc.text("Interactive Paper Search & Summary Report", 20, 45);
            const textContent = document.getElementById('paper-summary-output').innerText || 'No data available.';
            doc.setFontSize(10);
            const splitText = doc.splitTextToSize(textContent, 170);
            doc.text(splitText, 20, 55);
        } else if (panelType === 'analyzer') {
            doc.text("Genetic Variant & Target Identification Report", 20, 45);
            
            const inputData = document.getElementById('complex-patient-data').value;
            const outputData = document.getElementById('analysis-output').innerText;
            
            doc.setFontSize(11);
            doc.text("[Ingested Genetic Report Data]:", 20, 55);
            doc.setFontSize(9);
            doc.text(doc.splitTextToSize(inputData, 170), 20, 63);

            doc.setFontSize(11);
            doc.text("[Parser Findings & Gene Targets]:", 20, 120);
            doc.setFontSize(9);
            doc.text(doc.splitTextToSize(outputData, 170), 20, 128);
        }

        doc.save(`OncoSynth_AI_${panelType}_Report.pdf`);
    },

    exportFullReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Page 1: Header & Research Paper Summaries
        doc.setFontSize(22);
        doc.setTextColor(56, 189, 248);
        doc.text("OncoSynth AI | Complete Therapeutic Blueprint", 20, 20);
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 28);
        doc.line(20, 33, 190, 33);

        let yPos = 43;
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        doc.text("[SECTION 1: Interactive Research Paper Summary]", 20, yPos);
        yPos += 8;
        doc.setFontSize(9);
        doc.text(doc.splitTextToSize(document.getElementById('paper-summary-output').innerText, 170), 20, yPos);

        // Page 2: Genetic Report & Parser
        doc.addPage();
        yPos = 20;
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        doc.text("[SECTION 2: Ingested Genetic Test Findings]", 20, yPos);
        yPos += 8;
        doc.setFontSize(9);
        doc.text(doc.splitTextToSize(document.getElementById('complex-patient-data').value, 170), 20, yPos);

        yPos += 55;
        doc.setFontSize(13);
        doc.text("[SECTION 3: Identified Gene Targets & Coordinates]", 20, yPos);
        yPos += 8;
        doc.setFontSize(9);
        doc.text(doc.splitTextToSize(document.getElementById('analysis-output').innerText, 170), 20, yPos);

        // Page 3: Cure & Virtual Sequence Blueprint
        doc.addPage();
        yPos = 20;
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        doc.text("[SECTION 4: Precision Therapeutic & Editing Blueprint]", 20, yPos);
        yPos += 8;
        doc.setFontSize(9);
        doc.text(`Target Axis: ${document.getElementById('target-biomarker').value}`, 20, yPos);
        yPos += 6;
        doc.text(`Therapy Platform: ${document.getElementById('therapy-type').value}`, 20, yPos);
        
        yPos += 12;
        doc.text("[Virtual Guide / Nucleotide Sequence (5' -> 3')]:", 20, yPos);
        yPos += 6;
        doc.setFont('Courier', 'normal');
        doc.text(doc.splitTextToSize(document.getElementById('dna-seq-output').innerText, 170), 20, yPos);
        
        yPos += 25;
        doc.setFont('Helvetica', 'normal');
        doc.text("[Cellular Impact & Mechanism Blueprint]:", 20, yPos);
        yPos += 6;
        doc.text(doc.splitTextToSize(document.getElementById('cure-output').innerText, 170), 20, yPos);

        doc.save("OncoSynth_AI_Complete_Therapeutic_Report.pdf");
    }
};
