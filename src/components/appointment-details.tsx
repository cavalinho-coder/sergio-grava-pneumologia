import { site } from "@/data/site";

export function AppointmentDetails() {
  return <div className="appointment-details">
    <p className="private-appointments"><strong>Consultas particulares com hora marcada.</strong></p>
    <p className="insurance-details">{site.insurance}</p>
    <p>{site.hours}</p>
  </div>;
}
