
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker source. 
// Note: In a Vite setup, we often need to point to the worker file explicitly.
// A robust way in production is to copy the worker to public or import it.
// For simplicity in this dev environment, we'll try the CDN approach or standard import if configured.
// Update: Using the CDN for the worker is often the most reliable "drop-in" method without complex vite config.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export async function extractTextFromPDF(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            useSystemFonts: true,
        });

        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + '\n\n';
        }

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF file.');
    }
}
