import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export const downloadCVAsPDF = async (
  elementId: string = 'cv-print-sheet',
  filename: string = 'Valiyev_Abduvosid_Middle_Frontend_Developer_CV.pdf'
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  try {
    // A4 aniq piksellari: 794px x 1123px (210mm x 297mm)
    const a4WidthPx = 794;
    const a4HeightPx = 1123;

    const imgData = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: a4WidthPx,
      height: a4HeightPx,
      style: {
        width: `${a4WidthPx}px`,
        minHeight: `${a4HeightPx}px`,
        maxHeight: `${a4HeightPx}px`,
        margin: '0',
        padding: '38px 50px',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '0',
      },
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    pdf.save(filename);
  } catch (err) {
    console.warn('html-to-image xatoligi, zaxira vektorli PDF ishga tushmoqda:', err);
    generateCleanVectorPdf(filename);
  }
};

/**
 * Zaxira: jsPDF orqali to'g'ridan-to'g'ri PDF yaratish
 */
function generateCleanVectorPdf(filename: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const { personalInfo, summary, skillCategories, workExperience, education, languages } = resumeData;

  const leftMargin = 14;
  const rightMargin = 196;
  let currentY = 16;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(17, 24, 39);
  doc.text(personalInfo.name.toUpperCase(), 105, currentY, { align: 'center' });
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(75, 85, 99);
  doc.text(personalInfo.title, 105, currentY, { align: 'center' });
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(55, 65, 81);
  const contacts = `${personalInfo.age} | ${personalInfo.location} | ${personalInfo.phone} | t.me/Valiyev_0915 | ${personalInfo.github}`;
  doc.text(contacts, 105, currentY, { align: 'center' });
  currentY += 6;

  const drawSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(17, 24, 39);
    doc.text(title.toUpperCase(), leftMargin, currentY);
    currentY += 1.5;
    doc.setDrawColor(31, 41, 55);
    doc.setLineWidth(0.3);
    doc.line(leftMargin, currentY, rightMargin, currentY);
    currentY += 3.8;
  };

  // Summary
  drawSectionHeader("QISQACHA MA'LUMOT");
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(55, 65, 81);
  const splitSummary = doc.splitTextToSize(summary, rightMargin - leftMargin);
  doc.text(splitSummary, leftMargin, currentY);
  currentY += splitSummary.length * 3.6 + 2.5;

  // Skills
  drawSectionHeader("TEXNIK KO'NIKMALAR");
  doc.setFontSize(8.2);
  skillCategories.forEach((cat) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`${cat.title}:`, leftMargin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    const skillsText = cat.skills.join(', ');
    const splitSkills = doc.splitTextToSize(skillsText, rightMargin - leftMargin - 40);
    doc.text(splitSkills, leftMargin + 40, currentY);
    currentY += Math.max(1, splitSkills.length) * 3.4 + 0.5;
  });
  currentY += 2;

  // Work Experience
  drawSectionHeader("ISH TAJRIBASI");
  workExperience.forEach((job) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(17, 24, 39);
    doc.text(job.company, leftMargin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(job.period, rightMargin, currentY, { align: 'right' });
    currentY += 3.8;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.2);
    doc.setTextColor(75, 85, 99);
    doc.text(job.role, leftMargin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(job.location, rightMargin, currentY, { align: 'right' });
    currentY += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(55, 65, 81);
    job.achievements.forEach((ach) => {
      const splitAch = doc.splitTextToSize(`• ${ach}`, rightMargin - leftMargin - 3);
      doc.text(splitAch, leftMargin + 2, currentY);
      currentY += splitAch.length * 3.2 + 0.5;
    });
    currentY += 2;
  });

  // Education & Languages
  drawSectionHeader("TA'LIM VA TILLAR");
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(17, 24, 39);
  doc.text(education[0].institution, leftMargin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  doc.text(` — ${education[0].degree}`, leftMargin + 46, currentY);
  doc.text(education[0].period, rightMargin, currentY, { align: 'right' });
  currentY += 4;

  doc.setFont('helvetica', 'bold');
  doc.text("Tillar: ", leftMargin, currentY);
  doc.setFont('helvetica', 'normal');
  const langText = languages.map((l) => `${l.language} (${l.level})`).join(' | ');
  doc.text(langText, leftMargin + 14, currentY);

  // Save PDF file
  doc.save(filename);
}
