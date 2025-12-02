import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function QRModal({ isOpen, onClose, videoUrl }: QRModalProps) {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-artra-navy text-xl font-bold text-center">
            Escanee el código QR para conocer la historia de esta artesanía
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-6">
          <div className="bg-white p-4 rounded-lg border-2 border-artra-blue">
            {videoUrl ? (
              <QRCodeSVG value={videoUrl} size={256} level="H" />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center">
                <p className="text-gray-600 text-center text-sm">
                  Este producto no tiene video asociado.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
