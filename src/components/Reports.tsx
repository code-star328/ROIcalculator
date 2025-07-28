import React from 'react';
import { FileText, Download } from 'lucide-react';
import { ROIData, SustainabilityData, CalculationResults } from '../App';
import jsPDF from 'jspdf';

interface ReportsProps {
  roiData: ROIData;
  sustainabilityData: SustainabilityData;
  results: CalculationResults;
}

const Reports: React.FC<ReportsProps> = ({ roiData, sustainabilityData, results }) => {
  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;
  const formatNumber = (value: number, decimals = 1) => value.toFixed(decimals);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;
    let yPosition = margin;

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HPP Investment Analysis Report', margin, yPosition);
    yPosition += 15;

    // Date
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    // Executive Summary
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const summaryText = `This report analyzes the financial and environmental impact of implementing High Pressure Processing (HPP) technology. The analysis shows a ${formatNumber(results.roi.roi5Year)}% ROI over 5 years with a payback period of ${formatNumber(results.roi.paybackPeriod)} years.`;
    
    const summaryLines = pdf.splitTextToSize(summaryText, pageWidth - 2 * margin);
    pdf.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * 5 + 10;

    // Financial Analysis
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Financial Analysis', margin, yPosition);
    yPosition += 10;

    const financialData = [
      ['Initial Investment', formatCurrency(roiData.initialInvestment)],
      ['Annual Savings', formatCurrency(roiData.annualSavings)],
      ['Annual Operational Costs', formatCurrency(roiData.operationalCosts)],
      ['Net Annual Savings', formatCurrency(results.roi.annualSavings)],
      ['5-Year ROI', `${formatNumber(results.roi.roi5Year)}%`],
      ['Payback Period', `${formatNumber(results.roi.paybackPeriod)} years`],
      ['5-Year Total Savings', formatCurrency(results.roi.totalSavings5Year)],
    ];

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    financialData.forEach(([label, value]) => {
      pdf.text(label, margin, yPosition);
      pdf.text(value, pageWidth - margin - pdf.getTextWidth(value), yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    // Sustainability Analysis
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Sustainability Impact', margin, yPosition);
    yPosition += 10;

    const sustainabilityText = `The HPP implementation will reduce food waste from ${sustainabilityData.preHPPWasteRate}% to ${sustainabilityData.postHPPWasteRate}%, resulting in significant environmental benefits.`;
    const sustainabilityLines = pdf.splitTextToSize(sustainabilityText, pageWidth - 2 * margin);
    pdf.text(sustainabilityLines, margin, yPosition);
    yPosition += sustainabilityLines.length * 5 + 10;

    const environmentalData = [
      ['Annual Waste Avoided', `${formatNumber(results.sustainability.wasteAvoidedAnnual)} tonnes`],
      ['Annual Cost Savings', formatCurrency(results.sustainability.costSavingsAnnual)],
      ['Annual CO₂ Reduction', `${formatNumber(results.sustainability.co2ReductionAnnual)} tonnes`],
      ['Waste Disposal Cost', `${formatCurrency(sustainabilityData.wasteDisposalCost)}/tonne`],
    ];

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    environmentalData.forEach(([label, value]) => {
      pdf.text(label, margin, yPosition);
      pdf.text(value, pageWidth - margin - pdf.getTextWidth(value), yPosition);
      yPosition += 6;
    });

    // Add new page if needed
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }

    yPosition += 15;

    // Recommendations
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Recommendations', margin, yPosition);
    yPosition += 10;

    const recommendations = [
      '• Consider phased implementation to reduce initial capital requirements',
      '• Focus on high-value products to maximize ROI',
      '• Implement energy efficiency measures to reduce operational costs',
      '• Explore government incentives for sustainable technology adoption',
      '• Monitor and document sustainability metrics for reporting',
    ];

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    recommendations.forEach((rec) => {
      const recLines = pdf.splitTextToSize(rec, pageWidth - 2 * margin);
      pdf.text(recLines, margin, yPosition);
      yPosition += recLines.length * 5 + 3;
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Generated by FoodTech ROI Calculator', margin, pdf.internal.pageSize.height - 10);

    pdf.save('hpp-investment-analysis.pdf');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <FileText className="w-8 h-8 mr-3" />
              <h1 className="text-2xl font-bold">Investment Analysis Report</h1>
            </div>
            <p className="text-indigo-100">
              Comprehensive financial and sustainability impact analysis
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Executive Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Summary</h3>
            <div className="prose text-gray-600">
              <p className="mb-4">
                This comprehensive analysis evaluates the financial viability and environmental impact 
                of implementing High Pressure Processing (HPP) technology in your food processing operation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{formatNumber(results.roi.roi5Year)}%</p>
                  <p className="text-sm text-green-700">5-Year ROI</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{formatNumber(results.roi.paybackPeriod)}</p>
                  <p className="text-sm text-blue-700">Years to Payback</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">{formatNumber(results.sustainability.co2ReductionAnnual)}</p>
                  <p className="text-sm text-emerald-700">Tonnes CO₂ Saved/Year</p>
                </div>
              </div>
              <p>
                The analysis demonstrates strong financial returns with significant environmental benefits, 
                making this investment both economically and environmentally sustainable.
              </p>
            </div>
          </div>
        </div>

        {/* Financial Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Analysis</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Investment Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Initial Investment</span>
                  <span className="font-medium">{formatCurrency(roiData.initialInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Savings</span>
                  <span className="font-medium">{formatCurrency(roiData.annualSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operational Costs</span>
                  <span className="font-medium">{formatCurrency(roiData.operationalCosts)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">Net Annual Savings</span>
                  <span className="font-semibold text-green-600">{formatCurrency(results.roi.annualSavings)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-3">Return Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">5-Year ROI</span>
                  <span className="font-semibold text-green-800">{formatNumber(results.roi.roi5Year)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Payback Period</span>
                  <span className="font-semibold text-green-800">{formatNumber(results.roi.paybackPeriod)} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total 5-Year Savings</span>
                  <span className="font-semibold text-green-800">{formatCurrency(results.roi.totalSavings5Year)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Impact</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Waste Reduction</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pre-HPP Waste Rate</span>
                  <span className="font-medium">{sustainabilityData.preHPPWasteRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Post-HPP Waste Rate</span>
                  <span className="font-medium">{sustainabilityData.postHPPWasteRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Production Volume</span>
                  <span className="font-medium">{sustainabilityData.productionVolume} tonnes/{sustainabilityData.productionPeriod}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">Annual Waste Avoided</span>
                  <span className="font-semibold text-emerald-600">{formatNumber(results.sustainability.wasteAvoidedAnnual)} tonnes</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-medium text-emerald-800 mb-3">Environmental Benefits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-700">Annual Cost Savings</span>
                  <span className="font-semibold text-emerald-800">{formatCurrency(results.sustainability.costSavingsAnnual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">CO₂ Reduction/Year</span>
                  <span className="font-semibold text-emerald-800">{formatNumber(results.sustainability.co2ReductionAnnual)} tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Disposal Cost Savings</span>
                  <span className="font-semibold text-emerald-800">{formatCurrency(sustainabilityData.wasteDisposalCost)}/tonne</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Recommendations */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Recommendations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Financial Optimization</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Consider phased implementation to spread initial costs
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Focus on high-value products for maximum ROI
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Explore financing options and government incentives
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Implement energy efficiency measures
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sustainability Focus</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Document and report sustainability metrics
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Leverage environmental benefits for marketing
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Consider carbon credit opportunities
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Set up monitoring systems for continuous improvement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;