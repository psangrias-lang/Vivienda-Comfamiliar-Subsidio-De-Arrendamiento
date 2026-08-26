import React, { useState } from 'react';
import type { CensoRegistro } from '../../types/censo';
import { Paso1Identificacion } from './Paso1Identificacion';
import { Paso2Localizacion } from './Paso2Localizacion';
import { Paso3Afectacion } from './Paso3Afectacion';
import { Paso4Consentimiento } from './Paso4Consentimiento';
import { ModalExitoRadicado } from './ModalExitoRadicado';
import { ComfamiliarLogo } from '../ComfamiliarLogo';
import { CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, Send } from 'lucide-react';

interface MultiStepCensoProps {
  onSaveRegistro: (registro: CensoRegistro) => void;
  onCancel: () => void;
}

const INITIAL_FORM_DATA: Omit<CensoRegistro, 'id' | 'fechaRegistro' | 'estadoAtencion'> = {
  tipoDocumento: 'CC',
  numeroDocumento: '',
  nombresApellidos: '',
  estadoAfiliacion: 'Afiliado activo trabajador',
  categoriaAfiliacion: 'Cat A (Hasta 2 SMMLV)',
  empresaDondeLabora: '',

  municipio: 'Pereira (Capital)',
  barrioVereda: '',
  direccionExacta: '',
  telefonoCelular: '',
  telefonoWhatsapp: '',
  correoElectronico: '',
  puntoReferencia: '',

  tenenciaInmueble: 'Arrendada',
  nivelDanio: 'Moderado',
  estadoVisitaDIGER: 'No ha sido visitado',
  numeroActaDIGER: '',
  descripcionDanios: '',
  habitantesAfectados: 3,
  hayMenoresOAdultosMayores: false,
  requiereEvacuacionInmediata: true,
  evidencias: [],

  autorizaTratamientoDatos: false,
  declaracionBajoJuramento: false,
};

export const MultiStepCenso: React.FC<MultiStepCensoProps> = ({
  onSaveRegistro,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registroExitoso, setRegistroExitoso] = useState<CensoRegistro | null>(null);

  const updateFormData = (fields: Partial<typeof INITIAL_FORM_DATA>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    const updatedKeys = Object.keys(fields);
    if (updatedKeys.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        updatedKeys.forEach((key) => delete next[key]);
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.numeroDocumento.trim()) {
        newErrors.numeroDocumento = 'El número de identificación es obligatorio.';
      } else if (formData.numeroDocumento.length < 5) {
        newErrors.numeroDocumento = 'Ingresa un número de documento válido.';
      }

      if (!formData.nombresApellidos.trim()) {
        newErrors.nombresApellidos = 'Los nombres y apellidos completos son obligatorios.';
      }
    }

    if (step === 2) {
      if (!formData.municipio.trim()) {
        newErrors.municipio = 'Selecciona el municipio de Risaralda.';
      }
      if (!formData.barrioVereda.trim()) {
        newErrors.barrioVereda = 'El barrio, sector o vereda es obligatorio.';
      }
      if (!formData.direccionExacta.trim()) {
        newErrors.direccionExacta = 'La dirección exacta del inmueble es obligatoria.';
      }
      if (!formData.telefonoCelular.trim()) {
        newErrors.telefonoCelular = 'El celular de contacto es obligatorio.';
      } else if (formData.telefonoCelular.length < 10) {
        newErrors.telefonoCelular = 'Ingresa un número de celular de 10 dígitos.';
      }
      if (!formData.telefonoWhatsapp.trim()) {
        newErrors.telefonoWhatsapp = 'El número de WhatsApp es obligatorio.';
      }
      if (!formData.correoElectronico.trim()) {
        newErrors.correoElectronico = 'El correo electrónico es obligatorio.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoElectronico)) {
        newErrors.correoElectronico = 'Ingresa un correo electrónico válido.';
      }
    }

    if (step === 3) {
      if (!formData.descripcionDanios.trim()) {
        newErrors.descripcionDanios = 'Por favor describe los daños o la necesidad de traslado a vivienda en arriendo.';
      } else if (formData.descripcionDanios.length < 15) {
        newErrors.descripcionDanios = 'Por favor sé un poco más descriptivo (mínimo 15 caracteres).';
      }
    }

    if (step === 4) {
      if (!formData.autorizaTratamientoDatos) {
        newErrors.autorizaTratamientoDatos = 'Debes autorizar el tratamiento de datos para radicar la solicitud.';
      }
      if (!formData.declaracionBajoJuramento) {
        newErrors.declaracionBajoJuramento = 'Debes aceptar la declaración de veracidad bajo juramento.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const radicadoId = `RAD-ARR-2026-${randomSuffix}`;

    const nuevoRegistro: CensoRegistro = {
      ...formData,
      id: radicadoId,
      fechaRegistro: new Date().toISOString(),
      estadoAtencion: formData.requiereEvacuacionInmediata ? 'Priorizado para Subsidio' : 'En Verificación Técnica',
    };

    onSaveRegistro(nuevoRegistro);
    setRegistroExitoso(nuevoRegistro);
  };

  const progressPercentage = (currentStep / 4) * 100;

  const stepsInfo = [
    { num: 1, label: 'Identificación', desc: 'Datos del titular' },
    { num: 2, label: 'Localización', desc: 'Municipio y contacto' },
    { num: 3, label: 'Diagnóstico', desc: 'Afectación y arriendo' },
    { num: 4, label: 'Consentimiento', desc: 'Revisión y envío' },
  ];

  return (
    <section className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado del Formulario */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <ComfamiliarLogo variant="dark" size="md" />
              <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                  Formulario Oficial de Postulación
                </span>
                <h1 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Subsidio de Arrendamiento Temporal & Censo Sismo
                </h1>
              </div>
            </div>

            <button
              onClick={onCancel}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Regresar al Portal</span>
            </button>
          </div>

          <div className="pt-6">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-3">
              {stepsInfo.map((s) => (
                <div key={s.num} className="text-center">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full text-xs font-black flex items-center justify-center transition-all ${
                      currentStep === s.num
                        ? 'bg-[#003B70] text-amber-300 ring-4 ring-blue-100'
                        : currentStep > s.num
                        ? 'bg-[#002447] text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-bold text-slate-800 truncate">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#003B70] via-[#0A4B8F] to-amber-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
              <span>Paso {currentStep} de 4</span>
              <span>{progressPercentage}% Completado</span>
            </div>
          </div>
        </div>

        {/* Formulario Dinámico */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <Paso1Identificacion
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <Paso2Localizacion
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <Paso3Afectacion
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <Paso4Consentimiento
                formData={formData}
                updateFormData={updateFormData}
                goToStep={setCurrentStep}
                errors={errors}
              />
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-[#003B70] hover:bg-[#002447] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md transition-all hover:translate-x-0.5"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Radicar Postulación Oficial</span>
                </button>
              )}
            </div>
          </form>
        </div>

      </div>

      {registroExitoso && (
        <ModalExitoRadicado
          registro={registroExitoso}
          onClose={() => setRegistroExitoso(null)}
          onGoHome={onCancel}
        />
      )}
    </section>
  );
};
