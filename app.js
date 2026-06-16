// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', () => {
    
    // Set current date automatically on load
    const dateElement = document.getElementById('reportDate');
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateElement.innerText = `Date: ${today}`;

    // Get UI Elements
    const updateBtn = document.getElementById('updateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Input Fields
    const titleInput = document.getElementById('titleInput');
    const summaryInput = document.getElementById('summaryInput');
    const detailsInput = document.getElementById('detailsInput');

    // Report Canvas Fields
    const reportTitle = document.getElementById('reportTitle');
    const reportSummary = document.getElementById('reportSummary');
    const reportDetails = document.getElementById('reportDetails');

    // Function to map input values to the Report layout
    function updateReportPreview() {
        reportTitle.innerText = titleInput.value;
        reportSummary.innerText = summaryInput.value;
        reportDetails.innerText = detailsInput.value;
    }

    // Function to generate and trigger the PDF download
    function generatePDF() {
        const element = document.getElementById('report-pdf-area');
        
        // Configuration options for html2pdf
        const options = {
            margin:       10,
            filename:     `${titleInput.value.replace(/\s+/g, '_')}_Report.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Run the html2pdf generation API process
        html2pdf().set(options).from(element).save();
    }

    // Event Listeners
    updateBtn.addEventListener('click', updateReportPreview);
    downloadBtn.addEventListener('click', generatePDF);
});