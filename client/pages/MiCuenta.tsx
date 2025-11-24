import { ArrowLeft, Edit2, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserAddresses, Address, mockAddresses } from "@/data/mockUsers";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function MiCuenta() {
  const navigate = useNavigate();
  const { user, isLogged, updateUser } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [emailData, setEmailData] = useState({
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [addressData, setAddressData] = useState({
    street: "",
    colony: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const userAddresses = user ? getUserAddresses(user.id) : [];

  if (!isLogged || !user) {
    navigate("/login");
    return null;
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

	  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	    const file = e.target.files?.[0];
	    if (file) {
	      const reader = new FileReader();
	      reader.onloadend = () => {
	        updateUser({ avatar: reader.result as string });
	        toast({
	          title: "Foto actualizada",
	          description: "Tu foto de perfil ha sido actualizada correctamente.",
	        });
	      };
	      reader.readAsDataURL(file);
	    }
	  };

	  const handleDeleteAvatar = () => {
	    updateUser({ avatar: null }); // Asumo que null o una cadena vacía es el valor por defecto
	    toast({
	      title: "Foto eliminada",
	      description: "Tu foto de perfil ha sido eliminada.",
	    });
	  };

  const handleSaveProfile = () => {
    updateUser(profileData);
    setIsEditingProfile(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus datos han sido actualizados correctamente.",
    });
  };

  const handleSaveEmail = () => {
    if (emailData.currentPassword && emailData.newPassword) {
      updateUser({ 
        email: emailData.email,
        password: emailData.newPassword 
      });
      setIsEditingEmail(false);
      toast({
        title: "Credenciales actualizadas",
        description: "Tu correo y contraseña han sido actualizados.",
      });
    } else {
      toast({
        title: "Error",
        description: "Debes ingresar tu contraseña actual y la nueva.",
        variant: "destructive",
      });
    }
  };

  const handleSaveAddress = () => {
    // Simular guardado de dirección
    toast({
      title: "Dirección guardada",
      description: "La dirección ha sido guardada correctamente.",
    });
    setIsEditingAddress(null);
    setIsAddingAddress(false);
    setAddressData({
      street: "",
      colony: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[900px]">
        {/* Título */}
        <h1 className="text-4xl font-bold text-artra-navy mb-12">Mi Cuenta</h1>

        {/* Mis datos */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-artra-navy mb-6">Mis datos</h2>
          <div className="border-2 border-artra-blue rounded-2xl p-8 relative">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="absolute top-6 right-6 flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors"
            >
              <Edit2 className="w-5 h-5" />
              <span className="font-medium text-lg">Editar</span>
            </button>

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-artra-lighter-blue/20 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-20 h-20 text-artra-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="8" r="5" strokeWidth="2" />
                      <path d="M3 21c0-4.4 3.6-8 8-8h2c4.4 0 8 3.6 8 8" strokeWidth="2" />
                    </svg>
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-artra-navy rounded-full flex items-center justify-center hover:bg-artra-blue transition-colors"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4 pt-2">
	                <div className="flex flex-col gap-2">
	                  <button
	                    onClick={handleAvatarClick}
	                    className="px-4 py-2 bg-artra-navy text-white rounded-lg hover:bg-artra-blue transition-colors text-sm font-medium"
	                  >
	                    Subir nueva foto
	                  </button>
	                  {user.avatar && (
	                    <button
	                      onClick={handleDeleteAvatar}
	                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
	                    >
	                      Eliminar foto
	                    </button>
	                  )}
	                </div>
                <p className="text-sm text-gray-600">JPG, PNG O JPEG</p>

                <div className="pt-4">
                  <p className="text-artra-blue font-semibold text-lg mb-1">Nombre:</p>
                  <p className="text-black text-xl">{user.name}</p>
                </div>

                <div>
                  <p className="text-artra-blue font-semibold text-lg mb-1">Número de teléfono:</p>
                  <p className="text-black text-xl">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Correo y contraseña */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-artra-navy mb-6">Correo y contraseña</h2>
          <div className="border-2 border-artra-blue rounded-2xl p-8 relative">
            <button
              onClick={() => setIsEditingEmail(true)}
              className="absolute top-6 right-6 flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors"
            >
              <Edit2 className="w-5 h-5" />
              <span className="font-medium text-lg">Editar</span>
            </button>

            <div className="space-y-6">
              <div>
                <p className="text-artra-blue font-semibold text-lg mb-1">Correo electrónico:</p>
                <p className="text-black text-xl">{user.email}</p>
              </div>

              <div>
                <p className="text-artra-blue font-semibold text-lg mb-1">Contraseña:</p>
                <p className="text-black text-xl">****************</p>
              </div>
            </div>
          </div>
        </section>

        {/* Direcciones */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-artra-navy mb-6">Direcciones</h2>
          <div className="space-y-4">
            {userAddresses.map((address, index) => (
              <div key={address.id} className="border-2 border-artra-blue rounded-2xl p-8 relative">
                <button
                  onClick={() => setIsEditingAddress(address.id)}
                  className="absolute top-6 right-6 flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                  <span className="font-medium text-lg">Editar</span>
                </button>

                <div>
                  <p className="text-artra-blue font-semibold text-lg mb-2">Dirección {index + 1}:</p>
                  <p className="text-black text-lg">
                    {address.street}, {address.colony}, {address.city}, {address.state}, C.P. {address.postalCode}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setIsAddingAddress(true)}
              className="w-full py-4 bg-artra-navy text-white rounded-2xl hover:bg-artra-blue transition-colors text-lg font-semibold"
            >
              Agregar nueva dirección
            </button>
          </div>
        </section>

        {/* Botón Volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors text-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </Link>
      </div>

      {/* Dialog Editar Perfil */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-artra-navy">Editar Perfil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-artra-navy font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
            <div>
              <label className="block text-artra-navy font-medium mb-2">Teléfono</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProfile} className="bg-artra-navy hover:bg-artra-blue">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Editar Email/Contraseña */}
      <Dialog open={isEditingEmail} onOpenChange={setIsEditingEmail}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-artra-navy">Editar Credenciales</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-artra-navy font-medium mb-2">Correo electrónico</label>
              <input
                type="email"
                value={emailData.email}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
            <div>
              <label className="block text-artra-navy font-medium mb-2">Contraseña actual</label>
              <input
                type="password"
                value={emailData.currentPassword}
                onChange={(e) => setEmailData({ ...emailData, currentPassword: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
            <div>
              <label className="block text-artra-navy font-medium mb-2">Nueva contraseña</label>
              <input
                type="password"
                value={emailData.newPassword}
                onChange={(e) => setEmailData({ ...emailData, newPassword: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingEmail(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEmail} className="bg-artra-navy hover:bg-artra-blue">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Agregar/Editar Dirección */}
      <Dialog open={isAddingAddress || isEditingAddress !== null} onOpenChange={(open) => {
        if (!open) {
          setIsAddingAddress(false);
          setIsEditingAddress(null);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-artra-navy">
              {isAddingAddress ? "Agregar Dirección" : "Editar Dirección"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-artra-navy font-medium mb-2">Calle y número</label>
              <input
                type="text"
                value={addressData.street}
                onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
            <div>
              <label className="block text-artra-navy font-medium mb-2">Colonia</label>
              <input
                type="text"
                value={addressData.colony}
                onChange={(e) => setAddressData({ ...addressData, colony: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-artra-navy font-medium mb-2">Ciudad</label>
                <input
                  type="text"
                  value={addressData.city}
                  onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
                />
              </div>
              <div>
                <label className="block text-artra-navy font-medium mb-2">Estado</label>
                <input
                  type="text"
                  value={addressData.state}
                  onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
                />
              </div>
            </div>
            <div>
              <label className="block text-artra-navy font-medium mb-2">Código Postal</label>
              <input
                type="text"
                value={addressData.postalCode}
                onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                className="w-full h-12 px-4 rounded-lg border border-artra-lighter-blue bg-white focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddingAddress(false);
              setIsEditingAddress(null);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAddress} className="bg-artra-navy hover:bg-artra-blue">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
