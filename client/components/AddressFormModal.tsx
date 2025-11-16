import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';

interface Address {
  id?: number;
  street: string;
  number?: string;
  postal_code: string;
  state: string;
  municipality: string;
  locality: string;
  neighborhood: string;
  interior_number?: string;
  delivery_instructions?: string;
  type: 'Residencial' | 'Laboral';
  recipient_name: string;
  recipient_phone: string;
  is_default?: boolean;
}

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
  address?: Address;
  mode: 'add' | 'edit';
}

const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
  'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export default function AddressFormModal({ isOpen, onClose, onSave, address, mode }: AddressFormModalProps) {
  const [formData, setFormData] = useState<Address>({
    street: '',
    number: '',
    postal_code: '',
    state: '',
    municipality: '',
    locality: '',
    neighborhood: '',
    interior_number: '',
    delivery_instructions: '',
    type: 'Residencial',
    recipient_name: '',
    recipient_phone: '',
    is_default: false
  });

  const [noStreetNumber, setNoStreetNumber] = useState(false);
  const [noPostalCode, setNoPostalCode] = useState(false);

  useEffect(() => {
    if (address && mode === 'edit') {
      setFormData(address);
      setNoStreetNumber(!address.number);
    } else {
      // Reset form for add mode
      setFormData({
        street: '',
        number: '',
        postal_code: '',
        state: '',
        municipality: '',
        locality: '',
        neighborhood: '',
        interior_number: '',
        delivery_instructions: '',
        type: 'Residencial',
        recipient_name: '',
        recipient_phone: '',
        is_default: false
      });
      setNoStreetNumber(false);
      setNoPostalCode(false);
    }
  }, [address, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="heading-3">
            {mode === 'edit' ? 'EDITAR DIRECCIÓN' : 'AGREGAR DIRECCIÓN'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Usar mi ubicación */}
          <button
            type="button"
            className="flex items-center gap-2 text-blue hover:text-navy"
          >
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">Usar mi ubicación</span>
          </button>

          {/* Dirección o lugar de entrega */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Dirección o lugar de entrega
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Calle Allende #305"
              required
              className="input-field w-full"
            />
            <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={noStreetNumber}
                onChange={(e) => {
                  setNoStreetNumber(e.target.checked);
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, number: '' }));
                  }
                }}
                className="rounded"
              />
              Mi calle no tiene número
            </label>
          </div>

          {/* Código postal */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Código postal
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="42000"
                required={!noPostalCode}
                disabled={noPostalCode}
                className="input-field flex-1"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={noPostalCode}
                  onChange={(e) => {
                    setNoPostalCode(e.target.checked);
                    if (e.target.checked) {
                      setFormData(prev => ({ ...prev, postal_code: '' }));
                    }
                  }}
                  className="rounded"
                />
                No sé mi CP
              </label>
            </div>
          </div>

          {/* Estado y Municipio */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block body-base font-semibold text-navy mb-2">
                Estado
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input-field w-full"
              >
                <option value="">Seleccionar</option>
                {ESTADOS_MEXICO.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block body-base font-semibold text-navy mb-2">
                Municipio o alcaldía
              </label>
              <input
                type="text"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                placeholder="Pachuca de Soto"
                required
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Localidad y Colonia */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block body-base font-semibold text-navy mb-2">
                Localidad
              </label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="Pachuca de Soto"
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block body-base font-semibold text-navy mb-2">
                Colonia o Barrio
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Centro"
                required
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Número interior */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Número interior / Departamento (opcional)
            </label>
            <input
              type="text"
              name="interior_number"
              value={formData.interior_number}
              onChange={handleChange}
              placeholder="Ej: 201"
              className="input-field w-full"
            />
          </div>

          {/* Indicaciones para la entrega */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Indicaciones para la entrega (opcional)
            </label>
            <textarea
              name="delivery_instructions"
              value={formData.delivery_instructions}
              onChange={handleChange}
              placeholder="Ej: Entre calles, color del edificio, no tiene timbre"
              rows={3}
              className="input-field w-full resize-none"
            />
          </div>

          {/* Tipo de domicilio */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Tipo de domicilio
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Residencial"
                  checked={formData.type === 'Residencial'}
                  onChange={handleChange}
                  className="text-navy"
                />
                <span>Residencial</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Laboral"
                  checked={formData.type === 'Laboral'}
                  onChange={handleChange}
                  className="text-navy"
                />
                <span>Laboral</span>
              </label>
            </div>
          </div>

          {/* Nombre y Apellido */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Nombre y Apellido
            </label>
            <input
              type="text"
              name="recipient_name"
              value={formData.recipient_name}
              onChange={handleChange}
              placeholder="Axel Langle"
              required
              className="input-field w-full"
            />
          </div>

          {/* Número de teléfono */}
          <div>
            <label className="block body-base font-semibold text-navy mb-2">
              Número de teléfono
            </label>
            <input
              type="tel"
              name="recipient_phone"
              value={formData.recipient_phone}
              onChange={handleChange}
              placeholder="5519860797"
              required
              className="input-field w-full"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
