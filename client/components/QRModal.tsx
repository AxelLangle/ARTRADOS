import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl?: string;
}

export default function QRModal({ isOpen, onClose, qrCodeUrl }: QRModalProps) {
  // Default QR code placeholder image
  const defaultQR = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://artra.com/historia-artesania";
  
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
            <img
              src={qrCodeUrl || defaultQR}
              alt="Código QR de la artesanía"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
