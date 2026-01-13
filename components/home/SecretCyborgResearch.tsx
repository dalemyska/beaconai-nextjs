import SecretCyborgDownloadForm from "./SecretCyborgDownloadForm";

const SecretCyborgResearch = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-md border-2 border-beacon-navy/10">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-beacon-navy mb-4">Industry Research on &ldquo;Secret Cyborgs&rdquo;</h3>
        <p className="text-gray-600 mb-6">
          Download our comprehensive Harvard Business Review article about Secret Cyborgs and how they impact organizations of all sizes.
        </p>
        <div className="flex items-center justify-center mb-2">
          <div className="h-1 w-16 bg-amber-500"></div>
        </div>
        <p className="text-sm text-gray-500 italic">PDF document - 4 pages - Updated April 2025</p>
      </div>

      <SecretCyborgDownloadForm />
    </div>
  );
};

export default SecretCyborgResearch;
