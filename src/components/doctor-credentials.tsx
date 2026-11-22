import { site } from "@/data/site";

export function DoctorCredentials() {
  return <div className="doctor-credentials"><strong>{site.name}</strong><span>{site.registration}</span></div>;
}
