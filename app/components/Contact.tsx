"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-20 py-16 px-6 lg:px-16 bg-gray-light"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4 text-center">
          Contacto
        </h2>
        <p className="text-center text-text/70 mb-12 max-w-2xl mx-auto">
          Envíenos un mensaje si está interesado en nuestras investigaciones
          sobre preeclampsia y trastornos hipertensivos asociados al embarazo.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text mb-1">Dirección</h3>
              <p className="text-text/70">Carrera 62 # 52-59</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">Teléfono</h3>
              <a
                href="https://wa.me/573145789702"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors"
              >
                314 578 9702
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">Correo</h3>
              <a
                href="mailto:luisfer_uda@yahoo.com"
                className="text-primary hover:text-primary-light transition-colors"
              >
                luisfer_uda@yahoo.com
              </a>
            </div>
          </div>

          {/* Contact form */}
          {submitted ? (
            <div className="flex items-center justify-center rounded-2xl bg-white p-8 border border-gray-border">
              <div className="text-center">
                <p className="text-xl font-semibold text-primary mb-2">
                  Mensaje enviado
                </p>
                <p className="text-text/70">
                  Gracias por contactarnos. Le responderemos pronto.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="Su nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text mb-1"
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text mb-1"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  placeholder="Escriba su mensaje aquí..."
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium w-full"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
