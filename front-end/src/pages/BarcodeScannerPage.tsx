import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useEffect, useState } from 'react';

const BarcodeScannerPage = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);

  const scan = async () => {

    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: 17, // ALL
        scanInstructions: 'Scan barcode',
        scanButton: true,
        scanText: 'Tap to scan',
        cameraDirection: 1, // BACK
        scanOrientation: 1, // PORTRAIT
        web: {
          showCameraSelection: true,
          scannerFPS: 30,
        },
      });

      if (result?.ScanResult) {
        localStorage.setItem('scanned-barcode', result.ScanResult);
        setScannedData(result.ScanResult);
      }
    } catch (err) {
      console.error('Scan failed:', err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('scanned-barcode');
    if (stored) setScannedData(stored);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={scan}>Scan Barcode</button>
      {scannedData && <p>Scanned: {scannedData}</p>}
    </div>
  );
};

export default BarcodeScannerPage;
