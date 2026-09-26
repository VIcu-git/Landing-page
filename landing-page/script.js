// Número de WhatsApp de la clínica (formato internacional, sin "+" ni espacios).
const WHATSAPP_NUMBER = "56900000000";

document.getElementById("year").textContent = new Date().getFullYear();

// No permitir fechas pasadas
const fecha = document.getElementById("fecha");
const hoy = new Date();
hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
fecha.min = hoy.toISOString().split("T")[0];

const form = document.getElementById("booking-form");
const error = document.getElementById("form-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;
  form.querySelectorAll("[required]").forEach((campo) => {
    const ok = campo.value.trim() !== "";
    campo.closest(".field").classList.toggle("is-invalid", !ok);
    if (!ok) valido = false;
  });
  error.hidden = valido;
  if (!valido) return;

  const datos = new FormData(form);
  const [anio, mes, dia] = datos.get("fecha").split("-");
  const texto = [
    "Hola Sonrisa Imperial, quiero agendar una cita:",
    `• Nombre: ${datos.get("nombre")}`,
    `• Teléfono: ${datos.get("telefono")}`,
    `• Servicio: ${datos.get("servicio")}`,
    `• Fecha: ${dia}/${mes}/${anio}`,
    `• Horario: ${datos.get("hora")}`,
    datos.get("mensaje").trim() && `• Comentarios: ${datos.get("mensaje").trim()}`,
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, "_blank");
});
